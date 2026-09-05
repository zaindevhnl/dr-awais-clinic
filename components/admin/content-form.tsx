"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveContentGroup, resetContentGroup } from "@/app/actions/content";
import { EMPTY_STATE } from "@/lib/forms";
import type { Field, Group } from "@/lib/content/registry";

type Item = Record<string, string>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      <Save className="size-4" aria-hidden="true" />
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

/** A repeating block — cards, reasons, qualifications, hospitals. */
function ItemsField({
  field,
  initial,
}: {
  field: Extract<Field, { type: "items" }>;
  initial: Item[];
}) {
  const blank = (): Item =>
    Object.fromEntries(field.fields.map((sub) => [sub.name, ""])) as Item;
  const [items, setItems] = useState<Item[]>(initial.length > 0 ? initial : [blank()]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{field.label}</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setItems((current) => [...current, blank()])}
        >
          <Plus className="size-4" aria-hidden="true" />
          Add {field.itemLabel.toLowerCase()}
        </Button>
      </div>
      {field.help && <p className="text-sm text-muted-foreground">{field.help}</p>}

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                {field.itemLabel} {index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`Remove ${field.itemLabel} ${index + 1}`}
                onClick={() => setItems((current) => current.filter((_, i) => i !== index))}
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {field.fields.map((sub) => {
                const name = `${field.name}.${index}.${sub.name}`;
                return (
                  <div
                    key={sub.name}
                    className={sub.type === "textarea" ? "sm:col-span-2" : undefined}
                  >
                    <Label htmlFor={name} className="mb-1.5 text-sm">
                      {sub.label}
                    </Label>
                    {sub.type === "textarea" ? (
                      <Textarea
                        id={name}
                        name={name}
                        rows={3}
                        defaultValue={item[sub.name] ?? ""}
                      />
                    ) : (
                      <Input id={name} name={name} defaultValue={item[sub.name] ?? ""} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContentForm({
  group,
  value,
  edited,
}: {
  group: Group;
  value: Record<string, unknown>;
  edited: boolean;
}) {
  const [state, formAction] = useActionState(saveContentGroup, EMPTY_STATE);

  return (
    <div className="space-y-6">
      {state.ok && (
        <p
          role="status"
          className="flex items-center gap-2 rounded-xl border border-success/30 bg-success-subtle px-4 py-3 text-sm font-medium"
        >
          <CheckCircle2 className="size-4" aria-hidden="true" />
          Saved. The website is updated.
        </p>
      )}
      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive-subtle px-4 py-3 text-sm font-medium"
        >
          {state.error}
        </p>
      )}

      <form action={formAction} className="space-y-8">
        <input type="hidden" name="__key" value={group.key} />

        {group.fields.map((field) => {
          if (field.type === "items") {
            return (
              <ItemsField
                key={field.name}
                field={field}
                initial={(value[field.name] as Item[]) ?? []}
              />
            );
          }

          const raw = value[field.name];
          const defaultValue =
            field.type === "lines"
              ? ((raw as string[]) ?? []).join("\n")
              : ((raw as string) ?? "");

          return (
            <div key={field.name}>
              <Label htmlFor={field.name} className="mb-1.5">
                {field.label}
              </Label>
              {field.type === "text" ? (
                <Input id={field.name} name={field.name} defaultValue={defaultValue} />
              ) : (
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={field.type === "lines" ? 6 : 4}
                  defaultValue={defaultValue}
                />
              )}
              {field.help && (
                <p className="mt-1.5 text-sm text-muted-foreground">{field.help}</p>
              )}
            </div>
          );
        })}

        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
          <SubmitButton />
          <p className="text-sm text-muted-foreground">
            Changes appear on the website immediately.
          </p>
        </div>
      </form>

      {edited && (
        <form action={resetContentGroup} className="border-t border-border pt-6">
          <input type="hidden" name="__key" value={group.key} />
          <Button type="submit" variant="outline" size="sm">
            <RotateCcw className="size-4" aria-hidden="true" />
            Restore the original wording
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Discards your edits to this section and puts back the text the site shipped with.
          </p>
        </form>
      )}
    </div>
  );
}
