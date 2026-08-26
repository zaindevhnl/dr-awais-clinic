"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";

type LocalComment = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  parentId?: string;
  replies?: LocalComment[];
};

/**
 * Comments are kept in the visitor's own browser, exactly as in the reference
 * design — there is no comments table behind the site.
 */
export function BlogComments({ postId }: { postId: string }) {
  const [localComments, setLocalComments] = useState<LocalComment[]>([]);
  const [replyToComment, setReplyToComment] = useState<LocalComment | null>(null);

  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [commentError, setCommentError] = useState("");
  const [commentSuccess, setCommentSuccess] = useState(false);

  const storageKey = `blog_comments_${postId}`;

  // localStorage is client-only: the thread is loaded once the component is
  // mounted, then reset whenever the reader moves to a different article.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setLocalComments(saved ? (JSON.parse(saved) as LocalComment[]) : []);
    } catch {
      setLocalComments([]);
    }
    setReplyToComment(null);
    setCommentSuccess(false);
    setCommentError("");
  }, [storageKey]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const persist = (comments: LocalComment[]) => {
    try {
      if (comments.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(comments));
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch {
      // Private-mode browsers can refuse storage; the thread still renders.
    }
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCommentError("");
    setCommentSuccess(false);

    if (!commentName.trim() || !commentEmail.trim() || !commentMessage.trim()) {
      setCommentError("Please fill in all fields before submitting.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(commentEmail.trim())) {
      setCommentError("Please enter a valid email address.");
      return;
    }

    const newComment: LocalComment = {
      id: `${Date.now()}`,
      name: commentName.trim(),
      email: commentEmail.trim(),
      message: commentMessage.trim(),
      date: new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      replies: [],
    };

    let updated: LocalComment[];
    if (replyToComment) {
      newComment.parentId = replyToComment.id;
      updated = localComments.map((comment) =>
        comment.id === replyToComment.id
          ? { ...comment, replies: [...(comment.replies ?? []), newComment] }
          : comment,
      );
      setReplyToComment(null);
    } else {
      updated = [newComment, ...localComments];
    }

    setLocalComments(updated);
    persist(updated);

    setCommentName("");
    setCommentEmail("");
    setCommentMessage("");
    setCommentSuccess(true);
  };

  const total = localComments.reduce((acc, curr) => acc + 1 + (curr.replies?.length ?? 0), 0);

  return (
    <>
      {/* Comments Thread Section */}
      <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-2">
        <h3 className="text-2xl sm:text-[32px] font-semibold text-[#1A1A1A]">
          Comments ({total})
        </h3>
        {localComments.length === 0 ? (
          <p className="text-gray-400 font-medium">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          <div className="space-y-6">
            {localComments.map((c) => (
              <div key={c.id} className="space-y-4">
                {/* Parent Comment */}
                <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[30px] border border-gray-50 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 bg-[#F4F9F8] flex items-center justify-center text-[#00A78E] font-semibold text-xl">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="space-y-2 flex-1 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="font-semibold text-[#1A1A1A] text-lg sm:text-xl">{c.name}</h4>
                      <button
                        onClick={() => {
                          setReplyToComment(c);
                          document
                            .getElementById("message-form")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-[#C1FF72] text-[#1A1A1A] px-5 sm:px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#00A78E] hover:text-white transition-all"
                      >
                        Reply
                      </button>
                    </div>
                    <p className="text-gray-400 font-semibold text-xs sm:text-sm">{c.date}</p>
                    <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                      {c.message}
                    </p>
                  </div>
                </div>

                {/* Nested Replies */}
                {c.replies && c.replies.length > 0 && (
                  <div className="pl-8 sm:pl-16 space-y-4">
                    {c.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="bg-white/70 p-5 sm:p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 relative"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#00A78E]/10 flex items-center justify-center text-[#00A78E] font-semibold text-base">
                          {reply.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-1 flex-1 w-full">
                          <h5 className="font-semibold text-[#1A1A1A] text-base">{reply.name}</h5>
                          <p className="text-gray-400 font-semibold text-[11px] sm:text-xs">
                            {reply.date}
                          </p>
                          <p className="text-gray-500 leading-relaxed text-sm">{reply.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Form */}
      <div
        id="message-form"
        className="bg-white p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-[40px] shadow-sm border border-gray-50 space-y-8 sm:space-y-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-2xl sm:text-[32px] font-semibold text-[#1A1A1A]">
            {replyToComment ? `Reply to ${replyToComment.name}` : "Write Your Message"}
          </h3>
          {replyToComment && (
            <button
              onClick={() => setReplyToComment(null)}
              className="flex items-center space-x-1 text-xs font-semibold text-red-500 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors w-max"
            >
              <span>Cancel Reply</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="space-y-6">
          <textarea
            value={commentMessage}
            onChange={(e) => setCommentMessage(e.target.value)}
            placeholder={replyToComment ? "Write your reply here..." : "Message here..."}
            aria-label="Your comment"
            rows={6}
            className="w-full px-6 sm:px-8 py-5 sm:py-6 bg-[#F9FAFB] rounded-2xl sm:rounded-[30px] border border-gray-100 focus:ring-2 focus:ring-[#00A78E] outline-none font-semibold text-gray-700 resize-none"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Your Name"
              aria-label="Your name"
              className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-[#F9FAFB] rounded-full border border-gray-100 focus:ring-2 focus:ring-[#00A78E] outline-none font-semibold text-gray-700"
            />
            <input
              type="email"
              value={commentEmail}
              onChange={(e) => setCommentEmail(e.target.value)}
              placeholder="Your Email"
              aria-label="Your email"
              className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-[#F9FAFB] rounded-full border border-gray-100 focus:ring-2 focus:ring-[#00A78E] outline-none font-semibold text-gray-700"
            />
          </div>

          {commentError && (
            <p className="text-red-500 text-sm font-semibold bg-red-50 px-4 py-3 rounded-xl">
              {commentError}
            </p>
          )}
          {commentSuccess && (
            <p className="text-[#00A78E] text-sm font-semibold bg-[#F4F9F8] px-4 py-3 rounded-xl">
              Your message has been posted.
            </p>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto justify-center bg-[#00A78E] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center hover:bg-[#1A1A1A] transition-all group"
          >
            {replyToComment ? "Post Reply" : "Post Comment"}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </>
  );
}
