import { easeInOut, motion } from "motion/react";
const PreLoader = () => {
  const parentVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        easeInOut,
        staggerChildren: 1,
      },
    },
  };

  const childVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transtion: { duration: 1, easeInOut } },
  };

  return (
    <motion.div variants={parentVariant} initial="hidden" animate="visible">
      <motion.span
        className="  text-orange-200 font-bold text-4xl uppercase font-title relative"
        variants={childVariant}
      >
        Loading receipts,{" "}
      </motion.span>
      <motion.span
        className=" text-orange-200 bg-orange-200 p-1 font-bold text-4xl uppercase font-title "
        variants={childVariant}
      ></motion.span>
      <motion.span
        className="text-stone-950 bg-orange-200 p-1 font-bold text-4xl uppercase font-title "
        variants={childVariant}
        whileHover={{ fontSize: "40px", lineHeight: "46px" }}
      >
        securing records...
      </motion.span>
    </motion.div>
  );
};

export default PreLoader;
