"use client";
import React from "react";
import { motion } from "framer-motion";
import { navVariants } from "./../utils/motion";
import styles from "./../styles/index";

export default function Navbar() {
  return (
    <motion.nav variants={navVariants} initial="hidden" whileInView="show">
      <div className="flex h-16 items-center pl-3 gap-4 w-32 ">
        <div className="text-xl pl-2 font-bold ">ReFocus</div>
        <div className="flex h-16 items-center gap-4 pl-4">
          <div className="text-18 px-1 font-semibold">About</div>
          <div className="text-18 px-1 font-semibold">Pricing</div>
        </div>
        <button className="pr-4 absolute right-3 font-semibold text-lg">
          Signin
        </button>
      </div>
    </motion.nav>
  );
}
