import Link from "next/link";

/**
 * The practice wordmark: "SAFE SURGICAL CARE by Dr. Awais Malik".
 *
 * Rendered as text plus the caduceus roundel so it stays crisp at any size
 * and needs no image request. To use the supplied artwork instead, drop the
 * file in public/brand/ and swap the markup below for an <img>; the sizing
 * and link behaviour here stay the same.
 */
export function BrandLogo({
  tone = "dark",
  className = "",
  onClick,
}: {
  /** "dark" = dark text for the white header, "light" = white text for the footer. */
  tone?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Safe Surgical Care by Dr. Awais Malik — home"
      className={`flex items-center gap-3 cursor-pointer group ${className}`}
    >
      {/* Roundel */}
      <span
        className={
          "relative grid place-items-center rounded-full border-2 transition-transform duration-300 group-hover:scale-105 shrink-0 size-11 " +
          (isLight ? "border-white/70 bg-white/5" : "border-[#1B3A6B] bg-[#1B3A6B]/5")
        }
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={"size-6 " + (isLight ? "text-white" : "text-[#1B3A6B]")}
        >
          <path d="M12 3v18" />
          <path d="M9 5.2c1.6 1.2 4.4 1.2 6 0" />
          <path d="M8.4 8.6c2 1.5 5.2 1.5 7.2 0" />
          <path d="M9 12.2c1.6 1.2 4.4 1.2 6 0" />
          <path d="M12 3a2 2 0 1 1 0 .01" />
          <path d="M7.5 17.5 12 21l4.5-3.5" />
        </svg>
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span
          className={
            "text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] " +
            (isLight ? "text-white/70" : "text-[#1B3A6B]/70")
          }
        >
          Safe Surgical Care
        </span>
        <span
          className={
            "text-xl sm:text-2xl font-bold tracking-tight mt-1 " +
            (isLight ? "text-white" : "text-[#1A1A1A]")
          }
        >
          Dr. Awais Malik
        </span>
      </span>
    </Link>
  );
}
