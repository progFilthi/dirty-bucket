"use client";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn path="/auth/login" routing="path" signUpUrl="/auth/register" />
    </div>
  );
}
