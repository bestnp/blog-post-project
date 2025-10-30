import React from "react";

interface IconProps {
  width?: number | string;
  height?: number | string;
  currentColor?: string;
  className?: string;
}

const CloseRoundLight: React.FC<IconProps & React.SVGProps<SVGSVGElement>> = ({
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
      <path d="M18 6L6 18" stroke={currentColor} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke={currentColor} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default CloseRoundLight;
