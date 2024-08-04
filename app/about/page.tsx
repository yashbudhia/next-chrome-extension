import "@fontsource/cascadia-mono";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className=" font-mono flex overflow-hidden">
      <div className="p-4 border shadow-sm bg-slate-950 w-[800px] h-screen">
        <div className="font-semibold text-xl text-orange-600">
          <h2>How it started?</h2>
        </div>
        <div className="flex flex-col gap-2  w-[700px]">
          <div>
            The Idea for refocus first appeared in 20th December 2023. From then
            I, A 2nd year Cybersecurity undergrad has been trying different
            features and finally this as my first project( Yes,This is my first
            project ) conceptualised.
          </div>
          <div>
            I am well aware that dozen extensions like this exist. But While in
            development i didnt even searched chrome webstore once and thought
            of this idea on my own as a way to solve my frustation of opening
            too many tabs. I did get discouraged when i saw that there are a lot
            of extensions like this , still i decided to went off with this . I
            focused on getting the UI to be clean, as minimal bugs as possible
            and some other features to differentiate from others in regards to
            value this extension provides.
          </div>
        </div>
      </div>
      <div className="p-4 border shadow-sm h-screen w-screen">
        <div className="font-semibold text-xl text-orange-600 ">
          <h2>About the developers</h2>
        </div>
        <div className="flex">
          <div className="border w-[400px] mt-5 rounded-xl text-sm h-[600px]">
            <div className="flex flex-col gap-2 items-center justify-center p-2  ">
              <h2 className="">Chief Developer</h2>
              <Link href="https://x.com/YashBudhiya">
                <img
                  src="yash.JPG"
                  alt="Yash Budhia"
                  height={300}
                  width={300}
                  className="opacity-80 hover:opacity-30 cursor-pointer rounded-xl grayscale "
                ></img>
              </Link>
              <div className="pl-6">
                Myself Yash Budhia. I am a Computer science undergrad at Ramiah
                Institute of Technology Bengaluru.
              </div>

              <div>Here are some links to my socials:</div>
              <div className="flex gap-2">
                <div>
                  <Link href="https://x.com/YashBudhiya">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/900px-X_icon_2.svg.png?20231002152819"
                      alt="x"
                      height={50}
                      width={50}
                      className="opacity-100 hover:opacity-30 cursor-pointer rounded-xl "
                    ></img>
                  </Link>
                </div>
                <Link href="https://www.linkedin.com/in/yash-budhia-78643b272/">
                  <img
                    src="https://store-images.s-microsoft.com/image/apps.31120.9007199266245564.44dc7699-748d-4c34-ba5e-d04eb48f7960.bc4172bd-63f0-455a-9acd-5457f44e4473"
                    alt="x"
                    height={50}
                    width={50}
                    className="opacity-100 hover:opacity-30 cursor-pointer rounded-xl "
                  ></img>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-3 flex text-lg justify-center items-center">
            <div className=" mb-[1000px] pl-7">
              <div className=" text-xl pb-3">Other contributors</div>

              <div className="border shadow-sm rounded-xl p-3">
                <Link href="https://github.com/VaibhavRaina">
                  Vaibhav Raina (Bug Bounty)
                  <img
                    src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU"
                    alt="github"
                    height={40}
                    width={40}
                    className="opacity-100 hover:opacity-30 cursor-pointer rounded-xl "
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
