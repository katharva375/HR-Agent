
import React from 'react';

interface IconProps {
  width?: string;
  height?: string;
  className?: string;
}

const CaretRightIcon: React.FC<IconProps> = ({ width = "18px", height = "18px", className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
  </svg>
);

export default CaretRightIcon;
