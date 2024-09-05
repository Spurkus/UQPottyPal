import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar flex bg-base-100">
      <div className="ml-6 flex-1">
        <Link href="/" className="btn-nav-link btn shadow-none">
          <Image src="/logo.svg" alt="UQPottyPal Logo" width={40} height={40} />
          <span className="text-3xl text-yellow-300">UQPottyPal</span>
        </Link>
      </div>
      <ul className="mr-6 flex flex-row justify-center space-x-4">
        <li>
          <Link href="/dashboard" className="btn-nav-link btn shadow-none">
            <span className="text-base">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/" className="btn-nav-link btn shadow-none">
            <span className="text-base">All Toilets</span>
          </Link>
        </li>
        <li>
          <Link href="/" className="btn-nav-link btn shadow-none">
            <span className="text-base">About</span>
          </Link>
        </li>
        <li>
          <ThemeToggleButton />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
