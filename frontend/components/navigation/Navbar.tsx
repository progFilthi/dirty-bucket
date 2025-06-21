"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Beats", href: "/beats" },
  { label: "Cart", href: "/cart" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-sm py-3">
      <nav
        className="max-w-7xl mx-auto flex justify-between items-center px-4"
        role="navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/dirty-bucket-logo.svg"
            alt="Logo"
            width={40}
            height={40}
          />
          <h1 className="font-bold text-lg">DirtyBucket</h1>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center space-x-6 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-green-600 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <SignedOut>
              <SignInButton>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>

        {/* Mobile toggle button */}
        <div className="sm:hidden">
          {isMenuOpen ? (
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <Bars3Icon
              className="h-6 w-6 cursor-pointer"
              onClick={toggleMenu}
            />
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 pt-4 pb-2 bg-white">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-base font-medium hover:text-green-600 transition"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <SignedOut>
                <SignInButton>
                  <button
                    type="button"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
