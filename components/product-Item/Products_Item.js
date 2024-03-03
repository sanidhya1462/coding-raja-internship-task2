import React from "react";
import Link from "next/link";

const Products_Item = (props) => {
  const { title, price, imageUrl, id } = props;
  return (
    <Link href={`/indiProduct/${id}`}>
      <div className="p-6 rounded-lg shadow-2xl hover:bg-slate-100 active:scale-95">
        <img
          className="rounded w-full h-1/2 md:w-full lg:h-52 lg:w-full md:h-36 object-cover object-center mb-6 hover:scale-105 duration-300"
          src={imageUrl}
          alt="content"
        />
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
          {title}
        </h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
          ₹{price}
        </h2>
      </div>
    </Link>
  );
};

export default Products_Item;
