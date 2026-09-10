import styles from "./Banner.module.css";

interface BannerProps {
  title: string;
  thumbnailUrl: string | null;
}

export default function Banner({ title, thumbnailUrl }: BannerProps) {
  return (
    <section className={`${styles.banner} glass`}>
      <h1 className={styles.title}>{title}</h1>
      
      {thumbnailUrl && (
        <div className={styles.imageWrapper}>
          <img src={thumbnailUrl} alt={title} className={styles.image} />
        </div>
      )}
    </section>
  );
}
