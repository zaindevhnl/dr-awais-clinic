"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/forms/field-error";
import { saveSettings } from "@/app/actions/admin";
import { EMPTY_STATE } from "@/lib/forms";
import type { SiteSettings } from "@/types/database.types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Saving…" : "Save settings"}
    </Button>
  );
}

const TEXT_FIELDS: { name: keyof SiteSettings; label: string; type?: string }[] = [
  { name: "clinic_name", label: "Clinic name" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "whatsapp", label: "WhatsApp number", type: "tel" },
  { name: "email", label: "Email", type: "email" },
  { name: "facebook_url", label: "Facebook URL", type: "url" },
  { name: "instagram_url", label: "Instagram URL", type: "url" },
  { name: "linkedin_url", label: "LinkedIn URL", type: "url" },
];

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useActionState(saveSettings, EMPTY_STATE);

  return (
    <form action={formAction} className="mt-8 grid gap-6">
      <Card>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {TEXT_FIELDS.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                defaultValue={(settings[field.name] as string) ?? ""}
                className="mt-1.5"
              />
              <FieldError
                id={`${field.name}-error`}
                messages={state.fieldErrors?.[field.name]}
              />
            </div>
          ))}

          <div className="sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              rows={2}
              defaultValue={settings.address ?? ""}
              className="mt-1.5"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4">
          <h2 className="text-xl font-semibold">Home page hero</h2>
          <div>
            <Label htmlFor="hero_headline">Headline</Label>
            <Input
              id="hero_headline"
              name="hero_headline"
              defaultValue={settings.hero_headline ?? ""}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="hero_subheadline">Sub-headline</Label>
            <Textarea
              id="hero_subheadline"
              name="hero_subheadline"
              rows={2}
              defaultValue={settings.hero_subheadline ?? ""}
              className="mt-1.5"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Map embed</h2>
          <Label htmlFor="google_maps_embed" className="mt-4 block">
            Google Maps embed code
          </Label>
          <Textarea
            id="google_maps_embed"
            name="google_maps_embed"
            rows={4}
            defaultValue={settings.google_maps_embed ?? ""}
            placeholder='<iframe src="https://www.google.com/maps/embed?…"></iframe>'
            className="mt-1.5 font-mono text-sm"
          />
          <p className="mt-1 text-sm text-muted-foreground">
            Paste the full &lt;iframe&gt; from Google Maps → Share → Embed a map.
          </p>
        </CardContent>
      </Card>

      {state.error ? (
        <p role="alert" className="font-medium text-destructive">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p role="status" className="font-medium text-primary">
          Settings saved.
        </p>
      ) : null}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
