import "./globals.scss";
import NavbarMenu from "@/components/Navbar";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

export const metadata = {
  title: "PetBreedFinder - Discover the Breed of Your Beloved",
  description:
    "Use AI-powered technology to instantly identify the breed of your cat or dog. PetBreedFinder is a user-friendly website that analyzes uploaded photos to provide accurate breed information. Explore our comprehensive database of cat and dog breeds and uncover fascinating insights about your furry friend. Find the perfect match for your pet with PetBreedFinder!",
  keywords: [
    "pet breed finder",
    "cat breed identification",
    "dog breed identification",
    "breed recognition",
    "animal breed analysis",
    "furry friend insights",
  ],
};


const RootLayout = ({ children }) => {
  return (
    <html lang="mul">
      <head>
        <link rel="icon" type="image/x-icon" href="/logoTab.svg" />
      </head>
      <body
        className={`paddings innerWidth  bg-stone-50 text-primary-black transition-all duration-500 ease-in-out ltr:!font-poppins rtl:!font-cairo dark:bg-gray-900 dark:text-blue-gray-100 `}
      >
        <Providers>
          <NavbarMenu />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
