import { easeInOut, motion, useAnimate } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PreLoader = () => {
  const navigate = useNavigate();

  const [scope, animate] = useAnimate();

  const animationfunction = async () => {
    await animate("#first", { opacity: 1 }, { duration: 2 });
    await animate("#background", { opacity: 1 }, { duration: 2 });
    await animate("#second", { y: 40, opacity: 1 }, { duration: 2 });
    await setTimeout(() => {
      navigate("/main");
    }, 10);
  };

  useEffect(() => {
    animationfunction();
  }, []);

  return (
    <>
      <div
        ref={scope}
        className=" h-screen bg-black flex justify-center items-center"
      >
        <div>
          <span
            id="first"
            className="text-orange-200 font-bold text-4xl uppercase font-title opacity-0"
          >
            Loading receipts.{"  "}
          </span>
        </div>
        <div
          id="background"
          className="bg-orange-200 p-1 rounded-lg opacity-0 "
        >
          <span
            id="second"
            className="text-black font-bold text-4xl uppercase font-title opacity-0 -translate-y-10"
          >
            Securing records...
          </span>
        </div>
      </div>
    </>
  );
};

export default PreLoader;
