"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router"; // Fixed import
import { useEffect } from "react";
import About from "@/components/About";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}
