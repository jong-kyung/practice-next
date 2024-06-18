import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import ImageZone from "./_component/ImageZone";

import style from "./photoModal.module.css";

type Props = {
  params: { id: string };
};

export default async function PhotoModal({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["posts", id], queryFn: getSinglePost });
  await queryClient.prefetchQuery({ queryKey: ["posts", id, "comments"], queryFn: getComments });
  const dehydratedState = dehydrate(queryClient); // 서버사이드 렌더링을 위한 dehydrate

  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
