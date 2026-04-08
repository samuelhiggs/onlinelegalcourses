import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/data/blog-posts"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"
import { formatDate } from "@/lib/utils"

export const metadata = generatePageMetadata(
  "Legal Education Blog | CLE, Bar Prep & Attorney Resources",
  "Expert articles on continuing legal education, bar exam preparation, and legal career development. Updated regularly with actionable insights for attorneys and law students.",
  "/blog",
  {
    keywords: ["legal education blog", "CLE articles", "bar prep tips", "attorney resources"],
  }
)

export default function BlogPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-navy py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Legal Education Blog
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Expert insights on CLE, bar prep, and legal career development
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h2 className="mt-3 font-heading text-lg font-bold text-navy transition-colors group-hover:text-gold">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <time className="text-xs text-muted-foreground">
                    {formatDate(post.date)}
                  </time>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                    Read More
                    <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
