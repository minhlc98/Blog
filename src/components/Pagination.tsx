"use client";

import Link from "next/link";
import styles from "./Pagination.module.css";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  pageCount: number;
}

export default function Pagination({ pageCount }: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLocale = searchParams.get("locale") || "vi";

  if (pageCount <= 1) return null;

  return (
    <div className={styles.pagination}>
      <Link
        href={`?page=${currentPage - 1}&locale=${currentLocale}`}
        className={`${styles.button} ${currentPage <= 1 ? styles.disabled : ""}`}
        scroll={false}
      >
        Prev
      </Link>
      
      <span className={styles.pageInfo}>
        Page {currentPage} of {pageCount}
      </span>

      <Link
        href={`?page=${currentPage + 1}&locale=${currentLocale}`}
        className={`${styles.button} ${currentPage >= pageCount ? styles.disabled : ""}`}
        scroll={false}
      >
        Next
      </Link>
    </div>
  );
}
