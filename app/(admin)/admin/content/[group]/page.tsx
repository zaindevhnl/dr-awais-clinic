import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ContentForm } from "@/components/admin/content-form";
import { GROUPS, GROUP_BY_KEY, getContent, getContentStatus } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/admin/content/[group]">): Promise<Metadata> {
  const { group } = await params;
  return { title: GROUP_BY_KEY.get(group)?.title ?? "Website text" };
}

export function generateStaticParams() {
  return GROUPS.map((group) => ({ group: group.key }));
}

/** Where to look at the result of an edit. */
const PREVIEW: Record<string, string> = {
  Home: "/",
  About: "/about",
  Gallery: "/gallery",
  Videos: "/videos",
  "Every page": "/",
  "Several pages": "/",
};

export default async function ContentGroupPage({
  params,
}: PageProps<"/admin/content/[group]">) {
  const { group: key } = await params;
  const group = GROUP_BY_KEY.get(key);
  if (!group) notFound();

  const [value, status] = await Promise.all([
    getContent(key),
    getContentStatus(),
  ]);
  const edited = status.find((entry) => entry.key === key)?.edited ?? false;

  return (
    <>
      <Link
        href="/admin/content"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All website text
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold">{group.title}</h1>
        <p className="mt-2 text-muted-foreground">{group.description}</p>
        <a
          href={PREVIEW[group.page] ?? "/"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          View this page
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </header>

      <ContentForm group={group} value={value} edited={edited} />
    </>
  );
}
