"use client";
import { Translate, useLanguage } from "translate-easy";
import { motion } from "framer-motion";
import { slideIn, staggerContainer, textVariant } from "@/utils/motion";
import { TypingText } from "../TypingText";
const AboutUs = () => {
  const { selectedLanguage } = useLanguage();
  return (
    <>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="overflow-hidden pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]"
        dir="ltr"
        id="about-us"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center justify-between">
            <div className="w-full px-4 lg:w-6/12">
              <div className="-mx-3 flex items-center sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <motion.img
                      variants={slideIn(
                        "up",
                        "tween",
                        0.3,
                        1,
                        selectedLanguage,
                      )}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      src="/deer.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <motion.img
                      variants={slideIn(
                        "up",
                        "tween",
                        0.6,
                        1,
                        selectedLanguage,
                      )}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      src="/dog.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <motion.img
                      variants={slideIn(
                        "up",
                        "tween",
                        0.9,
                        1,
                        selectedLanguage,
                      )}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      src="/leobard.jpg"
                      alt=""
                      className="w-full rounded-2xl"
                    />
                    <span className="absolute -bottom-7 -right-7 z-[-1]">
                      <img src="/dots.svg" alt="" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                {/* <span className="block mb-2 text-lg font-semibold text-primary">
                 <Translate>Why Choose Us</Translate>
                </span> */}
                <TypingText title="Why Choose Us" />
                <motion.h2
                  variants={textVariant(0.3)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-dark mb-8 text-3xl font-bold sm:text-4xl"
                >
                  <Translate>Discover Your Pet's Breed with Ease.</Translate>
                </motion.h2>
                <motion.p
                  variants={textVariant(0.5)}
                  initial="hidden"
                  viewport={{ once: true }}
                  whileInView="show"
                  className="text-body-color mb-8 text-base"
                >
                  <Translate>
                    At our website, we are passionate about helping you uncover
                    the mystery behind your beloved pet's breed. With the power
                    of AI and advanced algorithms, we provide accurate and
                    reliable breed detection results. Whether you have a cat or
                    a dog, our platform can analyze their unique characteristics
                    and provide you with valuable insights into their genetic
                    heritage.
                  </Translate>
                </motion.p>
                {/* <a
                  href="/#"
                  className="inline-flex items-center justify-center px-10 py-4 text-base font-normal text-center rounded-lg bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                 <Translate> Get Started</Translate>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default AboutUs;
