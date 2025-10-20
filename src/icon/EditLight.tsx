import React from "react";

const EditLight = ({ width = 24, height = 24, color = "currentColor", className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M3 6C3 5.05719 3 4.58579 3.29289 4.29289C3.58579 4 4.05719 4 5 4H8.64593C9.30174 4 9.62965 4 9.8836 4.17193C10.1375 4.34387 10.2593 4.64832 10.5029 5.25722L10.9029 6.25722C11.4 7.49991 11.6485 8.12126 11.351 8.56063C11.0536 9 10.3844 9 9.04593 9H6.5H17C18.8856 9 19.8284 9 20.4142 9.58579C21 10.1716 21 11.1144 21 13V16C21 17.8856 21 18.8284 20.4142 19.4142C19.8284 20 18.8856 20 17 20H7C5.11438 20 4.17157 20 3.58579 19.4142C3 18.8284 3 17.8856 3 16V6Z" stroke="currentColor" strokeLinejoin="round"/>
  </svg>
);

export default EditLight;

