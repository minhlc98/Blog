import Link from "next/link";
import { notFound } from "next/navigation";

import axiosInstance from "@/lib/axios";

async function getPostBySlug(slug: string, locale: string) {
  try {
    const res = await axiosInstance.get(
      `/posts?filters[slug][$eq]=${slug}&populate=*&locale=${locale}&sort[0]=createdAt:desc`
    );
    return res.data?.data?.[0] || null; // Strapi returns an array for filters
  } catch (error) {
    console.error("Failed to fetch post", error);
    return null;
  }
}

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PostDetail(props: { params: Params; searchParams: SearchParams }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = searchParams.locale === "en" ? "en" : "vi";

  const post = await getPostBySlug(params.slug, locale);

  if (!post) {
    return notFound();
  }

  const thumbnailUrl = post.thumbnail?.url;
  const formattedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN", {
    year: "numeric",
    month: locale === "en" ? "long" : "numeric",
    day: "numeric",
  });

  return (
    <article className="glass" style={{ padding: "3rem", borderRadius: "30px", marginTop: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href={`/?locale=${locale}`}
          style={{ color: "var(--primary-color)", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          ← Back to Home
        </Link>
      </div>

      {thumbnailUrl && (
        <div style={{ width: "100%", height: "400px", borderRadius: "20px", overflow: "hidden", marginBottom: "2rem" }}>
          <img src={thumbnailUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", lineHeight: "1.2" }}>{post.title}</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Published on {formattedDate}</p>

      {/* Since Strapi rich text can be blocks or markdown, we just render content safely.
          If it's Blocks, we need blocks renderer. For simplicity, we just stringify if it's JSON, 
          or render HTML if it's markdown converted. 
          Assuming it's a simple string or standard Strapi rich text. */}
      <div className="post-content" style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
        {typeof post.content === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <pre style={{ whiteSpace: "pre-wrap", background: "var(--card-bg)", padding: "1rem", borderRadius: "10px" }}>
            {JSON.stringify(post.content, null, 2)}
          </pre>
        )}
      </div>
    </article>
  );
}
