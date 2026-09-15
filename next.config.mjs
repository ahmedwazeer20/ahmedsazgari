/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js doesn't auto-resolve a directory request to its index.html the
  // way a plain static host does, so /admin (Decap CMS) needs an explicit
  // rewrite to keep working at the same URL as before.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
