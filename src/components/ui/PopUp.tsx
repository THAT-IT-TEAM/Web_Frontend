import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

const PopUP = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.2], [8, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const textTranslateY = useTransform(scrollYProgress, [0, 0.2], [0, 40]);
  const blur = useTransform(scrollYProgress, [0, 0.2], [0, 10]);

  const finalBlur = useMotionTemplate`blur(${blur}px)`;

  const user =
    "https://assets.justinmind.com/wp-content/uploads/2020/02/dashboard-examples-social-media.png";

  const admin = "src/assets/images/shadcn.png";

  const [userInterface, setUserInterface] = useState<string>(admin);
  const [visibility, setVisibility] = useState<boolean>(true);

  const changeInterface = () => {
    const image = userInterface === admin ? user : admin;
    setUserInterface(image);
  };
  return (
    <AnimatePresence>
      <div
        ref={containerRef}
        className="h-[190vh] w-full bg-transparent z-10 flex flex-col items-center py-[400px] [perspective:1200px] relative "
      >
        <motion.h1
          style={{
            scale: textScale,
            translateY: textTranslateY,
            opacity: textOpacity,
            filter: finalBlur,
          }}
          className="text-8xl text-white font-bold text-center font-kicker"
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
          className="w-[65%] rounded-3xl -mt-6 h-[700px] bg-white shadow-2xl p-1 border border-neutral-100 [transform-style:preserve-3d]"
        >
          <div className="bg-black h-full w-full rounded-[20px] p-2">
            <div className="bg-neutral-100 h-full w-full rounded-[12px]">
              <img
                src={userInterface}
                className=" w-full h-full"
                height={1024}
                width={1024}
                alt="trial"
              />
            </div>
          </div>
        </motion.div>
      </div>
      <button
        className=" m-4 bg-white text-black mt-8 px-6 py-3 rounded-lg font-bold mx-[50%]"
        onClick={() => {
          changeInterface();
        }}
      >
        User
      </button>
    </AnimatePresence>
  );
};

export default PopUP;
