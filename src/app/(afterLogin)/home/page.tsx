import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "./_component/PostForm";
import TabDecider from "./_component/TabDecider";
import PostRecommends from "./_component/PostRecommneds";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

import style from "./home.module.css";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // 초기 페이지
  });
  const dehydratedState = dehydrate(queryClient); // 서버사이드 렌더링을 위한 dehydrate

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
