"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Login from "./login/page";
export default function Home() {
  const { data: session, status } = useSession({ required: true });
  console.log(session, status, "yest status");

  return (
    <>
      <h1>Welcome to Dashboard</h1>
    </>
  );
}
