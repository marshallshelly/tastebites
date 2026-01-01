import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const menuItems = useMemo(
    () => [
      { text: "Home", href: "/" },
      { text: "About Us", href: "/about" },
      { text: "Contact", href: "/contact" },
      { text: "Article", href: "/article" },
    ],
    []
  );

  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:mt-0">
          <Link
            to="/"
            className="text-5xl text-black yesteryear-regular"
            viewTransition
          >
            Tastebites
          </Link>
        </div>
        <div className="flex justify-center space-x-16">
          {menuItems.map(({ href, text }) => (
            <Link
              key={href}
              to={href}
              className="text-gray-400 hover:text-gray-500 text-base font-medium"
              viewTransition
            >
              {text}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <p className="text-center text-xs leading-5 text-gray-500">
          {new Date().getFullYear()} &copy; Copyright | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
