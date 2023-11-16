import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {
  BagsIcons,
  Belts,
  CardHolders,
  DuffleBags,
  LadiesBags,
  Shoes,
  Sneakers,
  Wallets,
  ChelseaBoots,
} from "@/src/Assets";
import usePopularCategory from "@/src/Hooks/useCategory";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles



const PopualrCategory = () => {
  const { popularCategoryData } = usePopularCategory();
 

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing for the animation
      once: true, // Only animate elements once
    });
  }, []);

  return (
    <section>
      <div className=" mb-10">
        <div className="md:w-[100%] mx-auto mt-7 md:mt-10  md:block ">
          <div className="mb-5 leading-10 text-center md:mb-8">
            <h1 className="font-bold text-black lg:text-3xl xxs:text-2xl">
              Popular Categories
            </h1>
          </div>
          <div className="rounded-lg pb-[1px]">
            <div className="grid grid-cols-2 gap-5 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 md:pt-5">
              {popularCategoryData &&
                popularCategoryData.map((child) => {
                  const { _id, categories, image } = child;
                  const [categoryId, categoryName] = categories.split('-');

                  return (
                    <div
                      className="color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500"
                      data-aos="fade-up" // Add AOS animation attribute
                      data-aos-duration="1000" // Set animation duration in milliseconds
                      key={_id}
                    >
                      <Link href={`/category-product/${categoryName}`}>
                        <Image
                          alt="image"
                          src={image}
                          className="inline-flex items-center justify-center chele"
                          width={65}
                          height={65}
                        />

                        <div className="text-sm font-semibold tracking-wide cursor-pointer dark:text-black">
                          {categoryName}
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopualrCategory;
