import Banner from "@/components/Banner";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import styles from "@/components/PostCard.module.css";

import axiosInstance from "@/lib/axios";

async function getHomeData(locale: string) {
  try {
    const res = await axiosInstance.get(`/home?populate=*&locale=${locale}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch home data", error);
    return null;
  }
}

async function getPostsData(locale: string, page: number) {
  try {
    const res = await axiosInstance.get(
      `/posts?populate=*&locale=${locale}&pagination[page]=${page}&pagination[pageSize]=6&sort[0]=createdAt:desc`
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch posts data", error);
    return null;
  }
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const locale = searchParams.locale === "en" ? "en" : "vi";
  const page = Number(searchParams.page) || 1;

  const homeDataRes = await getHomeData(locale);
  const postsDataRes = await getPostsData(locale, page);

  const homeData = homeDataRes?.data;
  const posts = postsDataRes?.data || [];
  const pageCount = postsDataRes?.meta?.pagination?.pageCount || 1;

  return (
    <>
      {homeData ? (
        <Banner
          title={homeData.header || (locale === "vi" ? "Blog của tôi" : "My Blog")}
          thumbnailUrl={homeData.thumbnail?.url || null}
        />
      ) : (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Loading...</h2>
        </div>
      )}

      {posts.length > 0 ? (
        <>
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center", color: "var(--text-primary)" }}>
            {locale === "vi" ? "Bài viết mới nhất" : "Latest Posts"}
          </h2>
          <div className={styles.grid}>
            {posts.map((post: any) => (
              <PostCard
                key={post.id}
                id={post.id}
                slug={post.slug}
                title={post.title}
                date={post.createdAt}
                thumbnailUrl={post.thumbnail?.url || post.thumbnail?.formats?.thumbnail?.url || null}
                locale={locale}
              />
            ))}
          </div>
          <Pagination pageCount={pageCount} />
        </>
      ) : (
        <div
          style={{ textAlign: "center", padding: "4rem", borderRadius: "20px" }}
          className="glass"
        >
          <h2>Chưa có bài viết nào.</h2>
        </div>
      )}
    </>
  );
}
