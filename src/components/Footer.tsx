import Link from "next/link";

/**
 * Footer component
 *
 * This component represents the footer of the UQPottyPal application.
 * It includes navigation links and a disclaimer.
 *
 * @returns {JSX.Element} The rendered
 */
const Footer = () => {
  return (
    <footer className="footer footer-center gap-2 bg-base-100 pb-6 pt-3">
      <nav className="flex flex-row space-x-4">
        <Link href="/" className="btn-nav-link btn btn-sm shadow-none">
          <span className="text-base font-medium">Home</span>
        </Link>
        <Link href="/dashboard" className="btn-nav-link btn btn-sm shadow-none">
          <span className="text-base font-medium">Dashboard</span>
        </Link>
        <Link href="/toilets" className="btn-nav-link btn btn-sm shadow-none">
          <span className="text-base font-medium">Toilets</span>
        </Link>
      </nav>
      <aside className="mt-0 flex flex-col">
        <span>Not affiliated with UQ. Always check the official UQ maps for toilets.</span>
        <span>
          @2024 UQPottyPal. All rights reserved <span className="font-sans">:3</span>
        </span>
      </aside>
    </footer>
  );
};

export default Footer;
