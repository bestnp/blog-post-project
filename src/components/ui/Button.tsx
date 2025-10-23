import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brown-300 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-brown-600 shadow-sm hover:bg-brown-400 active:bg-brown-500 disabled:bg-brown-600/40 !text-white disabled:!text-white",
        secondary:
          "bg-transparent border border-brown-400 shadow-sm hover:bg-transparent hover:border-brown-400 disabled:bg-transparent disabled:border-brown-600/40 !text-brown-600 hover:!text-brown-400 active:!text-brown-500 disabled:!text-brown-600/40",
        text:
          "bg-transparent underline underline-offset-4 !text-brown-600 hover:!text-brown-400 active:!text-brown-500 disabled:!text-brown-600/40",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4 text-[14px]",
        sm: "h-8 px-4 py-1 has-[>svg]:px-3 text-[12px]",
        lg: "h-12 px-8 py-3 has-[>svg]:px-6 text-[16px]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }

