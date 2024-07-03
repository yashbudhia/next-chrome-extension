import { textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import Review from "./Reviews";

export default function Features() {
  return (
    <>
      <div>
        <div className="flex flex-col  justify-center items-center mt-14 pt-28">
          <motion.div
            variants={textVariant(1.0)}
            initial="hidden"
            whileInView="show"
            className=" font-sans font-medium text-3xl md:text-7xl text-center text-transparent gradient-text-1 animate-gradient"
          >
            Less is More..
          </motion.div>
          <div>
            <motion.div
              variants={textVariant(1.1)}
              initial="hidden"
              whileInView="show"
              className="text-start gap-2 pt-5 text-slate-400"
            >
              Automatically Reminds you everytime you open more than 10 tabs.
              <br />
              This allows you to save memory and avoids brain freezes due to too
              much information.
              <br />
              Note - This will only work once per 10 minutes. This also gets
              reset if you close the Browser.
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
              src="/videos/close.m4v"
              autoPlay
              loop
              muted
              playsInline
              className="ml-4 rounded-xl shadow-xl object-left  "
            ></video>
          </motion.div>
        </div>
        <Review />
      </div>
    </>
  );
}
