import Link from "next/link";
import { Plus, Phone } from "lucide-react";
import { BlogSearch } from "@/components/clone/blog-search";

type RecentPost = { slug: string; title: string; image: string; category: string };

export function BlogSidebar({
  tags,
  recentPosts,
  phone = "(+92) 300 3968500",
}: {
  tags: string[];
  recentPosts: RecentPost[];
  phone?: string;
}) {
  return (
    <div className="w-full lg:w-[35%] space-y-6 sm:space-y-10">
      {/* Search Widget */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
          <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">Search</h3>
        </div>
        <BlogSearch />
      </div>

      {/* Category Widget */}
      {tags.length > 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
            <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">Category</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="flex items-center justify-between group cursor-pointer border-b border-gray-50 pb-3 sm:pb-4 last:border-0 last:pb-0"
              >
                <span className="font-semibold text-sm sm:text-base text-gray-600 group-hover:text-[#00A78E] transition-colors">
                  {tag}
                </span>
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 group-hover:text-[#00A78E] group-hover:rotate-90 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Post Widget */}
      {recentPosts.length > 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
            <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">Recent post</h3>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center space-x-4 group cursor-pointer w-full"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
                </div>
                <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
                  <div className="flex items-center space-x-2 text-[10px] sm:text-[12px] font-semibold text-gray-400 uppercase">
                    <div className="w-1.5 h-1.5 bg-[#00A78E] rounded-full"></div>
                    <span>{post.category}</span>
                  </div>
                  <h4 className="font-semibold text-[#1A1A1A] leading-tight group-hover:text-[#00A78E] transition-colors text-xs sm:text-sm line-clamp-2">
                    {post.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Support/Help Card */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50 text-center space-y-6 sm:space-y-8 w-full">
        <h3 className="text-lg sm:text-[22px] font-semibold text-[#1A1A1A]">Need Help? Call Us</h3>
        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          aria-label="Call the clinic"
          className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C1FF72] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#C1FF72]/20"
        >
          <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#1A1A1A]" />
        </a>
        <p className="text-gray-500 text-xs sm:text-sm font-medium leading-relaxed max-w-xs mx-auto">
          Health care is a vital aspect of maintaining overall well-being, encompassing a range of
          services from preventive care
        </p>
        <h2 className="text-lg sm:text-[22px] font-semibold text-[#1A1A1A] tracking-wide">
          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
        </h2>
      </div>

      {/* Tags Widget */}
      {tags.length > 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-sm border border-gray-50">
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <div className="w-6 h-1 bg-[#00A78E] rounded-full"></div>
            <h3 className="text-lg sm:text-[20px] font-semibold text-[#1A1A1A]">Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-gray-100 text-gray-400 font-semibold text-[11px] sm:text-xs hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all cursor-pointer whitespace-nowrap"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
