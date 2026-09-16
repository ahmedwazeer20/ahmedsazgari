"use client";

import { useEffect } from "react";

const TOUR_ORIGIN = "https://tour.panoee.net";

// Simpler and more robust than the earlier data-short/script.js embed: this
// is a plain iframe, so there's no dependency on where a <script> tag ends
// up in the DOM (that was the earlier bug). The companion effect below is a
// faithful port of CloudPano's own relay script — it forwards device motion
// events into the iframe so gyroscope/VR navigation works on mobile. It only
// reads the iframe by id and adds window-level listeners, so it's safe to
// run regardless of component position.
export default function CloudPanoTour({ tourId, title }) {
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

  return (
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
  );
}
