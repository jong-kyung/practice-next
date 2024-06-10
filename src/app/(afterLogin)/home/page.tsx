import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";

import style from "./home.module.css";
import PostForm from "./_component/PostForm";

export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
      </TabProvider>
    </main>
  );
}
