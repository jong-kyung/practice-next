import { Metadata } from "next";
import Room from "./_component/Room";
import style from "./message.module.css";
import { auth } from "@/auth";
import { getRooms } from "./_lib/getRooms";

export const metadata: Metadata = {
  title: "쪽지 / X",
  description: "X.com은 사람들이 실시간으로 일어나고 있는 일에 대해 이야기하는 곳입니다.",
};

export default async function Message() {
  const session = await auth();
  const rooms = session?.user?.email ? await getRooms(session?.user?.email) : [];

  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      {rooms.map((room) => {
        return <Room key={room.room} room={room} />;
      })}
    </main>
  );
}
