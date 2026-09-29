"use client";

import CloudPanoTour from "./CloudPanoTour";

const isNativeVideo = (url) => /\.(mp4|mov|webm)$/i.test(url || "");
const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url || "");
const isCloudPano = (url) => /panoee\.net|cloudpano\.com/i.test(url || "");

// Pulls the tour id out of any Panoee/CloudPano link shape, e.g.
// https://tour.panoee.net/6aab177ecfc0ac486ce1bf31 or
// https://tour.panoee.net/iframe/6aab177ecfc0ac486ce1bf31 — so a project
// becomes an interactive tour just by pasting its share link into the
// existing media_url field, the same way video/image/YouTube already work.
function cloudPanoTourId(url) {
  const match = (url || "").match(/(?:panoee\.net|cloudpano\.com)\/(?:iframe\/)?([A-Za-z0-9_-]+)/i);
  return match ? match[1] : null;
}

// YouTube's iframe embed failed with Error 153 across multiple embed
// configurations in this project, so YouTube sources render as their
// thumbnail instead — no dependency on YouTube's embed player validation.
function youTubePoster(url) {
  const idMatch = (url || "").match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=))([A-Za-z0-9_-]{11})/
  );
  return idMatch ? `https://i.ytimg.com/vi/${idMatch[1]}/maxresdefault.jpg` : "";
}

export function getMediaKind(project) {
  const url = project?.media_url;
  if (isCloudPano(url)) return "cloudpano";
  if (isNativeVideo(url)) return "video";
  if (isYouTube(url)) return "youtube";
  if (url) return "image";
  return "none";
}

// Renders project media: a Panoee/CloudPano link becomes an interactive 360
// tour, a real video file plays natively, a YouTube source shows its
// thumbnail (falling back from maxres to hq on 404), anything else is a
// plain image.
export default function ProjectMedia({ project }) {
  const url = project?.media_url;
  const kind = getMediaKind(project);

  if (kind === "cloudpano") {
    return <CloudPanoTour tourId={cloudPanoTourId(url)} title={project.title} />;
  }

  if (kind === "video") {
    return <video src={url} autoPlay muted loop playsInline />;
  }

  if (kind === "youtube") {
    const poster = youTubePoster(url);
    const fallback = poster.replace("maxresdefault", "hqdefault");
    return (
      <img
        src={poster}
        alt={project?.title || ""}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallback;
        }}
      />
    );
  }

  if (kind === "image") {
    return <img src={url} alt={project?.title || ""} />;
  }

  return null;
}
