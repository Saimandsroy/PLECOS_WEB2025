'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function RoleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isInstructor = pathname.startsWith('/instructor');

  const switchRole = () => {
    const target = isInstructor ? '/' : '/instructor';
    router.push(target);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
        <span className="text-sm font-medium">{isInstructor ? 'Instructor' : 'Learner'}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
          <button
            onClick={() => {
              switchRole();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Switch to {isInstructor ? 'Learner' : 'Instructor'}
          </button>
          <div className="border-t my-1" />
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
