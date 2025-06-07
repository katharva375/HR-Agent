
import React from 'react';

interface IconProps {
  width?: string;
  height?: string;
  className?: string;
}

const CaretLeftIcon: React.FC<IconProps> = ({ width = "18px", height = "18px", className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
  </svg>
);

export default CaretLeftIcon;
