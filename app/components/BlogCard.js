import Link from "next/link";

export default function BlogCard({ post }) {
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const altText = post.image_alt || `${post.title} - ahmedsazgari drone photography Helsinki`;
  const postUrl = `/blog/${post.slug || post.id}`;

  return (
    <article className="blog-card fade-up visible" itemScope itemType="https://schema.org/BlogPosting">
      <Link href={postUrl}>
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={altText}
            loading="lazy"
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div
            className="w-full h-48 flex items-center justify-center rounded-t-lg"
            style={{ background: "var(--glass-panel-bg)", color: "var(--text-muted)" }}
          >
            Aerial Article
          </div>
        )}
      </Link>
      <div className="blog-body">
        <div className="blog-meta">
          <span className="tag">{post.category || "Drone Media"}</span>
          <span>·</span>
          <time dateTime={post.created_at}>{formattedDate}</time>
        </div>
        <h3 itemProp="headline">
          <Link href={postUrl}>{post.title}</Link>
        </h3>
        <p itemProp="description">{post.excerpt || ""}</p>
        <Link href={postUrl} className="blog-link">
          Read Article →
        </Link>
      </div>
    </article>
  );
}
