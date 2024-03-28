import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TopMenu = ({ data }) => {
  const animationKeyRef = useRef(0);

  const textVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      animationKeyRef.current += 1;
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="topmenuStyle">
      {data.length > 0 && (
        <marquee
          className="marqueeText"
          direction="left"
          style={{ paddingRight: "15%", marginRight: "0%" }}
        >
          Total Records : <span>{data.length}</span>
        </marquee>
      )}
      <motion.h1
        key={animationKeyRef.current}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={textVariants}
        whileHover={{ scale: 1.1 }}
        className="BlackCoffer"
      >
        News 24 * 7
      </motion.h1>
      <marquee
        direction="Down"
        scrollamount="2"
        style={{ marginLeft: "30%", color: "red", height: "3vh" }}
      >
        Breaking News
      </marquee>
    </div>
  );
};

export default TopMenu;
