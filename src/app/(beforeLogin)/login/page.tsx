import { redirect } from "next/navigation";

import { auth } from "@/auth";
import Main from "@/app/(beforeLogin)/_component/Main";
import RedirectToLogin from "./_component/RedirectToLogin";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <>
      <RedirectToLogin />
      <Main />
    </>
  );
}
