"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll shadow — same threshold as the original initHeader().
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation, same as the old closeMenu() on link click.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape, same as the original.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <nav className="nav-container">
        <Link href="/" className="brand flex items-center gap-2">
          <img
            src="/Logo.jpg"
            alt="ahmedsazgari logo"
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <span>
            ahmed<span>sazgari</span>
          </span>
        </Link>

        <button
          className={`hamburger${open ? " active" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links${open ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "active" : ""}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={`nav-cta${pathname === "/contact" ? " active" : ""}`}
            >
              Get in Touch
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
