import { QueryFunction } from "@tanstack/react-query";

import { Post } from "@/model/Post";

export const getUserPosts: QueryFunction<Post[], [_1: string, _2: string, string]> = async ({ queryKey }) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}/posts`, {
    next: {
      tags: ["posts", "users", username], // 캐시초기화를 위한 태그
    },
    cache: "no-store", // 캐시 사용하지 않음
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};