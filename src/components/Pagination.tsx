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

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <Link
        href={`?page=${currentPage - 1}&locale=${currentLocale}`}
        className={`${styles.button} ${currentPage <= 1 ? styles.disabled : ""}`}
        scroll={false}
      >
        &laquo;
      </Link>
      
      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}&locale=${currentLocale}`}
          className={`${styles.pageNumber} ${currentPage === page ? styles.active : ""}`}
          scroll={false}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`?page=${currentPage + 1}&locale=${currentLocale}`}
        className={`${styles.button} ${currentPage >= pageCount ? styles.disabled : ""}`}
        scroll={false}
      >
        &raquo;
      </Link>
    </div>
  );
}
