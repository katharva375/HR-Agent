
import React from 'react';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputHeight?: string; // e.g. "h-10", "h-12"
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange, className = "min-w-40 max-w-64", inputHeight = "h-10" }) => {
  return (
    <label className={`flex flex-col ${className} ${inputHeight}`}>
      <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
        <div className="text-[#8daece] flex border-none bg-[#20364b] items-center justify-center pl-4 rounded-l-xl border-r-0">
          <MagnifyingGlassIcon />
        </div>
        <input
          placeholder={placeholder}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#20364b] focus:border-none h-full placeholder:text-[#8daece] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
          value={value}
          onChange={onChange}
        />
      </div>
    </label>
  );
};

export default SearchBar;
