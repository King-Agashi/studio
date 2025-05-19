// src/components/auth/SignupForm.tsx
"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // path of error
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    // Dummy signup logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Signup data:', data);
    toast({
      title: 'Signup Successful (Dummy)',
      description: `Welcome, ${data.fullName}! Your account has been created. This is a demo.`,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="fullName-signup">Full Name</Label>
        <Input
          id="fullName-signup"
          placeholder="Your Full Name"
          {...register('fullName')}
          className="mt-1"
        />
        {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
      </div>
      <div>
        <Label htmlFor="email-signup">Email Address</Label>
        <Input
          id="email-signup"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          className="mt-1"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password-signup">Password</Label>
        <Input
          id="password-signup"
          type="password"
          placeholder="Create a password"
          {...register('password')}
          className="mt-1"
        />
        {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
      </div>
      <div>
        <Label htmlFor="confirmPassword-signup">Confirm Password</Label>
        <Input
          id="confirmPassword-signup"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
          className="mt-1"
        />
        {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </form>
  );
}
