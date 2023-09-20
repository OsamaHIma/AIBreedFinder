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
  Chip,
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  GiftIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
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


const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};

const navListMenuItems = [
  {
    color: "blue",
    icon: FlagIcon,
    title: "About us",
    description: "Learn about our story and our mission statement.",
  },
  {
    color: "orange",
    icon: ChatBubbleOvalLeftIcon,
    title: "Press",
    description: "News and writings, press releases, and resources",
  },
  {
    color: "green",
    icon: UsersIcon,
    title: (
      <div className="flex items-center gap-1">
        Careers{" "}
        <Chip
          size="sm"
          color="green"
          variant="ghost"
          value="We're hiring!"
          className="capitalize"
        />
      </div>
    ),
    description: "We are always looking for talented people. Join us!",
  },
  {
    color: "blue-gray",
    icon: FolderIcon,
    title: "Legal",
    description: "All the stuff that we dan from legal made us add.",
  },
  {
    color: "purple",
    icon: RocketLaunchIcon,
    title: "Products",
    description: "Checkout our products that helps a startup running.",
  },
  {
    color: "teal",
    icon: FaceSmileIcon,
    title: "Icons",
    description: "Set of beautiful icons that you can use in your project.",
  },
  {
    color: "cyan",
    icon: PuzzlePieceIcon,
    title: "UI Kits",
    description: "High quality UI Kits helps you to 2x faster.",
  },
  {
    color: "pink",
    icon: GiftIcon,
    title: "Open Source",
    description: "List of all our open-source projects, it's all free.",
  },
];

const NavListMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );

  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            as="div"
            variant="small"
            className="font-normal dark:text-gray-50"
          >
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}

const NavList = () => {
  const { user } = useUser();
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:p-1">
      <ThemeSelector />
      <LanguageSelector />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal dark:text-gray-50"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <HomeIcon className="h-[18px] w-[18px]" />
          <Translate translations={{ar:"الصفحة الرئيسية"}}>Home</Translate>
        </ListItem>
      </Typography>

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
        router.push("/contact");
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
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end" className="outline-none">
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
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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
      dir="ltr"
    >
      <Navbar className="!sticky top-0 z-10 mx-auto max-w-screen-xl bg-stone-200/50 p-3 px-4 py-2 backdrop-blur-lg">
        <div className="flex items-center justify-between ">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-gray-900 dark:text-gray-200"
          >
            AI Breed Finder
          </Typography>

          <div className="hidden items-center gap-1 lg:flex">
            <NavList />
          </div>
          {!user && <div className="hidden gap-2 lg:flex">
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
          </div>}

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
          {!user && <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button variant="outlined" onClick={handleOpenLogin} size="sm" color="blue-gray" fullWidth>
            <Translate>Sign In</Translate>
            </Button>
            
            <Button variant="gradient" size="sm" color="indigo" onClick={handleOpenSignUp}  fullWidth>
            <Translate>Sign Up</Translate>
            </Button>
          </div>}
        </Collapse>
      </Navbar>
    </motion.section>
  );
}

export default NavbarMenu
