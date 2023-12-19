"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-bold text-lg">
      Hi Everybody
      <button onClick={() => signIn("google")}>Sign in</button>
    </div>
  );
}
