export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: "https://ahmedsazgari.vercel.app/sitemap.xml",
  };
}
