
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterButton from './components/FilterButton';
import EmployeeTable from './components/EmployeeTable';
import Pagination from './components/Pagination';
import EmployeeDetailModal from './components/EmployeeDetailModal'; // Import the modal
import ConfirmDeleteModal from './components/ConfirmDeleteModal'; // Import the new confirmation modal
import { Employee } from './types';
import { ITEMS_PER_PAGE, FILTER_BUTTONS_CONFIG } from './constants';
import { supabase } from './lib/supabaseClient';

const App: React.FC = () => {
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for EmployeeDetailModal
  const [selectedEmployeeForModal, setSelectedEmployeeForModal] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailLoading, setIsModalDetailLoading] = useState(false);

  // State for ConfirmDeleteModal
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [employeeToDeleteInfo, setEmployeeToDeleteInfo] = useState<{ id: string; name: string } | null>(null);

  const N8N_WEBHOOK_URL_DELETE = 'http://localhost:5678/webhook/delete-record';

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from('Resume_data')
          .select('id, name, email, summary, overall_scoring, quick_read')
          .not('final_status', 'eq', 2); // Filter records where final_status is not 2

        if (supabaseError) {
          throw supabaseError;
        }

        if (data) {
          const transformedData: Employee[] = data.map((item: any) => ({
            id: String(item.id),
            fullName: item.name,
            email: item.email,
            summary: item.summary,
            scoring: item.overall_scoring,
            quickRead: item.quick_read,
          }));
          setEmployees(transformedData);
        } else {
          setEmployees([]);
        }
      } catch (err: any) {
        console.error('Supabase fetch error (raw object):', err); 
        let detailedError = "An critical error occurred while fetching employee data. This is often due to an incorrect Supabase configuration.";
        
        const genericKeyWarning = " This strongly indicates an issue with your Supabase API key. PLEASE VERIFY that you have replaced the placeholder for 'SUPABASE_ANON_KEY' in your index.html file with your ACTUAL public anonymous key from your Supabase project dashboard.";

        if (err && typeof err === 'object' && err.message) {
            detailedError = `Error: ${err.message}.`;
            if (String(err.message).toLowerCase().includes('jwt') || 
                String(err.message).toLowerCase().includes('unauthorized') || 
                String(err.message).toLowerCase().includes('api key') ||
                String(err.message).toLowerCase().includes('anon key') ||
                String(err.message).toLowerCase().includes('service_role')) { 
                detailedError += genericKeyWarning;
            } else if (String(err.message).toLowerCase().includes('relation') && String(err.message).toLowerCase().includes('does not exist')) {
                detailedError += " This might mean the table 'Resume_data' or one of its queried/filtered columns (like 'id', 'name', 'email', 'summary', 'overall_scoring', 'quick_read', or 'final_status') does not exist. Please check your Supabase table schema and the column names in the query.";
            } else if (String(err.message).toLowerCase().includes('column') && String(err.message).toLowerCase().includes('does not exist') && String(err.message).toLowerCase().includes('final_status')) {
                detailedError += " The 'final_status' column used for filtering does not exist in the 'Resume_data' table. Please check your Supabase schema.";
            }
        } else if (err && typeof err === 'string' && (err.toLowerCase().includes('key') || err.toLowerCase().includes('auth'))) {
             detailedError = `An unexpected error occurred: ${String(err)}.` + genericKeyWarning;
        } else if (err) {
            detailedError = `An unexpected error occurred: ${String(err)}.`;
        }
        
        detailedError += "\nFor more technical details, please check your browser's developer console (press F12 and go to the Console tab). If the console warning about 'YOUR_ACTUAL_SUPABASE_PUBLIC_ANON_KEY_MUST_BE_PLACED_HERE' is visible, that is the primary issue to resolve.";
        setError(detailedError);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filterAndSortEmployees = useCallback(() => {
    let currentEmployees = [...employees];

    if (tableSearchTerm) {
      const lowerSearchTerm = tableSearchTerm.toLowerCase();
      currentEmployees = currentEmployees.filter(
        (emp) =>
          emp.fullName.toLowerCase().includes(lowerSearchTerm) ||
          emp.email.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    if (headerSearchTerm) {
        const lowerHeaderSearchTerm = headerSearchTerm.toLowerCase();
        currentEmployees = currentEmployees.filter(
            (emp) =>
              emp.fullName.toLowerCase().includes(lowerHeaderSearchTerm) ||
              emp.email.toLowerCase().includes(lowerHeaderSearchTerm) ||
              (emp.summary && emp.summary.toLowerCase().includes(lowerHeaderSearchTerm)) || 
              (emp.quickRead && emp.quickRead.toLowerCase().includes(lowerHeaderSearchTerm)) 
          );
    }

    setFilteredEmployees(currentEmployees);
    if (tableSearchTerm || headerSearchTerm) { 
        setCurrentPage(1);
    }

  }, [employees, tableSearchTerm, headerSearchTerm]); 

  useEffect(() => {
    filterAndSortEmployees();
  }, [filterAndSortEmployees]);
  
  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE));
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    } else if (currentPage === 0 && newTotalPages > 0) { 
      setCurrentPage(1);
    }
  }, [filteredEmployees.length, currentPage]);


  const handleHeaderSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderSearchTerm(event.target.value);
  };

  const handleTableSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableSearchTerm(event.target.value);
  };

  const handleOpenModal = async (employeeFromTable: Employee) => {
    setSelectedEmployeeForModal(employeeFromTable); 
    setIsModalOpen(true);
    setIsModalDetailLoading(true);
    setError(null); 

    try {
      const { data, error: supabaseError } = await supabase
        .from('Resume_data')
        .select('id, name, email, summary, overall_scoring, quick_read, email_content, detailed_scoring, cv')
        .eq('id', employeeFromTable.id)
        .not('final_status', 'eq', 2) // Also filter here for consistency
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      if (data) {
        let parsedDetailedScoring: Record<string, number | string> | undefined = undefined;
        if (data.detailed_scoring) {
          try {
            if (typeof data.detailed_scoring === 'string') {
                parsedDetailedScoring = JSON.parse(data.detailed_scoring);
            } else if (typeof data.detailed_scoring === 'object') {
                parsedDetailedScoring = data.detailed_scoring;
            }
          } catch (parseError) {
            console.error('Failed to parse detailed_scoring JSON:', parseError);
          }
        }

        setSelectedEmployeeForModal(prev => ({
          id: String(data.id),
          fullName: data.name,
          email: data.email,
          summary: data.summary,
          scoring: data.overall_scoring,
          quickRead: data.quick_read,
          emailContent: data.email_content,
          detailedScoring: parsedDetailedScoring,
          cvUrl: data.cv,
        }));
      } else {
         // This can happen if the record's final_status became 2 after list load, or if ID is simply not found.
         setError(`Could not find details for employee ID: ${employeeFromTable.id}, or the record no longer meets display criteria (e.g., final_status might have changed).`);
         // Keep the modal open to show this error, but clear details
          setSelectedEmployeeForModal(prev => prev ? {...prev, emailContent: undefined, detailedScoring: undefined, cvUrl: undefined, quickRead: 'Details not available or record status changed.'} : null);
      }
    } catch (err: any) {
      console.error('Error fetching employee details for modal:', err);
      const genericKeyWarning = " This strongly indicates an issue with your Supabase API key. PLEASE VERIFY that you have replaced the placeholder for 'SUPABASE_ANON_KEY' in your index.html file with your ACTUAL public anonymous key from your Supabase project dashboard.";
      let modalError = `Failed to load details: ${err.message}.`;
      if (err && typeof err === 'object' && err.message && 
         (String(err.message).toLowerCase().includes('jwt') || 
          String(err.message).toLowerCase().includes('unauthorized') || 
          String(err.message).toLowerCase().includes('api key') ||
          String(err.message).toLowerCase().includes('anon key') ||
          String(err.message).toLowerCase().includes('service_role'))) {
          modalError += genericKeyWarning;
      } else if (String(err.message).toLowerCase().includes('column') && String(err.message).toLowerCase().includes('does not exist') && String(err.message).toLowerCase().includes('final_status')) {
          modalError += " The 'final_status' column used for filtering details does not exist in the 'Resume_data' table. Please check your Supabase schema.";
      }
      modalError += "\nPlease check the browser console for more specific error messages from Supabase.";
      setError(modalError);
    } finally {
      setIsModalDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployeeForModal(null);
    setIsModalDetailLoading(false); 
    setError(null); 
  };

  const handleInitiateDelete = (employeeId: string, employeeName: string) => {
    setEmployeeToDeleteInfo({ id: employeeId, name: employeeName });
    setIsConfirmDeleteModalOpen(true);
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setEmployeeToDeleteInfo(null);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDeleteInfo) return;

    const { id: employeeId, name: employeeName } = employeeToDeleteInfo;

    try {
      // Note: This frontend delete assumes the N8N webhook handles DB deletion.
      // The record will be removed from UI optimistically.
      // If Supabase RLS prevents deletion of `final_status=2` items and that's desired,
      // then this optimistic UI update is fine.
      // If the webhook *also* checks final_status, that's fine too.
      // The main point is that `final_status=2` items are not *fetched* initially.
      const response = await fetch(`${N8N_WEBHOOK_URL_DELETE}?id=${encodeURIComponent(employeeId)}`, {
        method: 'GET',
      });
      if (response.ok) {
        setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
        // Success notification can be added here if desired
      } else {
        let errorMsg = `Failed to delete ${employeeName}. Webhook responded with status: ${response.status}.`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMsg += ` Message: ${errorData.message}`;
          }
        } catch (e) { /* Response might not be JSON */ }
        alert(errorMsg); // Or use a more sophisticated notification system
      }
    } catch (error) {
      console.error('Error calling delete webhook:', error);
      alert(`An error occurred while trying to delete ${employeeName}. Please check the console or network tab for details.`);
    } finally {
      handleCloseConfirmDeleteModal();
    }
  };

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE));
  const paginatedEmployees = filteredEmployees.length > 0 ? filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) : [];

  if (loading && !employees.length) { 
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f1a24] text-white text-xl">
        Loading data...
      </div>
    );
  }

  if (error && !isModalOpen && !isConfirmDeleteModalOpen) { // Ensure error doesn't show if a modal is open
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#0f1a24] text-red-400 text-lg p-6 text-center">
        <p className="font-bold text-xl mb-3">Failed to Load Employee Data</p>
        <p className="text-base whitespace-pre-line">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#0f1a24] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header searchTerm={headerSearchTerm} onSearchTermChange={handleHeaderSearchChange} />
        <main className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between items-center gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight">Employee Records</h1>
                <p className="text-[#8daece] text-sm font-normal leading-normal">Manage and review employee information efficiently.</p>
              </div>
            </div>

            <div className="px-4 py-3">
              <SearchBar 
                placeholder="Search by name or email" 
                value={tableSearchTerm} 
                onChange={handleTableSearchChange}
                className="w-full h-12"
                inputHeight="h-12"
              />
            </div>

            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {FILTER_BUTTONS_CONFIG.map(filter => (
                <FilterButton key={filter.id} label={filter.label} onClick={() => {/* Implement filter logic */}}/>
              ))}
            </div>
            
            {loading && employees.length > 0 && <div className="text-center text-white p-4">Updating employee list...</div>}
            
            <EmployeeTable 
                employees={paginatedEmployees} 
                onViewMore={handleOpenModal}
                onInitiateDelete={handleInitiateDelete} 
            />
            
            {totalPages > 1 && paginatedEmployees.length > 0 && (
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                />
            )}
          </div>
        </main>
      </div>
      <EmployeeDetailModal 
        employee={selectedEmployeeForModal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isDetailLoading={isModalDetailLoading}
        error={isModalOpen ? error : null} 
      />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={handleCloseConfirmDeleteModal}
        onConfirm={handleConfirmDelete}
        employeeName={employeeToDeleteInfo?.name || null}
      />
    </div>
  );
};

export default App;
