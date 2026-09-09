"use client";

import styles from "./Banner.module.css";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface BannerProps {
  title: string;
  thumbnailUrl: string | null;
}

export default function Banner({ title, thumbnailUrl }: BannerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = searchParams.get("locale") === "en" ? "en" : "vi";

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(`${pathname}?locale=${newLocale}`, { scroll: false });
  };

  return (
    <section className={`${styles.banner} glass`}>
      <h1 className={styles.title}>{title}</h1>
      
      {thumbnailUrl && (
        <div className={styles.imageWrapper}>
          <img src={thumbnailUrl} alt={title} className={styles.image} />
        </div>
      )}

      <div className={styles.switcherWrapper}>
        <select 
          className={styles.selectBox} 
          value={currentLocale} 
          onChange={handleLanguageChange}
        >
          <option value="vi">🇻🇳 Tiếng Việt</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>
    </section>
  );
}
