"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { User } from "@prisma/client";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <div className="w-64 h-screen bg-grey">
          <div className="h-18 p-6">
            <div className="flex pl-8">
              <div className="flex items-center gap-2 justify-center border rounded-full hover:rounded-xl p-2 pl-3 pr-3 cursor-pointer">
                <Image
                  src="refocus-2.svg"
                  alt="logo"
                  width={24}
                  height={24}
                ></Image>
                <div className=" font-semibold text-xl">Refocus</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="h-12 flex gap-3 pl-4">
              <Image src="home.svg" alt="home" width={24} height={24}></Image>
              <button className=" font-semibold">Home</button>
            </div>
            <div className="h-12 flex gap-3 pl-4">
              <Image
                src="calendar.svg"
                alt="calendar"
                width={24}
                height={24}
              ></Image>
              <button className=" font-semibold">Routine</button>
            </div>
            <div className="h-12 flex gap-3 pl-4">
              <Image
                src="comp-2.svg"
                alt="rival"
                width={24}
                height={24}
              ></Image>
              <button className=" font-semibold">Rival</button>
            </div>
            <div className="h-12 flex gap-3 pl-4">
              <Image
                src="checklist.svg"
                alt="checklist"
                width={24}
                height={24}
              ></Image>
              <button className=" font-semibold">Priority</button>
            </div>
            <div className="h-12 flex gap-3 pl-4">
              <Image
                src="accuracy.svg"
                alt="consistency"
                width={24}
                height={24}
              ></Image>
              <button className=" font-semibold">Consistency</button>
            </div>
            <div className="h-12 flex gap-3 pl-4">
              <Image
                src="feedback.svg"
                alt="feedback"
                width={24}
                height={24}
              ></Image>
              <button className=" font-semibold"> Leave Feedback</button>
            </div>
            <div className="h-12 flex gap-3 pl-4">
              <Image src="bell.svg" alt="bell" width={24} height={24}></Image>
              <button className=" font-semibold">Subscription</button>
            </div>
          </div>
          <div className="absolute bottom-5 p-3">
            <div className="flex gap-4 items-center">
              <Image
                src={session.user?.image}
                alt="user-profile"
                width={40}
                height={40}
                className="rounded-full"
              ></Image>
              <div className="font-semibold ">{session.user.name ?? ""}</div>

              <button
                onClick={() => {
                  signOut();
                }}
                className=" text-sm pl-5 text-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!session) {
    redirect("/");
  }
}
