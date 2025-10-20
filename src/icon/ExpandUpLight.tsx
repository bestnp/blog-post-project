import React from "react";

const ExpandUpLight = ({ width = 24, height = 24, color = "currentColor", className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M18 15L12 9L6 15" stroke="currentColor"/>
  </svg>
);

export default ExpandUpLight;

