"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from "translate-easy";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <UserProvider>
          <LanguageProvider>
            <ToastContainer
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={1}
              toastClassName="dark:!bg-gray-800 dark:text-indigo-100 !z-[100]"
            />

            {children}
          </LanguageProvider>
        </UserProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};
export default Providers;
