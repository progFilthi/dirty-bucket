import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navlinks = [
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
    <header className="fixed top-0 w-full right-0 left-0 py-3 z-50 backdrop-blur-lg rounded-b-lg">
      <nav className="flex items-center justify-between px-20">
        <Link href={"/"}>
          <div className="flex items-center -space-x-2 justify-center">
            <Image
              src={"/dirty-bucket-logo.svg"}
              alt="dirty bucket logo"
              width={48}
              height={48}
            />
            <h1>DirtyBucket</h1>
          </div>
        </Link>
        <ul className="flex items-center justify-center space-x-8">
          {Navlinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <li>{link.label}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
