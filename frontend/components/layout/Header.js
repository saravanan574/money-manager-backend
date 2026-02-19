
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Menu, Bell, UserCircle } from 'lucide-react';

export default function Header({ isProtected = false, onToggleSidebar }) {
  const { user, logout } = useAuth();

  const PublicHeader = () => (
    <nav className="flex items-center justify-between p-4">
      <Link href="/" className="text-xl font-bold">SPEI</Link>
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-gray-600 hover:text-primary-blue">Home</Link>
        <Link href="/about" className="text-gray-600 hover:text-primary-blue">About</Link>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/login"><Button variant="outline">Login</Button></Link>
        <Link href="/register"><Button>Register</Button></Link>
      </div>
    </nav>
  );

  const ProtectedHeader = () => (
     <nav className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 rounded-md hover:bg-gray-100 ">
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/dashboard" className="text-xl font-bold">SPEI</Link>
      </div>
      <div className="hidden md:flex items-center gap-6">
         <Link href="/dashboard" className="text-gray-600 hover:text-primary-blue">Dashboard</Link>
         <Link href="/" className="text-gray-600 hover:text-primary-blue">Home</Link>
         <Link href="/about" className="text-gray-600 hover:text-primary-blue">About</Link>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </button>
        {/* Placeholder for Profile Dropdown */}
        <div className="relative">
          <button onClick={logout} className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
            <UserCircle className="h-6 w-6" />
            <span className="hidden md:inline text-sm font-medium">{user?.name}</span>
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      {user || isProtected ? <ProtectedHeader /> : <PublicHeader />}
    </header>
  );
}
