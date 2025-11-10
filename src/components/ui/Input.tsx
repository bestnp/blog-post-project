import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { EyeLight, EyeSlashLight } from "@/icon/IconsAll";

type InputState = "default" | "focus" | "error" | "completed" | "disabled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  errorText?: string;
  state?: InputState;
  showSearchIcon?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
  containerClassName?: string;
  labelClassName?: string;
  helpTextClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = "text", 
    label,
    helpText,
    errorText,
    state = "default",
    showSearchIcon = true,
    showClearButton = true,
    onClear,
    containerClassName,
    labelClassName,
    helpTextClassName,
    value,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    
    const isDisabled = state === "disabled" || props.disabled;
    const isError = state === "error";
    const isCompleted = state === "completed";
    const isFocusedState = state === "focus" || (isFocused && state === "default");
    
    const handleClear = () => {
      onClear?.();
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const getInputStyles = () => {
      const baseStyles = "h-10 w-full rounded-md border bg-white px-3 py-2 text-current outline-none transition-colors";
      
      if (isDisabled) {
        return cn(
          baseStyles,
          "border-0 bg-brown-200 text-brown-400 placeholder:text-brown-400/40",
          "cursor-not-allowed"
        );
      }
      
      if (isError) {
        return cn(
          baseStyles,
          "border-red text-red placeholder:text-red-400",
          "focus:border-red focus:ring-2 focus:ring-red-200"
        );
      }
      
      if (isFocusedState) {
        return cn(
          baseStyles,
          "border-brown-400 text-brown-400 placeholder:text-brown-400",
          "focus:border-brown-400 focus:ring-2 focus:ring-brown-200"
        );
      }
      
      if (isCompleted) {
        return cn(
          baseStyles,
          "border-brown-300 text-gray-900 placeholder:text-brown-500",
          "focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
        );
      }
      
      // Default state
      return cn(
        baseStyles,
        "border-brown-300 text-gray-900 placeholder:text-brown-400",
        "focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
      );
    };

    const getLabelStyles = () => {
      if (isDisabled) {
        return "text-brown-400/40";
      }
      return "text-brown-400";
    };

    const getHelpTextStyles = () => {
      if (isError) {
        return "text-red";
      }
      if (isDisabled) {
        return "text-brown-400/40";
      }
      return "text-brown-400";
    };

    const getIconColor = () => {
      if (isDisabled) return "text-brown-400/40";
      return "text-brown-400";
    };

    return (
      <div className={cn("space-y-1", containerClassName)}>
        {label && (
          <label className={cn("text-body-lg font-medium", getLabelStyles(), labelClassName)}>
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isDisabled}
            className={cn(
              getInputStyles(),
              showSearchIcon && type !== "password" && !isPassword && "pl-10",
              (showClearButton && value && !isPassword) && "pr-10",
              isPassword && "pr-10",
              className
            )}
            {...props}
          />
          
          {showSearchIcon && type !== "password" && !isPassword && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Search className={cn("h-4 w-4", getIconColor())} />
            </div>
          )}
          
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={cn(
                "absolute right-3 top-1/2 transform -translate-y-1/2",
                "hover:text-brown-600 transition-colors cursor-pointer",
                "bg-transparent border-none outline-none",
                "focus:outline-none focus:ring-0"
              )}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashLight className="w-5 h-5" currentColor="currentColor" />
              ) : (
                <EyeLight className="w-5 h-5" currentColor="currentColor" />
              )}
            </button>
          )}
          
          {showClearButton && value && !isDisabled && !isPassword && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                "absolute right-3 top-1/2 transform -translate-y-1/2",
                "hover:bg-gray-100 rounded-sm p-1 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-gray-200"
              )}
            >
              <X className={cn("h-4 w-4", getIconColor())} />
            </button>
          )}
        </div>
        
        {(helpText || errorText) && (
          <p className={cn("text-xs", getHelpTextStyles(), helpTextClassName)}>
            {isError ? errorText : helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

