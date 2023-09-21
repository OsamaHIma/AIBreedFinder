"use client";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowUpTrayIcon,
  LifebuoyIcon,
  HomeIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { createElement, useEffect, useState } from "react";
import ThemeSelector from "./ThemeSelector";
import { navVariants } from "@/utils/motion";
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import Login from "./Login";
import { SignOutUser } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import SignUp from "./SingUp";
import { Translate } from "translate-easy";
import Link from "next/link";

const NavList = () => {
  const { user } = useUser();
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:p-1">
      <ThemeSelector />
      <LanguageSelector />
      <Link href="/" className="font-normal dark:text-gray-50">
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <HomeIcon className="h-[18px] w-[18px]" />
          <Translate translations={{ ar: "الصفحة الرئيسية" }}>Home</Translate>
        </ListItem>
      </Link>
      {user && (
        <Link href="/upload" className="font-normal  dark:text-gray-50">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <ArrowUpTrayIcon className="h-[18px] w-[18px]" />
            <Translate>Upload</Translate>
          </ListItem>
        </Link>
      )}

      {/* <NavListMenu /> */}
      {/* <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <ProfileMenu />
        </ListItem>
      </Typography> */}
      {user && <ProfileMenu />}
    </List>
  );
};

const ProfileMenu = () => {
  const router = useRouter();
  // profile menu component
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    // {
    //   label: "Edit Profile",
    //   icon: Cog6ToothIcon,
    // },
    // {
    //   label: "Inbox",
    //   icon: InboxArrowDownIcon,
    // },
    {
      label: "Help",
      icon: LifebuoyIcon,
      handelClick: () => {
        router.push("/contact-us");
      },
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      handelClick: SignOutUser,
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const { user } = useUser();
  return (
    <Menu
      open={isMenuOpen}
      handler={setIsMenuOpen}
      placement="bottom-end"
      className="outline-none"
    >
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={user.providerData[0].photoURL? user.providerData[0].photoURL : "/user.svg"}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, handelClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={handelClick}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                <Translate>{label}</Translate>
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
const NavbarMenu = () => {
  const { user } = useUser();
  const [openNav, setOpenNav] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(!openLogin);

  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenSignUp = () => setOpenSignUp(!openSignUp);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  return (
    <motion.section
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      // dir="ltr"
    >
      <Navbar className="!sticky top-0 z-10 mx-auto max-w-screen-xl bg-stone-200/50 p-3 px-4 py-2 backdrop-blur-lg">
        <div className="flex items-center justify-between ">
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 text-gray-900 dark:text-gray-200 lg:ml-2"
          >
            AI Breed Finder
          </Typography>

          <div className="hidden items-center gap-1 lg:flex">
            <NavList />
          </div>
          {!user && (
            <div className="hidden gap-2 lg:flex">
              <Button
                variant="text"
                size="sm"
                className="dark:text-gray-50"
                color="blue-gray"
                onClick={handleOpenLogin}
              >
                <Translate>Sign In</Translate>
              </Button>
              <Login open={openLogin} handleOpen={handleOpenLogin} />
              <Button
                variant="gradient"
                className="py-3"
                color="indigo"
                size="sm"
                onClick={handleOpenSignUp}
              >
                <Translate>Sign Up</Translate>
              </Button>
              <SignUp open={openSignUp} handleOpen={handleOpenSignUp} />
            </div>
          )}

          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          {/* <ThemeSelector /> */}
          <NavList />
          {!user && (
            <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
              <Button
                variant="outlined"
                onClick={handleOpenLogin}
                size="sm"
                color="blue-gray"
                fullWidth
              >
                <Translate>Sign In</Translate>
              </Button>

              <Button
                variant="gradient"
                size="sm"
                color="indigo"
                onClick={handleOpenSignUp}
                fullWidth
              >
                <Translate>Sign Up</Translate>
              </Button>
            </div>
          )}
        </Collapse>
      </Navbar>
    </motion.section>
  );
};

export default NavbarMenu;
