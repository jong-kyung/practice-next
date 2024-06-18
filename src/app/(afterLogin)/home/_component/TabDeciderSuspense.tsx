import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import TabDecider from "./TabDecider";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // 초기 페이지
  });
  const dehydratedState = dehydrate(queryClient); // 서버사이드 렌더링을 위한 dehydrate
  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
