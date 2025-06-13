import { IoPerson } from "react-icons/io5";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopUP = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.2], [10, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2], [-100, 200]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 0.9]);

  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const textTranslateY = useTransform(scrollYProgress, [0, 0.2], [0, 40]);
  const blur = useTransform(scrollYProgress, [0, 0.2], [0, 10]);

  const finalBlur = useMotionTemplate`blur(${blur}px)`;

  const navigate = useNavigate();

  const admin = "src/assets/images/Admin_Dashboard.png";

  const user = "src/assets/images/User_Dashboard.png";

  const [userInterface, setUserInterface] = useState<string>(user);

  const changeInterface = () => {
    const image = userInterface === admin ? user : admin;
    setUserInterface(image);
  };

  const buttonText = userInterface === admin ? "User" : "Admin";

  const handleLoginPage = () => {
    navigate("/login");
  };
  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        className="h-[190vh] w-full bg-transparent z-10 flex flex-col items-center  [perspective:1200px] relative "
      >
        <div className="h-[20vh] bg-transparent w-full ">
          <div className="bg-black h-[10vh] flex items-center">
            <div>
              <h1 className="text-white font-ortland text-5xl px-6">
                Expensync
              </h1>
            </div>
            <div className="text-white absolute right-20">
              <ul className="flex">
                <a href="/main" className="px-5 font-ortland text-2xl">
                  HOME
                </a>
                <a href="/about" className="px-5 font-ortland text-2xl">
                  ABOUT
                </a>
                <a href="/contact" className="px-5 font-ortland text-2xl">
                  CONTACT
                </a>
              </ul>
            </div>
            <div className="absolute right-0 px-5">
              <IoPerson
                className="text-white w-9 h-9"
                onClick={() => handleLoginPage()}
              />
            </div>
          </div>
        </div>
        <motion.h1
          style={{
            scale: textScale,
            translateY: textTranslateY,
            opacity: textOpacity,
            filter: finalBlur,
          }}
          className="text-8xl text-white font-bold text-center font-kicker mt-[10vh]"
        >
          Track Expenses. Prove Everything <br />
          Trust Nothing Off-Chain.
        </motion.h1>
        <motion.div
          style={{
            rotateX: rotateX,
            translateZ: "220px",
            y: translateY,
            scale: scale,
          }}
          className="w-[65%] rounded-3xl -mt-6 h-[1800px] bg-white shadow-2xl p-1 border border-neutral-100 [transform-style:preserve-3d]"
        >
          <div className="bg-black h-full w-full rounded-[20px] p-2">
            <div className="bg-neutral-100 h-full w-full rounded-[12px]">
              <img src={userInterface} className="" alt="trial" />
            </div>
          </div>
        </motion.div>
        <button
          className="elegant-btn relative overflow-clip px-6 py-3 border-2 border-[#2c2c2c] bg-[#1a1a1a] text-white text-[1.2rem] font-bold rounded-full transition-all duration-400 ease-in-out hover:border-[#666666] hover:bg-[#292929] font-eudoxussans mx-[50%] mt-[20%]"
          onClick={() => {
            changeInterface();
          }}
        >
          {buttonText}
        </button>
      </div>
    </AnimatePresence>
  );
};

export default PopUP;
