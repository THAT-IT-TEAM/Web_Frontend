import Spline from "@splinetool/react-spline";
import { motion } from "motion/react";

const MainPage = () => {
  return (
    <motion.div
      className=" bg-stone-950 relative w-full h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Spline
        scene="https://prod.spline.design/5l5mWlgmR61-YoIa/scene.splinecode"
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="bg-transparent z-10 h-[40vh]"></div>
      <div className="relative z-10 p-10 h-[60vh] rounded text-white bg-stone-950 ">
        <h1 className="text-4xl font-bold">Welcome to My Site</h1>
        <p>This content is overlaid on top of the Spline background.</p>
      </div>
    </motion.div>
  );
};

export default MainPage;
