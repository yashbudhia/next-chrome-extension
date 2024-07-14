import React from "react";
import { TracingBeam } from "./ui/tracingbeam";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";
import Features from "./Features";

export default function About() {
  return (
    <TracingBeam className="flex justify-center z-[300px] h-[2100px]">
      <div
        id="features"
        className="mt-12 pt-24 w-[1200px] z-50 flex flex-col items-center"
      >
        <div className="flex flex-col  justify-center items-center">
          <motion.div
            variants={textVariant(1.0)}
            initial="hidden"
            whileInView="show"
            className=" font-sans font-medium text-3xl md:text-7xl text-center text-transparent gradient-text-1 animate-gradient"
          >
            Switch Effortlessly
          </motion.div>
          <div>
            <motion.div
              variants={textVariant(1.1)}
              initial="hidden"
              whileInView="show"
              className="text-start gap-2 pt-5 text-slate-400"
            >
              Create Different workspaces for your different moods
            </motion.div>
          </div>
          <motion.div
            variants={textVariant(1.4)}
            initial="hidden"
            whileInView="show"
            className="z-[200px] p-4 pt-8 "
          >
            <video
              width="1400"
              height="900"
              preload="auto"
              src="/videos/about.m4v"
              autoPlay
              loop
              muted
              playsInline
              className="ml-4 rounded-xl shadow-xl object-left  "
            ></video>
          </motion.div>
        </div>
        <Features />
      </div>
    </TracingBeam>
  );
}
