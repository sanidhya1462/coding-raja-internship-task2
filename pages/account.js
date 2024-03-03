import nookies from "nookies";
import React, { useEffect, useRef } from "react";
import baseUrl from "@/helpers/baseUrl";
import dynamic from "next/dynamic";
import UserRoles from "@/components/UserRoles";
export const Account = (props) => {
  const orderCard = useRef(null);
  const { orders } = props;
  const cookie = nookies.get();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  useEffect(() => {
    M.Collapsible.init(orderCard.current);
  }, []);
  const OrderHistory = () => {
    return (
      <div className="w-[75%] md:mx-48">
        <ul className="collapsible gap-10" ref={orderCard}>
          {orders.map((item) => {
            return (
              <li key={item._id}>
                <div className="collapsible-header">
                  <i className="material-icons">folder</i>
                  {item.createdAt}
                </div>
                <div className="collapsible-body">
                  {item.products.map((pitem) => {
                    return (
                      <h5 key={pitem._id} className="text-lg font-mono">
                        {pitem.product.name} X {pitem.quantity}
                      </h5>
                    );
                  })}
                  <h4 className="text-lg font-serif">Total ₹ {item.total} </h4>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div class="bg-white">
      <div class="container mx-auto py-8">
        <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div class="col-span-4 sm:col-span-3">
            <div class="bg-white shadow rounded-lg p-6">
              <div class="flex flex-col items-center">
                <img
                  src="/admin1.jpg"
                  class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                ></img>
                <h1 class="text-xl font-bold">{user.name}</h1>
                <p class="text-gray-600">{user.email}</p>
                <div class="mt-6 flex flex-wrap gap-4 justify-center">
                  <a
                    href="#"
                    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded active:scale-95 duration-200"
                  >
                    Edit
                  </a>
                </div>
              </div>
              <hr class="my-6 border-t border-gray-300" />
            </div>
          </div>
          <div class="col-span-4 sm:col-span-9">
            <div class="bg-white shadow rounded-lg p-6">
              <h2 class="text-xl font-bold mb-4">Order History</h2>

              {orders.length == 0 ? (
                <div className="center">
                  <h5 className="text-lg font-serif">
                    You have no order History
                  </h5>
                </div>
              ) : (
                <OrderHistory />
              )}
              {user.role == "root" && <UserRoles />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(ctx) {
  const cookie = nookies.get(ctx);

  if (!cookie.token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  const res = await fetch(`${baseUrl}/api/orders`, {
    headers: {
      Authorization: cookie.token,
    },
  });
  const res2 = await res.json();
  console.log(res2);
  return {
    props: {
      orders: res2,
    },
  };
}

export default dynamic(() => Promise.resolve(Account), { ssr: false });
