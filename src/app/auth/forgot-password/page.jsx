"use client";
import { sendPasswordResetEmailToUser } from "@/lib/firebase";
import { forgotPasswordSchema } from "@/schema/userSchema";
import { Button, Input, Spinner } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { Translate } from "translate-easy";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      forgotPasswordSchema.validateSync(
        {
          email: email,
        },

        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    setIsLoading(true);
    try {
      const res = await sendPasswordResetEmailToUser(email);
      setSuccess(true);
    } catch (error) {
      setError(error.code);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-20 !py-16">
      <h1 className="text-3xl font-bold mb-4">
        <Translate>
          {success ? "Password reset link sent" : "Forgot your password?"}
        </Translate>
      </h1>
      <Image src="/forgot.svg" width={300} height={300} className=" object-contain mx-auto my-7" />
      {!success ? (
        <form
          className="w-full max-w-lg flex flex-col gap-4"
          onSubmit={handleResetPassword}
        >
          <Input
            label={
              <div className="dark:text-gray-300">
                <Translate>Enter Your Email Address</Translate>
              </div>
            }
            size="lg"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`bg-indigo-300/70 outline-none dark:!border-0 dark:bg-slate-800 dark:text-stone-300 placeholder:text-slate-50 focus:outline-gray-200`}
            error={error && true}
            autoComplete="email"
          />
          {error && (
            <div className="text-red-500 text-sm">
              <Translate>{error}</Translate>
            </div>
          )}
          <Button type="submit" className=" bg-orange-400" disabled={isLoading}>
            {isLoading ? (
              <Spinner color="green" className="mx-auto" />
            ) : (
              <Translate>Reset Password</Translate>
            )}
          </Button>
        </form>
      ) : (
        <div className="text-lg w-full max-w-lg mt-3 font-semibold dark:text-slate-50">
          <Translate>
            If the email address exist in our database, A password reset link
            will be sent to your email address
          </Translate>{" "}
          .
        </div>
      )}
    </div>
  );
};
export default ForgotPasswordPage;
