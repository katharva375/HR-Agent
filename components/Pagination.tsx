
import React from 'react';
import CaretLeftIcon from './icons/CaretLeftIcon';
import CaretRightIcon from './icons/CaretRightIcon';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <=3) {
        endPage = Math.min(totalPages -1, 3);
    }
    if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    pageNumbers.push(totalPages);
  }


  return (
    <div className="flex items-center justify-center p-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex size-10 items-center justify-center text-white disabled:text-gray-500 hover:bg-[#20364b] rounded-full transition-colors"
      >
        <CaretLeftIcon />
      </button>
      {pageNumbers.map((num, index) => (
        typeof num === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(num)}
            className={`text-sm leading-normal flex size-10 items-center justify-center rounded-full transition-colors
              ${currentPage === num 
                ? 'font-bold bg-[#20364b] text-white' 
                : 'font-normal text-white hover:bg-[#20364b]'
              }`}
          >
            {num}
          </button>
        ) : (
          <span key={index} className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full">
            {num}
          </span>
        )
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex size-10 items-center justify-center text-white disabled:text-gray-500 hover:bg-[#20364b] rounded-full transition-colors"
      >
        <CaretRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
