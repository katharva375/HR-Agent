
import React, { useEffect } from 'react';
import { Employee } from '../types';
import CloseIcon from './icons/CloseIcon';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  isDetailLoading: boolean;
  error?: string | null; // To display fetch errors for modal details
}

const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ employee, isOpen, onClose, isDetailLoading, error }) => {
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

  if (!isOpen || !employee) {
    return null;
  }

  const avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuA16NlhYOZ961bo5W0Z28O5t0_73hsPblPhapkdquta8k3vU0UtzSZSQs2ahSnJqvAQV-UIfDa1l5abCPEpryrPIhnYGbUiXce1VfzM_F4oeHue8UfJJiOyrPjrsEQiEVd6SvtuT6ncLfAdWwp-AzhIvgLaXBEWTUxqvOuzbPzeaq_UE4qDII0M5S0PexFhMxjEajqiq6mJk8uTbNN350cUKoMthHRPrBt6j61-bsuHMI-OCA4p1zlm-tRiJd7rIE4xpIXNAQEDYV_H";

  const renderDetailedScores = () => {
    if (!employee.detailedScoring || Object.keys(employee.detailedScoring).length === 0) {
      return <p className="text-[#8daece] text-sm sm:text-base">Detailed scores not available.</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        {Object.entries(employee.detailedScoring).map(([label, score]) => (
          <div key={label} className="flex flex-col gap-1 border-t border-solid border-t-[#2e4e6b] py-3">
            <p className="text-[#8daece] text-xs sm:text-sm font-normal leading-normal">{label}</p>
            <p className="text-white text-sm sm:text-base font-normal leading-normal">{String(score)}</p>
          </div>
        ))}
      </div>
    );
  };
  
  const getResumeButtonText = () => {
    if (isDetailLoading && !employee.cvUrl) return "Loading Resume...";
    if (employee.cvUrl) return "View Resume";
    return "Resume Not Available";
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose} 
      role="dialog"
      aria-modal="true"
      aria-labelledby="employee-detail-title"
      aria-describedby="employee-detail-description"
    >
      <div 
        className="relative flex flex-col bg-[#172736] text-white w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} 
      >
        <header className="flex items-center justify-between p-4 border-b border-[#2e4e6b]">
          <h2 id="employee-detail-title" className="text-xl font-bold">Candidate Details</h2>
          <button 
            onClick={onClose} 
            className="text-[#8daece] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Profile Header */}
          <div className="flex flex-col @container sm:flex-row sm:items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24 sm:min-h-32 sm:w-32 flex-shrink-0"
              style={{ backgroundImage: `url("${avatarUrl}")` }}
              role="img"
              aria-label={`${employee.fullName}'s avatar`}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-white text-xl sm:text-[22px] font-bold leading-tight tracking-[-0.015em]">{employee.fullName}</p>
              <p className="text-[#8daece] text-sm sm:text-base font-normal leading-normal">Applied for Senior Software Engineer</p>
            </div>
          </div>

          {/* Contact Information */}
          <section>
            <h3 className="text-white text-lg sm:text-[22px] font-bold leading-tight tracking-[-0.015em] mb-3">Contact Information</h3>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6 border-t border-t-[#2e4e6b] py-4">
              <p className="text-[#8daece] text-sm font-normal leading-normal">Email Address</p>
              <p className="text-white text-sm font-normal leading-normal break-all">{employee.email}</p>
            </div>
          </section>

          {/* Quick Read */}
          <section>
            <h3 className="text-white text-lg sm:text-[22px] font-bold leading-tight tracking-[-0.015em] mb-1">Quick Read</h3>
            <p id="employee-detail-description" className="text-white text-sm sm:text-base font-normal leading-normal">
              {isDetailLoading && !employee.quickRead ? 'Loading...' : (employee.quickRead || 'No quick read available.')}
            </p>
          </section>

          {/* Overall Scoring */}
          <section>
            <h3 className="text-white text-lg sm:text-[22px] font-bold leading-tight tracking-[-0.015em] mb-1">Overall Scoring</h3>
            <p className="text-white text-sm sm:text-base font-normal leading-normal">
                {isDetailLoading && typeof employee.scoring !== 'number' ? 'Loading...' : employee.scoring}
            </p>
          </section>
          
          {/* Message */}
          <section>
            <h3 className="text-white text-lg sm:text-[22px] font-bold leading-tight tracking-[-0.015em] mb-1">Message</h3>
            <p className="text-white text-sm sm:text-base font-normal leading-normal">
              {isDetailLoading && !employee.emailContent ? 'Loading message...' : (employee.emailContent || 'No message available.')}
            </p>
          </section>

          {/* Summary */}
          <section>
            <h3 className="text-white text-lg sm:text-[22px] font-bold leading-tight tracking-[-0.015em] mb-1">Summary</h3>
            <p className="text-white text-sm sm:text-base font-normal leading-normal">
             {isDetailLoading && !employee.summary ? 'Loading...' : (employee.summary || 'No summary available.')}
            </p>
          </section>

          {/* Detailed Scoring */}
          <section>
            <h3 className="text-white text-lg sm:text-[22px] font-bold leading-tight tracking-[-0.015em] mb-3">Detailed Scoring</h3>
            {isDetailLoading && !employee.detailedScoring ? <p className="text-[#8daece] text-sm sm:text-base">Loading scores...</p> : renderDetailedScores()}
          </section>

          {/* View Resume Button */}
          <div className="flex pt-3 justify-start">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#359dff] text-[#0f1a24] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#5cb0ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                if (employee.cvUrl) {
                  window.open(employee.cvUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              disabled={isDetailLoading || !employee.cvUrl}
            >
              <span className="truncate">{getResumeButtonText()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;
