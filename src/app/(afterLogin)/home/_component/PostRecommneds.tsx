"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // 초기 페이지
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000, // 1분
    gcTime: 300 * 1000, // 5분
  });
  const { ref, inView } = useInView({ threshold: 0, delay: 0 });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  return data?.pages.map((page, i) => (
    <>
      <Fragment key={i}>
        {page.map((post) => (
          <Post key={post.postId} post={post} />
        ))}
      </Fragment>
      <div ref={ref} style={{ height: 50 }} />
    </>
  ));
}
