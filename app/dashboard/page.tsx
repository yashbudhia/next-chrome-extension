"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();

  if (session) {
    return <div>Tell us about yourself</div>;
  }
  if (!session) {
    redirect("/");
  }
}
