"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/firebase";

import Link from "next/link";
import { loginUserSchema } from "@/schema/userSchema";
import { Button, Input, Spinner } from "@material-tailwind/react";
import { Translate } from "translate-easy";
import Image from "next/image";
import { CheckBadgeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      loginUserSchema.validateSync(
        {
          password: password,
        },

        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const res = await resetPassword(oobCode, password);
      setSuccess(true);
      ro
    } catch (error) {
      setError(error.code);
    } finally {
      setIsLoading(false);
    }
  };
  const togglePasswordIcon = () => {
    setPasswordIcon(!passwordIcon);
  };
  return (
    <section className="flex flex-col items-center justify-center paddings innerWidth !py-16">
      <h1 className="text-3xl font-bold mb-4">
        <Translate>Reset your password</Translate>
      </h1>
      <Image src="/password.svg" width={300} height={300} className=" object-contain mx-auto my-7" />
      {!success ? (
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleResetPassword}
        >
          <p className="text-gray-500 dark:text-gray-300 rtl:text-right">
            <Translate>
              Password must contain at least 8 characters, one uppercase letter,
            </Translate>
            <br /> <Translate>one lowercase letter, and one number</Translate>.
          </p>

          <Input
            label={
              <div className="dark:text-gray-300">
                <Translate>New password:</Translate>
              </div>
            }
            type={passwordIcon ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-indigo-300/70 outline-none dark:!border-0 rtl:text-right dark:bg-slate-800 dark:text-stone-300 placeholder:text-slate-50 focus:outline-gray-200`}
            error={error && true}
            icon={
              passwordIcon ? (
                <EyeIcon
                  className="cursor-pointer"
                  onClick={togglePasswordIcon}
                />
              ) : (
                <EyeSlashIcon
                  className="cursor-pointer"
                  onClick={togglePasswordIcon}
                />
              )
            }
          />
          <Input
            label={
              <div className="dark:text-gray-300">
                <Translate>Confirm new password:</Translate>
              </div>
            }
            size="lg"
            type={passwordIcon ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`bg-indigo-300/70 outline-none dark:!border-0 rtl:text-right dark:bg-slate-800 dark:text-stone-300 placeholder:text-slate-50 focus:outline-gray-200`}
            error={error && true}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className=" bg-orange-400" disabled={isLoading}>
            {isLoading ? (
              <Spinner color="green" className="mx-auto" />
            ) : (
              <Translate>Update Password</Translate>
            )}
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <CheckBadgeIcon className="text-green-500 w-32" />
          <h1 className="text-lg rtl:text-right font-semibold dark:text-slate-50">
            <Translate>Your password has been reset successfully,</Translate>{" "}
            <Link href="/" className="text-blue-500 font-semibold underline underline-offset-4">
              <Translate>Sign in</Translate>
            </Link>
            .
          </h1>
        </div>
      )}
    </section>
  );
};

export default ResetPasswordPage;
