"use client";

import { useEffect, useState } from "react";

const TOUR_ORIGIN = "https://tour.panoee.net";

// Simpler and more robust than the earlier data-short/script.js embed: this
// is a plain iframe, so there's no dependency on where a <script> tag ends
// up in the DOM (that was the earlier bug). The companion effect below is a
// faithful port of CloudPano's own relay script — it forwards device motion
// events into the iframe so gyroscope/VR navigation works on mobile. It only
// reads the iframe by id and adds window-level listeners, so it's safe to
// run regardless of component position.
export default function CloudPanoTour({ tourId, title }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let ready = false;
    const iframe = document.getElementById("tour-embedded");

    const markReady = () => {
      ready = true;
    };

    if (iframe) {
      iframe.addEventListener("load", markReady);
      try {
        const href = iframe.contentWindow?.location.href;
        if (href && href !== "about:blank") ready = true;
      } catch {
        ready = true;
      }
    }

    const pick = (v, keys) => {
      if (!v) return null;
      const out = {};
      keys.forEach((k) => {
        out[k] = typeof v[k] === "number" ? v[k] : null;
      });
      return out;
    };

    const send = (payload) => {
      const el = document.getElementById("tour-embedded");
      if (!el || !el.contentWindow) return;
      try {
        el.contentWindow.postMessage(payload, TOUR_ORIGIN);
      } catch {
        // ignore — cross-origin postMessage can throw before the frame is ready
      }
    };

    const onMessage = (ev) => {
      if (!ready || !ev.data || ev.data.type !== "devicemotion") return;
      if (ev.source !== window.parent) return;
      send(ev.data);
    };

    const onDeviceMotion = (e) => {
      if (!ready) return;
      send({
        type: "devicemotion",
        deviceMotionEvent: {
          acceleration: pick(e.acceleration, ["x", "y", "z"]),
          accelerationIncludingGravity: pick(e.accelerationIncludingGravity, ["x", "y", "z"]),
          rotationRate: pick(e.rotationRate, ["alpha", "beta", "gamma"]),
          interval: typeof e.interval === "number" ? e.interval : 0,
          timeStamp: e.timeStamp,
        },
      });
    };

    window.addEventListener("message", onMessage, false);
    window.addEventListener("devicemotion", onDeviceMotion, { passive: true });

    return () => {
      if (iframe) iframe.removeEventListener("load", markReady);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("devicemotion", onDeviceMotion);
    };
  }, [tourId]);

  // Panoee's own fullscreen button calls the browser's native Fullscreen
  // API, which iOS Safari has never implemented for arbitrary elements
  // (only <video> gets native fullscreen there) — that's what produces
  // "Your browser does not support fullscreen mode" on iPhone specifically.
  // Since that button lives inside a cross-origin iframe, its behavior can't
  // be patched from here. This toggle sidesteps the native API entirely: it
  // just resizes our own wrapper div to cover the viewport via CSS, which
  // works identically on every device, mobile or desktop, with or without
  // Fullscreen API support.
  useEffect(() => {
    if (!isFullscreen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen]);

  return (
    <div
      style={
        isFullscreen
          ? { position: "fixed", inset: 0, zIndex: 2000, background: "#000" }
          : { position: "relative", width: "100%", height: "100%" }
      }
    >
      <iframe
        id="tour-embedded"
        title={title || "360 Virtual Tour"}
        src={`${TOUR_ORIGIN}/iframe/${tourId}?embedFullscreen=1&embedVr=1&embedGyro=1`}
        frameBorder="0"
        width="100%"
        height="100%"
        scrolling="no"
        allow="autoplay; accelerometer; gyroscope; fullscreen; xr-spatial-tracking"
        loading="eager"
        allowFullScreen
      />

      <button
        type="button"
        onClick={() => setIsFullscreen((v) => !v)}
        aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          zIndex: 1,
          width: "36px",
          height: "36px",
          borderRadius: "999px",
          border: "none",
          background: "rgba(0, 0, 0, 0.55)",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
        }}
      >
        {isFullscreen ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        )}
      </button>
    </div>
  );
}
