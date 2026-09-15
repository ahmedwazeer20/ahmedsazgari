import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog & Travel — ahmedsazgari | Aerial Photography Tips & Travel Logs",
  description:
    "Aerial photography tips, travel drone logs across Europe, and behind-the-scenes stories from ahmedsazgari.",
  keywords: [
    "aerial photography tips",
    "drone travel",
    "travel blog",
    "Europe",
    "Helsinki",
    "drone logs",
    "photography guide",
  ],
  authors: [{ name: "ahmedsazgari" }],
  openGraph: {
    title: "Blog & Travel — ahmedsazgari",
    description:
      "Aerial photography tips, travel drone logs across Europe, and behind-the-scenes stories.",
    type: "website",
  },
};

// Same pattern as /projects: this route needs a client-side Supabase fetch,
// so the page itself stays a server component purely to carry metadata.
export default function BlogPage() {
  return <BlogClient />;
}
