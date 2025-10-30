import React from "react";

interface IconProps {
  width?: number | string;
  height?: number | string;
  currentColor?: string;
  className?: string;
}

const NotebookLight: React.FC<IconProps & React.SVGProps<SVGSVGElement>> = ({
  width = 24,
  height = 24,
  currentColor = "currentColor",
  className,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect x="6" y="4" width="13" height="17" rx="2" stroke={currentColor} />
      <path d="M15 10V8" stroke={currentColor} strokeLinecap="round" />
      <path d="M4 9H8" stroke={currentColor} strokeLinecap="round" />
      <path d="M4 13H8" stroke={currentColor} strokeLinecap="round" />
      <path d="M4 17H8" stroke={currentColor} strokeLinecap="round" />
    </svg>
  );
};

export default NotebookLight;
