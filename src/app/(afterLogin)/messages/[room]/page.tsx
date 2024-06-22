import { QueryClient } from "@tanstack/react-query";

import { auth } from "@/auth";
import MessageForm from "./_component/MessageForm";
import { UserInfo } from "./_component/UserInfo";
import WebSocketComponent from "./_component/WebSocketComponent";
import MessageList from "./_component/MessageList";
import { getUserServer } from "../../[username]/_lib/getUserServer";

import style from "./chatRoom.module.css";

type Props = {
  params: { room: string };
};

export default async function ChatRoom({ params }: Props) {
  const session = await auth();
  const queryClient = new QueryClient();
  const ids = params.room.split("-").filter((v) => v !== session?.user?.email);
  if (!ids[0]) {
    return null;
  }
  await queryClient.prefetchQuery({ queryKey: ["users", ids[0]], queryFn: getUserServer });

  const messages = [
    { messageId: 1, roomId: 123, id: "elonMusk", content: "안녕하세요.", createdAt: new Date() },
    { messageId: 2, roomId: 123, id: "hero", content: "안녕히가세요.", createdAt: new Date() },
  ];

  return (
    <main className={style.main}>
      <WebSocketComponent />
      <UserInfo id={ids[0]} />
      <MessageList id={ids[0]} />
      <MessageForm id={ids[0]} />
    </main>
  );
}
