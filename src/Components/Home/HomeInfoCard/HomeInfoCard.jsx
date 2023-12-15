import React, { useCallback, useEffect, useRef } from "react";
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
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";


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

  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section data-aos="fade-up">

      <div className="flex items-center gap-10 mb-4 mx-4 md:hidden">
        <button
          className="prev-arrow cursor-pointer bg-[#ED1C24] p-3 rounded-full"
          onClick={handlePrev}
        >
          <TbArrowBigLeft className="h-6 w-6 text-white" />
        </button>
        <button
          className="next-arrow cursor-pointer bg-[#ED1C24] p-3 rounded-full"
          onClick={handleNext}
        >
          <TbArrowBigRight className="h-6 w-6 text-white" />
        </button>
      </div>

      <div className='mt-6'>
        <Swiper
          ref={sliderRef}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            360: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={10}
          slidesPerView={3}
          onSlideChange={() => { }}
          onSwiper={(swiper) => { }}
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeInfo &&
              homeInfo?.map((info, index) => {
                return (
                  <SwiperSlide className="cursor-grab" key={index}
                  >
                    <div
                      className="cardBody  w-[100%] bg-white px-6 border py-20 hover:border-red-500 color-b rounded-md duration-300 transform shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500"
                      data-aos="fade-up"
                      data-aos-duration="1000"

                    >
                      <div className="flex homeInfoCards md:flex-row flex-col justify-center items-center gap-4">
                        <div>
                          <Image
                            src={info?.icon}
                            width={100}
                            height={100}
                            className="object-cover  home-info-image"
                            alt=""
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-[1.2rem]">{info.title}</h3>
                          <p className="text-gray-500">{info.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </div>
        </Swiper>
      </div>


      {/* <Swiper
        ref={sliderRef}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          360: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        spaceBetween={20}
        slidesPerView={3}
        onSlideChange={() => { }}
        onSwiper={(swiper) => { }}
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        <div className="grid gap-4 md:grid-cols-3 w-full ">
          {homeInfo.map((info, index) => {
            return (
              <div
                className="cardBody  w-[100%] bg-white px-6 border py-20 hover:border-red-500 color-b rounded-md duration-300 transform shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500"
                data-aos="fade-up"
                data-aos-duration="1000"
                key={index}
              >
                <div className="flex  md:flex-row flex-col justify-center items-center gap-4">
                  <div>
                    <Image
                      src={info?.icon}
                      width={100}
                      height={100}
                      className="object-cover w-20"
                      alt=""
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
      </Swiper> */}
    </section>
  );
};

export default HomeInfoCard;
