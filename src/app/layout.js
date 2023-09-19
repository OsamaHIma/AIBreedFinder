import "./globals.scss";
import Providers from "@/components/Providers";

export const metadata = {
  title: "PetBreedFinder - Discover the Breed of Your Beloved",
  description:
    "Use AI-powered technology to identify the breed of your cat or dog instantly. PetBreedFinder is a user-friendly website that analyzes uploaded photos to provide accurate breed information. Explore our comprehensive database of cat and dog breeds and uncover fascinating insights about your furry friend.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en;ar">
      <head>
        <link rel="icon" type="image/x-icon" href="/logo.svg" />
      </head>
      <body
        className={`paddings innerWidth  bg-stone-50 text-primary-black transition-all duration-500 ease-in-out ltr:!font-poppins rtl:!font-cairo dark:bg-gray-900 dark:text-blue-gray-100 `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
