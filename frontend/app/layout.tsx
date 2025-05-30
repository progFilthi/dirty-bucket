import { metadata } from "./metadata";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Container from "@/container/Container";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Container>
            <main suppressHydrationWarning>
              {children}
              <Toaster position="top-right" />
            </main>
          </Container>
        </body>
      </html>
    </ClerkProvider>
  );
}
