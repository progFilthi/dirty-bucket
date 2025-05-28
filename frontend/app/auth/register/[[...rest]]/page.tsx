"use client";
import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp path="/auth/register" routing="path" signInUrl="/auth/login" />
    </div>
  );
}
