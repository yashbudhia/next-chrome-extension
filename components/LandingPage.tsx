"use client";

import React, { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function LandingPage() {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    let xPosition = clientX - left;
    let yPosition = clientY - top;

    mouseX.set(xPosition);
    mouseY.set(yPosition);
  }
  return (
    <>
      <div className="absolute inset-0 opacity-10 gradient-01" />
      <motion.div
        onMouseMove={handleMouseMove}
        className="absolute inset-0 opacity-20"
        style={{
          background: useMotionTemplate`radial-gradient(750px circle at ${mouseX}px ${mouseY}px,rgb(14 165 233),transparent 80%)`,
        }}
      />
      <div className="text-semibold text-9xl">
        For Those Who are serious about their Productivity
      </div>
    </>
  );
}
