import ProjectMedia from "./ProjectMedia";

// Hero backdrop is pinned to the Seurasaari Bridge drone shot. Supabase
// doesn't guarantee row order without an explicit .order(), so picking
// featured[0] was unreliable — falls back to the first featured project
// (then the hero card's tan gradient) if that shot isn't found.
export default function HeroMedia({ projects }) {
  if (!projects || !projects.length) return null;
  const hero = projects.find((p) => p.title === "Seurasaari Bridge") || projects[0];
  if (!hero?.media_url) return null;
  return <ProjectMedia project={hero} />;
}
