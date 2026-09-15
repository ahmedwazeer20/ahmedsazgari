import { supabaseClient } from "@/lib/supabaseClient";

const BASE_URL = "https://ahmedsazgari.vercel.app";

export default async function sitemap() {
  const staticRoutes = ["", "/projects", "/services", "/blog", "/contact"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  // The blog table has a known schema issue (see README "Known issues") that
  // currently makes any query against it fail — this must not take the whole
  // sitemap down with it, so blog posts are best-effort and quietly skipped
  // on error rather than thrown.
  let postRoutes = [];
  try {
    const { data: posts, error } = await supabaseClient.from("blog").select("slug, id");
    if (!error && posts) {
      postRoutes = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug || post.id}`,
        lastModified: new Date(),
      }));
    }
  } catch {
    // ignore — static routes still get returned below
  }

  return [...staticRoutes, ...postRoutes];
}
