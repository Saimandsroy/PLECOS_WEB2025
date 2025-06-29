'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function RoleSwitcher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="text-sm font-medium">Options</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-md z-50">
          <button
            onClick={() => {
              router.push('/profile');
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Profile
          </button>
          <div className="border-t my-1" />
          <button
            onClick={() => {
              router.push('/instructor');
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Switch Role
          </button>
        </div>
      )}
    </div>
  );
}
