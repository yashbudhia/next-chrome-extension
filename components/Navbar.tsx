"use client";
import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navVariants } from "./../utils/motion";
import styles from "./../styles/index";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate={hidden ? "hidden" : "show"}
      className="fixed top-0 left-0 right-0 z-100  w-full h-16 shadow-md"
    >
      <div className="flex h-16 items-center pl-3 gap-4 w-32 ">
        <div className="text-xl pl-2 font-bold ">ReFocus</div>
        <div className="flex h-16 items-center gap-4 pl-4">
          <div className="text-18 px-1 font-semibold">About</div>
          <div className="text-18 px-1 font-semibold">Pricing</div>
        </div>
        <button className="pr-4 absolute right-3 font-semibold text-lg text-transparent gradient-text-2 animate-gradient">
          Signin
        </button>
      </div>
    </motion.nav>
  );
}
