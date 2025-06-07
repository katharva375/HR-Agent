
import React from 'react';

interface IconProps {
  width?: string;
  height?: string;
  className?: string;
}

const CaretDownIcon: React.FC<IconProps> = ({ width = "20px", height = "20px", className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
  </svg>
);

export default CaretDownIcon;
