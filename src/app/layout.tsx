import type { Metadata } from "next";
import Head from "next/head";
import { getThemeFromCookie } from "@/helper/cookiesFunctions";
import { GlobalThemeContextProvider } from "@/contexts/GlobalTheme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./fonts.css";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Metadata for the application
export const metadata: Metadata = {
  title: "UQPottyPal",
  description:
    "UQPottyPal is your go-to companion for finding and reviewing public restrooms on and around the University of Queensland campus. Whether you're a student, staff member, or visitor, UQPottyPal helps you locate the cleanest and most accessible restrooms nearby.",
};

/**
 * RootLayout component
 *
 * This component serves as the main layout wrapper for the application.
 * It includes the global theme provider, navbar, and footer.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout
 * @returns {Promise<JSX.Element>} The rendered layout component
 */
const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>): Promise<JSX.Element> => {
  // Retrieve the theme from cookies
  const theme = await getThemeFromCookie();

  return (
    <GlobalThemeContextProvider initialTheme={theme}>
      <Head>
        {/* Mapbox CSS */}
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </GlobalThemeContextProvider>
  );
};

export default RootLayout;
