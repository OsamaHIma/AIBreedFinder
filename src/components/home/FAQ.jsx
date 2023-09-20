"use client";
import { staggerContainer } from "@/utils/motion";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { Translate } from "translate-easy";
import { motion } from "framer-motion";
import { TitleText, TypingText } from "../TypingText";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
const FAQ = () => {
  const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      //   viewport={{ once: true }}
      className="innerWidth paddings"
    >
      <TypingText
        title="| Frequently Asked Questions"
        textStyles="text-center"
      />
      <TitleText title="FAQ" textStyles="text-center" />
      <div className="py-10">
        <Accordion
          animate={CUSTOM_ANIMATION}
          open={open === 1}
          icon={
            <ChevronDownIcon
              className={`${
                1 === open ? "rotate-180" : ""
              } h-5 w-5 transition-transform`}
            />
          }
          className="mb-4"
        >
          <AccordionHeader
            className="dark:text-stone-100 dark:hover:text-gray-300"
            onClick={() => handleOpen(1)}
          >
            <Translate>How accurate are the breed predictions?</Translate>
          </AccordionHeader>
          <AccordionBody>
            <h1 className="text-xl dark:text-stone-100">
              <Translate>
                Our AI algorithms strive for high accuracy, but it's important
                to note that the predictions are based on the uploaded photo and
                might have a margin of error due to factors like photo quality
                or mixed breed heritage.
              </Translate>
            </h1>
          </AccordionBody>
        </Accordion>

        <Accordion
          animate={CUSTOM_ANIMATION}
          open={open === 2}
          icon={
            <ChevronDownIcon
              className={`${
                2 === open ? "rotate-180" : ""
              } h-5 w-5 transition-transform`}
            />
          }
          className="mb-4"
        >
          <AccordionHeader
            className="dark:text-stone-100 dark:hover:text-gray-300"
            onClick={() => handleOpen(2)}
          >
            <Translate>
              Can I use PetBreedFinder for other animals besides cats and dogs?
            </Translate>
          </AccordionHeader>
          <AccordionBody>
            <h1 className="text-xl dark:text-stone-100">
              <Translate>
                Currently, PetBreedFinder focuses exclusively on cat and dog
                breeds. We do not provide breed identification for other animals
                at this time.
              </Translate>
            </h1>
          </AccordionBody>
        </Accordion>

        <Accordion
          animate={CUSTOM_ANIMATION}
          open={open === 3}
          icon={
            <ChevronDownIcon
              className={`${
                3 === open ? "rotate-180" : ""
              } h-5 w-5 transition-transform`}
            />
          }
          className="mb-4"
        >
          <AccordionHeader
            className="dark:text-stone-100 dark:hover:text-gray-300"
            onClick={() => handleOpen(3)}
          >
            <Translate>
              How do I interpret the results if my pet is identified as a mixed
              breed?
            </Translate>
          </AccordionHeader>
          <AccordionBody className="stone-300 dark:stone-100">
            <h1 className="text-xl dark:text-stone-100">
              <Translate>
                If your pet is identified as a mixed breed, the results will
                provide a list of potential breeds that contribute to its
                genetic makeup. This can help you understand the various
                characteristics present in your pet.
              </Translate>
            </h1>
          </AccordionBody>
        </Accordion>
      </div>
    </motion.section>
  );
};
export default FAQ;
