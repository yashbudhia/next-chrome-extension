import React from "react";
import { TracingBeam } from "./ui/tracingbeam";

export default function About() {
  return (
    <TracingBeam>
      <section className="pt-24 p-10">
        <div className="flex flex-col justify-center items-center">
          <div className=" font-sans font-medium text-3xl md:text-7xl text-center">
            Create Workspaces, Save Time
          </div>
          <div>
            Never lose your progress, save tabs and continue whenever you want
          </div>
        </div>
      </section>
    </TracingBeam>
  );
}
