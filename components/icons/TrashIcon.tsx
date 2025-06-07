
import React from 'react';

interface IconProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

const TrashIcon: React.FC<IconProps> = ({ className = "w-5 h-5", width = "20", height = "20" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={width} 
    height={height} 
    fill="currentColor" 
    viewBox="0 0 256 256" 
    className={className}
    aria-hidden="true" // Assuming the button using it will have an aria-label
  >
    <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
  </svg>
);

export default TrashIcon;
