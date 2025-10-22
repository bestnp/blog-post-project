import React from "react";

interface CloseRoundLightProps {
  className?: string;
}

const CloseRoundLight: React.FC<CloseRoundLightProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M18 6L6 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6L18 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default CloseRoundLight;

