export function FieldError({
  id,
  messages,
}: {
  id: string;
  messages?: string[];
}) {
  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className="min-h-5 text-sm font-medium text-destructive"
    >
      {messages?.[0] ?? ""}
    </p>
  );
}
