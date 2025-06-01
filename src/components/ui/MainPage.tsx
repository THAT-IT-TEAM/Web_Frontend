import { motion } from "motion/react";
import PopUP from "./PopUp";
import { InfiniteMovingCards } from "./InfiniteMovingCards";

const MainPage = () => {
  return (
    <motion.div
      className=" bg-gradient-dark bg-[length:120%_120%] animate-gradient-pan w-full h-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PopUP />
      <div className="h-[35rem] rounded-md flex flex-col antialiased bg-white dark:bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards direction="right" speed="slow" />
      </div>
    </motion.div>
  );
};

export default MainPage;
