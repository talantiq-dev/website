#!/usr/bin/env node
// Reads and updates seo/topics.md for the weekly blog workflow.
//
//   node scripts/topics.mjs next [--skip id,id]   → JSON of the first `todo` topic, or nothing if none is left
//   node scripts/topics.mjs publish <id> <date>   → marks the topic `published (<date>)`
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const FILE = fileURLToPath(new URL('../seo/topics.md', import.meta.url))

const HEADING = /^## ([a-z0-9-]+) · (.+)$/

function parseLang(line) {
  // "- EN: Title · keyword: … · slug: …"
  const [titlePart, ...rest] = line.replace(/^- (EN|DE): /, '').split(' · ')
  const fields = Object.fromEntries(rest.map((part) => {
    const [key, ...value] = part.split(': ')
    return [key.trim(), value.join(': ').trim()]
  }))
  return { title: titlePart.trim(), keyword: fields.keyword, slug: fields.slug }
}

export function parseTopics(source) {
  const topics = []
  let current = null
  for (const line of source.split('\n')) {
    const heading = line.match(HEADING)
    if (heading) {
      current = { id: heading[1], status: heading[2].trim(), en: null, de: null, angle: '' }
      topics.push(current)
    } else if (current && line.startsWith('- EN: ')) current.en = parseLang(line)
    else if (current && line.startsWith('- DE: ')) current.de = parseLang(line)
    else if (current && line.startsWith('- Angle: ')) current.angle = line.slice('- Angle: '.length).trim()
  }
  return topics
}

const isValid = (t) => t.en?.slug && t.en?.keyword && t.de?.slug && t.de?.keyword

const [command, ...args] = process.argv.slice(2)
const source = readFileSync(FILE, 'utf8')

if (command === 'next') {
  const skipIndex = args.indexOf('--skip')
  const skip = new Set(skipIndex >= 0 ? (args[skipIndex + 1] || '').split(',').filter(Boolean) : [])
  const topic = parseTopics(source).find((t) => t.status === 'todo' && !skip.has(t.id) && !skip.has(t.en?.slug))
  if (topic) {
    if (!isValid(topic)) {
      console.error(`Topic "${topic.id}" is missing an EN/DE keyword or slug`)
      process.exit(1)
    }
    console.log(JSON.stringify(topic))
  }
} else if (command === 'publish') {
  const [id, date] = args
  if (!id || !/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
    console.error('Usage: topics.mjs publish <id> <YYYY-MM-DD>')
    process.exit(1)
  }
  const pattern = new RegExp(`^## ${id} · todo$`, 'm')
  if (!pattern.test(source)) {
    console.error(`No topic "${id}" with status todo`)
    process.exit(1)
  }
  writeFileSync(FILE, source.replace(pattern, `## ${id} · published (${date})`))
} else {
  console.error('Usage: topics.mjs next [--skip id,id] | publish <id> <YYYY-MM-DD>')
  process.exit(1)
}
