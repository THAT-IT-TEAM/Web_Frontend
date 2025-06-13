import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { TypewriterEffectSmoothDemo } from "./TypewriterEffect";

export interface InfiniteMovingCardsProps {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const items = [
    {
      quote:
        "Finally, a tracker that brings transparency to shared expenses — and does it on-chain. It’s like Google Sheets met Ethereum!",
      name: " Priya Nair",
      title: "Head of Finance, DAOstack Labs",
      image:
        "https://www.dpreview.com/files/p/articles/6566520415/ADiallo1495.jpg",
    },
    {
      quote:
        "The Web3Auth login is seamless — no wallet setup headaches for our team. Just log in and track. Game changer.",
      name: "Miguel Santos",
      title: "Project Manager, MetaCollab DAO",
      image:
        "https://marservis.hr/wp-content/uploads/2021/05/portrait-square-04.jpg",
    },
    {
      quote:
        "We used it to manage hackathon reimbursements across vendors. The receipts-on-IPFS part? Chef’s kiss for compliance.",
      name: "Amara Thompson",
      title: "Operations Lead, BlockBridge Ventures",
      image:
        "https://www.kellyheckphotography.com/wp-content/uploads/2022/02/Amber-1705-cropped.jpg",
    },
    {
      quote:
        "Expense reports we can trust, with cryptographic proof. This tool helped us resolve disputes in minutes instead of weeks.",
      name: "Jared Kim",
      title: "Legal & Audit Officer, OpenTrust Finance",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4xmOGZQJgkwEgsP8HwSF8br8ZEGh8uVvcVw&s",
    },
    {
      quote:
        "Loved how it tracks multiple contributors' expenses in one place, with on-chain visibility. Perfect for cross-team workflows.",
      name: "Sofia Delgado",
      title: " Community Treasurer, Hack3rsUnited",
      image:
        "https://www.babseacle.org/wp-content/uploads/2018/09/portrait-square-10.jpg",
    },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      setDirection();
      setSpeed();
      setStart(true);
    }
  };

  const setDirection = () => {
    containerRef.current?.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const setSpeed = () => {
    let duration = "40s";
    if (speed === "fast") duration = "40s";
    else if (speed === "slow") duration = "80s";
    containerRef.current?.style.setProperty("--animation-duration", duration);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-[95rem] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <div className="flex justify-center items-center mb-20">
        <TypewriterEffectSmoothDemo />
      </div>
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-gray-50 bg-[#141414] px-8 py-6 md:w-[450px] shadow-neumorphic"
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-xl leading-[1.6] font-normal text-neutral-800 dark:text-gray-100 font-eudoxussans">
                {item.quote}
              </span>

              <div className="relative z-20 mt-6 flex flex-row items-center">
                <img
                  src={item.image}
                  alt="profile"
                  className="rounded-full object-cover mx-2 border border-gray-50"
                  height={60}
                  width={60}
                />
                <span className="flex flex-col gap-1">
                  <span className="text-lg leading-[1.6] font-bold text-neutral-500 dark:text-gray-400 font-tommy">
                    {item.name}
                  </span>
                  <span className="text-md leading-[1.6] font-normal text-neutral-500 dark:text-gray-400 font-eudoxussans">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
