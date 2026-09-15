import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ScrollReveal from "./components/ScrollReveal";

// Matches the original Google Fonts <link> exactly: same families, same
// weights, no italic axis (the site's italic accent text relies on the
// browser's synthetic oblique, same as before).
const playfairDisplay = Playfair_Display({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ahmedsazgari.vercel.app"),
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${plusJakartaSans.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
