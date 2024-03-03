import React, { useState } from "react";
import baseUrl from "@/helpers/baseUrl";
import Image from "next/image";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import { Router, useRouter } from "next/router";
const create = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [media, setMedia] = useState();
  const [description, setDescription] = useState();
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const MediaUrl = await imageUpload();
      let stringToAdd = "s";

      // Position to add string
      let indexPosition = 4;

      // Using slice method to split string
      let newMediaUrl =
        MediaUrl.slice(0, indexPosition) +
        stringToAdd +
        MediaUrl.slice(indexPosition);

      // Display output
      console.log(newMediaUrl);
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: price,
          mediaUrl: MediaUrl,
          description: description,
        }),
      });
      const res2 = await res.json();
      if (res2.error) {
        M.toast({ html: "Please add all the fields", classes: "red" });
      } else {
        M.toast({ html: "Product added successfully", classes: "green" });
      }
      // router.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "dhmqusghb");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhmqusghb/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    console.log(res2.url);
    return res2.url;
  };
  return (
    <div className="min-h-[73vh]">
      <div className="flex flex-col p-10 items-center justify-center md:items-start">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          Upload Product
        </h1>
        <div className="h-1 w-52 bg-indigo-500 rounded"></div>
      </div>
      <div className="flex flex-col items-center justify-center max-w-screen py-10 mx-auto">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-white rounded-lg shadow-xl px-8 pt-6 pb-8 mb-4 flex flex-col w-1/2"
        >
          <div className="mb-4">
            <input
              className=""
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              id="username"
              type="text"
              placeholder="Product Name"
              autoComplete="Name"
            />
          </div>
          <div className="mb-4">
            <input
              className=""
              name="price"
              type="text"
              placeholder="Product Price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div className="">
            <div className="flex flex-row">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setMedia(event.target.files[0])}
              />
            </div>
          </div>

          <div className="mt-3">
            <textarea
              name="description"
              placeholder="Description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
          </div>

          <div className="flex items-center justify-end mt-2">
            <button
              className="px-5 py-3 rounded-lg bg-blue-600 border active:scale-95 text-white text-lg hover:bg-white hover:text-blue-600 duration-200"
              type="submit"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  console.log(user.role);
  if (user.role === "user" || !user) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return {
    props: {},
  };
}

export default create;
