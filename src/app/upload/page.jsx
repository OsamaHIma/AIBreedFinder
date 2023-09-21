"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Translate } from "translate-easy";
import { Button, Spinner, IconButton } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/utils/motion";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { TitleText, TypingText } from "@/components/TypingText";
import Navbar from "@/components/Navbar";

const styles = {
  focused: {
    borderColor: "#2196f3",
  },
  accept: {
    borderColor: "#00e676",
    backgroundColor: "rgb(59 130 246 / 0.3)",
  },
  reject: {
    borderColor: "#ff1744",
    backgroundColor: "rgb(220 38 38 / 0.3)",
  },
};

const page = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState();
  const [prediction, setPrediction] = useState(null);
  const [NotifyUser, setNotifyUser] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/jfif": [],
      "image/png": [],
    },
    maxFiles: 1,
    disabled: loading,
  });

  const style = useMemo(
    () => ({
      ...(isFocused && styles.focused),
      ...(isDragAccept && styles.accept),
      ...(isDragReject && styles.reject),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const fileUrl = acceptedFiles[0];
      setPrediction(null);
      setUploadedPhoto(fileUrl);
    }
  }, [acceptedFiles, setUploadedPhoto]);

  const handleRemoveFiles = () => {
    if (uploadedPhoto) {
      URL.revokeObjectURL(uploadedPhoto);
    }
    setUploadedPhoto(null);
    acceptedFiles.splice(0, acceptedFiles.length);
  };
  // Function to send an image for prediction
  const sendImageForPrediction = async () => {
    setIsLoading(true);
    if (!uploadedPhoto) {
      // Handle case where no file is selected
      setIsLoading(false);
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedPhoto);

    try {
      const response = await fetch(
        "https://breed-ai-api.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const { class1, prob1 } = await response.json();
        // Handle the response containing the predictions
        setPrediction({ class1, prob1 });

        NotifyUser &&
          new Notification("The results are here", {
            body: `There is ${prob1.toFixed(
              1,
            )}% that the patient has ${class1}`,
            icon: "/logoTab.svg",
            vibrate: [200, 100, 200],
            sound: "/notification_sound.mp3",
          });

        handleRemoveFiles();
      } else {
        // Handle the error response
        toast.error("Failed to send the image for prediction");
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handelNotifyMe = async () => {
    setNotifyUser(true);
    if ("Notification" in window) {
      const permissionResult = await Notification.requestPermission();
      if (permissionResult === "granted") {
        toast.info("You will be notified please keep this tap open");
      } else {
        toast.error("Please give the website Notification permission");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-no-repeat px-4 py-12 sm:px-6 lg:px-8">
        <div className="z-10 w-full rounded-xl bg-stone-100 p-10 dark:bg-gray-800 sm:max-w-lg shadow-inner">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold "><Translate>Upload an image!</Translate></h2>
            <p className="mt-2 text-sm text-gray-400">
            <Translate>Discover Your Pet's True Identity</Translate>
            </p>
          </div>
          <form className="mt-8 space-y-3" action="#" method="POST">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold tracking-wide text-gray-400">
              <Translate>Attach An Image</Translate>
              </label>
              <div className="flex w-full items-center justify-center">
                <label
                  {...getRootProps({ className: "dropzone", style })}
                  className="group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-blue-400 group-hover:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="mx-auto -mt-10 flex max-h-48 w-2/5 flex-auto">
                      <Image
                        src="/upload.svg"
                        className="object-center"
                        width={300}
                        height={300}
                        alt="upload an image"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm"><Translate>Drag and drop</Translate></span> <Translate>files here</Translate>{" "}
                      <br /> <Translate>or</Translate>{" "}
                      <a
                        href=""
                        id=""
                        className="text-blue-600 hover:underline"
                      >
                        <Translate>select a file</Translate>
                      </a>
                    </p>
                  </div>
                  <input {...getInputProps()} disabled={loading} />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              <span>
              <Translate>(Only *.jpeg, *.jpg, *.jfif and *.png images will be accepted)</Translate>
              </span>
            </p>
            {uploadedPhoto && (
              <div className="relative text-center">
                <IconButton
                  variant="text"
                  disabled={loading}
                  color="red"
                  onClick={handleRemoveFiles}
                  className="my-3 mx-auto rounded-full "
                >
                  <XCircleIcon className="h-7 w-7" />
                </IconButton>
                <Image
                  src={URL.createObjectURL(acceptedFiles[0])}
                  className="relative mx-auto my-3 rounded-lg object-center"
                  width={300}
                  height={300}
                  alt="upload an image"
                />
              </div>
            )}
            <div>
              <Button
                color="indigo"
                size="lg"
                disabled={loading}
                onClick={sendImageForPrediction}
                className="rounded-full"
                fullWidth
              >
                <Translate>Upload</Translate>
              </Button>
            </div>
          </form>
          <div>
          
          </div>
        </div>

        {prediction && (
          <div className="py-8">
            <h4 className="xs:text-[30px] my-8 text-center text-[20px] font-black text-stone-500 dark:text-white sm:text-[40px] md:text-[50px]">
              <Translate>Results</Translate>
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {prediction.prob1 > 0.5 ? (
                <CheckCircleIcon className="text-green-500" size={48} />
              ) : (
                <XCircleIcon className="text-red-500" size={48} />
              )}
              <div className="text-center">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <Translate>There is a</Translate>{" "}
                  <span className="font-bold">
                    {prediction.prob1.toFixed(1)}%
                  </span>{" "}
                  <Translate>probability that the patient has</Translate>{" "}
                  <span className="font-bold text-red-300">
                    {prediction.class1}
                  </span>
                  .
                </p>
                <p className="text-gray-400">
                  <Translate>Based on the prediction model and data.</Translate>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default page;
