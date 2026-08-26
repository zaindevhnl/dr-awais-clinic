import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types/database.types";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2070&auto=format&fit=crop";

export function BlogSection({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  const featuredBlog = posts[0];
  const otherBlogs = posts.filter((p) => p.id !== featuredBlog.id).slice(0, 3);

  return (
    <section className="py-7 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-6 lg:max-w-2xl">
            <div className="inline-block">
              <span className="bg-[#C1FF72] text-[#1A1A1A] px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider">
                Latest Blog and news
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight">
              Caring for You, Caring for <br />
              Health{" "}
              <span className="relative inline-block">
                Guardians
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#C1FF72]/80 -rotate-1 rounded-full z-0"></div>
              </span>
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-gray-400 text-sm leading-relaxed">
              Medical care encompasses a range of services aimed at promoting health, preventing
              disease and treating illness — from routine check-ups and screening through to
              life-changing surgery and the follow-up that keeps those results.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Large Feature Blog */}
          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="lg:w-1/2 relative group cursor-pointer overflow-hidden rounded-[30px] h-[500px] block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredBlog.cover_image_url || PLACEHOLDER_IMAGE}
              alt={featuredBlog.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Teal Overlay */}
            <div className="absolute inset-0 bg-[#00A78E]/60 group-hover:bg-[#00A78E]/70 transition-colors duration-300"></div>

            {/* Overlay Text */}
            <div className="absolute bottom-10 left-10 right-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight max-w-sm">
                {featuredBlog.title}
              </h3>
            </div>
          </Link>

          {/* Right: Blog List */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            {otherBlogs.map((blog, index) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className={
                  "flex items-center gap-6 py-8 group cursor-pointer " +
                  (index !== otherBlogs.length - 1 ? "border-b border-gray-100" : "")
                }
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.cover_image_url || PLACEHOLDER_IMAGE}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h4>
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] group-hover:text-[#00A78E] transition-colors">
                  <span className="hidden sm:inline">Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
