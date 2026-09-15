import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Projects — ahmedsazgari | Aerial Drone Portfolio",
  description:
    "Explore aerial drone projects, 360 virtual tours, commercial productions and reels by ahmedsazgari in Helsinki.",
  keywords: [
    "drone portfolio",
    "aerial video",
    "360 tour",
    "commercial production",
    "reels",
    "Helsinki",
  ],
  authors: [{ name: "ahmedsazgari" }],
  openGraph: {
    title: "Projects — ahmedsazgari",
    description:
      "Aerial drone portfolio featuring cinematography, 360 tours, commercial work and reels.",
    type: "website",
  },
};

// This route needs client-side state (category filtering) and a client-side
// Supabase fetch, but Next.js only allows a `metadata` export from a server
// component — so the page itself stays a server component purely to carry
// metadata, and delegates all the actual rendering to a client child.
export default function ProjectsPage() {
  return <ProjectsClient />;
}
