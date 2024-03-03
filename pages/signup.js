import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import baseUrl from "@/helpers/baseUrl";

const signup = () => {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(name, email);
    console.log(process.env.BASE_URI);
    const res = await fetch(`${baseUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Password: password,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" });
    } else {
      M.toast({ html: res2.message, classes: "green" });
      router.push("/login");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col rounded-2xl bg-white md:flex-row md:items-center shadow-lg">
        <div className="md:p-5">
          <div className="text-left p-5 flex flex-col gap-4">
            <p className="text-3xl font-serif font-bold py-4">Sign-Up</p>
            <p className="text-gray-500 max-w-sm">
              Create your account to buy an Elegant items
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full h-10 mt-4 p-8 rounded-md border"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter your E-mail"
                className="w-full h-10 mt-4 p-8 rounded-md border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Enter your Password"
                className="w-full h-10 mt-4 p-8 rounded-md border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-col md:flex-row md:justify-between items-center justify-center gap-7">
                <a href="#" className="text-cyan-700">
                  Forgot Password
                </a>
                <button
                  type="submit"
                  className="w-full bg-cyan-800 hover:bg-cyan-600 md:w-48 text-white rounded-md border h-14 text-lg"
                >
                  Sign-Up
                </button>
              </div>
            </form>
            <hr className="border mt-5" />
            <p className="text-center text-gray-500">or login with</p>
            <div className="flex flex-col md:flex-row mx-2 gap-4 md:justify-between">
              <div>
                <button className="w-full border flex flex-row items-center justify-center gap-2 p-2 md:w-52">
                  <img className="w-8 h-8" src="/facebook.png" alt="" />
                  <p className="text-gray-500">Facebook</p>
                </button>
              </div>
              <div>
                <button className="w-full border flex flex-row items-center justify-center gap-2 md:w-52 p-2">
                  <img className="w-8 h-8" src="/google.png" alt="" />
                  <p className="text-gray-500">Google</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/image.jpg"
          alt=""
          className="w-[430px] h-fit hidden md:block"
        />
      </div>
    </div>
  );
};

export default signup;
