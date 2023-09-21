"use client";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/lib/firebase";
import { toast } from "react-toastify";
import { playFireWorks } from "@/lib/fireWorks";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import {  EnvelopeIcon } from "@heroicons/react/24/outline";
import { Translate } from "translate-easy";
import Link from "next/link";

const EmailVerificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyEmail = async () => {
    try {
      await verifyEmail(oobCode);
      setIsVerified(true);
      playFireWorks();
    } catch (error) {
      toast.error(error.code);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center  ">
        <motion.div
          initial={{ opacity: 0, translateY: "2rem" }}
          animate={{ opacity: 1, translateY: 0 }}
          className="max-w-xs rounded bg-white p-8 shadow-md"
        >
          {!isVerified && (
            <div className="text-center">
              <EnvelopeIcon className="mx-auto h-12 w-12 text-indigo-500" />
              <h2 className="text-2xl font-bold text-stone-800">
                <Translate>Verify Email</Translate>
              </h2>
              <p className="my-2 text-gray-600">
                <Translate>
                  Click the button below to verify your email address.
                </Translate>
              </p>
              <Button
                onClick={handleVerifyEmail}
                className="mt-4 bg-orange-500 py-4 text-white hover:bg-orange-700"
              >
                <Translate>Verify Email</Translate>
              </Button>
            </div>
          )}
          {isVerified && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex w-full flex-col gap-3"
            >
              <Image
                width={200}
                height={150}
                priority
                src="/emailVerified.svg"
                alt="Email Verified"
                className="mx-auto max-w-[17rem] object-contain"
              />
              <div>
                <h2 className="text-center text-2xl font-bold text-gray-600">
                  <Translate>Email Verified!</Translate>
                </h2>
                <p className="text-center text-gray-600">
                  <Translate>
                    Thank you for verifying your email, now you can
                  </Translate>{" "}
                  <Link href="/upload" className="text-blue-500 underline underline-offset-2">
                    <Translate>Upload An Image</Translate>
                  </Link>
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default EmailVerificationPage;
