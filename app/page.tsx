import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";

import CircleGradient from "@/components/ux/circle-gradient";
import { twMerge } from "tailwind-merge";

export default function Home() {
  return (
    <>
      <Navbar />
      <CircleGradient />

      <LandingPage />
    </>
  );
}
