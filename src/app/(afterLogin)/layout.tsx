type Props = {
  children: React.ReactNode;
};

export default function AfterLoginLayout({ children }: Readonly<Props>) {
  return (
    <div>
      <header>로그인 후 레이아웃</header>
      <main>{children}</main>
    </div>
  );
}
