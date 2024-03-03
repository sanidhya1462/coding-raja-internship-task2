import React, { useEffect, useRef, useState } from "react";
import baseUrl from "@/helpers/baseUrl";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

const IndividualPage = (props) => {
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const modalRef = useRef(null);
  const iProduct = router.query.id;

  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  console.log(user.role);
  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);
  const { name, price, mediaUrl, description, _id } = props.product;
  function getModal() {
    return (
      <div id="modal1" className="modal max-w-[30%] rounded-xl" ref={modalRef}>
        <div className="flex flex-col">
          <div className="modal-content">
            <div className="px-4">
              <p className="text-lg">Are you sure to delele {name}?</p>
            </div>
          </div>
          <div className="modal-footer">
            <div className="flex px-8 justify-between">
              <button
                className="btn waves-effect waves-light #e53935 red darken-1 mx-10"
                onClick={() => {
                  deleteProduct();
                }}
              >
                Yes
              </button>
              <button
                className="btn waves-effect waves-light #42a5f5 blue lighten-1"
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    async function deleteProduct() {
      const response = await fetch(`${baseUrl}/api/product/${_id}`, {
        method: "DELETE",
      });
      const response2 = await response.json();
      M.toast({ html: response2.message, classes: "green" });
      router.push("/");
    }
  }
  async function AddToCart() {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({
        quantity: quantity,
        productId: _id,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: error, classes: "red" });
      Cookies.remove("user");
      Cookies.remove("token");
      router.push("/login");
    }
    M.toast({ html: res2.message, classes: "green" });
  }
  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={name}
            class="lg:w-1/2 w-fit lg:h-full h-64 object-cover object-center rounded"
            src={mediaUrl}
          />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              Product Name
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
              {name}
            </h1>
            <div class="flex mb-4">
              <span class="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span class="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a class="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a class="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a class="text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p class="leading-relaxed">{description}</p>
            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div class="flex items-center">
                <span class="mr-3">Quantity</span>
                <div class="relative">
                  <input
                    type="number"
                    min={1}
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center gap-6">
              <>
                <div className="flex pr-24 justify-between">
                  <span class="title-font font-medium text-2xl text-gray-900">
                    ₹{price}
                  </span>
                </div>
              </>
              <div className="flex">
                <div>
                  {user ? (
                    <>
                      <button
                        className="flex mr-32 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                        onClick={() => AddToCart()}
                      >
                        Add To Cart
                      </button>
                    </>
                  ) : (
                    <button
                      class="flex mr-32 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                      onClick={() => router.push("/login")}
                    >
                      Login To Add
                    </button>
                  )}
                </div>
                <div>
                  {user.role !== "user" && cookie.token && (
                    <div className="">
                      <>
                        <button
                          data-target="modal1"
                          className="flex ml-0 modal-trigger text-white  bg-red-700 border-0 py-2 px-6 focus:outline-none active:scale-95 duration-200 hover:bg-red-400 rounded"
                        >
                          Delete
                          <i className="material-icons left">delete</i>
                        </button>
                      </>
                    </div>
                  )}
                  {getModal()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
}

export default dynamic(() => Promise.resolve(IndividualPage), { ssr: false });
