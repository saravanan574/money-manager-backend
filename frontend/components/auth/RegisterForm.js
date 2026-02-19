
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/utils/validation';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Convert year to number before sending
      const submissionData = {
        ...data,
        year: Number(data.year),
      };
      await registerUser(submissionData);
      toast.success('Registration successful! Redirecting...');
      // AuthContext will handle redirection
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const departmentOptions = [
      { value: 'CSE', label: 'Computer Science Engineering (CSE)' },
      { value: 'IT', label: 'Information Technology (IT)' },
      { value: 'ECE', label: 'Electronics and Communication Engineering (ECE)' },
      { value: 'MECH', label: 'Mechanical Engineering (MECH)' },
      { value: 'CIVIL', label: 'Civil Engineering (CIVIL)' },
      { value: 'EEE', label: 'Electrical Engineering (EEE)' },
      { value: 'CHEM', label: 'Chemical Engineering (CHEM)' },
      { value: 'BT', label: 'Biotechnology (BT)' },
      { value: 'Other', label: 'Other' },
  ];
  const degreeOptions = ['B.Tech', 'M.Tech', 'MCA', 'MBA', 'B.E', 'M.E', 'B.Sc', 'M.Sc'];
  const yearOptions = ['1', '2', '3', '4'];
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Required Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Full Name" name="name" register={register} error={errors.name} required />
        <Input label="Register Number" name="registerNumber" register={register} error={errors.registerNumber} required />
      </div>
      <Input label="College Name" name="college" register={register} error={errors.college} required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="degree"
          control={control}
          render={({ field }) => (
            <div className="grid w-full items-center gap-1.5">
               <label className="text-sm font-medium leading-none">Degree <span className="text-red-500">*</span></label>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select Degree..." /></SelectTrigger>
                  <SelectContent>{degreeOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
               </Select>
               {errors.degree && <p className="text-sm text-red-600 mt-1">{errors.degree.message}</p>}
            </div>
          )}
        />
         <Controller
          name="department"
          control={control}
          render={({ field }) => (
             <div className="grid w-full items-center gap-1.5">
                <label className="text-sm font-medium leading-none">Department <span className="text-red-500">*</span></label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                   <SelectTrigger><SelectValue placeholder="Select Department..." /></SelectTrigger>
                   <SelectContent>{departmentOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
                {errors.department && <p className="text-sm text-red-600 mt-1">{errors.department.message}</p>}
             </div>
          )}
        />
      </div>
       <Controller
          name="year"
          control={control}
          render={({ field }) => (
              <div className="grid w-full items-center gap-1.5">
                <label className="text-sm font-medium leading-none">Year of Study <span className="text-red-500">*</span></label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select Year..." /></SelectTrigger>
                  <SelectContent>{yearOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                </Select>
                {errors.year && <p className="text-sm text-red-600 mt-1">{errors.year.message}</p>}
              </div>
          )}
        />
      <Input label="Login Email" name="loginEmail" type="email" register={register} error={errors.loginEmail} required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Password" name="password" type="password" register={register} error={errors.password} required />
        <Input label="Confirm Password" name="confirmPassword" type="password" register={register} error={errors.confirmPassword} required />
      </div>

      {/* Optional Fields */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-center text-sm font-semibold text-gray-500">OPTIONAL (fill now or later)</h3>
         <Input label="Phone Number" name="phone" type="tel" register={register} error={errors.phone} />
         <Input label="College Email (Gmail for placements)" name="collegeEmail" type="email" register={register} error={errors.collegeEmail} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input label="10th %" name="tenthPercentage" type="number" step="0.01" register={register} error={errors.tenthPercentage} />
            <Input label="12th %" name="twelfthPercentage" type="number" step="0.01" register={register} error={errors.twelfthPercentage} />
            <Input label="Current CGPA" name="currentCGPA" type="number" step="0.01" register={register} error={errors.currentCGPA} />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" name="terms" register={register} />
        <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I agree to the Terms and Conditions *
        </label>
      </div>
       {errors.terms && <p className="text-sm text-red-600">{errors.terms.message}</p>}

      <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">OR</span>
        </div>
      </div>
      
      <Button variant="outline" className="w-full" type="button" disabled={isLoading}>
        Sign Up with Google
      </Button>
    </form>
  );
}
