export default function AfterLoginLayout({ children }) {
  return (
    <div>
      <header>로그인 후 레이아웃</header>
      <main>{children}</main>
    </div>
  );
}
