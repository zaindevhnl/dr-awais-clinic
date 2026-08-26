"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const term = query.trim();
        router.push(term ? `/blog?tag=${encodeURIComponent(term)}` : "/blog");
      }}
      className="relative block"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search articles"
        className="w-full px-5 py-3.5 sm:py-4 bg-[#F9FAFB] rounded-full border border-gray-100 focus:ring-2 focus:ring-[#00A78E] outline-none font-semibold text-sm sm:text-base text-gray-700 pr-12"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-5 top-1/2 -translate-y-1/2 p-1 z-10 hover:text-[#00A78E] transition-colors text-gray-400"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </form>
  );
}
