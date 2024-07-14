"use client";
import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navVariants } from "./../utils/motion";
import styles from "./../styles/index";
import Link from "next/link";
import SigninButton from "./SigninButton";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  //session

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // if session is there dont render
  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate={hidden ? "hidden" : "show"}
      className="fixed top-0 left-0 right-0 z-50 w-full h-16 text-white "
    >
      <div className="flex h-16 items-center pl-3 gap-4 w-32 ">
        <Link href="/">
          <div className="text-xl pl-2 font-bold cursor-pointer ">ReFocus</div>
        </Link>
        <div className="flex h-16 items-center gap-4 pl-4">
          <Link href="#features">
            <div className="text-18 px-1 font-semibold">Features</div>
          </Link>
          <Link href="/about">
            <div className="text-18 px-1 font-semibold">About</div>
          </Link>
          <Link href="/contact">
            <div className="text-18 px-1 font-semibold">Contact</div>
          </Link>
        </div>

        <SigninButton />
      </div>
    </motion.nav>
  );
}
