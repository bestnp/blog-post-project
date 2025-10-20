import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-current placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-brown-300",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;

