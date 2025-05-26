import Link from "next/link";
import React from "react";

const Navlinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Beats",
    href: "/beats",
  },
  {
    label: "Cart",
    href: "/cart",
  },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full right-0 left-0 py-3 z-50 shadow-sm backdrop:blur-md bg-neutral-400/95">
      <ul className="flex items-center justify-center space-x-16">
        {Navlinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
