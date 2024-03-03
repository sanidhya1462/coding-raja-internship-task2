import React from "react";

const Footer = () => {
  return (
    <div className="bottom-0">
      <footer className="shadow bg-blue-500">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0">
              <img
                src="/logo.png"
                className="h-10 w-10 mr-3"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Elegant
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="mr-4 hover:underline md:mr-6 text-white text-lg"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="mr-4 hover:underline md:mr-6 text-white text-lg"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="mr-4 hover:underline md:mr-6 text-white text-lg"
                >
                  Licensing
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:underline text-white text-lg"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <span className="block text-white text-md sm:text-center ">
            © 2023{" "}
            <a href="/" className="hover:underline">
              Elegant™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
