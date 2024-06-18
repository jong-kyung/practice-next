import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "./_component/PostForm";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Loading from "./loading";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";

import style from "./home.module.css";

export default async function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
