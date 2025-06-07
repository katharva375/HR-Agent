
import React, { useState, useEffect, useRef } from 'react';
import AcmeLogoIcon from './icons/AcmeLogoIcon';
import BellIcon from './icons/BellIcon';
import SearchBar from './SearchBar';

interface HeaderProps {
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchTermChange }) => {
  const avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ35XRMoc17Bt9KaM1XiotdPTWoxoH9ilOOowrP9VSVWP9k3hrkQ2aAZdmsvUMBmx2A-LzM4UsHZq4eArs44Plvl11JIGAa4vtyf_X6EStKYk57xIcmeAWItHM1Gd3mCTbb-dPjOmH9aBf1iS0kKmWUD8hjw5q55aDOAurR0vEnxTD75U84KrudYWT515yOmZkx6W03VcfHeI0pbKBhMS0b0hn-cnsEBIr8lR9UyNEw6mTp-4fCyz3r1Q3icFgR1XwnE-cc1Skse9U";
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isProfileDropdownOpen &&
        avatarButtonRef.current && !avatarButtonRef.current.contains(event.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleExpertConfigClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default anchor behavior
    window.location.href = "/expert-configuration.html"; // Navigate programmatically
    setIsProfileDropdownOpen(false); // Close dropdown
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#20364b] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <AcmeLogoIcon className="w-full h-full text-white" />
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Acme Co</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <SearchBar 
          placeholder="Search" 
          value={searchTerm} 
          onChange={onSearchTermChange} 
          className="min-w-40 !h-10 max-w-64"
          inputHeight="h-10"
        />
        <button
          className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#20364b] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#2e4e6b] transition-colors"
          aria-label="Notifications"
        >
          <BellIcon className="text-white" />
        </button>
        <div className="relative">
          <button
            ref={avatarButtonRef}
            onClick={toggleProfileDropdown}
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f1a24] focus:ring-[#359dff]"
            style={{ backgroundImage: `url("${avatarUrl}")` }}
            aria-label="Open user menu"
            aria-expanded={isProfileDropdownOpen}
            aria-haspopup="true"
            id="user-menu-button"
          >
          </button>
          {isProfileDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-[#20364b] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <div className="py-1" role="none">
                <a
                  href="#" // Placeholder for Profile action
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2e4e6b] hover:text-white transition-colors"
                  role="menuitem"
                  id="user-menu-item-0"
                  onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown on click
                >
                  Profile
                </a>
                <a
                  href="/expert-configuration.html" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2e4e6b] hover:text-white transition-colors"
                  role="menuitem"
                  id="user-menu-item-1"
                  onClick={handleExpertConfigClick} 
                >
                  Expert Configuration
                </a>
                <a
                  href="#" // Placeholder for Settings action
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2e4e6b] hover:text-white transition-colors"
                  role="menuitem"
                  id="user-menu-item-2"
                  onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown on click
                >
                  Settings
                </a>
                <a
                  href="#" // Placeholder for Sign Out action
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2e4e6b] hover:text-white transition-colors"
                  role="menuitem"
                  id="user-menu-item-3"
                  onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown on click
                >
                  Sign Out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
