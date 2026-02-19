
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/utils/validation';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Login successful! Redirecting...');
      // AuthContext handles redirection
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input label="Email" name="email" type="email" register={register} error={errors.email} required />
      <Input label="Password" name="password" type="password" register={register} error={errors.password} required />
      <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
    </form>
  );
}
