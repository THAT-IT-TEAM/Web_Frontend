import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

export const SlideTabs = () => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {}, []);
  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 1,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-gray-50 bg-[#161616] p-1 -translate-x-32 font-Mollen"
    >
      <Tab setPosition={setPosition}>Dashboard</Tab>
      <Tab setPosition={setPosition}>Expense</Tab>
      <Tab setPosition={setPosition}>Vendors</Tab>
      <Tab setPosition={setPosition}>Reports</Tab>
      <Tab setPosition={setPosition}>Team</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
}: {
  children: string;
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const ref = useRef<null | HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-white md:h-12"
    />
  );
};
