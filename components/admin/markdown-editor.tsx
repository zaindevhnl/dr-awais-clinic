"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/** Write/preview markdown editor. Preview uses the same sanitizer as the site. */
export function MarkdownEditor({
  name,
  label,
  defaultValue = "",
  rows = 18,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  rows?: number;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Tabs defaultValue="write" className="mt-1.5">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <Textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="font-mono text-sm"
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Markdown supported: ## headings, **bold**, _italic_, lists, links.
          </p>
        </TabsContent>

        <TabsContent value="preview">
          <div className="prose-clinic min-h-40 rounded-md border border-border p-5">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {value || "_Nothing to preview yet._"}
            </ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
