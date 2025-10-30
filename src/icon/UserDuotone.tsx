import React from "react";

interface IconProps {
  width?: number | string;
  height?: number | string;
  currentColor?: string;
  className?: string;
}

const UserDuotone: React.FC<IconProps & React.SVGProps<SVGSVGElement>> = ({
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
      <path d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471" stroke={currentColor} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="4" stroke={currentColor} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};

export default UserDuotone;
