import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex items-center justify-center mt-24">{children}</div>
  );
}
