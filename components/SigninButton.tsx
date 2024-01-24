"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SigninButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto items-center">
        <p className="text-sky-600">{session.user.name}</p>
        <Image
          src={session.user.image ?? ""}
          alt={session.user.name ?? ""}
          width={32}
          height={32}
        />
        <button onClick={() => signOut()} className="text-red-600">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button className=" absolute right-3 top-4 font-semibold text-lg cursor-pointer z-50 bg-black border pt-1 pb-1 pl-2 pr-2  rounded-xl ">
      Signin
    </button>
  );
}
