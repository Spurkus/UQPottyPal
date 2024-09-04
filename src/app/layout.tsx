import type { Metadata } from "next";
import { getThemeFromCookie } from "@/helper/cookiesFunction";
import { GlobalThemeContextProvider } from "@/contexts/GlobalTheme";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "UQPottyPal",
  description:
    "UQPottyPal is your go-to companion for finding and reviewing public restrooms on and around the University of Queensland campus. Whether you’re a student, staff member, or visitor, UQPottyPal helps you locate the cleanest and most accessible restrooms nearby.",
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const theme = await getThemeFromCookie();
  return (
    <GlobalThemeContextProvider initialTheme={theme}>
      <Navbar />
      {children}
      <Footer />
    </GlobalThemeContextProvider>
  );
};

export default RootLayout;
