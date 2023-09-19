"use client";

import {
  slideIn,
  staggerContainer,
  textVariant,
  textVariant2,
} from "@/utils/motion";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useLanguage } from "translate-easy";
import { TypingText } from "../TypingText";

const HeroSection = () => {
  const { selectedLanguage } = useLanguage();
  return (
    <div className="bg-[url('/foot-print.png')] bg-opacity-50 ">
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="innerWidth paddings relative z-10 !py-16"
      >
        <div className="absolute bottom-0 left-0 -z-10 h-full w-full bg-gradient-to-t from-stone-50 to-transparent dark:from-gray-900"></div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-side order-last mt-16 flex flex-col gap-4 md:order-first md:my-auto  md:gap-7">
            <motion.h1
              initial="hidden"
              whileInView="show"
              variants={textVariant()}
              className="mb-6 text-3xl font-bold leading-[60px] text-deep-purple-900 dark:text-stone-50 md:text-5xl md:leading-[80px]"
            >
              Discover Your Pet's <br />
              <span className="border-b-[10px] border-orange-500 text-6xl">
                True Identity
              </span>
            </motion.h1>
            {/* <motion.h3
            initial="hidden"
            whileInView="show"
            variants={textVariant(0.3)}
            className="text-gray-500"
          >
            Unveil the Secrets of Your Cat or Dog's Ancestry with AI
          </motion.h3> */}
            <TypingText title="Unveil the Secrets of Your Cat or Dog's Ancestry with AI" />
            <Button
              size="lg"
              className="max-w-fit rounded-full bg-indigo-600 py-5"
            >
              Find My Pet's Breed
            </Button>
          </div>
          <div className="picture-side relative order-first  md:order-last">
            <div className="shape absolute left-12 top-0 -z-[1] h-[24rem] w-[24rem] bg-orange-500 md:h-[31rem] md:w-[31rem]" />
            <div className="grid grid-cols-2 ">
              <div className="flex flex-col gap-2">
                <motion.img
                  initial="hidden"
                  whileInView="show"
                  variants={slideIn("left", "tween", 0.3, 1, selectedLanguage)}
                  src="/cat.png"
                  className="w-56 rounded-md border-2 border-dashed border-gray-300 bg-stone-200/50 p-3 backdrop-blur-lg md:w-[18.5rem]"
                  // width={300}
                  // height={300}
                />
                <motion.img
                  initial="hidden"
                  whileInView="show"
                  variants={slideIn("up", "tween", 0.5, 1, selectedLanguage)}
                  src="/kitty.png"
                  className="w-56 rounded-md border-2 border-dashed border-gray-300 bg-stone-200/50 p-3 backdrop-blur-lg md:w-[18.5rem]"
                  // width={400}
                  // height={400}
                />
              </div>
              <motion.img
                initial="hidden"
                whileInView="show"
                variants={slideIn("right", "tween", 0.8, 1, selectedLanguage)}
                src="/dogg.png"
                className="absolute right-0 top-0 w-56 rounded-md border-2 border-dashed border-gray-300 bg-stone-200/50 p-3 backdrop-blur-lg md:w-[18.5rem]"
                // width={300}
                // height={300}
              />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
