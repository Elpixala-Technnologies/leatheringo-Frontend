import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  SupportIcon,
  FreeShippingIcon,
  OnlineOrderIcon,
  SaveMoneyIcon,
  PromotionsIcon,
  HappySellIcon,
} from "@/src/Assets";


const homeInfo = [
  {
    id: 1,
    title: "Customer Support",
    subtitle: "24/7 We are customer care best support",
    icon: SupportIcon,
  },
  {
    id: 2,
    title: "Free Shipping",
    subtitle: " Free shipping on all order over $99",
    icon: FreeShippingIcon,
  },
  {
    id: 3,
    title: "Online Order",
    subtitle: " Order online to get the best deals",
    icon: OnlineOrderIcon,
  },
  {
    id: 4,
    title: "Save Money",
    subtitle: "Save money when you shop with us",
    icon: SaveMoneyIcon,
  },
  {
    id: 5,
    title: "Promotions",
    subtitle: "Get the best deals and promotions",
    icon: PromotionsIcon,
  },
  {
    id: 6,
    title: "Happy Sell",
    subtitle: "We are happy to sell you the best",
    icon: HappySellIcon,
  },
];

const HomeInfoCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing for the animation
      once: true, // Only animate elements once
    });
  }, []);

  return (
    <section data-aos="fade-up">
      <div className="grid gap-4 md:grid-cols-3 w-full my-6">
        {homeInfo.map((info, index) => {
          return (
            <div
              className="cardBody mt-4 md:m-0 w-[100%] bg-white px-6 border py-20 hover:border-red-500 color-b rounded-md duration-300 transform shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500"
              data-aos="fade-up"
              data-aos-duration="1000"
              key={index}
            >
              <div className="flex md:flex-row flex-col justify-center items-center gap-4">
                <div>
                  <Image
                    src={info?.icon}
                    width={100}
                    height={100}
                    className="object-cover w-20"
                    alt="Red Rose Auto"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-[1.2rem]">{info.title}</h3>
                  <p className="text-gray-500">{info.subtitle}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeInfoCard;
