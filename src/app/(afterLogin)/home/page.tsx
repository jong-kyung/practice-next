import { Suspense } from "react";

import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "./_component/PostForm";
import Loading from "./loading";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import { Metadata } from "next";

import { auth } from "@/auth";
import style from "./home.module.css";

export const metadata: Metadata = {
  title: "홈 / X",
  description: "홈",
};

export default async function Home() {
  const session = await auth();
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
