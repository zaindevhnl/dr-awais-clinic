"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { recordImage } from "@/app/actions/gallery";
import { EMPTY_STATE } from "@/lib/forms";

type Section = { id: string; title: string };
type Status = { name: string; state: "uploading" | "done" | "failed"; note?: string };

const MAX_BYTES = 15 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/** Reads the real pixel size so the public grid can shape each card to it. */
function measure(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ width: 0, height: 0 });
    };
    img.src = url;
  });
}

function safeName(name: string) {
  const dot = name.lastIndexOf(".");
  const ext = (dot > -1 ? name.slice(dot + 1) : "jpg").toLowerCase();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
}

/**
 * Uploads go from the browser straight to Supabase Storage: a Server Action
 * request is capped at 1MB, which no phone photograph respects. Storage writes
 * are admin-only under RLS, so the session doing the upload is still checked.
 */
export function GalleryUploader({ sections }: { sections: Section[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [sectionId, setSectionId] = useState(sections[0]?.id ?? "");
  const [busy, setBusy] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    setBusy(true);
    setError("");
    setStatuses(Array.from(files).map((f) => ({ name: f.name, state: "uploading" })));

    const supabase = createClient();

    for (const [index, file] of Array.from(files).entries()) {
      const mark = (state: Status["state"], note?: string) =>
        setStatuses((current) =>
          current.map((s, i) => (i === index ? { ...s, state, note } : s)),
        );

      if (!ACCEPTED.includes(file.type)) {
        mark("failed", "not a JPEG, PNG, WebP or AVIF");
        continue;
      }
      if (file.size > MAX_BYTES) {
        mark("failed", `${(file.size / 1048576).toFixed(1)}MB — over the 15MB limit`);
        continue;
      }

      try {
        const path = safeName(file.name);
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(path, file, { cacheControl: "31536000", upsert: false });

        if (uploadError) {
          mark("failed", uploadError.message);
          continue;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("gallery").getPublicUrl(path);
        const { width, height } = await measure(file);

        const form = new FormData();
        form.set("src", publicUrl);
        form.set("storage_path", path);
        form.set("section_id", sectionId);
        form.set("width", String(width));
        form.set("height", String(height));

        const result = await recordImage(EMPTY_STATE, form);
        if (!result.ok) {
          mark("failed", result.error ?? "could not be saved");
          continue;
        }

        mark("done", `${width}×${height}`);
      } catch (e) {
        mark("failed", e instanceof Error ? e.message : "upload failed");
      }
    }

    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold">Add photographs</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        JPEG, PNG, WebP or AVIF, up to 15MB each. Select several at once — the size of each
        picture is read automatically, and the website lays out every card at the
        photograph&apos;s own shape.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <Label htmlFor="upload-section" className="mb-1.5">
            Add to section
          </Label>
          <select
            id="upload-section"
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            disabled={sections.length === 0}
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            {sections.length === 0 && <option value="">Create a section first</option>}
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="button"
          size="lg"
          disabled={busy || sections.length === 0}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ImagePlus className="size-4" aria-hidden="true" />
          )}
          {busy ? "Uploading…" : "Choose photographs"}
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {statuses.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm">
          {statuses.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              {s.state === "uploading" && (
                <Loader2 className="size-3.5 shrink-0 animate-spin text-muted-foreground" aria-hidden="true" />
              )}
              {s.state === "done" && (
                <CheckCircle2 className="size-3.5 shrink-0 text-success" aria-hidden="true" />
              )}
              {s.state === "failed" && (
                <span className="size-3.5 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
              )}
              <span className="truncate">{s.name}</span>
              {s.note && (
                <span
                  className={
                    "text-xs " +
                    (s.state === "failed" ? "text-destructive" : "text-muted-foreground")
                  }
                >
                  {s.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
