import { easeInOut, motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const PreLoader = () => {
  const navigate = useNavigate();

  const parentVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        easeInOut,
        staggerChildren: 1.5,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const childVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transtion: { duration: 1, ease: easeInOut } },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const loadingMain = setTimeout(() => {
    navigate("/main");
  }, 6000);

  return (
    <div className=" h-screen bg-stone-950 flex justify-center items-center">
      <motion.div
        variants={parentVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 1, staggerChildren: 1 }}
      >
        <motion.span
          className="text-orange-200 font-bold text-4xl uppercase font-title"
          variants={childVariant}
        >
          Loading receipts,{" "}
        </motion.span>

        <motion.span
          className=" bg-orange-200  font-bold text-4xl uppercase font-title rounded-lg"
          variants={childVariant}
          transition={{ delayChildren: 0.5 }}
          whileHover={{ fontSize: "40px", lineHeight: "50px" }}
        >
          <motion.span
            className="text-stone-950 p-1 font-bold text-4xl uppercase font-title "
            variants={childVariant}
          >
            Securing records...
          </motion.span>
        </motion.span>
      </motion.div>
    </div>
  );
};

export default PreLoader;
