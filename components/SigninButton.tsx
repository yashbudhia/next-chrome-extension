"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SigninButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto items-center">
        <Image
          src={
            session.user.image
              ? session.user.image
              : "https://www.svgrepo.com/show/498301/profile-circle.svg"
          }
          alt={session.user.name ?? ""}
          width={40}
          height={40}
          className="rounded-3xl"
        />
        <button
          onClick={() => {
            signOut();
          }}
          className="text-red-600"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className=" absolute right-3 top-4 font-semibold text-lg cursor-pointer z-50 bg-black border pt-1 pb-1 pl-2 pr-2  rounded-xl "
    >
      Signin
    </button>
  );
}
