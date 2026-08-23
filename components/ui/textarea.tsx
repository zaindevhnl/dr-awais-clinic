import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-base leading-relaxed text-foreground shadow-xs",
        "transition-[border-color,box-shadow,background-color] duration-150 ease-[var(--ease-out-soft)] outline-none",
        "placeholder:text-muted-foreground/80",
        "hover:border-border-strong",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35",
        "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/25",
        "md:text-sm dark:bg-input/25 dark:disabled:bg-input/60",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
