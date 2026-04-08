import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CTAButton } from "@/components/ui/CTAButton"
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs } from "@/data/blog-posts"
import { generatePageMetadata, generateBreadcrumbSchema, generateArticleSchema } from "@/lib/seo"
import { formatDate } from "@/lib/utils"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}

  return generatePageMetadata(
    post.title,
    post.excerpt,
    `/blog/${post.slug}`,
    {
      openGraph: { type: "article" },
      keywords: [post.category, "legal education", "CLE", "bar prep"],
    }
  )
}

async function getContent(slug: string): Promise<string> {
  try {
    const mod = await import(`@/content/blog/${slug}`)
    return mod.content
  } catch {
    return ""
  }
}

function renderMarkdown(markdown: string): string {
  return markdown
    .replace(/^### (.+)$/gm, '<h3 class="font-heading text-lg font-bold text-navy mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-heading text-xl font-bold text-navy mt-10 mb-4">$1</h2>')
    .replace(/^\*\*(.+?)\*\*$/gm, '<p class="font-semibold text-navy mt-4 mb-2">$1</p>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, '<li class="ml-6 list-disc text-sm leading-relaxed text-foreground/80 mb-1">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-6 list-decimal text-sm leading-relaxed text-foreground/80 mb-1">$2</li>')
    .replace(/^(?!<[hl])((?!^\s*$).+)$/gm, (match) => {
      if (match.startsWith("<")) return match
      return `<p class="text-sm leading-relaxed text-foreground/80 mb-4">${match}</p>`
    })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) notFound()

  const content = await getContent(slug)

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ])

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    datePublished: post.date,
    author: post.author,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="bg-navy py-10 lg:py-14">
        <div className="mx-auto max-w-[800px] px-4">
          <nav className="mb-4 text-sm text-white/60">
            <Link href="/" className="hover:text-white/80">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white/80">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{post.title}</span>
          </nav>
          <Badge className="bg-gold text-white">{post.category}</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
            <span>{post.author}</span>
            <span>|</span>
            <time>{formatDate(post.date)}</time>
            <span>|</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* FTC Disclosure */}
      <div className="bg-alt-bg border-b border-border py-2">
        <p className="mx-auto max-w-[800px] px-4 text-xs text-muted-foreground">
          This article may contain affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you.
        </p>
      </div>

      <article className="py-10">
        <div className="mx-auto max-w-[800px] px-4">
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />

          <Separator className="my-10" />

          {/* Related Posts */}
          <section>
            <h2 className="font-heading text-xl font-bold text-navy">
              Related Articles
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {otherPosts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="rounded-lg border border-border p-4 transition-colors hover:bg-alt-bg"
                >
                  <Badge variant="outline" className="text-xs">{other.category}</Badge>
                  <h3 className="mt-2 font-heading text-sm font-bold text-navy">
                    {other.title}
                  </h3>
                  <time className="mt-2 block text-xs text-muted-foreground">
                    {formatDate(other.date)}
                  </time>
                </Link>
              ))}
            </div>
          </section>

          <Separator className="my-10" />

          {/* CTA */}
          <div className="rounded-xl bg-navy p-8 text-center">
            <h2 className="font-heading text-xl font-bold text-white">
              Need Help with Your Legal Education?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Compare providers, find CLE courses, or connect with an attorney.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <CTAButton href="/cle-requirements" variant="primary" size="md">
                CLE Requirements
              </CTAButton>
              <CTAButton href="/find-attorney" variant="outline" size="md" className="border-white text-white hover:bg-white hover:text-navy">
                Find an Attorney
              </CTAButton>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
