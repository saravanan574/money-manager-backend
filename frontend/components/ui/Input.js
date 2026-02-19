
'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Input({ label, name, type = 'text', register, error, required, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-medium leading-none">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500 ring-red-500' : ''
          )}
          {...register(name)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
