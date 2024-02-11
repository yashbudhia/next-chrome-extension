"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { User } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import HomeLogo from "./../svg/Home";

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  const handleDivClick = (item: any) => {
    setSelectedItem(item);
    router.push(`/dashboard/${item}`);
  };

  return (
    <div className="w-64 h-screen bg-grey">
      <div className="h-18 p-6">
        <div className="flex pl-8">
          <div className="flex items-center gap-2 justify-center border rounded-full hover:rounded-xl p-2 pl-3 pr-3 cursor-pointer">
            <Image src="refocus-2.svg" alt="logo" width={24} height={24} />
            <div className="font-semibold text-xl">Refocus</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div
          className={`sidebar-div ${
            selectedItem === "home" ? "bg-green-500" : ""
          }`}
          onClick={() => handleDivClick("home")}
        >
          <HomeLogo />
          <button className="font-semibold">Home</button>
        </div>

        <div
          className={`sidebar-div ${
            selectedItem === "routine" ? "bg-green-500" : ""
          }`}
          onClick={() => handleDivClick("routine")}
        >
          <Image src="calendar.svg" alt="calendar" width={24} height={24} />
          <button className="font-semibold">Routine</button>
        </div>

        <div
          className={`sidebar-div ${
            selectedItem === "rival" ? "bg-green-500" : ""
          }`}
          onClick={() => handleDivClick("rival")}
        >
          <Image src="comp-2.svg" alt="rival" width={24} height={24} />
          <button className="font-semibold">Rival</button>
        </div>
        <div
          className={`sidebar-div ${
            selectedItem === "priority" ? "bg-green-500" : ""
          }`}
          onClick={() => handleDivClick("priority")}
        >
          <Image src="checklist.svg" alt="checklist" width={24} height={24} />
          <button className="font-semibold">Priority</button>
        </div>
        <div
          className={`sidebar-div ${
            selectedItem === "consistency" ? "bg-green-500" : ""
          }`}
          onClick={() => handleDivClick("consistency")}
        >
          <Image src="accuracy.svg" alt="consistency" width={24} height={24} />
          <button className="font-semibold">Consistency</button>
        </div>
        <div
          className={`sidebar-div ${
            selectedItem === "feedback" ? "bg-green-500" : ""
          }`}
          onClick={() => handleDivClick("feedback")}
        >
          <Image src="feedback.svg" alt="feedback" width={24} height={24} />
          <button className="font-semibold">Leave Feedback</button>
        </div>
        <div
          className={`sidebar-div ${
            selectedItem === "subscription" ? "bg-green-500" : ""
          }`}
          onClick={() => handleDivClick("subscription")}
        >
          <Image src="bell.svg" alt="bell" width={24} height={24} />
          <button className="font-semibold">Subscription</button>
        </div>
      </div>
      <div className="absolute w-64 bottom-5 p-3 border-t-2 pb-2 ">
        <div className="flex gap-3 items-center ">
          <Image
            src={session?.user?.image || ""}
            alt="user-profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
          <div className="font-semibold cursor-pointer p-2 ">
            {session?.user?.name ?? ""}
          </div>
          <button
            onClick={() => {
              signOut();
            }}
            className="absolute text-sm right-0 pr-2 text-red-700"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
