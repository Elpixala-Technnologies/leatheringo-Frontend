import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import usePopularCategory from "@/src/Hooks/useCategory";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles



const PopualrCategory = () => {
  const { popularCategoryData } = usePopularCategory();

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
            <h1 className="title">
              Popular <span>Categories</span>
            </h1>
          </div>

          <div className="flex items-center gap-10   mx-4 md:hidden">
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
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                360: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 5,
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
              <div className="grid grid-cols-2 gap-5 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 md:pt-5">
                {popularCategoryData &&
                  popularCategoryData?.map((child) => {
                    const { _id, categories, image } = child;
                    const [categoryId, categoryName] = categories.split('-');

                    return (
                      <SwiperSlide className="cursor-grab" key={_id}
                      >
                        <div
                          className="color-b  p-2 md:p-3 text-center rounded-md duration-300 transform   hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500 m-4"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                        >
                          <Link
                            href={`/product?categoryName=${encodeURIComponent(categoryName)}`}
                            className="flex flex-col items-center gap-2"
                          >
                            <Image
                              alt="image"
                              src={image}
                              className="inline-flex items-center justify-center category-product "
                              width={40}
                              height={40}
                            />

                            <div className="text-sm font-semibold tracking-wide cursor-pointer dark:text-black">
                              {categoryName}
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </div>
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PopualrCategory;
