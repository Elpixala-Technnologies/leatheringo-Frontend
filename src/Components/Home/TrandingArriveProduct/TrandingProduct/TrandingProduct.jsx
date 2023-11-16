import React, { useEffect, useState } from "react";
import Image from "next/image";
import useProducts from "@/src/Hooks/useProducts";

const TrandingProduct = () => {
  const { productData } = useProducts();

  const filterProductData = productData?.filter((data) => {
    return data?.status === "Tranding";
  });

  return (
    <section className="my-4 mx-2">
      <div className="title my-8">
        <h2 className="text-[1rem] md:text-[1.5rem] text-center md:text-left  xxs:text-2xl  text-black font-bold">
          Tranding Product....
        </h2>
      </div>
   
      <div className="grid gap-1 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {filterProductData &&
          filterProductData?.slice(0, 4)?.map((product, index) => {
            return (
              <div
                className="cardBody flex items-center justify-around p-4 border bg-white hover:border-red-500 color-b rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500"
                key={index}
              >
                <div className="productImage w-[4rem]">
                  <Image
                    src={product?.images[0]}
                    width={"130"}
                    height={"130"}
                    alt="Product Image"
                    className="w-full h-full rounded-sm"
                  />
                </div>
                <div className="productInfo p-2">
                  <p className="productName text-[0.8rem]">
                    {product?.name.slice(0, 15) + ".."}
                  </p>
                  <p className="productPrice text-[0.9rem] text-red-500 font-semibold pt-3">
                    ${product?.price}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default TrandingProduct;
