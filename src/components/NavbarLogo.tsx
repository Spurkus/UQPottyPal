"use client";
import Image from "next/image";
import Link from "next/link";
import { useGlobalTheme } from "@/contexts/GlobalTheme";

/**
 * NavbarLogo component
 * This component represents the logo of the UQPottyPal application.
 *
 * @returns {JSX.Element} The rendered Navbar Logo
 */
const NavbarLogo = () => {
  const { theme } = useGlobalTheme();
  return (
    <Link href="/" className="btn-nav-link btn shadow-none">
      <Image src="/logo.svg" alt="UQPottyPal Logo" width={40} height={40} />
      <span className={`text-3xl font-bold ${theme === "dark" ? "text-yellow-300" : "text-cyan-600"}`}>UQPottyPal</span>
    </Link>
  );
};

export default NavbarLogo;
