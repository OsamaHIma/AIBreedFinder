"use client";

import NextImage from "next/image";

import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Translate } from "translate-easy";
import { Button, Spinner, IconButton } from "@material-tailwind/react";

import { toast } from "react-toastify";
import { CameraIcon, XCircleIcon } from "@heroicons/react/24/outline";


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

const UploadPage = () => {

  const [uploadedPhoto, setUploadedPhoto] = useState();
  const [selectedModal, setSelectedModal] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [loading, setIsLoading] = useState(false);

  const draw_image_and_boxes = (file, boxes) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.className = "rounded-lg mt-3";
    img.onload = () => {
      const canvas = document.querySelector("#canvas-id");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      ctx.strokeStyle = "#3f51b5";
      ctx.lineWidth = 3;
      ctx.font = "62px poppins";

      boxes.forEach(([x1, y1, x2, y2, label, probability]) => {
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        ctx.fillStyle = "#3f51b5";
        const width = "300px";
        ctx.fillRect(x1, y1, width + 10, 25);
        ctx.fillStyle = "#3f51b5";
        const probabilityText = document.getElementById("probabilityText");
        probabilityText.textContent = `${(probability * 100).toFixed(
          2,
        )}% it's a ${label}`;
        probabilityText.className =
          "absolute max-h-fit rounded-lg bg-indigo-500 px-5 py-3";
        probabilityText.style.left = `${(x1 / img.width) * 100}%`;
        probabilityText.style.top = `${(y1 / img.height) * 100}px`;
        // ctx.fillText(
        //   `${(probability * 100).toFixed(2)}% it's a ${label}`,
        //   x1,
        //   y1 + 18,
        // );
      });
    };
  };

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
      const file = acceptedFiles[0];
      setUploadedPhoto(file);
      // draw_image_and_boxes(file, [[157, 212, 853, 1280, "vizsla", 0.95]]);
      setImagePath(URL.createObjectURL(file));
    }
  }, [acceptedFiles, setUploadedPhoto]);

  const handleCapturePhoto = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const video = document.createElement('video');
      const photoCanvas = document.createElement('canvas');
      const photoContext = photoCanvas.getContext('2d');

      video.srcObject = mediaStream;
      video.onloadedmetadata = () => {
        video.play();
        photoCanvas.width = video.videoWidth;
        photoCanvas.height = video.videoHeight;
        photoContext.drawImage(video, 0, 0, photoCanvas.width, photoCanvas.height);

        const imageDataURL = photoCanvas.toDataURL('image/png');
        const blob = dataURLtoBlob(imageDataURL);
        const file = new File([blob], 'captured_photo.png');

        setImagePath(URL.createObjectURL(file));
        setUploadedPhoto(file);

        video.srcObject?.getTracks().forEach((track) => track.stop());
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    if (!dataURL) return null;

    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Function to send an image for prediction
  const sendImageForPrediction = async () => {
    if (!selectedModal) {
      // Handle case where no service is selected
      setIsLoading(false);
      toast.error("Please select a service");
      return;
    }
    if (!uploadedPhoto) {
      // Handle case where no file is selected
      setIsLoading(false);
      toast.error("Please select an image");
      return;
    }

    const modelUrls = {
      cat: "https://dogs-api-o5xd.onrender.com/detect",
      dog: "https://dogssssss-api.onrender.com/detect",
      eye: "https://dogs-desies-api.onrender.com/detect",
      animal: "https://animalss-api.onrender.com/detect",
    };
    const formData = new FormData();
    formData.append("image_file", uploadedPhoto, "image_file");

    setIsLoading(true);
    try {
      const response = await fetch(modelUrls[selectedModal], {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        // Handle the response containing the predictions
        draw_image_and_boxes(uploadedPhoto, responseData);
        setImagePath('')
      } else {
        // Handle the error response
        toast.error("Failed to send the image for detection");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("error sending the image", error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center bg-cover bg-no-repeat px-4 py-12 sm:px-6 lg:px-8">
        <div className="z-10 w-full rounded-xl bg-stone-100 p-10 shadow-inner dark:bg-gray-800 sm:max-w-lg">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold ">
              <Translate>Upload an image!</Translate>
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              <Translate>Discover Your Pet's True Identity</Translate>
            </p>
          </div>

          <div className="my-7">
            <label
              for="countries"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              <Translate>Select an option</Translate>
            </label>
            <select
              onChange={(e) => {
                setSelectedModal(e.target.value);
              }}
              id="countries"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option value="" selected>
                <Translate>Choose a service</Translate>
              </option>
              <option value="cat">
                <Translate>Cat breeds Detection</Translate>
              </option>
              <option value="dog">
                <Translate>Dogs breeds Detection</Translate>
              </option>
              <option value="animal">
                <Translate>
                  Unknown Animal (if your are not sure which animal is in the
                  photo we'll Detect it for ya)
                </Translate>
              </option>
              <option value="eye">
                <Translate>Dog's eye disease Detection</Translate>
              </option>
            </select>
          </div>

          <form className="mt-8 space-y-3" action="#" method="POST">
            <div className="grid grid-cols-1 space-y-2">
              <div className="grid grid-cols-3 items-center">
                <label className="text-sm font-bold tracking-wide text-gray-400 ">
                  <Translate>Attach An Image</Translate>
                </label>
                <p className=" text-center ">Or</p>
                <Button
                  variant="text"
                  color="indigo"
                  // className="rounded-full whitespace-nowrap"
                  onClick={handleCapturePhoto}
                >
                  <CameraIcon className="inline h-7 w-7" />
                  <span className="whitespace-nowrap">
                    <Translate>Take a picture</Translate>
                  </span>
                </Button>
              </div>

              <div
                {...getRootProps({ className: "dropzone", style })}
                className="flex w-full items-center justify-center"
              >
                <label className="group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center">
                  <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                    <div className="mx-auto -mt-10 flex max-h-48 w-2/5 flex-auto">
                      <NextImage
                        src="/upload.svg"
                        className="object-center"
                        width={300}
                        height={300}
                        alt="upload an image"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">
                        <Translate>Drag and drop</Translate>
                      </span>{" "}
                      <Translate>files here</Translate> <br />{" "}
                      <Translate>or</Translate>{" "}
                      <span className="cursor-pointer text-blue-600 hover:underline">
                        <Translate>select a file</Translate>
                      </span>
                    </p>
                  </div>
                  <input {...getInputProps()} disabled={loading} />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              <span>
                <Translate>
                  (Only *.jpeg, *.jpg, *.jfif and *.png images will be accepted)
                </Translate>
              </span>
            </p>
            {imagePath && (
              <div className="relative text-center">
                <IconButton
                  variant="text"
                  disabled={loading}
                  color="red"
                  onClick={() => setImagePath("")}
                  className="mx-auto my-3 rounded-full "
                >
                  <XCircleIcon className="h-7 w-7" />
                </IconButton>
                <h1 className="mb-3">Selected Image</h1>
                <NextImage
                  src={imagePath}
                  className="relative mx-auto my-3 max-w-[17rem] rounded-lg object-center"
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
                {loading ? (
                  <Spinner color="green" className="mx-auto" scale={1.7} />
                ) : (
                  <Translate>Upload</Translate>
                )}
              </Button>
            </div>
          </form>

          <div className="relative">
            <canvas
              className="relative mt-5 block max-w-full rounded-lg"
              id="canvas-id"
            ></canvas>
            <p id="probabilityText"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
