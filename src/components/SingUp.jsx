"use client";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Translate } from "translate-easy";

import { toast } from "react-toastify";
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import TermsModal from "./TermsModal";
import { signUpSchema } from "@/schema/userSchema";
import {
  addUserWithEmailAndPassword,
  createUserDocument,
} from "@/lib/firebase";
import { signIn } from "next-auth/react";

const SignUp = ({ open, handleOpen }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleTermsClick = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const toggleIsShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      signUpSchema.validateSync(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password: formData.password_confirmation,
          termsCheckbox: termsChecked,
        },

        { abortEarly: false },
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { user } = await addUserWithEmailAndPassword(
        formData.email,
        formData.password,
      );

      // await createUserDocument(user, {
      //   name: formData.name,
      //   password: formData.password,
      // });

      await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      toast.success(
        `Email verification link has been sent to your email: ${formData.email}`,
      );
      //   router.push(`/verify`);
    } catch (err) {
      toast.error("Something went wrong: " + err.code || err.message || err);
    }
    setLoading(false);
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full ">
        <CardHeader
          variant="gradient"
          color="indigo"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex !max-h-[23rem] flex-col  gap-4 overflow-y-auto">
          <Input
            label="Name"
            type="name"
            name="name"
            value={formData.name}
            size="lg"
            autoComplete="on"
            required
            onChange={handleInputChange}
            error={error}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            size="lg"
            autoComplete="on"
            required
            onChange={handleInputChange}
            error={error}
          />
          <div className="">
            <Input
              label={<Translate>Password</Translate>}
              type={isShowPassword ? "text" : "password"}
              value={formData.password}
              name="password"
              size="lg"
              autoComplete="on"
              required
              icon={
                isShowPassword ? (
                  <EyeIcon
                    onClick={toggleIsShowPassword}
                    className="cursor-pointer rounded-md "
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={toggleIsShowPassword}
                    className="cursor-pointer rounded-md "
                  />
                )
              }
              onChange={handleInputChange}
              error={error}
            />
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 text-xs font-normal  md:text-sm"
            >
              <InformationCircleIcon className="-mt-px h-6 w-6 text-yellow-800 " />
              <Translate>
                Use at least 8 characters, one uppercase, one lowercase and one
                number.
              </Translate>
            </Typography>
          </div>

          <Input
            label={<Translate>Confirm Password</Translate>}
            type={isShowPassword ? "text" : "password"}
            id="password_confirmation"
            name="password_confirmation"
            autoComplete="on"
            value={formData.password_confirmation}
            required
            onChange={handleInputChange}
            size="lg"
            error={error}
          />
           {error && (
            <ol className="mx-4 flex list-decimal flex-col gap-1 text-red-500 ltr:text-left rtl:text-right">
              {error.map((err, key) => {
                return (
                  <li key={key} className="my-1">
                    *<Translate>{err}</Translate>
                  </li>
                );
              })}
            </ol>
          )}
          <div className="-ml-2.5 flex items-center gap-3">
            <Checkbox
              id="termsCheckbox"
              value={termsChecked}
              onChange={handleCheckboxChange}
            />
            <p className="text-sm rtl:text-right">
              <Translate>I agree to the</Translate>{" "}
              <span
                className="cursor-pointer font-semibold text-blue-500 hover:underline"
                onClick={handleTermsClick}
              >
                <Translate>Terms and Conditions</Translate>
              </span>
            </p>
          </div>
          {showTermsModal && (
            <TermsModal open={showTermsModal} handleOpen={closeTermsModal} />
          )}
         
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            // className="bg-indigo-600 hover:bg-indigo-700 py-4"
            className="outline-none"
            fullWidth
            variant="gradient"
            color="indigo"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Spinner color="green" className="mx-auto" />
            ) : (
              <Translate>Sign Up</Translate>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default SignUp;
