"use client";
import { slideIn, staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";
import { TitleText, TypingText } from "../TypingText";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useLanguage,Translate } from "translate-easy";


const HowItWorks = () => {
  const steps = [
    { text: "Sign up and then an upload link will appear in the navbar", img: "/signup.svg" },
    { text: "Upload a clear photo of your pet", img: "/upload.svg" },
    {
      text: "Our advanced AI algorithms will analyze the photo.",
      img: "/AI.svg",
    },
    {
      text: `Within seconds, we'll provide you with the most likely breed(s) of your pet.
    `,
      img: "/wait.svg",
    },
  ];
  const { selectedLanguage } = useLanguage();
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="innerWidth paddings relative !py-32"
    >
      <TitleText title="How it works" />
      <TypingText title="Three simple steps" textCenter />

      <div className="relative grid grid-cols-1 gap-3 py-16 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          variants={slideIn("down", "tween", 0.3, 1, selectedLanguage)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute bottom-0 left-0 -z-10 h-[70%] w-full rounded-2xl bg-orange-500"
        ></motion.div>

        {steps.map(({ text, img }, index) => (
          <motion.div
            key={index}
            variants={slideIn(
              "up",
              "tween",
              0.5 * index,
              1.3,
              selectedLanguage,
            )}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Card
              className="my-3 max-w-[24rem] mx-auto overflow-hidden shadow-lg md:my-0"
            
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img src={img} alt="" className="aspect-[3/2] object-contain" />
              </CardHeader>
              <CardBody>
                <Typography className="my-3 font-normal">
                <Translate>Step</Translate> {index + 1}
                </Typography>
                <Typography variant="h4" color="blue-gray">
                  <Translate>{text}</Translate>
                </Typography>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;
