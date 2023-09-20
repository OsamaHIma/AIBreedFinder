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
import { signIn } from "next-auth/react";
import { loginUserSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import { Translate } from "translate-easy";

import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = ({ open, handleOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isRememberedUser, setIsRememberedUser] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      loginUserSchema.validateSync(
        {
          email: email,
          password: password,
        },

        { abortEarly: false },
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    setIsLoading(true);

    try {
      const user = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!user.error) {
        handleRememberUser();
        // router.push(`/upload`);
        toast.success("Singed in successfully");
      } else {
        setError([user.error]);
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(err.code || err.message || err);
      console.error("error sing in user" + err);
    }
    setIsLoading(false);
  };

  const handleRememberUser = () => {
    if (isRememberedUser) {
      localStorage.setItem("current-user", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("current-user");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("current-user"));
    if (!user) return;
    setIsRememberedUser(true);
    setEmail(user.email);
    setPassword(user.password);
  }, []);

  return (
    <section>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]" >
          <CardHeader
            variant="gradient"
            color="indigo"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
            <Translate>Sign In</Translate>
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label={<Translate>Email</Translate>}
              type="email"
              value={email}
              autoComplete="on"
              required
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
            <Input
              label={<Translate>Password</Translate>}
              type={isShowPassword ? "text" : "password"}
              value={password}
              size="lg"
              autoComplete="on"
              required
              icon={
                !isShowPassword ? (
                  <EyeIcon
                    onClick={() => setIsShowPassword(true)}
                    className="cursor-pointer rounded-md "
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={() => setIsShowPassword(false)}
                    className="cursor-pointer rounded-md "
                  />
                )
              }
              onChange={(e) => setPassword(e.target.value)}
              error={error}
            />
            <div className="-ml-2.5">
              <Checkbox
                label={
                  <div className="dark:text-gray-300">
                    <Translate>Remember Me</Translate>
                  </div>
                }
                onChange={(e) => setIsRememberedUser(e.target.checked)}
                checked={isRememberedUser}
                value={isRememberedUser || ""}
                id="remember-me"
              />
            </div>
            {error && (
              <ol className="mx-4 flex list-decimal flex-col gap-1 text-red-500 ltr:text-left rtl:text-right">
                {error.map((err, key) => {
                  return (
                    <li key={key} className="my-2">
                      *<Translate>{err}</Translate>
                    </li>
                  );
                })}
              </ol>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="outline-none"
              fullWidth
              type="button"
              variant="gradient"
              color="indigo"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <Spinner color="green" className="mx-auto" />
              ) : (
                <Translate>Log In</Translate>
              )}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </section>
  );
};

export default Login;
