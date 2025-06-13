import { useTransform, useScroll, motion } from "motion/react";
import { useRef } from "react";
const Card = ({
  i,
  src,
  title,
  description,
  progress,
  range,
  targetScale,
}: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className=" h-[100vh] flex items-center justify-center sticky top-0 -translate-y-10"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[500px] w-[1000px] rounded-[25px] p-[50px] origin-top bg-[#141414] border border-gray-50 text-white shadow-neumorphic"
      >
        <h2 className="text-center m-0 text-[28px] font-nikea text-red-500">
          {title}
        </h2>
        <div className="flex h-full mt-[50px] gap-[50px]">
          <div className="w-[40%] relative top-[10%] flex justify-center ">
            <p className="text-[20px] font-eudoxussans ">{description}</p>
          </div>

          <div className="relative w-[60%] h-full rounded-[25px] overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <img
                className="object-cover rounded-[25px]"
                src={src}
                alt="image"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
