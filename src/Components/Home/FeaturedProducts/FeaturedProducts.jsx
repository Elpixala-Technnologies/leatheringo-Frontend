import { useState, useEffect ,useRef,useCallback} from "react";
import { FaCartPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import useProducts from "@/src/Hooks/useProducts";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";

const FeaturedProducts = () => {
  const { productData } = useProducts();
  const filterProductData = productData?.filter((data) => {
    return data?.status === "Featured";
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const productsPerPage = 6; // Number of products per page

  // Calculate total pages
  const totalPages = Math.ceil(filterProductData?.length / productsPerPage);

  // Calculate the index range for the current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Filter products for the current page
  const productsToDisplay = filterProductData?.slice(startIndex, endIndex);

  // Function to handle previous page
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Function to handle next page
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Only trigger the animation once
    });
  }, []);

  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <section data-aos="fade-up">
      <div className="flex flex-col items-center justify-center my-6 title">
        <h2 className=" text-[1rem] md:text-[1.8rem] text-center md:text-left  xxs:text-2xl  text-black font-bold">
          Featured Products
        </h2>
        <p className="my-2 text-muted text-center">
          Summer Collection New Modern Design
        </p>
      </div>
      <div className="flex flex-end items-center gap-10 top-0">
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


      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 7,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 100,
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper pb-[70px]"
      >
        {productsToDisplay &&
          productsToDisplay?.map((product) => (
            <SwiperSlide className="pb-[100px] pt-10 ">
              <Link
                href={`/product/${product?._id}`}
                key={product?._id}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="md:w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                  <div>
                    <img
                      src={product?.colors[0]?.images[0]}
                      alt="Product"
                      class="h-80 w-72 object-cover rounded-t-xl p-2"
                    />
                    <div class="px-4 py-3 w-80">
                      <p class="text-lg font-bold text-black truncate block capitalize">
                        {" "}
                        {product?.name}
                      </p>
                      <div class="flex items-center">
                        <p class="text-lg font-semibold text-black cursor-auto my-3">
                          {product?.discount
                            ? `₹ ${Math.floor(
                                product?.price -
                                  (product?.price * product?.discount) / 100
                              )}`
                            : `₹ ${Math.floor(product?.price)}`}
                        </p>
                        <del>
                          <p class="text-sm text-gray-600 cursor-auto ml-2">
                            ₹ {Math.floor(product?.price)}
                          </p>
                        </del>
                        <span className="text-[#eec75b] mx-2">
                          {Math.floor(product?.discount)} % off
                        </span>
                        <div class="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-bag-plus"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                            />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        <div className="swiper-button-next   w-[60px] h-[60px] after:text-[18px] top-0"></div>
        <div className="swiper-button-prev  go-side w-[60px] h-[60px] after:text-[18px] top-0"></div>
      </Swiper>
      {/*       
      <div className="grid items-center justify-center grid-cols-1 gap-4 mx-auto md:grid-cols-3 lg:grid-cols-3">
        {productsToDisplay &&
          productsToDisplay?.map((product, index) => {
            return (
              <Link
                href={`/product/${product?._id}`}
                key={product?._id}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div class="md:w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                  <div>
                    <img
                      src={product?.colors[0]?.images[0]}
                      alt="Product"
                      class="h-80 w-72 object-cover rounded-t-xl p-2"
                    />
                    <div class="px-4 py-3 w-80">
                      <p class="text-lg font-bold text-black truncate block capitalize">
                        {" "}
                        {product?.name}
                      </p>
                      <div class="flex items-center">
                        <p class="text-lg font-semibold text-black cursor-auto my-3">
                          {product?.discount
                            ? `₹ ${Math.floor(
                                product?.price -
                                  (product?.price * product?.discount) / 100
                              )}`
                            : `₹ ${Math.floor(product?.price)}`}
                        </p>
                        <del>
                          <p class="text-sm text-gray-600 cursor-auto ml-2">
                            ₹ {Math.floor(product?.price)}
                          </p>
                        </del>
                        <span className="text-[#eec75b] mx-2">
                          {Math.floor(product?.discount)} % off
                        </span>
                        <div class="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-bag-plus"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                            />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div> */}

      {/* Pagination */}
      {/* <div className={`items-center justify-center gap-4 mt-11 mb-16`}>
        <div className="flex items-center justify-center text-gray-400 ">
          <button
            title="Previous"
            className={`h-14 w-14 text-center ${
              page === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-10"
            } text-white bg-black-10 rounded-l-md border ${
              page === 1 ? "bg-gray-400" : "bg-red-500"
            } flex items-center justify-center`}
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <FaArrowLeft className="text-white" />
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`h-14 w-14 hover:text-white bg-red-500 ${
                page === index + 1 ? "text-white bg-red-600" : "bg-black-10"
              } text-center hover:bg-red-10 text-white border`}
              onClick={() => setPage(index + 1)}
              disabled={page === index + 1}
            >
              {index + 1}
            </button>
          ))}
          <button
            title="Next"
            className={`h-14 w-14 text-center ${
              page === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-red-10"
            } text-white bg-black-10 rounded-r-md border ${
              page === totalPages ? "bg-gray-400" : "bg-red-500"
            } flex items-center justify-center`}
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>
      </div> */}
    </section>
  );
};

export default FeaturedProducts;
