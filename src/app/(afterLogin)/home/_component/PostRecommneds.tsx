"use client";

import { useQuery } from "@tanstack/react-query";

import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({ queryKey: ["posts", "recommend"], queryFn: getPostRecommends });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
