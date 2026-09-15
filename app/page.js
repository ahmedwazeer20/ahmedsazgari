import HomeClient from "./components/HomeClient";

export const metadata = {
  title: "ahmedsazgari — Aerial Drone & Media Specialist | Helsinki",
  description:
    "Professional aerial drone photography, videography, 360 tours and commercial media production in Helsinki, Finland.",
  keywords: [
    "drone",
    "aerial",
    "photography",
    "videography",
    "360 tour",
    "Helsinki",
    "Finland",
    "media",
    "commercial",
  ],
  authors: [{ name: "ahmedsazgari" }],
  openGraph: {
    title: "ahmedsazgari — Aerial Drone & Media Specialist",
    description:
      "Professional aerial drone photography, videography, 360 tours and commercial media production in Helsinki.",
    type: "website",
  },
};

// Same pattern as /projects and /blog: this route needs a client-side
// Supabase fetch (hero backdrop + featured projects), so the page itself
// stays a server component purely to carry metadata.
export default function Home() {
  return <HomeClient />;
}
