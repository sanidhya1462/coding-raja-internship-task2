import React, { useState, useEffect } from "react";
import baseUrl from "@/helpers/baseUrl";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Cart = (props) => {
  const { error, products } = props;
  const router = useRouter();
  const { token } = parseCookies();
  const [cproduct, setCproduct] = useState(products);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  if (!token) {
    return (
      <div>
        <div className="flex flex-col max-w-screen items-center">
          <div className="flex flex-col items-center justify-center rounded-2xl space-y-4 p-10">
            <h3 className="text-lg font-serif ">
              Please login to view your cart
            </h3>
            <Link href="/login">
              <button className="bg-blue-600 text-lg hover:bg-blue-400 active:scale-95 text-white px-10 py-3 rounded-lg">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    M.toast({ html: error, classes: "red" });
    Cookies.remove("user");
    Cookies.remove("token");
    router.push("/login");
  }
  async function handleDelete(pid) {
    window.location.reload();
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        productId: pid,
      }),
    });
    const res2 = await res.json();
    console.log(res2);
    setCproduct(res2);
  }
  let Price = 0;
  const CartItems = () => {
    return (
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 -m-4">
        {cproduct.map((item) => {
          Price = Price + item.quantity * item.product.price;
          return (
            <Link href={`/indiProduct/${item.product._id}`}>
              <div class="xl:w-full md:w-full p-4" key={item.product._id}>
                <div class="bg-gray-100 p-6 rounded-lg hover:bg-blue-50 duration-200 active:scale-95">
                  <img
                    class="h-52 rounded w-full object-cover object-center mb-6 hover:scale-105 duration-200"
                    src={item.product.mediaUrl}
                    alt="content"
                  />
                  <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {item.product.name}
                  </h3>
                  <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                    Quantity - {item.quantity}
                  </h2>
                  <p class="leading-relaxed text-lg mb-3">
                    Total Price - ₹{item.quantity * item.product.price}
                  </p>
                  <button
                    className="btn red"
                    onClick={() => {
                      handleDelete(item.product._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };
  async function handleCheckout() {
    const res = await fetch(`${baseUrl}/api/checkout_sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({}),
    });
    const res2 = await res.json();

    console.log(res2.url);
    router.push(res2.url);
  }
  const TotalPrice = () => {
    return (
      <div>
        {products.length != 0 ? (
          <div className="flex max-w-screen-2xl items-center justify-center mt-7">
            <button
              onClick={handleCheckout}
              className="flex hover:bg-blue-500 active:scale-95 bg-blue-600 px-10 py-3 rounded-xl text-white font-serif text-xl space-x-3"
            >
              <p>checkout</p>
              <p>₹{Price / 3}</p>
            </button>
          </div>
        ) : (
          <div className="text-lg font-medium min-h-[52vh]">
            Your Cart is Empty
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-wrap w-full mb-20">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Cart
              </h1>
              <div class="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>

          <CartItems />

          <TotalPrice />
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      props: { products: [] },
    };
  }
  const res = await fetch(`${baseUrl}/api/cart`, {
    headers: {
      Authorization: token,
    },
  });
  const products = await res.json();
  if (products.error) {
    return {
      props: { error: products.error },
    };
  }
  console.log("products", products);
  return {
    props: { products },
  };
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
