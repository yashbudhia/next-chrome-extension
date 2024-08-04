"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Import SVG icons
import HomeLogo from "../svg/Home";
import CalendarLogo from "../svg/calendar";
import ChecklistLogo from "../svg/checklist";
import AccuracyLogo from "../svg/accuracy";
import FeedbackLogo from "../svg/feedback";
import BellLogo from "../svg/bell";
import Comp2 from "../svg/comp2";
import SettingsLogo from "./../svg/settings";

// Define sidebar items
const sidebarItems = [
  { key: "home", icon: <HomeLogo />, label: "Home" },

  { key: "share", icon: <Comp2 />, label: "Share Workspace" },
  { key: "voice", icon: <ChecklistLogo />, label: "Voice Mode" },
  { key: "settings", icon: <SettingsLogo />, label: "Settings" },
  { key: "feedback", icon: <FeedbackLogo />, label: "Leave Feedback" },
  { key: "subscription", icon: <BellLogo />, label: "Subscription" },
];

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState("grey");
  const { data: session } = useSession();
  const router = useRouter();

  const handleDivClick = (itemKey: string, event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedItem(itemKey);
    router.push(`/dashboard/${itemKey}`);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-grey/90 backdrop-blur-md overflow-y-auto">
      <div className="h-18 p-6">
        <div className="flex pl-8">
          <div className="flex items-center gap-2 justify-center border rounded-full hover:rounded-xl p-2 pl-3 pr-3 cursor-pointer">
            <img
              src="/refocus2.png"
              alt="refocus"
              className="h-5 w-5 rounded-2xl"
            />
            <div className="font-semibold text-xl">Refocus</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <div
            key={item.key}
            className={`sidebar-div ${
              selectedItem === item.key ? "bg-green-500" : ""
            }`}
            onClick={(event) => handleDivClick(item.key, event)}
          >
            {item.icon}
            <button className="font-semibold">{item.label}</button>
          </div>
        ))}
      </div>
      <div className="absolute w-64 bottom-5 p-3 border-t-2 pb-2">
        <div className="flex gap-3 items-center">
          <Image
            src={session?.user?.image || ""}
            alt="user-profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
          <div className="font-semibold cursor-pointer p-2">
            {session?.user?.name ?? ""}
          </div>
          <button
            onClick={async () => {
              await signOut();
              window.location.href = "/";
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
