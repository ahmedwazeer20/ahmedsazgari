"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import BlogCard from "../components/BlogCard";

export default function BlogPage() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadBlogPosts() {
      const { data, error } = await supabaseClient
        .from("blog")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
        return;
      }
      if (!cancelled) setPosts(data || []);
    }

    loadBlogPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  // Same JSON-LD structured data as before, now rendered declaratively
  // instead of manually appended to document.head.
  const schemaData = posts?.length
    ? {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "ahmedsazgari Aerial Drone Blog",
        url: "https://ahmedsazgari.vercel.app/blog",
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.image_url,
          author: { "@type": "Person", name: post.author || "ahmedsazgari" },
          datePublished: post.created_at,
          mainEntityOfPage: `https://ahmedsazgari.vercel.app/blog/${post.slug || post.id}`,
        })),
      }
    : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      {/* ================= PAGE HEADER ================= */}
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="section-container">
          <div className="section-header fade-up">
            <span className="section-tag">Blog & Travel</span>
            <h1 className="section-title">Stories from the Sky</h1>
            <p className="section-subtitle">
              Aerial photography tips, travel drone logs across Europe, and
              behind-the-scenes insights from my latest adventures.
            </p>
          </div>
        </div>
      </section>

      {/* ================= BLOG GRID ================= */}
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="section-container">
          <div className="blog-grid" id="blog-posts-container">
            {posts === null ? null : posts.length === 0 ? (
              <p className="text-center col-span-full py-8" style={{ color: "var(--text-muted)" }}>
                No blog articles published yet.
              </p>
            ) : (
              posts.map((post) => <BlogCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER CTA ================= */}
      <section className="section">
        <div className="section-container text-center fade-up">
          <h2 className="section-title">Never Miss a Story</h2>
          <p className="section-subtitle mb-4">
            Subscribe for new articles, travel logs, and exclusive behind-the-scenes content.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Get in Touch →
          </Link>
        </div>
      </section>
    </>
  );
}
