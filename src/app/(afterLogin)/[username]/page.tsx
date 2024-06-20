import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";

import style from "./profile.module.css";
import { auth } from "@/auth";
import { getUserPosts } from "./_lib/getUserPosts";
import { getUserServer } from "./_lib/getUserServer";
import { Metadata } from "next";
import { User } from "@/model/User";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user: User = await getUserServer({ queryKey: ["users", params.username] });
  return {
    title: `${user.nickname} (${user.id}) / X`,
    description: `${user.nickname}  / X`,
  };
}

export default async function Profile({ params }: Props) {
  const { username } = params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["users", username], queryFn: getUserServer });
  await queryClient.prefetchQuery({ queryKey: ["posts", "users", username], queryFn: getUserPosts });
  const dehydratedState = dehydrate(queryClient); // 서버사이드 렌더링을 위한 dehydrate

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
