'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { LayoutDashboard, Mail, CheckSquare, Trophy, Clock, Calendar, Users, Settings, X } from 'lucide-react';

const menuItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Placement', href: '/dashboard/placement', icon: Mail },
  { name: 'Applied', href: '/dashboard/applied', icon: CheckSquare },
  { name: 'Shortlist', href: '/dashboard/shortlist', icon: Trophy },
  { name: 'Deadlines', href: '/dashboard/deadlines', icon: Clock },
  { name: 'Events', href: '/dashboard/events', icon: Calendar },
  { name: 'Community', href: '/dashboard/community', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Dark overlay — mobile only, clicking closes sidebar */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col border-r border-gray-200 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo + Close button */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
          <h2 className="text-2xl font-bold text-blue-600 tracking-tight">SPEI</h2>
          {/* Close button visible on BOTH mobile and desktop */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    // Close sidebar on mobile only when navigating
                    onClick={() => {
                      if (window.innerWidth < 1024) setIsOpen(false);
                    }}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all group',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'h-5 w-5 shrink-0 transition-colors',
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                      )}
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 text-xs text-gray-400 text-center shrink-0">
          SPEI © {new Date().getFullYear()}
        </div>
      </aside>
    </>
  );
}