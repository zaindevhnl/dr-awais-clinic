import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/social-icons";
import { Markdown } from "@/components/markdown";
import { BlogComments } from "@/components/clone/blog-comments";
import { BlogSidebar } from "@/components/clone/blog-sidebar";
import { JsonLd, articleLd, breadcrumbLd } from "@/components/seo/json-ld";
import { getAllTags, getPostBySlug, getPosts, getPublishedPostSlugs } from "@/lib/data";

export const revalidate = 3600;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop";

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      images: [post.cover_image_url || "/placeholder-wide.svg"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [{ posts }, tags] = await Promise.all([getPosts({ limit: 4 }), getAllTags()]);
  const recentPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const date = post.published_at ?? post.created_at;

  const socials = [
    { Icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
    { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
    { Icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
    { Icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F9FAFB]">
      <JsonLd data={articleLd(post)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Health articles", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <section className="py-12 sm:py-16 lg:py-6 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10">
          {/* Left Side: Blog Content */}
          <div className="w-full lg:w-[65%] space-y-8 sm:space-y-10">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-[42px] lg:text-[52px] font-semibold text-[#1A1A1A] leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#00A78E]" />
                  <span>{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#00A78E]" />
                  <span>By Admin</span>
                </div>
                <Link
                  href={`/blog?tag=${encodeURIComponent(post.tags?.[0] ?? "")}`}
                  className="flex items-center space-x-2 cursor-pointer hover:text-[#00A78E] transition-colors"
                >
                  <div className="w-4 h-4 bg-[#00A78E]/20 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#00A78E] rounded-full"></div>
                  </div>
                  <span>{post.tags?.[0] ?? "Medical"}</span>
                </Link>
              </div>
              {post.excerpt && (
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed">{post.excerpt}</p>
              )}
            </div>

            <div className="rounded-2xl sm:rounded-[40px] overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image_url || FALLBACK_IMAGE}
                alt={post.title}
                className="w-full h-[220px] sm:h-[320px] md:h-[500px] object-cover"
              />
            </div>

            <div className="prose-clinic text-gray-500 text-base sm:text-lg leading-relaxed max-w-none">
              <Markdown>{post.content}</Markdown>
            </div>

            {/* Tags & Socials Row */}
            <div className="flex flex-col md:flex-row items-center justify-between py-8 sm:py-10 border-t border-b border-gray-100 mt-10 sm:mt-16 space-y-6 md:space-y-0">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="font-semibold text-[#1A1A1A] text-lg sm:text-xl">Tags:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {(post.tags ?? []).map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-4 sm:px-5 py-2 rounded-full border border-gray-100 text-gray-400 font-semibold text-xs hover:bg-[#00A78E] hover:text-white transition-all cursor-pointer"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {socials.map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#00A78E] hover:text-white transition-all cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Comments Thread + Message Form */}
            <BlogComments postId={post.id} />
          </div>

          {/* Right Side: Sidebar */}
          <BlogSidebar
            tags={tags}
            recentPosts={recentPosts.map((p) => ({
              slug: p.slug,
              title: p.title,
              image: p.cover_image_url || FALLBACK_IMAGE,
              category: p.tags?.[0] ?? "Medical",
            }))}
          />
        </div>
      </section>
    </div>
  );
}
