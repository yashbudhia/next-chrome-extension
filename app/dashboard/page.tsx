"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
          <div className="flex flex-col gap-3 divide-y divide-slate-700">
            <Button>Home</Button>
            <Button>Routine</Button>
            <Button>Rival</Button>
            <Button>Priority</Button>
            <Button>Consistency</Button>
            <Button>Leave Feedback</Button>
            <Button>My Plan</Button>
          </div>
        </div>
      </div>
    );
  }
  if (!session) {
    redirect("/");
  }
}
