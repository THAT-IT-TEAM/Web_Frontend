import { useEffect } from "react";
import FilesUpload from "./FilesUpload";
import Graph from "./Graph";
import NavBar from "./NavBar";
import OverView from "./OverView";
import VendorExpense from "./VendorExpense";
import api from "../api";
import { motion } from "motion/react";

const User = () => {
  return (
    <>
      <NavBar />
      <FilesUpload />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen h-auto w-full flex flex-col justify-center items-center bg-[#161616]"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-impact text-5xl text-white p-6 mt-6"
        >
          Admin Dashboard
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 1,
            ease: "easeOut"
          }}
          className="border border-gray-50 rounded-2xl p-6 mb-6 flex flex-col justify-center items-center shadow-neumorphic min-w-[1668px]"
        >
          <OverView />
          <VendorExpense />
          <Graph />
        </motion.div>
      </motion.div>
    </>
  );
};

export default User;
