"use client";

import Script from "next/script";

// CloudPano's embed snippet is a <div id="..."> the widget's own script finds
// by ID and fills in. A raw copy-paste into JSX wouldn't run — React (like
// any innerHTML assignment) never executes <script> tags inserted that way —
// so the script has to be loaded via next/script instead.
export default function CloudPanoTour({ shortCode }) {
  return (
    <div id={shortCode} style={{ width: "100%", height: "100%" }}>
      <Script
        src="https://app.cloudpano.com/public/shareScript.js"
        strategy="afterInteractive"
        data-short={shortCode}
        data-path="tours"
        data-is-self-hosted="false"
        width="100%"
        height="500px"
      />
    </div>
  );
}
