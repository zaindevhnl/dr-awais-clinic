import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

/**
 * Renders admin-authored markdown. rehype-raw allows inline HTML, and
 * rehype-sanitize (running after it) strips anything unsafe — order matters.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-clinic text-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
