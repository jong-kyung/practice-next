"use client";

import { useQuery } from "@tanstack/react-query";

import { getFollowingPosts } from "../_lib/getFollowingPosts";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // 1분
    gcTime: 300 * 1000, // 5분
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
