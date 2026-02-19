
import { z } from 'zod';

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100),
  registerNumber: z.string().min(5).max(20).regex(/^[a-zA-Z0-9]+$/, { message: 'Register number must be alphanumeric.' }),
  college: z.string().min(3, { message: 'College name is required.' }),
  degree: z.string({ required_error: 'Degree is required.' }),
  department: z.string({ required_error: 'Department is required.' }),
  year: z.string({ required_error: 'Year of study is required.' }),
  loginEmail: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8).regex(passwordValidation, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  }),
  confirmPassword: z.string(),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: 'Invalid phone number.' }).optional().or(z.literal('')),
  collegeEmail: z.string().email({ message: 'Invalid email address.' }).optional().or(z.literal('')),
  tenthPercentage: z.coerce.number().min(0).max(100).optional().or(z.literal('')),
  twelfthPercentage: z.coerce.number().min(0).max(100).optional().or(z.literal('')),
  currentCGPA: z.coerce.number().min(0).max(10).optional().or(z.literal('')),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions.' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
});
