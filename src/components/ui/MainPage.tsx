import { motion, useScroll } from "motion/react";
import PopUP from "./PopUp";
import { InfiniteMovingCards } from "./InfiniteMovingCards";
import { projects } from "../../Data/FeaturesData";
import Card from "./FeaturesCard";
import { useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import Mission from "./Mission";
import PriceComponent from "./PriceComponent";
import Faq from "./Faq";
import Footer from "./Footer";

const MainPage = () => {
  const lenis = useLenis();

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <>
      <ReactLenis root />
      <motion.div className=" bg-gradient-dark bg-[length:120%_120%] animate-gradient-pan w-full h-auto overflow-clip">
        <PopUP />
        <div className="h-[35rem] rounded-md flex flex-col antialiased bg-white dark:bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards direction="right" speed="slow" />
        </div>

        {/*Features */}

        <div className=" w-full text-5xl font-bold text-white flex justify-center mt-[17vh] relative font-kicker">
          Features
        </div>
        <div ref={container} className="relative">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                {...project}
                progress={scrollYProgress}
                range={[i * 0.16, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>

        {/* Our Aim */}
        <Mission />
        {/* price */}
        <div className="h-screen mt-[25vh]">
          <h1 className="text-center text-7xl font-bold text-white font-kicker">
            Pricing
          </h1>
          <PriceComponent />
        </div>
        {/* FAQ's */}
        <div className="h-[80vh] mt-[20vh]">
          <h1 className="text-center text-7xl font-bold text-white font-kicker">
            FAQ's
          </h1>
          <Faq />
        </div>
        {/*Footer */}
        <Footer />
      </motion.div>
    </>
  );
};

export default MainPage;
