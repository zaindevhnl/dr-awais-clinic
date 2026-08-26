"use client";

import { useRef, useState, useEffect } from "react";
import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  name: string;
  time: string;
  text: string;
  rating: number;
  initial: string;
  bgColor: string;
};

const baseReviews: Review[] = [
  {
    name: "Hamza Ali",
    time: "1 week",
    text: "My diabetes is completely reversed after mini gastric bypass. Dr. Awais Malik explained everything clearly before surgery. Highly recommend for anyone looking for professional care and long term results.",
    rating: 5,
    initial: "H",
    bgColor: "bg-orange-500",
  },
  {
    name: "Ibrahim Hassan",
    time: "2 months",
    text: "Amazing results! From 130 kg to 78 kg in just 10 months. Dr. Awais Malik and his team made the whole process smooth and comfortable. Thank you for giving me a new, healthier life.",
    rating: 5,
    initial: "I",
    bgColor: "bg-pink-500",
  },
  {
    name: "Junaid Malik",
    time: "5 days",
    text: "The best surgeon in Lahore for weight loss surgery. Dr. Awais Malik's technique is perfect with minimal scarring. My recovery was quick and painless.",
    rating: 5,
    initial: "J",
    bgColor: "bg-teal-500",
  },
  {
    name: "Khalid Mehmood",
    time: "3 weeks",
    text: "I was scared of surgery but Dr. Awais Malik's calm demeanor and expertise put me at ease. Now 40 kg lighter and feeling healthier than ever!",
    rating: 5,
    initial: "K",
    bgColor: "bg-indigo-600",
  },
  {
    name: "M. Tanveer",
    time: "1 month",
    text: "Excellent experience with Dr. Awais Malik. Highly professional management, state-of-the-art clinical setup, and exceptional patient care.",
    rating: 5,
    initial: "T",
    bgColor: "bg-emerald-600",
  },
  {
    name: "Zainab Fatima",
    time: "4 weeks",
    text: "Highly recommended for laparoscopic procedures. Professional environment and very supportive staff throughout the treatment.",
    rating: 5,
    initial: "Z",
    bgColor: "bg-purple-500",
  },
  {
    name: "Ayesha Khan",
    time: "3 days",
    text: "Life-changing experience! Had my gastric sleeve surgery done by Dr. Awais Malik. I have already lost 15kg in just 2 months and my hypertension is completely gone. He is incredibly skilled.",
    rating: 5,
    initial: "A",
    bgColor: "bg-red-500",
  },
  {
    name: "Bilal Siddiqui",
    time: "2 weeks",
    text: "Top-notch care and absolute professionalism. Dr. Awais Malik analyzed my case thoroughly before recommending the laparoscopic procedure. Post-op support from his team is phenomenal.",
    rating: 5,
    initial: "B",
    bgColor: "bg-blue-600",
  },
  {
    name: "Farhan Ahmed",
    time: "3 months",
    text: "Highly satisfied with my weight loss journey. I was dealing with severe joint pain due to obesity, but after surgery, I feel light, energetic, and completely transformed. Truly the best surgeon!",
    rating: 5,
    initial: "F",
    bgColor: "bg-yellow-600",
  },
  {
    name: "Sana Yusuf",
    time: "6 days",
    text: "I cannot thank Dr. Awais Malik enough. His detailed consultation removed all my fears about bariatric surgery. Minimal pain, clean facility, and a highly structured diet plan provided.",
    rating: 5,
    initial: "S",
    bgColor: "bg-cyan-600",
  },
  {
    name: "Usman Raza",
    time: "5 weeks",
    text: "Outstanding results. My sleep apnea and heavy breathing issues vanished after losing weight through the procedure. Dr. Awais Malik gives proper time to every patient and guides like family.",
    rating: 5,
    initial: "U",
    bgColor: "bg-amber-600",
  },
];

function GoogleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="review-card bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 snap-center sm:snap-start h-full min-h-[280px] w-[88vw] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] flex-shrink-0">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-11 h-11 rounded-full ${review.bgColor} flex items-center justify-center text-white font-bold text-lg shadow-inner flex-shrink-0`}
          >
            {review.initial}
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-gray-900 text-[14px] truncate">{review.name}</h4>
              <CheckCircle className="w-3.5 h-3.5 text-green-500 fill-current flex-shrink-0" />
            </div>
            <p className="text-xs text-gray-400 font-medium truncate">
              {review.time} ago on <span className="text-blue-500 font-bold">Google</span>
            </p>
          </div>
        </div>

        <div className="flex text-amber-400 mb-3">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>

        <p
          className={
            "text-gray-600 text-[13.5px] leading-relaxed mb-4 " +
            (isExpanded ? "" : "line-clamp-4")
          }
        >
          &quot;{review.text}&quot;
        </p>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[#00A78E] text-xs font-semibold text-left hover:underline cursor-pointer w-fit mt-2 transition-colors duration-200"
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

export function GoogleReviews() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerPage(1);
      else if (window.innerWidth < 1024) setCardsPerPage(2);
      else if (window.innerWidth < 1280) setCardsPerPage(3);
      else setCardsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(baseReviews.length / cardsPerPage);
  const paddingCount = cardsPerPage;
  const extendedReviews = [
    ...baseReviews.slice(-paddingCount),
    ...baseReviews,
    ...baseReviews.slice(0, paddingCount),
  ];

  const getCardWidth = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".review-card");
      if (card) {
        const style = window.getComputedStyle(sliderRef.current);
        const gap = parseFloat(style.gap) || 20;
        return (card as HTMLElement).clientWidth + gap;
      }
    }
    return 0;
  };

  useEffect(() => {
    if (sliderRef.current) {
      setIsTransitioning(false);
      const card = sliderRef.current.querySelector(".review-card");
      if (card) {
        const style = window.getComputedStyle(sliderRef.current);
        const gap = parseFloat(style.gap) || 20;
        sliderRef.current.scrollLeft =
          ((card as HTMLElement).clientWidth + gap) * cardsPerPage;
      }
    }
  }, [cardsPerPage]);

  const handleScrollReset = () => {
    if (!sliderRef.current) return;
    const { scrollLeft } = sliderRef.current;
    const cardWidth = getCardWidth();
    const coreWidth = baseReviews.length * cardWidth;

    if (scrollLeft >= coreWidth + cardWidth * paddingCount - 10) {
      setIsTransitioning(false);
      sliderRef.current.scrollLeft = scrollLeft - coreWidth;
    } else if (scrollLeft <= 10) {
      setIsTransitioning(false);
      sliderRef.current.scrollLeft = scrollLeft + coreWidth;
    }
  };

  const handleScrollDotUpdate = () => {
    if (!sliderRef.current) return;
    const { scrollLeft } = sliderRef.current;
    const cardWidth = getCardWidth();
    const relativeScroll = scrollLeft - cardWidth * paddingCount;
    const index = Math.round(relativeScroll / (cardWidth * cardsPerPage));

    if (index >= 0 && index < totalPages) setActiveIndex(index);
  };

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const { scrollLeft } = sliderRef.current;
    const scrollAmount = getCardWidth() * cardsPerPage;
    setIsTransitioning(true);
    sliderRef.current.scrollTo({
      left: direction === "right" ? scrollLeft + scrollAmount : scrollLeft - scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-[#F7F7F5] py-8 px-4 sm:px-6 md:px-12 lg:px-10 overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GoogleIcon className="w-6 h-6 flex-shrink-0" />
              <h2 className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">
                Excellent on Google
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 text-sm font-medium">
                4.9 / 5 out of {baseReviews.length} reviews
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm w-full sm:w-fit self-start sm:self-center">
            <GoogleIcon className="w-8 h-8 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-gray-900">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                {baseReviews.length} Google Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Slider Window */}
        <div className="relative px-0 sm:px-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous reviews"
            className="hidden sm:flex absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 w-11 h-11 rounded-full items-center justify-center text-gray-600 shadow-md hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all duration-300 cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={sliderRef}
            onScroll={() => {
              handleScrollDotUpdate();
              handleScrollReset();
            }}
            className={
              "flex gap-4 sm:gap-5 overflow-x-auto pb-4 px-4 sm:px-0 snap-x snap-mandatory no-scrollbar " +
              (isTransitioning ? "scroll-smooth" : "")
            }
          >
            {extendedReviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label="Next reviews"
            className="hidden sm:flex absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 w-11 h-11 rounded-full items-center justify-center text-gray-600 shadow-md hover:bg-[#00A78E] hover:text-white hover:border-[#00A78E] transition-all duration-300 cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className={
                "h-2 rounded-full transition-all duration-300 " +
                (i === activeIndex ? "bg-gray-800 w-5" : "bg-gray-300 w-2")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
