"use client";

import React, { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { navVariants, textVariant } from "@/utils/motion";

export default function LandingPage() {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    console.log(currentTarget);
    let { left, top } = currentTarget.getBoundingClientRect();
    let xPosition = clientX - left;
    let yPosition = clientY - top;

    mouseX.set(xPosition);
    mouseY.set(yPosition);
  }
  return (
    <>
      <div className="relative w-screen h-screen">
        <div className="absolute w-[50%] inset-0 opacity-10 " />
        <motion.div
          onMouseMove={handleMouseMove}
          className="absolute inset-0 opacity-20"
          style={{
            background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px,rgb(95, 180, 245),transparent 80%)`,
          }}
        />
        <div className="h-[800px] flex flex-col justify-center items-center">
          <div className="font-semibold text-8xl flex flex-col justify-center items-center">
            <motion.div
              variants={textVariant(0.7)}
              initial="hidden"
              whileInView="show"
            >
              "Never Compromise
            </motion.div>
            <motion.div
              variants={textVariant(0.9)}
              initial="hidden"
              whileInView="show"
            >
              on Your Productivity
            </motion.div>
            <motion.div
              variants={textVariant(1.1)}
              initial="hidden"
              whileInView="show"
            >
              again"
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
