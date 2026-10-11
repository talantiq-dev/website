import { queryCollection } from '@nuxt/content/server'

const STATIC_ROUTES = ['/', '/sapid', '/sapid/recipe-extractor', '/blog', '/blog/de', '/services', '/contact', '/privacy', '/terms']

export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const posts = await queryCollection(event, 'blog').all()

  const urls = [
    ...STATIC_ROUTES.map(path => ({ loc: `${siteUrl}${path}` })),
    ...posts.map(post => ({ loc: `${siteUrl}${post.path}`, lastmod: post.date })),
  ]

  setHeader(event, 'content-type', 'application/xml')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`
})
