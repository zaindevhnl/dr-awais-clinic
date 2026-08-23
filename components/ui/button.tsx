import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Sizes are built on the 8px grid and default to a 44px control so
 * every button clears the WCAG 2.5.5 tap-target minimum on its own.
 * `sm`/`xs` paint smaller but keep a 44px hit area via `tap-safe`.
 *
 * State coverage: default · hover · active · focus-visible · disabled
 * · loading (`loading` prop sets aria-busy and swaps in a spinner).
 */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-lg border border-transparent bg-clip-padding",
    "font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)]",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-55 disabled:shadow-none",
    "data-[loading=true]:pointer-events-none",
    "aria-invalid:border-destructive aria-invalid:outline-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.15em]",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover hover:shadow-sm active:bg-primary-active",
        /** Reserved for the single highest-intent action on a view. */
        cta: "bg-cta text-cta-foreground shadow-sm hover:brightness-[1.06] hover:shadow-md active:brightness-95",
        outline:
          "border-border-strong bg-background text-foreground shadow-xs hover:border-primary/45 hover:bg-accent hover:text-accent-foreground active:bg-accent/80 aria-expanded:bg-accent dark:bg-input/25 dark:hover:bg-input/40",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_7%)] active:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_12%)]",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80 aria-expanded:bg-accent dark:hover:bg-muted/60",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:brightness-110 active:brightness-95 focus-visible:outline-destructive",
        link: "h-auto px-0 text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary",
      },
      size: {
        /** 44px — the default, meets the tap-target minimum unaided. */
        default: "h-11 px-5 text-sm",
        xs: "tap-safe h-7 rounded-md px-2.5 text-caption [&_svg:not([class*='size-'])]:size-3.5",
        sm: "tap-safe h-9 rounded-md px-3.5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base sm:text-lg",
        icon: "size-11",
        "icon-xs": "tap-safe size-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "tap-safe size-9 rounded-md",
        "icon-lg": "size-12",
      },
      block: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  block,
  asChild = false,
  loading = false,
  loadingText,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Shows a spinner, blocks interaction, and sets aria-busy. */
    loading?: boolean
    /** Announced in place of the label while loading. */
    loadingText?: string
  }) {
  const Comp = asChild ? Slot.Root : "button"

  // `asChild` renders a foreign element (often a Link), so the spinner
  // is only injected when this component owns its own markup.
  const content =
    loading && !asChild ? (
      <>
        <Loader2 className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
        <span>{loadingText ?? children}</span>
      </>
    ) : (
      children
    )

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={asChild ? undefined : disabled || loading}
      className={cn(buttonVariants({ variant, size, block, className }))}
      {...props}
    >
      {content}
    </Comp>
  )
}

export { Button, buttonVariants }
