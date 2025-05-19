// src/components/auth/AuthTabs.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AuthTabs() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <CardHeader className="pb-2">
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
        </CardHeader>
        <TabsContent value="login">
          <CardHeader>
            <CardTitle className="text-2xl font-lora">Welcome Back!</CardTitle>
            <CardDescription>Sign in to access your account and continue your book journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </TabsContent>
        <TabsContent value="signup">
          <CardHeader>
            <CardTitle className="text-2xl font-lora">Join Bookstock Nook</CardTitle>
            <CardDescription>Create an account to start buying and selling your favorite books.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
