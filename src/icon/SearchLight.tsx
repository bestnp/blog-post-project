import React from "react";

interface IconProps {
  width?: number | string;
  height?: number | string;
  currentColor?: string;
  className?: string;
}

const SearchLight: React.FC<IconProps & React.SVGProps<SVGSVGElement>> = ({
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
      <circle cx="11" cy="11" r="6" stroke={currentColor} />
      <path d="M20 20L17 17" stroke={currentColor} strokeLinecap="round" />
    </svg>
  );
};

export default SearchLight;
