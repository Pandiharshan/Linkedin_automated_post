"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";

const navLinks = [
  { href: "/generate", label: "Generator" },
  { href: "/select",   label: "Selection" },
  { href: "#",         label: "History" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="nav-glass fixed top-0 w-full z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight"
            style={{ color: "#2B2B2B" }}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{
                color: "#7B535C",
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              auto_awesome
            </span>
            AI Post Assistant
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-7">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className="font-medium transition-all duration-200 hover:opacity-80 hover:-translate-y-0.5"
                  style={{
                    color: isActive ? "#7B535C" : "#504446",
                    fontWeight: isActive ? 700 : 500,
                    borderBottom: isActive ? "2px solid #D8A7B1" : "none",
                    paddingBottom: isActive ? "2px" : "0",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Auth */}
        <AuthButton />
      </div>
    </nav>
  );
}
