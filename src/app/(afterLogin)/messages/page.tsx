import { Metadata } from "next";
import Room from "./_component/Room";
import style from "./message.module.css";

export const metadata: Metadata = {
  title: "쪽지 / X",
  description: "X.com은 사람들이 실시간으로 일어나고 있는 일에 대해 이야기하는 곳입니다.",
};

export default function Message() {
  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
    </main>
  );
}
