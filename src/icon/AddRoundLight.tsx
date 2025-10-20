import React from "react";

const AddRoundLight = ({
  width = 48,
  height = 48,
  color = "currentColor",
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
<path d="M12 6L12 18" stroke="currentColor" strokeLinecap="round"/>
<path d="M18 12L6 12" stroke="currentColor" strokeLinecap="round"/>
</svg>

);

export default AddRoundLight;
