import React, { useState } from "react";
import { cn } from "@/lib/utils";

type TextAreaState = "default" | "focus" | "completed";

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled'> {
  label?: string;
  helpText?: string;
  errorText?: string;
  state?: TextAreaState;
  containerClassName?: string;
  labelClassName?: string;
  helpTextClassName?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    className, 
    label,
    helpText,
    errorText,
    state = "default",
    containerClassName,
    labelClassName,
    helpTextClassName,
    value,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [textareaValue, setTextareaValue] = useState(value || "");
    
    const isError = !!errorText;
    const isCompleted = state === "completed";
    const isFocusedState = state === "focus" || (isFocused && state === "default");
    
    const getTextAreaStyles = () => {
      const baseStyles = "min-h-[100px] w-full rounded-[8px] border bg-white px-5 py-4 pb-8 pr-8 text-current outline-none transition-colors resize-y";
      
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
      return "text-brown-400";
    };

    const getHelpTextStyles = () => {
      if (isError) {
        return "text-red";
      }
      return "text-brown-400";
    };

    return (
      <div className={cn("space-y-1", containerClassName)}>
        {label && (
          <label className={cn("text-body-lg font-medium", getLabelStyles(), labelClassName)}>
            {label}
          </label>
        )}
        
        <div className="textarea-resize-hint">
          <textarea
            ref={ref}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              getTextAreaStyles(),
              className
            )}
            {...props}
          />
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

TextArea.displayName = "TextArea";

export default TextArea;

