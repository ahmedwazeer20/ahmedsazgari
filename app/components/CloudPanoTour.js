"use client";

import { useEffect, useRef } from "react";

// CloudPano's script does `s.parentNode.insertBefore(iframe, s)` — it needs
// to be an actual DOM child of this div for that to land in the right place.
// next/script's managed strategies (afterInteractive/lazyOnload) relocate
// the <script> tag into <head>/<body> regardless of its JSX position, which
// silently broke this (confirmed live: the script ran and built its splash
// screen, but as a sibling of wherever Next.js moved the tag to — not inside
// our div, so nothing appeared where it should). Manually creating and
// appending the script element preserves the exact structure the original
// embed snippet relies on.
export default function CloudPanoTour({ shortCode }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://app.cloudpano.com/public/shareScript.js";
    script.async = true;
    script.setAttribute("data-short", shortCode);
    script.setAttribute("data-path", "tours");
    script.setAttribute("data-is-self-hosted", "false");
    script.setAttribute("width", "100%");
    script.setAttribute("height", "500px");
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [shortCode]);

  return <div id={shortCode} ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
