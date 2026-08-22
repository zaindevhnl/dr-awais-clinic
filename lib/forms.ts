/** Shared shape returned by every form Server Action. */
export type FormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export const EMPTY_STATE: FormState = { ok: false };

/** Short, human-quotable reference derived from an appointment id. */
export function referenceFor(id: string) {
  return `APT-${id.slice(0, 8).toUpperCase()}`;
}
