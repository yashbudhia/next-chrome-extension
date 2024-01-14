import React from "react";

export default function Navbar() {
  return (
    <div className="flex h-16">
      <div className="flex h-16 items-center pl-3 gap-4 w-32">
        <div className="text-xl pl-2 font-bold ">ReFocus</div>
        <div className="flex h-16 items-center gap-4 pl-4">
          <div className="text-18 px-1 font-semibold">About</div>
          <div className="text-18 px-1 font-semibold">Signin</div>
          <div className="text-18 px-1 font-semibold">Login</div>
        </div>
      </div>
    </div>
  );
}
