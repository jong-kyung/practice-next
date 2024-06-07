"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  router.replace("/i/flow/login");
  return null;
}

// router.push
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login

// router.replace
// localhost:3000 -> localhost:3000/login -> localhost:3000/i/flow/login
// localhost:3000 -> localhost:3000/i/flow/login
