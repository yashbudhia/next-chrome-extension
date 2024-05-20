"use client";

import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";
import CircleGradient from "./ux/circle-gradient";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";

const About = React.lazy(() => import("./About"));
import Extension from "./../app/extension";
import { TracingBeam } from "./ui/tracingbeam";

export default function LandingPage() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <div>
        <div className="">
          <div className="h-[800px] flex flex-col justify-center items-center">
            <div className="font-semibold text-8xl flex flex-col justify-center items-center">
              <motion.div
                variants={textVariant(0.7)}
                initial="hidden"
                whileInView="show"
              >
                "Manage Tab
              </motion.div>
              <motion.div
                variants={textVariant(0.9)}
                initial="hidden"
                whileInView="show"
              >
                <span className="text-transparent gradient-text-1 animate-gradient">
                  Intelligently, Browse
                </span>
              </motion.div>
              <motion.div
                variants={textVariant(1.1)}
                initial="hidden"
                whileInView="show"
              >
                like A Hacker."
              </motion.div>
            </div>
            <motion.div
              variants={textVariant(1.1)}
              initial="hidden"
              whileInView="show"
            >
              <div className="pt-7">
                <button
                  onClick={() => {}}
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-3 focus:ring-slate-400 focus:ring-offset-3 focus:ring-offset-slate-50 "
                >
                  <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f44336_0%,#393BB2_50%,#f44336_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    &nbsp;&nbsp;&nbsp;Add to Chrome&nbsp;&nbsp;&nbsp;
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <div className="pb-[800px]">
            <About />
          </div>
        </React.Suspense>
      </div>
    </>
  );
}
