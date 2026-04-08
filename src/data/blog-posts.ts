export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-cle",
    title: "What Is CLE? A Complete Guide to Continuing Legal Education",
    excerpt: "Everything attorneys need to know about CLE requirements, earning credits, and maintaining licensure across all 50 states.",
    date: "2026-03-15",
    author: "OnlineLegalCourses Editorial Team",
    category: "CLE Guide",
    readTime: "8 min read",
  },
  {
    slug: "barbri-vs-themis-2026",
    title: "BARBRI vs Themis 2026: The Definitive Comparison",
    excerpt: "We compare pricing, features, pass rates, and student experience to help you choose the right bar prep course.",
    date: "2026-03-08",
    author: "OnlineLegalCourses Editorial Team",
    category: "Bar Prep",
    readTime: "10 min read",
  },
  {
    slug: "free-cle-courses-online",
    title: "How to Get Free CLE Credits Online in 2026",
    excerpt: "Discover legitimate ways to earn free CLE credits online, including pro bono opportunities and complimentary provider offers.",
    date: "2026-02-28",
    author: "OnlineLegalCourses Editorial Team",
    category: "CLE Guide",
    readTime: "7 min read",
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}
