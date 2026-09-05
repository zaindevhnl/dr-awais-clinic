import { Sparkles } from "lucide-react";
import { getContent } from "@/lib/content";

export async function ScrollingBanner() {
  const { items } = await getContent<{ items: string[] }>("home.banner");

  return (
    <div className="bg-white py-8 overflow-hidden flex whitespace-nowrap relative select-none">
      <div className="flex clone-marquee gap-6">
        {/* Original Set */}
        <div className="flex items-center gap-6 shrink-0">
          {items.map((text, idx) => (
            <div
              key={`set1-${idx}`}
              className="flex items-center whitespace-nowrap bg-[#00A78E] px-6 py-3 rounded-full text-white shadow-lg shadow-[#00A78E]/20"
            >
              <Sparkles className="w-5 h-5 text-[#C1FF72] mr-3 fill-[#C1FF72]/20" strokeWidth={2.5} />
              <span className="text-lg font-semibold uppercase tracking-wide">{text}</span>
            </div>
          ))}
        </div>

        {/* Duplicate Set for seamless looping */}
        <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
          {items.map((text, idx) => (
            <div
              key={`set2-${idx}`}
              className="flex items-center whitespace-nowrap bg-[#00A78E] px-6 py-3 rounded-full text-white shadow-lg shadow-[#00A78E]/20"
            >
              <Sparkles className="w-5 h-5 text-[#C1FF72] mr-3 fill-[#C1FF72]/20" strokeWidth={2.5} />
              <span className="text-lg font-semibold uppercase tracking-wide">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
