import Banner from "@/components/Banner";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import styles from "@/components/PostCard.module.css";

import axiosInstance from "@/lib/axios";

async function getHomeData() {
  try {
    const res = await axiosInstance.get(`/home?populate=*&locale=vi`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch home data", error);
    return null;
  }
}

async function getPostsData(page: number) {
  try {
    const res = await axiosInstance.get(
      `/posts?populate=*&locale=vi&pagination[page]=${page}&pagination[pageSize]=6&sort[0]=createdAt:desc`
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
  const page = Number(searchParams.page) || 1;

  const homeDataRes = await getHomeData();
  const postsDataRes = await getPostsData(page);

  const homeData = homeDataRes?.data;
  const posts = postsDataRes?.data || [];
  const pageCount = postsDataRes?.meta?.pagination?.pageCount || 1;

  return (
    <>
      {homeData ? (
        <Banner
          title={homeData.header || "Blog của tôi"}
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
            Bài viết mới nhất
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
