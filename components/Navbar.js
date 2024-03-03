import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  AiOutlineShoppingCart,
  AiOutlineEdit,
  AiOutlineHome,
} from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { TbLogin } from "react-icons/tb";
import { BsSignIntersection } from "react-icons/bs";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen((prev) => !prev);
    console.log(open);
  };
  const router = useRouter();
  const cookie = parseCookies();
  // console.log(cookie);
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  const token = cookie.token;
  let User = false;
  if (token) {
    User = true;
  } else {
    User = false;
  }
  // console.log(User);

  function handleClick() {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/login");
  }

  function IsActive(route) {
    if (route === router.pathname) {
      return "active";
    }
  }
  return (
    <div>
      <div className="bg-blue-500 shadow-2xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 mr-5">
            <div className="flex items-center hover:border hover:rounded-lg p-2">
              <a href="/" className="text-white text-2xl font-semibold">
                <span className="flex gap-2 items-center">
                  <img className="h-10 w-10" src="/logo.png" alt="" />
                  Elegant
                </span>
              </a>
            </div>
            {/* Navlink */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="transition-all duration-200 text-white font-mono text-xl hover:bg-blue-300 px-3 py-3 rounded-md">
                  <Link href="/" className="flex items-center gap-1">
                    <AiOutlineHome /> <p>Home</p>
                  </Link>
                </div>
                <div className="transition-all duration-200 text-white font-mono text-xl hover:bg-blue-300 px-3 py-3 rounded-md">
                  <Link href="/cart" className="flex items-center gap-1">
                    <div>
                      <AiOutlineShoppingCart />
                    </div>{" "}
                    <p>Cart</p>
                  </Link>
                </div>
                {(user.role == "admin" || user.role == "root") && (
                  <div className="transition-all duration-200 text-white font-mono text-xl hover:bg-blue-300 px-3 py-3 rounded-md">
                    <Link href="/create" className="flex items-center gap-1">
                      <AiOutlineEdit />
                      <p>Create</p>
                    </Link>
                  </div>
                )}
                {User ? (
                  <>
                    <div className="transition-all duration-200 text-white font-mono text-xl hover:bg-blue-300 px-3 py-3 rounded-md">
                      <Link href="/account" className="flex items-center gap-1">
                        <MdAccountCircle />
                        <p>Account</p>
                      </Link>
                    </div>
                    <div className="transition-all duration-200 text-white font-mono text-xl hover:bg-blue-300 px-3 py-3 rounded-md">
                      <button
                        className="flex items-center gap-1"
                        onClick={handleClick}
                      >
                        <FiLogOut />
                        <p>Logout</p>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="transition-all duration-200 text-white font-mono text-xl hover:bg-blue-300 px-3 py-3 rounded-md">
                      <Link href="/login" className="flex items-center gap-1">
                        <TbLogin />
                        <p>Login</p>
                      </Link>
                    </div>
                    <div className="transition-all duration-200 text-white font-mono text-xl hover:bg-blue-300 px-3 py-3 rounded-md">
                      <Link href="/signup" className="flex items-center gap-1">
                        <BsSignIntersection />
                        <p>Signup</p>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Hamburger Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={handleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open Main Menu</span>
                {open == true ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile view */}
        {open ? (
          <div className="md:hidden">
            <div className="ox-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="text-white font-mono text-xl hover:bg-blue-300 block px-3 py-2 rounded-md  font-medium">
                <Link href="/" className="flex items-center gap-1">
                  <AiOutlineHome />
                  <h1>Home</h1>
                </Link>
              </div>
              <div className="text-white font-mono text-xl hover:bg-blue-300 block px-3 py-2 rounded-md  font-medium">
                <Link href="/cart" className="flex items-center gap-1">
                  <AiOutlineShoppingCart />
                  <h1>Cart</h1>
                </Link>
              </div>
              {(user.role == "admin" || user.role == "root") && (
                <div className="text-white font-mono text-xl hover:bg-blue-300 block px-3 py-2 rounded-md font-medium">
                  <Link href="/create" className="flex items-center gap-1">
                    <AiOutlineEdit />
                    <p>Create</p>
                  </Link>
                </div>
              )}
              {User ? (
                <>
                  <div className="text-white font-mono text-xl hover:bg-blue-300 block px-3 py-2 rounded-md font-medium">
                    <Link href="/account" className="flex items-center gap-1">
                      <MdAccountCircle />
                      <h1>Account</h1>
                    </Link>
                  </div>
                  <div className="transition-all duration-200 text-white font-mono text-xl hover:bg-blue-300 px-3 py-2 rounded-md">
                    <button
                      className="flex items-center gap-1"
                      onClick={handleClick}
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-white font-mono text-xl hover:bg-blue-300 block px-3 py-2 rounded-md font-medium">
                    <Link href="/login" className="flex items-center gap-1">
                      <TbLogin />
                      Login
                    </Link>
                  </div>
                  <div className="text-white font-mono text-xl hover:bg-blue-300 block px-3 py-2 rounded-md font-medium">
                    <Link href="/signup" className="flex items-center gap-1">
                      <BsSignIntersection />
                      Signup
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
