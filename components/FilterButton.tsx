
import React from 'react';
import CaretDownIcon from './icons/CaretDownIcon';

interface FilterButtonProps {
  label: string;
  onClick?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, onClick }) => {
  return (
    <button 
      className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#20364b] pl-4 pr-2 hover:bg-[#2e4e6b] transition-colors"
      onClick={onClick}
    >
      <p className="text-white text-sm font-medium leading-normal">{label}</p>
      <CaretDownIcon className="text-white" />
    </button>
  );
};

export default FilterButton;
