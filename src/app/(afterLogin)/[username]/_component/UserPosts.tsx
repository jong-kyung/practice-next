"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";

type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
    queryKey: ["posts", "users", username],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // 1분
    gcTime: 300 * 1000, // 5분
  });

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);

  console.log("user", user);
  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
  return null;
}
