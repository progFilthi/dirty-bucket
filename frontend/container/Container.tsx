import React from "react";
import Navbar from "@/components/navigation/Navbar";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center">{children}</main>
    </div>
  );
}
