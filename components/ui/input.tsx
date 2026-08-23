import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * 44px control height to match Button and clear the tap-target
 * minimum. Font stays at 17px on small screens so iOS never
 * zooms the viewport on focus.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3.5 py-2 text-base text-foreground shadow-xs",
        "transition-[border-color,box-shadow,background-color] duration-150 ease-[var(--ease-out-soft)] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "placeholder:text-muted-foreground/80",
        "hover:border-border-strong",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/35",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/25",
        "md:text-sm dark:bg-input/25 dark:disabled:bg-input/60",
        className
      )}
      {...props}
    />
  )
}

export { Input }
