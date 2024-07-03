"use client";

import React from "react";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";
import CircleGradient from "./ux/circle-gradient";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";
import HeroVideo from "@/public/videos/hero.m4v";

const About = React.lazy(() => import("./About"));
import Extension from "./../app/extension";
import { TracingBeam } from "./ui/tracingbeam";
import { on } from "events";

export default function LandingPage() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <div>
        <div className="flex p-4 pl-16 mb-4 h-[750px]">
          <div className="h-[400px] md:h-[800px] flex flex-col justify-center  p-6 mb-5">
            <div className="font-semibold text-3xl md:text-6xl flex flex-col justify-center z-[220px]">
              <motion.div
                variants={textVariant(0.7)}
                initial="hidden"
                whileInView="show"
              >
                Manage Tabs
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
                like A Hacker.
              </motion.div>
            </div>
            <motion.div
              variants={textVariant(1.1)}
              initial="hidden"
              whileInView="show"
              className="text-start gap-2 pt-5 text-slate-400"
            >
              "Do you ever felt like your brain freezes when you have too many
              tabs open?
              <br />
              If yes! then you are at the right place."
            </motion.div>
            <motion.div
              variants={textVariant(1.1)}
              initial="hidden"
              whileInView="show"
            >
              <div className="pt-7 ">
                <button
                  onClick={() => {}}
                  className="relative z-40 inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-3 focus:ring-slate-400 focus:ring-offset-3 focus:ring-offset-slate-50 "
                >
                  <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f44336_0%,#393BB2_50%,#f44336_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    &nbsp;&nbsp;&nbsp;Add to Chrome&nbsp;&nbsp;&nbsp;
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={textVariant(1.1)}
            initial="hidden"
            whileInView="show"
            className="absolute right-10 top-[200px] z-[200px] p-4 "
          >
            <video
              width="900"
              height="700"
              preload="auto"
              src="/videos/hero.m4v"
              autoPlay
              loop
              muted
              playsInline
              className="ml-4 rounded-xl shadow-xl object-left  "
            ></video>
          </motion.div>
        </div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <div className="pb-[400px] md:pb-[800px] ">
            <About />
          </div>
        </React.Suspense>
      </div>
    </>
  );
}
