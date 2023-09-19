"use client";
import { slideIn, staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";
import { TitleText, TypingText } from "../TypingText";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { useLanguage } from "translate-easy";
const HowItWorks = () => {
  const steps = [
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
      className="innerWidth paddings !py-32"
    >
      <TitleText title="How it works" />
      <TypingText title="Three simple steps" textCenter />

      <div className="grid grid-cols-1 py-16 md:grid-cols-3">
        {steps.map(({ text, img }, index) => (
          <motion.div
            variants={slideIn("up", "tween", 0.3 * index, 1, selectedLanguage)}
            initial="hidden"
            whileInView="show"
          >
            <Card
              className="max-w-[24rem] overflow-hidden bg-slate-400"
              key={index}
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
                  Step {index + 1}
                </Typography>
                <Typography variant="h4" color="blue-gray">
                  {text}
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
