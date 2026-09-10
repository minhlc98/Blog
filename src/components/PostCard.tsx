import Link from "next/link";
import styles from "./PostCard.module.css";

interface PostCardProps {
  id: number;
  slug: string;
  title: string;
  thumbnailUrl?: string;
  date: string;
}

export default function PostCard({ slug, title, thumbnailUrl, date }: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const readMoreText = "Đọc bài viết";

  return (
    <Link href={`/posts/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className={styles.image} />
        ) : (
          <div className={styles.image} style={{ background: "var(--primary-color)", opacity: 0.2 }} />
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.date}>{formattedDate}</span>
        <span className={styles.readMore}>{readMoreText}</span>
      </div>
    </Link>
  );
}
