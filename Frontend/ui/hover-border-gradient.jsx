"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "div",
  duration = 1,
  clockwise = true,
  highlightColor = "#3275F8",
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = currentDirection => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: `radial-gradient(20.7% 50% at 50% 0%, ${highlightColor} 0%, rgba(255, 255, 255, 0) 100%)`,
    LEFT: `radial-gradient(16.6% 43.1% at 0% 50%, ${highlightColor} 0%, rgba(255, 255, 255, 0) 100%)`,
    BOTTOM: `radial-gradient(20.7% 50% at 50% 100%, ${highlightColor} 0%, rgba(255, 255, 255, 0) 100%)`,
    RIGHT: `radial-gradient(16.2% 41.2% at 100% 50%, ${highlightColor} 0%, rgba(255, 255, 255, 0) 100%)`,
  };

  const highlight = `radial-gradient(75% 181.16% at 50% 50%, ${highlightColor} 0%, rgba(255, 255, 255, 0) 100%)`;

  useEffect(() => {
    let interval;
    if (!hovered) {
      interval = setInterval(() => {
        setDirection(prevState => rotateDirection(prevState));
      }, duration * 1000);
    }
    return () => clearInterval(interval);
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-xl border-0 content-center bg-transparent items-center flex-col flex-nowrap justify-center overflow-hidden p-px w-full h-full transition-all duration-300",
        containerClassName
      )}
      {...props}
    >
      <div className={cn("w-full h-full bg-[#2D2B3D] rounded-[inherit] relative z-10", className)}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: movingMap[direction],
          filter: "blur(10px)",
        }}
        animate={{
          background: hovered ? highlight : movingMap[direction],
          filter: hovered ? "blur(15px)" : "blur(10px)",
          opacity: hovered ? 0.7 : 0.3,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={{
          rotate: hovered ? 0 : 360,
        }}
        transition={{
          duration: duration * 4,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${highlightColor}00 0deg, ${highlightColor} 180deg, ${highlightColor}00 360deg)`,
          filter: "blur(10px)",
          opacity: 0.2,
        }}
      />
    </Tag>
  );
}