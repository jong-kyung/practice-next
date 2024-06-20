import SearchForm from "@/app/(afterLogin)/_component/SearchForm";

import style from "./explore.module.css";
import TrendSection from "./_component/TrendSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "탐색하기 / X ",
  description: "X.com은 사람들이 실시간으로 일어나고 있는 일에 대해 이야기하는 곳입니다.",
};

export default function Home() {
  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        <TrendSection />
      </div>
    </main>
  );
}
