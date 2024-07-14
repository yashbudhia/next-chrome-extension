import Link from "next/link";

export default function Footer() {
  return (
    <section>
      <div className="pt-10 bg-slate-950">
        <div className="flex items-center gap-3 ml-[325px] pb-6">
          <div>
            <img src="refocus.ico" alt="Refocus" className="w-10 h-10" />
          </div>
          <div className="flex flex-col">
            Refocus{" "}
            <div className=" font-light text-gray-400 text-sm">
              The all in one productivity extension
            </div>
          </div>
          <div className=" cursor-pointer pl-6 text-white hover:text-gray-400">
            about us{" "}
          </div>
          <div className=" cursor-pointer pl-6 text-white hover:text-gray-400">
            contact us{" "}
          </div>
          <div className=" cursor-pointer pl-6 text-white hover:text-gray-400">
            Download from webstore{" "}
          </div>
          <Link href="/terms&service">
            <div className=" cursor-pointer pl-6 text-white hover:text-gray-400">
              Terms and service{" "}
            </div>
          </Link>
          <Link href="/privacy">
            <div className=" cursor-pointer pl-6 text-white hover:text-gray-400">
              Privacy policy{" "}
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center text-gray-400 pb-4">
          <div>
            <hr className="w-[1100px] border-1 border-gray-700" />
          </div>
          <div className="p-3 pt-4">©Refocus, All rights reserved</div>
        </div>
      </div>
    </section>
  );
}
