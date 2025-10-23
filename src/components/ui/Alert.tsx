import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 pr-10",
  {
    variants: {
      variant: {
        default: "bg-white text-brown-600 border-brown-200",
        success: "bg-green text-white border-green",
        error: "bg-red text-white border-red",
        warning: "bg-orange text-white border-orange",
        info: "bg-blue-500 text-white border-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  message?: string
  showCloseButton?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

function Alert({
  className,
  variant,
  title,
  message,
  showCloseButton = true,
  onClose,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      role="alert"
      {...props}
    >
      {title && (
        <h3 className="text-lg font-bold mb-2">
          {title}
        </h3>
      )}
      
      {message && (
        <p className="text-sm leading-relaxed">
          {message}
        </p>
      )}
      
      {children}
      
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-current rounded-sm"
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

// AlertGroup component for managing multiple alerts
interface AlertGroupProps {
  children: React.ReactNode
  className?: string
  maxAlerts?: number
}

function AlertGroup({ children, className, maxAlerts }: AlertGroupProps) {
  const alerts = React.Children.toArray(children)
  const displayAlerts = maxAlerts ? alerts.slice(0, maxAlerts) : alerts

  return (
    <div className={cn("space-y-4", className)}>
      {displayAlerts}
    </div>
  )
}

export { Alert, AlertGroup, alertVariants }
