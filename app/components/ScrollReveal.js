"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Faithful port of the old initScrollReveal() from js/main.js. Re-runs on
// every route change since App Router swaps page content without a full
// reload, so a fresh set of .fade-up elements needs fresh observers.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-up");
    if (!fadeElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    fadeElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
