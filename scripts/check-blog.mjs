#!/usr/bin/env node
// Quality gate for blog posts (see seo/PLAYBOOK.md). No dependencies: `node scripts/check-blog.mjs`.
// Exits 1 if any post has errors; warnings are printed for the reviewer but don't fail.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const BLOG = join(ROOT, 'content/blog')

const STATIC_PAGES = new Set(['/', '/sapid', '/sapid/recipe-extractor', '/blog', '/blog/de', '/services', '/contact', '/privacy', '/terms'])

const LIMITS = {
  title: { min: 20, max: 70 },
  description: { min: 90, max: 170, idealMin: 120, idealMax: 160 },
  words: { en: { min: 700, max: 2200, idealMin: 900, idealMax: 1600 }, de: { min: 600, max: 2000, idealMin: 800, idealMax: 1500 } },
}

const BANNED = {
  en: ['delve', 'game-changer', 'game changer', "in today's fast-paced", 'in today’s fast-paced', 'unlock the', 'elevate your', 'seamless', 'revolutionize', 'in conclusion', 'look no further', 'a testament to', 'embark on', 'culinary journey', 'tapestry', 'navigate the complexities', 'without further ado'],
  de: ['in der heutigen schnelllebigen', 'tauchen wir ein', 'revolutionieren', 'nahtlos', 'zusammenfassend lässt sich sagen', 'kulinarische reise', 'ohne weitere umschweife'],
}

// External links are limited to trusted domains so nothing a web page tells the writer can publish a link elsewhere
const ALLOWED_DOMAINS = readFileSync(join(ROOT, 'seo/allowed-domains.txt'), 'utf8')
  .split('\n')
  .map((line) => line.replace(/#.*/, '').trim().toLowerCase())
  .filter(Boolean)
const isAllowedHost = (host) => ALLOWED_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`))

const FAQ_HEADING = /^##\s+(FAQ|Frequently asked questions|Häufige Fragen|Häufig gestellte Fragen)\b/im

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return { data: null, body: source }
  const data = {}
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (!kv) continue
    let value = kv[2].trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((v) => v.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    } else {
      value = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
    }
    data[kv[1]] = value
  }
  return { data, body: source.slice(match[0].length) }
}

function listPosts() {
  const posts = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.md')) posts.push(full)
    }
  }
  if (existsSync(BLOG)) walk(BLOG)
  return posts
}

const toPath = (file) => `/blog/${relative(BLOG, file).replace(/\.md$/, '')}`

function wordCount(body) {
  const text = body
    .replace(/^::.*$/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|-]/g, ' ')
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length
}

const files = listPosts()
const posts = files.map((file) => {
  const source = readFileSync(file, 'utf8')
  const { data, body } = parseFrontmatter(source)
  return { file, path: toPath(file), data, body }
})
const pathSet = new Set(posts.map((p) => p.path))
const today = new Date().toISOString().slice(0, 10)

let errorCount = 0
let warningCount = 0
const report = new Map()
const add = (post, level, message) => {
  if (!report.has(post.path)) report.set(post.path, [])
  report.get(post.path).push({ level, message })
  if (level === 'error') errorCount++
  else warningCount++
}

for (const post of posts) {
  const rel = relative(BLOG, post.file)
  const parts = rel.split('/')
  const folderLang = parts.length === 1 ? 'en' : parts[0]
  const slug = parts[parts.length - 1].replace(/\.md$/, '')

  if (parts.length > 2 || (parts.length === 2 && parts[0] !== 'de')) add(post, 'error', 'Posts go in content/blog/ (English) or content/blog/de/ (German) only')
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) add(post, 'error', `Slug "${slug}" must be lowercase ASCII words joined by hyphens (ä → ae, ß → ss)`)
  if (slug.length > 60) add(post, 'error', `Slug is ${slug.length} characters; keep it under 60`)

  const d = post.data
  if (!d) {
    add(post, 'error', 'Missing frontmatter block')
    continue
  }

  for (const field of ['title', 'description', 'date', 'lang', 'keyword', 'translation']) {
    if (!d[field]) add(post, 'error', `Frontmatter is missing "${field}"`)
  }

  if (d.lang && d.lang !== folderLang) add(post, 'error', `lang is "${d.lang}" but the file is in the ${folderLang === 'en' ? 'English' : 'German'} folder`)

  if (d.title) {
    if (d.title.length > LIMITS.title.max) add(post, 'error', `Title is ${d.title.length} characters; Google truncates after ~${LIMITS.title.max}`)
    if (d.title.length < LIMITS.title.min) add(post, 'error', `Title is only ${d.title.length} characters`)
  }

  if (d.description) {
    const n = d.description.length
    if (n < LIMITS.description.min || n > LIMITS.description.max) add(post, 'error', `Description is ${n} characters; keep it between ${LIMITS.description.min} and ${LIMITS.description.max}`)
    else if (n < LIMITS.description.idealMin || n > LIMITS.description.idealMax) add(post, 'warning', `Description is ${n} characters; ${LIMITS.description.idealMin}–${LIMITS.description.idealMax} is ideal`)
  }

  if (d.date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date) || Number.isNaN(Date.parse(d.date))) add(post, 'error', `date "${d.date}" must be YYYY-MM-DD`)
    else if (d.date > today) add(post, 'warning', `date ${d.date} is in the future`)
  }

  if (d.translation) {
    if (!pathSet.has(d.translation)) add(post, 'error', `translation points to ${d.translation}, which doesn't exist`)
    else {
      const other = posts.find((p) => p.path === d.translation)
      if (other.data?.translation !== post.path) add(post, 'error', `${d.translation} must have translation: ${post.path} (hreflang pairs point at each other)`)
      if (other.data?.lang === d.lang) add(post, 'error', 'translation must be in the other language')
    }
  }

  if (d.image && !existsSync(join(ROOT, 'public', d.image))) add(post, 'error', `image ${d.image} not found in public/`)

  const body = post.body
  if (/^#\s/m.test(body)) add(post, 'error', 'Remove the "# " heading; the page renders the title as H1')
  if (!/^##\s/m.test(body)) add(post, 'error', 'Structure the post with "## " section headings')
  if (!FAQ_HEADING.test(body)) add(post, 'error', `Add an FAQ section ("## ${folderLang === 'de' ? 'Häufige Fragen' : 'FAQ'}")`)

  const limits = LIMITS.words[folderLang] || LIMITS.words.en
  const words = wordCount(body)
  if (words < limits.min || words > limits.max) add(post, 'error', `${words} words; must be between ${limits.min} and ${limits.max}`)
  else if (words < limits.idealMin || words > limits.idealMax) add(post, 'warning', `${words} words; ${limits.idealMin}–${limits.idealMax} is ideal`)

  // Links
  const links = [...body.matchAll(/(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map((m) => m[2])
  const internal = links.filter((href) => href.startsWith('/'))
  for (const href of links) {
    if (/^https?:\/\/(www\.)?talantiq\.com/i.test(href)) add(post, 'error', `Use a relative link instead of ${href}`)
    else if (href.startsWith('http://')) add(post, 'error', `Use https for ${href}`)
    else if (/[?&](utm_|igsh|si=|fbclid)/i.test(href)) add(post, 'error', `Strip tracking parameters from ${href}`)
  }
  for (const href of internal) {
    const target = href.split(/[?#]/)[0].replace(/\/$/, '') || '/'
    if (!STATIC_PAGES.has(target) && !pathSet.has(target)) add(post, 'error', `Internal link ${href} doesn't match a page or post`)
  }
  if (!internal.some((href) => href.startsWith('/sapid'))) add(post, 'error', 'Link to /sapid/recipe-extractor or /sapid at least once')
  if (internal.length < 2) add(post, 'warning', `Only ${internal.length} internal link(s); aim for 3+ (tool, /sapid, related posts)`)

  // Every URL anywhere in the post (links, images, bare URLs) must point at an allowed domain
  const withoutCode = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
  for (const raw of withoutCode.match(/https?:\/\/[^\s)<>"'\]]+/g) || []) {
    let host
    try {
      host = new URL(raw).hostname.toLowerCase().replace(/^www\./, '')
    } catch {
      add(post, 'error', `Malformed URL ${raw}`)
      continue
    }
    if (host === 'talantiq.com') continue // reported above as "use a relative link"
    if (!isAllowedHost(host)) add(post, 'error', `${host} is not in seo/allowed-domains.txt; link only to the domains listed there`)
  }
  for (const href of links) {
    if (!/^(https:\/\/|\/|#)/.test(href)) add(post, 'error', `Link target ${href} must start with https://, / or #`)
  }
  // Raw HTML and MDC attribute/inline-component syntax could inject markup or scripts into the page
  if (/<\/?[a-zA-Z][a-zA-Z0-9-]*(\s[^>]*)?\/?>/.test(withoutCode)) add(post, 'error', 'Raw HTML is not allowed in posts; use Markdown')
  if (/\]\([^)]*\)\{/.test(withoutCode)) add(post, 'error', 'Attribute blocks after links or images ({...}) are not allowed')
  if (/(^|\s):[a-zA-Z][\w-]*[{[]/m.test(withoutCode)) add(post, 'error', 'Inline components (:name{...}) are not allowed')

  // MDC components
  const opens = (body.match(/^::tool-cta\s*$/gm) || []).length
  const closes = (body.match(/^::\s*$/gm) || []).length
  if (opens !== closes) add(post, 'error', 'Each "::tool-cta" line needs a matching "::" line')
  if (opens > 1) add(post, 'error', 'Use ::tool-cta at most once per post')
  if (/^::(?!tool-cta\s*$)(?!\s*$).+/m.test(body)) add(post, 'error', 'Only the ::tool-cta component is available')
  if (opens === 0) add(post, 'warning', 'No ::tool-cta block; add one where the recipe extractor helps the reader')

  // Wording
  const lower = body.toLowerCase() + ' ' + (d.title || '').toLowerCase() + ' ' + (d.description || '').toLowerCase()
  for (const phrase of BANNED[folderLang] || []) {
    if (lower.includes(phrase)) add(post, 'error', `Rewrite without the cliché "${phrase}"`)
  }
  if (folderLang === 'de' && /(?<![.!?]\s|^)\b(Sie|Ihnen|Ihre?[mnrs]?)\b/m.test(body)) add(post, 'warning', 'Possible "Sie" form; Sapid speaks German with "du"')
  if (/[€$]\s?\d|\d\s?(€|EUR|USD)\b/.test(body)) add(post, 'warning', 'Mentions a price: make sure it is not a claim about Sapid’s pricing')
  const hasSource = links.some((href) => href.startsWith('https://'))
  if (/\d\s?%|\b(percent|prozent)\b/i.test(body) && !hasSource) {
    add(post, 'warning', 'Uses a percentage without any external source link: cite the source or drop the statistic')
  }
  if (/\b(studies|research|surveys?) (show|shows|found|suggests?)\b|\b(studien|umfragen) (zeigen|belegen)\b/i.test(body) && !hasSource) {
    add(post, 'error', 'Refers to studies or research without linking a source')
  }
}

// Keyword cannibalization: one post per keyword per language
const byKeyword = new Map()
for (const post of posts) {
  if (!post.data?.keyword) continue
  const key = `${post.data.lang}|${post.data.keyword.toLowerCase()}`
  if (byKeyword.has(key)) add(post, 'error', `Keyword "${post.data.keyword}" is already targeted by ${byKeyword.get(key)}`)
  else byKeyword.set(key, post.path)
}

for (const [path, items] of report) {
  console.log(`\n${path}`)
  for (const { level, message } of items) console.log(`  ${level === 'error' ? '✖' : '⚠'} ${message}`)
}
console.log(`\n${posts.length} post(s) checked: ${errorCount} error(s), ${warningCount} warning(s)`)
process.exit(errorCount ? 1 : 0)
