import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress: any; // ideally, type as MotionValue<number> from framer-motion
  range: [number, number];
  targetScale: number;
}

const Features: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-[10vh]  "
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-1/4 h-[500px] w-[1000px] rounded-[25px] p-[50px] origin-top bg-[#1f1f22] shadow-neumorphic "
      >
        <h2 className="text-center m-0 text-[38px] text-bold text-white">
          {title}
        </h2>

        <div className="flex h-full mt-[50px] gap-[50px]">
          {/* Description */}
          <div className="w-[40%] relative top-[10%]">
            <p className="text-[20px] font-semibold text-white">
              {description}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-[60%] h-full rounded-[25px] overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <img
                src={src}
                alt="card"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
