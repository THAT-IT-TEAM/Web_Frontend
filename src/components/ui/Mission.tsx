import { motion } from "motion/react";
import UseMousePosition from "../../utils/UseMousePosition";
import styles from "./page.module.scss";
import { useState } from "react";
const Mission = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = UseMousePosition();
  const size = isHovered ? 400 : 40;
  return (
    <>
      <h1 className="font-bold text-7xl text-red-500 text-center mt-24 mb-24 uppercase font-kicker">
        Our Mission
      </h1>
      <main className={styles.main}>
        <motion.div
          className={styles.mask}
          animate={{
            WebkitMaskPosition: `${x - size * 0.7}px ${y - size * 0.7}px`,
            WebkitMaskSize: `${size}px`,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        >
          <p
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            className="font-nikea text-5xl"
          >
            Our mission is to revolutionize expense tracking by combining the
            power of Web3 with seamless usability. We aim to create a
            <span className="">decentralized</span> platform where teams, DAOs,
            and vendors can securely manage and verify shared expenses without
            relying on centralized tools. By leveraging <span>Web3Auth</span>{" "}
            for effortless login, IPFS for tamper-proof receipt storage, and
            optional on-chain logging for auditability, we provide a
            transparent, trustless, and user-friendly solution that brings
            accountability and accessibility to modern financial collaboration.
          </p>
        </motion.div>
        <div className={styles.body}>
          <p className="font-nikea text-5xl">
            Our mission is to revolutionize expense tracking by combining the
            power of Web3, end-to-end <span>encryption</span>, and{" "}
            <span>decentralization</span>. We aim to create a secure,
            transparent platform where teams, DAOs, and vendors can
            collaboratively manage and verify shared expenses without relying on
            centralized systems. Leveraging Web3Auth for seamless login, IPFS
            for tamper-proof and distributed receipt storage, and optional
            on-chain logging for verifiable audits, our solution ensures data
            privacy, cryptographic integrity, and full user control.
          </p>
        </div>
      </main>
    </>
  );
};

export default Mission;
