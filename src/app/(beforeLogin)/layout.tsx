export default function BeforeLoginLayout({ children }) {
  return (
    <div>
      <header>로그인 전 레이아웃</header>
      <main>{children}</main>
    </div>
  );
}
