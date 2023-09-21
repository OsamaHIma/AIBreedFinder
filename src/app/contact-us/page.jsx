"use client";
import { Button, Input, Spinner, Textarea } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { Translate } from "translate-easy";
import emailjs from "@emailjs/browser";
import { contactSchema } from "@/schema/userSchema";
import {
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const page = () => {
  const formRef = useRef();
  const [Form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      contactSchema.validateSync(
        {
          name: Form.name,
          email: Form.email,
          // phone: Form.phone,
          message: Form.message,
        },

        { abortEarly: false },
      );
    } catch (error) {
      setLoading(false);
      setError(error.errors);

      return;
    }

    emailjs
      .send(
        "service_eflfu3e",
        "template_9rfs3ie",
        {
          to_name: "Osama",
          user_name: Form.name,
          user_email: Form.email,
          user_phone: Form.phone
            ? Form.phone
            : "User didn't provide a phone number",
          website_name: "AI Breed Finder",
          message: Form.message,
        },
        "6vrrdolbRvNzcJ0Xp",
      )
      .then(
        () => {
          setLoading(false);
          toast.success(
            <p>
              <Translate>Thank you</Translate>{" "}
              <span className="font-bold text-green-500">{Form.name}</span>
              !,{" "}
              <Translate>
                we&apos;ve got your message and we&apos;ll reach out to you soon
              </Translate>
              .
            </p>,
            {
              position: "top-right",
              autoClose: 5700,
            },
          );
          setForm({ name: "", email: "", message: "", phone: "" });
        },
        (err) => {
          setLoading(false);
          toast.error(
            <p>
              <Translate>Sorry</Translate>{" "}
              <span className="font-extrabold text-[#ee524d]">{Form.name}</span>
              <Translate>
                {" "}
                something went wrong while submitting the form error:{err}
              </Translate>
              .
            </p>,
          );
          console.error(err);
        },
      );
  };

  return (
    <div className="container mx-auto my-24 md:px-6">
      <section className="mb-32">
        <div className="relative h-[300px] overflow-hidden bg-[url('https://mdbcdn.b-cdn.net/img/new/textures/full/171.jpg')] bg-cover bg-[50%] bg-no-repeat"></div>
        <div className="container px-6 md:px-12">
          <div className="-mt-[100px] block rounded-lg bg-[hsla(0,0%,100%,0.7)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 md:py-16">
            <div className="mb-12 grid gap-x-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="mx-auto mb-12 text-center lg:mb-0">
                <GlobeAltIcon className="h-8 w-8 mx-auto" />
                <h6 className="font-medium">Egypt</h6>
              </div>
              <div className="mx-auto mb-12 text-center lg:mb-0">
                <MapPinIcon className="h-8 w-8 mx-auto" />
                <h6 className="font-medium">Tanta</h6>
              </div>
              <div className="mx-auto mb-6 text-center md:mb-0">
                <EnvelopeIcon className="mx-auto h-8 w-8" />
                <h6 className="font-medium">
                  <a href="mailto:innova.tech.solutions.team@gmail.com" className=" underline underline-offset-4">
                    innova.tech.solutions.team@gmail.com
                  </a>
                </h6>
              </div>
            </div>
            <div className="mx-auto max-w-[700px]">
              <form
                className="flex flex-col gap-8"
                onSubmit={handelSubmit}
                noValidate
              >
                <Input
                  label={
                    <div className="dark:text-gray-300">
                      <Translate>Name</Translate>
                    </div>
                  }
                  size="lg"
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="on"
                  required
                  onChange={handelChange}
                  className="text-stone-800 dark:text-gray-300"
                  color="indigo"
                  error={error && true}
                />
                <Input
                  label={<Translate>Email</Translate>}
                  type="email"
                  name="email"
                  autoComplete="on"
                  required
                  onChange={handelChange}
                  className="text-stone-800 dark:text-gray-300"
                  size="lg"
                  color="indigo"
                  error={error}
                />
                <Input
                  label={<Translate>Phone (optional)</Translate>}
                  type="tel"
                  name="phone"
                  autoComplete="on"
                  onChange={handelChange}
                  className="text-stone-800 dark:text-gray-300"
                  size="lg"
                  color="indigo"
                  error={error}
                />
                <Input
                  label={<Translate>Message</Translate>}
                  autoComplete="on"
                  required={true}
                  type="text"
                  name="message"
                  onChange={handelChange}
                  className="h-16 text-stone-800 dark:text-gray-300"
                  size="lg"
                  color="indigo"
                  error={error}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="inline-block w-full rounded bg-indigo-800 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-stone-100 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-indigo-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0"
                >
                  {loading ? (
                    <Spinner className="mx-auto" />
                  ) : (
                    <Translate translations={{ ar: "أرسل" }}>Send</Translate>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
