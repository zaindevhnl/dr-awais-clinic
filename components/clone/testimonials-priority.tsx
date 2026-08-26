"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

const reviewsData = [
  { id: 1, name: "Abdul Rahman", initial: "A", bgColor: "bg-blue-600", rating: 5, text: "Dr. Awais Malik performed my sleeve gastrectomy with exceptional skill. I lost 45 kg in 8 months. The entire team was professional.", time: "1 month ago" },
  { id: 2, name: "Ayesha Khan", initial: "A", bgColor: "bg-pink-600", rating: 5, text: "Best decision of my life! After struggling with obesity for 15 years, Dr. Awais Malik helped me achieve my dream weight safely and confidently.", time: "2 weeks ago" },
  { id: 3, name: "Faisal Khan", initial: "F", bgColor: "bg-purple-600", rating: 5, text: "I had my gastric bypass surgery 6 months ago. Lost 52 kg already! Dr. Awais Malik's post-operative care and follow-ups are excellent.", time: "3 months ago" },
  { id: 4, name: "Sana Fatima", initial: "S", bgColor: "bg-rose-500", rating: 5, text: "My diabetes is completely reversed after mini gastric bypass. Dr. Awais Malik explained everything so patiently before the procedure.", time: "1 week ago" },
  { id: 5, name: "Ibrahim Hassan", initial: "I", bgColor: "bg-teal-600", rating: 5, text: "Amazing results! From 130 kg to 78 kg in just 10 months. Dr. Awais Malik and his team made the whole process incredibly smooth.", time: "2 months ago" },
  { id: 6, name: "Zainab Bibi", initial: "Z", bgColor: "bg-fuchsia-600", rating: 5, text: "The best surgeon in Lahore for weight loss surgery. Dr. Awais Malik's technique is perfect with minimal scarring. Highly recommended!", time: "5 days ago" },
  { id: 7, name: "Khalid Mehmood", initial: "K", bgColor: "bg-indigo-600", rating: 5, text: "I was scared of surgery but Dr. Awais Malik's calm demeanor and immense expertise put me at ease. Now 40 kg lighter and much healthier.", time: "3 weeks ago" },
  { id: 8, name: "Maryem Ali", initial: "M", bgColor: "bg-red-500", rating: 5, text: "Excellent experience at Fatima Memorial Hospital. Dr. Awais Malik performed my revision surgery successfully. He is truly a life saver.", time: "6 months ago" },
  { id: 9, name: "Nabeel Ahmed", initial: "N", bgColor: "bg-cyan-600", rating: 5, text: "After years of failed diets, bariatric surgery was my last hope. Dr. Awais Malik made it possible. Lost 55 kg and kept it off.", time: "1 month ago" },
  { id: 10, name: "Amna Farooq", initial: "A", bgColor: "bg-emerald-600", rating: 5, text: "Dr. Awais Malik is the most caring doctor I've met. He treats every patient like family. My sleeve surgery was a huge success.", time: "2 weeks ago" },
  { id: 11, name: "Qasim Raza", initial: "Q", bgColor: "bg-violet-600", rating: 5, text: "From 145 kg to 85 kg! Dr. Awais Malik's skill and the hospital staff's support made this journey possible. Forever grateful to them.", time: "3 months ago" },
  { id: 12, name: "Saba Hussain", initial: "S", bgColor: "bg-amber-600", rating: 5, text: "Had my hernia repaired along with weight loss surgery. Dr. Awais Malik handled both procedures expertly without any complications.", time: "1 week ago" },
  { id: 13, name: "Salman Iqbal", initial: "S", bgColor: "bg-orange-600", rating: 5, text: "The follow-up care is what sets Dr. Awais Malik apart. Monthly check-ups and professional diet guidance helped me maintain my stats.", time: "2 months ago" },
  { id: 14, name: "Tariq Jameel", initial: "T", bgColor: "bg-lime-600", rating: 5, text: "My wife and I both had surgery with Dr. Awais Malik. Together we've lost over 100 kg! Our family life has transformed beautifully.", time: "1 day ago" },
  { id: 15, name: "Hira Shahzad", initial: "H", bgColor: "bg-sky-600", rating: 5, text: "Professional, skilled, and compassionate. Dr. Awais Malik answered all my questions patiently before surgery. Results are outstanding.", time: "3 weeks ago" },
  { id: 16, name: "Waseem Akram", initial: "W", bgColor: "bg-stone-600", rating: 5, text: "Top-notch facilities and setup. Dr. Awais Malik's laparoscopic surgery was quick, clean, and completely painless. Highly professional atmosphere.", time: "4 days ago" },
  { id: 17, name: "Nida Yasir", initial: "N", bgColor: "bg-pink-500", rating: 5, text: "Highly satisfied with my gastric band procedure. Dr. Awais Malik's counseling before and after the surgery was incredibly detailed and helpful.", time: "1 month ago" },
  { id: 18, name: "Kamran Khan", initial: "K", bgColor: "bg-neutral-600", rating: 5, text: "Dr. Awais Malik's expertise in advanced laparoscopic techniques is unmatchable. The post-op care protocol was pristine and safe.", time: "3 weeks ago" },
  { id: 19, name: "Fariha Batool", initial: "F", bgColor: "bg-rose-600", rating: 5, text: "I am amazed by the weight loss transformation. Dr. Awais Malik gave me my confidence and healthy active lifestyle back. Thank you so much!", time: "2 months ago" },
  { id: 20, name: "Zeeshan Ali", initial: "Z", bgColor: "bg-orange-500", rating: 5, text: "Phenomenal weight loss results. Dropped 40 kg in less than a year. The guidance provided by Dr. Awais Malik at every stage was superb.", time: "10 days ago" },
];

function GoogleWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

export function TestimonialsPriority() {
  const [expandedReviews, setExpandedReviews] = useState<{ [key: number]: boolean }>({});

  const toggleReadMore = (id: number) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-[#F8FAFC] py-5 w-full">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* GOOGLE BRANDING HEADER */}
        <div className="flex flex-col items-center text-center mb-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-white shadow-sm border border-gray-100 px-5 py-2 rounded-full text-sm font-semibold text-gray-900">
            <span>Excellent on</span>
            <GoogleWordmark className="font-bold tracking-tight" />
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
            <p className="text-gray-700 text-sm font-semibold">
              <span className="font-bold text-base text-gray-900">4.9</span> out of 5 based on 20
              reviews
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight pt-2">
            What Our Patients Say
          </h2>
        </div>

        {/* STATIC REVIEW GRID */}
        <div className="grid grid-cols-1 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 items-start">
          {reviewsData.map((review) => {
            const isExpanded = !!expandedReviews[review.id];
            return (
              <div
                key={review.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm transition-all duration-200"
              >
                <div>
                  {/* Header: Avatar, Name & Verified Badge */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`w-9 h-9 ${review.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}
                    >
                      {review.initial}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-1">
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                          {review.name}
                        </h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853] fill-[#34A853] shrink-0" />
                      </div>
                      <div className="flex space-x-0.5 mt-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#FBBC05] text-[#FBBC05]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p
                    className={
                      "text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 " +
                      (isExpanded ? "" : "line-clamp-4")
                    }
                  >
                    &quot;{review.text}&quot;
                  </p>
                </div>

                {/* Card Footer */}
                <div>
                  <button
                    onClick={() => toggleReadMore(review.id)}
                    className="text-[#4285F4] hover:underline font-bold text-xs mb-2 cursor-pointer block text-left"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-[10px] text-gray-400 font-semibold">
                    <span>{review.time}</span>
                    <GoogleWordmark className="font-bold tracking-tight text-[9px]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
