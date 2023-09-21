"use client";
import { motion } from "framer-motion";
import { Translate, useLanguage } from "translate-easy";
import { slideIn } from "@/utils/motion";
import { sendEmailVerificationToUser } from "@/lib/firebase";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import { Button, Spinner } from "@material-tailwind/react";
import { useState } from "react";

const VerifyEmailPage = () => {
  const { selectedLanguage } = useLanguage();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const sendVerificationLink = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await sendEmailVerificationToUser(user);
      toast.success(
        <Translate>
          A verification link has been sent to your Email address
        </Translate>,
      );
    } catch (error) {
      toast.error(`Error sending verification link: ${error.code}`);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={slideIn("up", "spring", 0.3, 1, selectedLanguage)}
          className="rounded bg-white p-8 shadow-lg "
        >
          <h1 className="mb-4 text-2xl font-bold text-indigo-500">
            <Translate>Please Verify Your Email address To Continue</Translate>
          </h1>
          <p className="mb-4 text-gray-600">
            <Translate>
              We have sent you an email with a verification link. Please click
              on the link to verify your email address, can't find it?
            </Translate>
            <Button
              onClick={sendVerificationLink}
              variant="text"
              disabled={isLoading}
              // className="cursor-pointer text-blue-500 underline underline-offset-4"
            >
              {isLoading ? (
                <Spinner color="green" className="mx-auto" />
              ) : (
                <Translate>Resend An Email Verification</Translate>
              )}
            </Button>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
