import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";

import style from "./profile.module.css";
import { getUserPosts } from "./_lib/getUserPosts";
import { getUser } from "./_lib/getUser";

type Props = {
  params: { username: string };
};

export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["users", username], queryFn: getUser });
  await queryClient.prefetchQuery({ queryKey: ["posts", "users", username], queryFn: getUserPosts });
  const dehydratedState = dehydrate(queryClient); // 서버사이드 렌더링을 위한 dehydrate

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
