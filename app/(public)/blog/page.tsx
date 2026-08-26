import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowRight, ChevronsRight } from "lucide-react";
import { BlogSidebar } from "@/components/clone/blog-sidebar";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { POSTS_PER_PAGE, getAllTags, getPosts } from "@/lib/data";

export const revalidate = 3600;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop";

export const metadata: Metadata = {
  title: "Health articles",
  description:
    "General health information from the clinic of Dr. Awais Malik — weight loss surgery, recovery and metabolic health.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", images: ["/placeholder-wide.svg"] },
};

export default async function BlogIndexPage({ searchParams }: PageProps<"/blog">) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const tag = typeof params.tag === "string" ? params.tag : undefined;

  const [{ posts, total }, tags] = await Promise.all([getPosts({ page, tag }), getAllTags()]);

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const linkFor = (nextPage: number) =>
    `/blog?${new URLSearchParams({
      ...(tag ? { tag } : {}),
      ...(nextPage > 1 ? { page: String(nextPage) } : {}),
    }).toString()}`;

  return (
    <div className="flex flex-col w-full min-h-screen font-semibold bg-[#F9FAFB] overflow-x-hidden">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Health articles", path: "/blog" },
        ])}
      />

      <section className="py-10 lg:py-16 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col lg:flex-row gap-10 w-full">
          {/* Left Side: Blog List */}
          <div className="w-full lg:w-[65%] space-y-6 sm:space-y-10">
            {posts.length === 0 && (
              <div className="bg-white rounded-[30px] p-10 text-center border border-gray-50 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#1A1A1A]">No articles yet</h2>
                <p className="text-gray-400 mt-2">
                  New health articles from the clinic will appear here.
                </p>
              </div>
            )}

            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl sm:rounded-[30px] p-4 sm:p-8 shadow-sm border border-gray-50 group w-full"
              >
                {/* Image Container */}
                <div className="relative rounded-[20px] sm:rounded-[25px] overflow-hidden mb-6 sm:mb-8 h-[240px] sm:h-[350px] md:h-[400px] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.cover_image_url || FALLBACK_IMAGE}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Date Badge over image */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center space-x-2 shadow-lg">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A78E]" />
                    <span className="text-[#1A1A1A] font-semibold text-xs sm:text-sm">
                      {new Date(post.published_at ?? post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="space-y-4 sm:space-y-6 px-1 sm:px-2">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A78E]" />
                      <span>By Admin</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#00A78E]/20 rounded-sm flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00A78E] rounded-full"></div>
                      </div>
                      <span>{post.tags?.[0] ?? "Medical"}</span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1A1A] leading-tight group-hover:text-[#00A78E] transition-colors duration-300">
                    {post.title}
                  </h2>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="border-2 border-gray-100 hover:border-[#00A78E] hover:bg-[#00A78E] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base text-[#1A1A1A] transition-all duration-300 flex items-center group/btn w-fit"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Pagination Container */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:space-x-3 pt-6 sm:pt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <Link
                    key={num}
                    href={linkFor(num)}
                    aria-current={num === page ? "page" : undefined}
                    className={
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold border-2 transition-all " +
                      (num === page
                        ? "bg-white border-[#00A78E] text-[#1A1A1A]"
                        : "bg-white border-gray-100 text-gray-400 hover:border-[#00A78E] hover:text-[#1A1A1A]")
                    }
                  >
                    {num}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link
                    href={linkFor(page + 1)}
                    aria-label="Next Page"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white border-2 border-gray-100 text-gray-400 hover:border-[#00A78E] hover:text-[#1A1A1A] transition-all"
                  >
                    <ChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Side: Sidebar Widgets */}
          <BlogSidebar
            tags={tags}
            recentPosts={posts.slice(0, 3).map((p) => ({
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
