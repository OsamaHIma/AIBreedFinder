"use client";

import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "../utils/motion";
import { Translate } from "translate-easy";
/**
 * Display a title.
 * @param {string} title - The title to be displayed.
 * @param {boolean} textCenter
 * @param textStyles
 */

export const TypingText = ({ title, textStyles, textCenter = false }) => (
  <motion.p
    variants={textContainer}
    className={`${textStyles} ${textCenter && "text-center"} text-gray-400`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);

/**
 * Display a title.
 * @param {string} title - The title to be displayed.
 * @param textStyles
 */
export const TitleText = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] text-center text-[40px] font-bold  dark:text-gray-200 md:text-[64px] ${textStyles}`}
  >
    <Translate>{title}</Translate>
  </motion.h2>
);
