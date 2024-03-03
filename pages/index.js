import Products_Item from "@/components/product-Item/Products_Item";
import React from "react";
import baseUrl from "@/helpers/baseUrl";
import { useRouter } from "next/router";

const home = (props) => {
  const productList = props.products;
  const router = useRouter();
  const handleReload = () => {
    router.reload();
  };

  return (
    <div className="py-5" onLoad={handleReload}>
      <section className="text-gray-600 body-font mt-10 ">
        <div className="px-5 mx-auto">
          <div className="grid grid-cols-1 gap-9 md:grid-cols-3 xl:grid-cols-4">
            {productList.map((product) => (
              <Products_Item
                key={product._id}
                id={product._id}
                title={product.name}
                imageUrl={product.mediaUrl}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default home;

// export async function getStaticProps() {
//   const res = await fetch(`${baseUrl}/api/products`);
//   const data = await res.json();
//   return {
//     props: {
//       products: data,
//     },
//   };
// }
export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();
  return {
    props: {
      products: data,
    },
  };
}
