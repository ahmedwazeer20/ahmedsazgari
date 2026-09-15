"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

async function fetchPost(slug) {
  let { data: posts } = await supabaseClient.from("blog").select("*").eq("slug", slug);
  if (!posts || posts.length === 0) {
    ({ data: posts } = await supabaseClient.from("blog").select("*").eq("id", slug));
  }
  return posts && posts.length > 0 ? posts[0] : null;
}

export default function BlogPostPage({ params }) {
  const { slug } = use(params);
  const [post, setPost] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    let cancelled = false;

    fetchPost(slug).then((data) => {
      if (!cancelled) setPost(data);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (post) document.title = `${post.title} — ahmedsazgari`;
  }, [post]);

  return (
    <main className="section" style={{ paddingTop: "2rem" }}>
      <div className="section-container" style={{ maxWidth: "800px" }}>
        <Link href="/blog" className="article-back-link font-semibold mb-6 inline-block">
          ← Back to Blog
        </Link>

        {post === undefined && (
          <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>
            Loading article...
          </div>
        )}

        {post === null && (
          <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>
            Article not found.
          </div>
        )}

        {post && (
          <article itemScope itemType="https://schema.org/BlogPosting">
            <div className="flex items-center gap-3 mb-4">
              <span className="tag-pill tag-pill-info">{post.category || "Drone Media"}</span>
              <time className="text-xs" style={{ color: "var(--text-muted)" }}>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1
              className="mb-6 leading-tight"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--text-heading)",
                letterSpacing: "-0.01em",
              }}
              itemProp="headline"
            >
              {post.title}
            </h1>

            {post.image_url && (
              <div
                className="mb-8 overflow-hidden"
                style={{ borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-soft)" }}
              >
                <img
                  src={post.image_url}
                  alt={post.image_alt || post.title}
                  className="w-full h-auto max-h-[450px] object-cover"
                />
              </div>
            )}

            <div
              className="article-prose max-w-none text-lg space-y-6"
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || "" }}
            />
          </article>
        )}
      </div>
    </main>
  );
}
