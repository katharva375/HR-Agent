
import React from 'react';
import { Employee } from '../types';
import TrashIcon from './icons/TrashIcon';

interface EmployeeTableProps {
  employees: Employee[];
  onViewMore: (employee: Employee) => void;
  onInitiateDelete: (employeeId: string, employeeName: string) => void; // Changed from onDelete
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onViewMore, onInitiateDelete }) => {
  const tableId = "e7ac1815-64cf-493f-80be-a3f6b816f8ca";

  return (
    <div className="px-4 py-3 @container">
      <div className="flex overflow-x-auto rounded-xl border border-[#2e4e6b] bg-[#0f1a24]">
        <table className="flex-1 min-w-full">
          <thead>
            <tr className="bg-[#172736]">
              <th className={`table-${tableId}-column-120 px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[30%]`}>Full Name</th>
              <th className={`table-${tableId}-column-240 px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[25%]`}>Email Address</th>
              <th className={`table-${tableId}-column-360 px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[20%]`}>Summary</th>
              <th className={`table-${tableId}-column-480 px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[10%]`}>Scoring</th>
              <th className={`table-${tableId}-column-720 px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[15%]`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-t border-t-[#2e4e6b]">
                <td className={`table-${tableId}-column-120 h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal`}>{employee.fullName}</td>
                <td className={`table-${tableId}-column-240 h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal break-all`}>{employee.email}</td>
                <td className={`table-${tableId}-column-360 h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal`}>{employee.summary}</td>
                <td className={`table-${tableId}-column-480 h-[72px] px-4 py-2 text-sm font-normal leading-normal`}>
                  <button
                    className="flex min-w-[70px] max-w-[480px] cursor-default items-center justify-center overflow-hidden rounded-xl h-8 px-3 bg-[#20364b] text-white text-sm font-medium leading-normal w-full"
                    aria-label={`Scoring: ${employee.scoring}`}
                  >
                    <span className="truncate">{employee.scoring}</span>
                  </button>
                </td>
                <td 
                  className={`table-${tableId}-column-720 h-[72px] px-4 py-2 text-sm leading-normal`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      onClick={() => onViewMore(employee)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewMore(employee);}}
                      role="button"
                      tabIndex={0}
                      aria-label={`View more details for ${employee.fullName}`}
                      className="text-[#8daece] hover:text-white transition-colors cursor-pointer font-bold tracking-[0.015em]"
                    >
                      View More
                    </span>
                    <button
                      onClick={() => onInitiateDelete(employee.id, employee.fullName)}
                      className="p-1 rounded-md text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-colors"
                      aria-label={`Delete record for ${employee.fullName}`}
                      title="Delete record"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
             {employees.length === 0 && (
              <tr className="border-t border-t-[#2e4e6b]">
                <td colSpan={5} className="h-[72px] px-4 py-2 text-center text-[#8daece] text-sm">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{`
        @container (max-width: 720px) { .table-${tableId}-column-720 { display: none; } }
        @container (max-width: 480px) { .table-${tableId}-column-480 { display: none; } }
        @container (max-width: 360px) { .table-${tableId}-column-360 { display: none; } }
        @container (max-width: 240px) { .table-${tableId}-column-240 { display: none; } }
        @container (max-width: 120px) { .table-${tableId}-column-120 { display: none; } }
      `}</style>
    </div>
  );
};

export default EmployeeTable;
