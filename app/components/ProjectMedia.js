"use client";

import CloudPanoTour from "./CloudPanoTour";

// Projects with an interactive CloudPano/Panoee 360 tour instead of a static
// image. Keyed by title since Supabase's `project` table has no dedicated
// field for this yet — add more titles here as more tours are created.
const CLOUDPANO_TOURS = {
  "Helsinki Airbnb Apartment": "6aab177ecfc0ac486ce1bf31",
};

const isNativeVideo = (url) => /\.(mp4|mov|webm)$/i.test(url || "");
const isYouTube = (url) => /youtube\.com|youtu\.be/.test(url || "");

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
  if (project?.title in CLOUDPANO_TOURS) return "cloudpano";
  const url = project?.media_url;
  if (isNativeVideo(url)) return "video";
  if (isYouTube(url)) return "youtube";
  if (url) return "image";
  return "none";
}

// Renders project media: a real video file plays natively, a YouTube source
// shows its thumbnail (falling back from maxres to hq on 404), anything else
// is a plain image.
export default function ProjectMedia({ project }) {
  const url = project?.media_url;
  const kind = getMediaKind(project);

  if (kind === "cloudpano") {
    return <CloudPanoTour tourId={CLOUDPANO_TOURS[project.title]} title={project.title} />;
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
