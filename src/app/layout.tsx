import type { Metadata } from "next";
import Head from "next/head";
import { getThemeFromCookie } from "@/helper/cookiesFunctions";
import { GlobalThemeContextProvider } from "@/contexts/GlobalTheme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./fonts.css";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

export const metadata: Metadata = {
  title: "UQPottyPal",
  description:
    "UQPottyPal is your go-to companion for finding and reviewing public restrooms on and around the University of Queensland campus. Whether you’re a student, staff member, or visitor, UQPottyPal helps you locate the cleanest and most accessible restrooms nearby.",
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
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
