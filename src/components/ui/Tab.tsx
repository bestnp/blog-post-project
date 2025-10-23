import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tabVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] font-medium cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brown-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "text-brown-600 bg-transparent hover:bg-gray-100",
        active: "bg-brown-300 text-brown-600 shadow hover:bg-brown-300/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabVariants> {
  isActive?: boolean
  value?: string
}

function Tab({
  className,
  variant,
  isActive = false,
  value,
  children,
  ...props
}: TabProps) {
  return (
    <button
      data-slot="tab"
      data-value={value}
      className={cn(tabVariants({ variant: isActive ? "active" : "default", className }))}
      {...props}
    >
      {children}
    </button>
  )
}

// TabGroup component for managing multiple tabs
interface TabGroupProps {
  children: React.ReactNode
  className?: string
  orientation?: "horizontal" | "vertical"
}

function TabGroup({ children, className, orientation = "horizontal" }: TabGroupProps) {
  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row gap-2" : "flex-col gap-2",
        className
      )}
      role="tablist"
    >
      {children}
    </div>
  )
}

export { Tab, TabGroup, tabVariants }
