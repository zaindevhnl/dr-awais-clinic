import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow mb-4",
            align === "center" ? "justify-center" : "",
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-6 bg-primary/50"
          />
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "measure mt-5 text-lg text-muted-foreground",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
