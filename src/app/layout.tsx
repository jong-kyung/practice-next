import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { MSWComponent } from "@/app/_component/MSWComponent";
import "./globals.css";
import AuthSession from "./_component/AuthSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X. 무슨 일이 일어나고 있나요? / X",
  description: "X.com은 사람들이 실시간으로 일어나고 있는 일에 대해 이야기하는 곳입니다.",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <MSWComponent />
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
