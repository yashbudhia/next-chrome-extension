import LandingPage from "@/components/LandingPage";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}
