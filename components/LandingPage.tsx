"use client";

import React, { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { navVariants, textVariant } from "@/utils/motion";

export default function LandingPage() {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  let mouseSize = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    let clientX2 = clientX; // Initialize clientX2 with clientX

    // Ensure clientX stays near 850
    clientX2 = 740 + clientX / 10;

    console.log(clientX2);

    let xPosition = clientX2 - left;
    let yPosition = clientY / 8 - top - 70;
    let size = 750 + clientY / 5;

    mouseX.set(xPosition);
    mouseY.set(yPosition);
    mouseSize.set(size);

    console.log(clientX, clientY, size);
  }
  return (
    <>
      <div className="relative w-screen h-screen">
        <div className="absolute w-[50%] inset-0 opacity-10 " />
        <motion.div
          onMouseMove={handleMouseMove}
          className="absolute inset-0 opacity-20"
          style={{
            background: useMotionTemplate`radial-gradient(${mouseSize}px circle at ${mouseX}px ${mouseY}px,rgb(95, 180, 245),transparent 80%)`,
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
