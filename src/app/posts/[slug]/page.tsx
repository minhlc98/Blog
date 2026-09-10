import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./PostDetail.module.css";

import axiosInstance from "@/lib/axios";

async function getPostBySlug(slug: string) {
  try {
    const res = await axiosInstance.get(
      `/posts?filters[slug][$eq]=${slug}&populate=*&locale=vi&sort[0]=createdAt:desc`
    );
    return res.data?.data?.[0] || null; // Strapi returns an array for filters
  } catch (error) {
    console.error("Failed to fetch post", error);
    return null;
  }
}

type Params = Promise<{ slug: string }>;

export default async function PostDetail(props: { params: Params }) {
  const params = await props.params;

  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const thumbnailUrl = post.thumbnail?.url;
  const formattedDate = new Date(post.createdAt).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className={`glass ${styles.article}`}>
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/"
          style={{ color: "var(--primary-color)", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          ← Trở về
        </Link>
      </div>

      <h1 className={styles.title}>{post.title}</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Ngày {formattedDate}</p>

      {thumbnailUrl && (
        <div className={styles.thumbnailWrapper}>
          <img src={thumbnailUrl} alt={post.title} className={styles.thumbnail} />
        </div>
      )}

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
