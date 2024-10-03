import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import NavbarLogo from "./NavbarLogo";

/**
 * Navbar component
 * This component represents the navbar of the UQPottyPal application.
 *
 * @returns {JSX.Element} The rendered Navbar component
 */
const Navbar = () => {
  return (
    <div className="navbar flex bg-base-100">
      <div className="ml-6 flex-1">
        <NavbarLogo />
      </div>
      <ul className="mr-6 flex list-none flex-row justify-center space-x-4">
        <li>
          <Link href="/dashboard" className="btn-nav-link btn shadow-none">
            <span className="text-base">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/toilets" className="btn-nav-link btn shadow-none">
            <span className="text-base">All Toilets</span>
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
