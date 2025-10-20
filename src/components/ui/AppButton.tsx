import React from "react";
import { clsx } from "clsx";

export type AppButtonVariant = "default" | "secondary" | "ghost" | "selected";

type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: AppButtonVariant;
};

export default function AppButton({
  variant = "default",
  className,
  children,
  ...props
}: AppButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[8px] px-[20px] py-[12px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<AppButtonVariant, string> = {
    default: "bg-black text-brown-100 hover:bg-black/90",
    secondary: "bg-brown-300 shadow hover:bg-brown-300/80",
    ghost: "text-brown-600 text-body-sm bg-transparent hover:bg-gray-100",
    selected: "bg-brown-300 text-brown-600 text-body-sm shadow hover:bg-brown-300/80",
  };
  

  return (
    <button className={clsx(base, className, variants[variant])} {...props}>
      {children}
    </button>
  );
}
