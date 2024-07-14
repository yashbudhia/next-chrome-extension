import { textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving";
import Footer from "./Footer";

export default function Review() {
  const testimonials = [
    {
      review:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      image: "A Tale of Two Cities",
    },
    {
      review:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      image: "Hamlet",
    },
    {
      review: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      image: "A Dream Within a Dream",
    },
  ];

  return (
    <section>
      <div className="flex flex-col  justify-center items-center mt-14 pt-28">
        <motion.div
          variants={textVariant(1.0)}
          initial="hidden"
          whileInView="show"
          className=" font-sans font-medium text-3xl md:text-7xl text-center text-transparent gradient-text-1 animate-gradient"
        >
          See What others has to <br />
          say about it..
        </motion.div>
      </div>
      <div className="z-50 pt-10 p-4">
        <InfiniteMovingCards
          items={testimonials}
          speed="slow"
          direction="right"
          pauseOnHover={true}
        />
      </div>
    </section>
  );
}
