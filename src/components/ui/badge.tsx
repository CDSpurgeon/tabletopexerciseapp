import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "cyber" | "operations" | "physical" | "leadership";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2",
        {
          "border-transparent bg-brand-navy text-white": variant === "default",
          "border-transparent bg-brand-light text-brand-text": variant === "secondary",
          "border-transparent bg-red-500 text-white": variant === "destructive",
          "text-brand-text border-brand-border": variant === "outline",
          "border-transparent bg-blue-100 text-blue-800": variant === "cyber",
          "border-transparent bg-amber-100 text-amber-800": variant === "operations",
          "border-transparent bg-red-100 text-red-800": variant === "physical",
          "border-transparent bg-purple-100 text-purple-800": variant === "leadership",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
