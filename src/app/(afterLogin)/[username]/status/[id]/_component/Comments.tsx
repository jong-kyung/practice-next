"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import Post from "@/app/(afterLogin)/_component/Post";
import { getComments } from "../_lib/getComments";
import { Post as IPost } from "@/model/Post";

type Props = {
  id: string;
};

export default function Comments({ id }: Props) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);
  const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000, // 1분
    gcTime: 300 * 1000, // 5분
    enabled: !!post,
  });

  if (post) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
  return null;
}
