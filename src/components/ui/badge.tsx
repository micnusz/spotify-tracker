import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        free: `
    border-transparent 
    bg-[#1DB954] 
    text-white 
    [a&]:hover:bg-[#1ED760]
    dark:bg-[#1DB954]/90
    dark:[a&]:hover:bg-[#1DB954]
    focus-visible:ring-[#1DB954]/20
    dark:focus-visible:ring-[#1DB954]/40
  `,
        premium: `
    border-transparent 
    bg-gradient-to-r 
    from-[#9B51E0] 
    to-[#E87BF8] 
    text-white 
    [a&]:hover:from-[#9B51E0]/90 
    [a&]:hover:to-[#E87BF8]/90
    dark:from-[#9B51E0]/90 
    dark:to-[#E87BF8]/90
    dark:[a&]:hover:from-[#9B51E0] 
    dark:[a&]:hover:to-[#E87BF8]
    focus-visible:ring-[#9B51E0]/20
    dark:focus-visible:ring-[#9B51E0]/40
  `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
