"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Triangle, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-tiscu-navy/10 backdrop-blur-sm bg-tiscu-bg/90">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 cursor-pointer">
          <Triangle className="w-5 h-5 fill-tiscu-navy text-tiscu-navy" />
          <span className="font-grotesk font-semibold tracking-tight text-lg text-tiscu-navy">
            TISCU
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-tiscu-steel">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-tiscu-navy transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#book"
          className="hidden md:block font-grotesk text-sm font-medium border border-tiscu-navy px-4 py-1.5 hover:bg-tiscu-navy hover:text-tiscu-bg transition-all duration-300 cursor-pointer"
        >
          CONSULT
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden cursor-pointer p-2"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-tiscu-navy" />
          ) : (
            <Menu className="h-6 w-6 text-tiscu-navy" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-tiscu-navy/10 bg-tiscu-bg px-6 py-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-xs tracking-widest text-tiscu-steel hover:text-tiscu-navy transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className="font-grotesk text-sm font-medium border border-tiscu-navy px-4 py-2 text-center hover:bg-tiscu-navy hover:text-tiscu-bg transition-all duration-300 cursor-pointer"
            >
              CONSULT
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
