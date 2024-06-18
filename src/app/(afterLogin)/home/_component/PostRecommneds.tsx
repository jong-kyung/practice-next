"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";

import styles from "@/app/(afterLogin)/home/home.module.css";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading, isError } = useInfiniteQuery<
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

  if (isPending) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg className={styles.loader} height='100%' viewBox='0 0 32 32' width={40}>
          <circle
            cx='16'
            cy='16'
            fill='none'
            r='14'
            strokeWidth='4'
            style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
          ></circle>
          <circle
            cx='16'
            cy='16'
            fill='none'
            r='14'
            strokeWidth='4'
            style={{ stroke: "rgb(29, 155, 240)", strokeDasharray: 80, strokeDashoffset: 60 }}
          ></circle>
        </svg>
      </div>
    );
  }

  if (isError) {
    return "에러가 발생했습니다.";
  }

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
