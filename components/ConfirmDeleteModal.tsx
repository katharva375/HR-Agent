import React, { useEffect } from 'react';
import CloseIcon from './icons/CloseIcon';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string | null;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm, employeeName }) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <div
        className="relative flex flex-col bg-[#172736] text-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-[#2e4e6b]">
          <h2 id="confirm-delete-title" className="text-xl font-bold">Confirm Deletion</h2>
          <button
            onClick={onClose}
            className="text-[#8daece] hover:text-white transition-colors"
            aria-label="Close confirmation"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="p-6 space-y-4">
          <p id="confirm-delete-description" className="text-[#8daece] text-sm sm:text-base">
            Are you sure you want to delete "{employeeName || 'this record'}"? This action cannot be undone.
          </p>
        </div>

        <footer className="flex justify-end items-center gap-3 p-4 bg-[#0f1a2470] border-t border-t-[#2e4e6b]">
          <button
            onClick={onClose}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-gray-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-red-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
