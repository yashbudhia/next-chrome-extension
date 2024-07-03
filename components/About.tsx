import React from "react";
import { TracingBeam } from "./ui/tracingbeam";
import { motion } from "framer-motion";
import { textVariant } from "@/utils/motion";

export default function About() {
  return (
    <TracingBeam>
      <section className="pt-24 p-10">
        <div className="flex flex-col justify-center items-center">
          <motion.div
            variants={textVariant(0.7)}
            initial="hidden"
            whileInView="show"
            className=" font-sans font-medium text-3xl md:text-7xl text-center"
          >
            Workspaces for all your needs
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
        </div>
      </section>
    </TracingBeam>
  );
}
