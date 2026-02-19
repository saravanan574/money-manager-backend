'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // default open on load

  // Only auto-close on mobile on initial load
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []); // runs once on mount only — never overrides toggle after that

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-gray-50">

        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main content shifts right on desktop when sidebar is open */}
        <div
          className={`
            flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'}
          `}
        >
          <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

          <main className="flex-grow p-4 md:p-6 lg:p-8 mt-16">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

      </div>
    </ProtectedRoute>
  );
}

export default DashboardLayout;