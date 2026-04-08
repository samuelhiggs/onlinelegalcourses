/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://onlinelegalcourses.com",
  generateRobotsTxt: true,
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  transform: async (config, path) => {
    let priority = 0.7
    let changefreq = "monthly"

    if (path === "/") {
      priority = 1.0
      changefreq = "weekly"
    } else if (path.startsWith("/cle-requirements/") && path !== "/cle-requirements") {
      priority = 0.9
      changefreq = "monthly"
    } else if (path === "/cle-requirements") {
      priority = 0.9
      changefreq = "monthly"
    } else if (path.startsWith("/compare/")) {
      priority = 0.8
      changefreq = "monthly"
    } else if (path.startsWith("/bar-prep/")) {
      priority = 0.8
      changefreq = "monthly"
    } else if (path.startsWith("/blog/")) {
      priority = 0.7
      changefreq = "weekly"
    } else if (path === "/find-attorney") {
      priority = 0.8
      changefreq = "monthly"
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
