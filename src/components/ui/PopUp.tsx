import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

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

  return (
    <div
      ref={containerRef}
      className="h-[190vh] w-full bg-transparent z-10 flex flex-col items-center py-[400px] [perspective:1200px] "
    >
      <motion.h1
        style={{
          scale: textScale,
          translateY: textTranslateY,
          opacity: textOpacity,
          filter: finalBlur,
        }}
        className="text-8xl text-white font-bold text-center"
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
        className="w-[65%] rounded-3xl -mt-6 h-[700px] bg-white shadow-2xl p-2 border border-neutral-100 [transform-style:preserve-3d]"
      >
        <div className="bg-black h-full w-full rounded-[16px] p-2">
          <div className="bg-neutral-100 h-full w-full rounded-[12px]">
            <img
              src="src\assets\images\shadcn.png"
              className="h-full w-full"
              height={1024}
              width={1024}
              alt="trial"
            />
          </div>
        </div>
        <button className=" m-4 bg-white text-black mt-8 px-6 py-3 rounded-lg font-bold">
          User
        </button>
      </motion.div>
    </div>
  );
};

export default PopUP;
