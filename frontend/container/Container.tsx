import React from "react";
import Navbar from "@/components/navigation/Navbar";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex items-center justify-center mt-24">
      <Navbar />
      {children}
    </div>
  );
}
