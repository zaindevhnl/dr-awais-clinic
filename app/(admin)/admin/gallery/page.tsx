import type { Metadata } from "next";
import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GalleryUploader } from "@/components/admin/gallery-uploader";
import { SectionCreateForm } from "@/components/admin/gallery-section-form";
import { requireAdmin } from "@/lib/auth";
import { deleteImage, deleteSection, updateImage, updateSection } from "@/app/actions/gallery";

export const metadata: Metadata = { title: "Gallery" };

type SectionRow = {
  id: string;
  title: string;
  description: string | null;
  display_order: number;
  is_published: boolean;
};

type ImageRow = {
  id: string;
  section_id: string | null;
  src: string;
  caption: string;
  width: number | null;
  height: number | null;
  display_order: number;
  is_published: boolean;
  storage_path: string | null;
};

export default async function AdminGalleryPage() {
  const { supabase } = await requireAdmin();

  const [{ data: sectionData, error }, { data: imageData }] = await Promise.all([
    supabase
      .from("gallery_sections")
      .select("id, title, description, display_order, is_published")
      .order("display_order", { ascending: true }),
    supabase
      .from("gallery_images")
      .select("id, section_id, src, caption, width, height, display_order, is_published, storage_path")
      .order("display_order", { ascending: true }),
  ]);

  // The tables arrive with migration 0006; say so rather than showing a blank page.
  if (error?.code === "42P01") {
    return (
      <>
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="mt-4 rounded-xl border border-warning/30 bg-warning-subtle px-4 py-3">
          The gallery tables do not exist in this database yet. Apply migration{" "}
          <code>0006_gallery.sql</code>, then reload this page.
        </p>
      </>
    );
  }

  const sections = (sectionData as SectionRow[] | null) ?? [];
  const images = (imageData as ImageRow[] | null) ?? [];
  const unsorted = images.filter((image) => !image.section_id);

  return (
    <>
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="mt-2 text-muted-foreground">
            {images.length} photograph{images.length === 1 ? "" : "s"} in {sections.length}{" "}
            section{sections.length === 1 ? "" : "s"}. Cards on the website take the shape of
            the photograph, so portrait and landscape both sit correctly.
          </p>
        </div>
        <a
          href="/gallery"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          View the gallery
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </header>

      <div className="space-y-8">
        <GalleryUploader sections={sections.map((s) => ({ id: s.id, title: s.title }))} />

        <SectionCreateForm />

        {sections.map((section) => {
          const own = images.filter((image) => image.section_id === section.id);
          return (
            <section key={section.id} className="rounded-2xl border border-border bg-card p-5">
              {/* Section settings */}
              <form action={updateSection} className="mb-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
                <input type="hidden" name="id" value={section.id} />
                <div>
                  <Label htmlFor={`title-${section.id}`} className="mb-1.5 text-sm">
                    Section name
                  </Label>
                  <Input id={`title-${section.id}`} name="title" defaultValue={section.title} />
                </div>
                <div>
                  <Label htmlFor={`desc-${section.id}`} className="mb-1.5 text-sm">
                    Description
                  </Label>
                  <Input
                    id={`desc-${section.id}`}
                    name="description"
                    defaultValue={section.description ?? ""}
                  />
                </div>
                <div className="w-24">
                  <Label htmlFor={`order-${section.id}`} className="mb-1.5 text-sm">
                    Order
                  </Label>
                  <Input
                    id={`order-${section.id}`}
                    name="display_order"
                    type="number"
                    defaultValue={section.display_order}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <label className="flex h-11 items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="is_published"
                      defaultChecked={section.is_published}
                      className="size-4"
                    />
                    Visible
                  </label>
                  <Button type="submit" variant="outline">
                    Save
                  </Button>
                </div>
              </form>

              {/* Images */}
              {own.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No photographs in this section yet.
                </p>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {own.map((image) => (
                    <li key={image.id} className="rounded-xl border border-border bg-background p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt=""
                        className="mb-3 h-40 w-full rounded-lg object-cover"
                      />
                      <p className="mb-2 text-xs text-muted-foreground">
                        {image.width && image.height
                          ? `${image.width}×${image.height}${image.width > image.height ? " · landscape" : image.height > image.width ? " · portrait" : " · square"}`
                          : "size unknown"}
                        {!image.storage_path && " · ships with the site"}
                      </p>

                      <form action={updateImage} className="space-y-2">
                        <input type="hidden" name="id" value={image.id} />
                        <Input
                          name="caption"
                          defaultValue={image.caption}
                          placeholder="Caption (optional)"
                          aria-label="Caption"
                        />
                        <div className="flex gap-2">
                          <select
                            name="section_id"
                            defaultValue={image.section_id ?? ""}
                            aria-label="Section"
                            className="h-10 flex-1 rounded-lg border border-input bg-background px-2 text-sm"
                          >
                            <option value="">Unsorted</option>
                            {sections.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                          <Input
                            name="display_order"
                            type="number"
                            defaultValue={image.display_order}
                            aria-label="Order"
                            className="w-20"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              name="is_published"
                              defaultChecked={image.is_published}
                              className="size-4"
                            />
                            Visible
                          </label>
                          <Button type="submit" size="sm" variant="outline">
                            Save
                          </Button>
                        </div>
                      </form>

                      <form action={deleteImage} className="mt-2">
                        <input type="hidden" name="id" value={image.id} />
                        <Button
                          type="submit"
                          size="sm"
                          variant="ghost"
                          className="w-full text-destructive"
                        >
                          <Trash2 className="size-3.5" aria-hidden="true" />
                          Remove
                        </Button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}

              <form action={deleteSection} className="mt-5 border-t border-border pt-4">
                <input type="hidden" name="id" value={section.id} />
                <Button type="submit" size="sm" variant="ghost" className="text-destructive">
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  Delete this section
                </Button>
                <span className="ml-2 text-xs text-muted-foreground">
                  Photographs are kept and moved to Unsorted.
                </span>
              </form>
            </section>
          );
        })}

        {unsorted.length > 0 && (
          <section className="rounded-2xl border border-dashed border-border bg-card p-5">
            <h2 className="mb-1 text-lg font-semibold">Unsorted</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              These are not in a section, so they do not appear on the website. Assign each one
              a section to publish it.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {unsorted.map((image) => (
                <li key={image.id} className="rounded-xl border border-border bg-background p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.src} alt="" className="mb-3 h-40 w-full rounded-lg object-cover" />
                  <form action={updateImage} className="flex gap-2">
                    <input type="hidden" name="id" value={image.id} />
                    <input type="hidden" name="is_published" value="on" />
                    <select
                      name="section_id"
                      aria-label="Move to section"
                      className="h-10 flex-1 rounded-lg border border-input bg-background px-2 text-sm"
                    >
                      {sections.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <Button type="submit" size="sm" variant="outline">
                      Move
                    </Button>
                  </form>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
