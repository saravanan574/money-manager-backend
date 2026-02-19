
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import RegisterForm from '@/components/auth/RegisterForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

export default function RegisterPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Your SPEI Account</CardTitle>
            <CardDescription>Join to start managing your placement journey intelligently.</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
            <p>
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary-blue hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
