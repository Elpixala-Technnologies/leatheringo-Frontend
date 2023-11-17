import { HomeSliderTwo, MobileBannerOne } from "@/src/Assets";
import useProducts from "@/src/Hooks/useProducts";
import RootLayout from "@/src/Layouts/RootLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCartPlus } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";

const category_product = () => {
  const { productData } = useProducts();
  const router = useRouter();
  const categoryName = router?.query?.index;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  const sliderRef = useRef
    (null);
  const filterProductData = productData?.filter((data) => {
    return data?.categories?.includes(categoryName);
  });


  const filterTrandingProductData = productData?.filter((data) => {
    return data?.status === "Tranding";
  });

  const [page, setPage] = useState(1);
  const productsPerPage = 6; // Number of products per page

  // Calculate total pages
  const totalPages = Math.ceil(
    filterTrandingProductData?.length / productsPerPage
  );

  // Calculate the index range for the current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Filter products for the current page
  const productsToDisplay = filterTrandingProductData?.slice(
    startIndex,
    endIndex
  );

  // Function to handle previous page
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);


  // ========= pagination for category product =========

  const [categoriesPage, setCategoriesPage] = useState(1);
  const categoriesProductsPerPage = 6; // Number of products per page

  // Calculate total pages
  const categoriesTotalPages = Math.ceil(
    filterProductData?.length / categoriesProductsPerPage
  );

  // Calculate the index range for the current page
  const categoriesStartIndex = (categoriesPage - 1) * categoriesProductsPerPage;

  const categoriesEndIndex = categoriesStartIndex + categoriesProductsPerPage;

  // Filter products for the current page
  const categoriesProductsToDisplay = filterProductData?.slice(
    categoriesStartIndex,
    categoriesEndIndex
  );

  // Function to handle previous page

  const handlePrevCategoriesPage = () => {
    if (categoriesPage > 1) {
      setCategoriesPage(categoriesPage - 1);
    }
  };

  // Function to handle next page

  const handleNextCategoriesPage = () => {
    if (categoriesPage < categoriesTotalPages) {
      setCategoriesPage(categoriesPage + 1);
    }
  };

  // ========
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define your mobile breakpoint
    };

    handleResize(); // Check the initial screen width
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Remove the event listener when the component unmounts
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing for the animation
      once: true, // Only trigger the animation once
    });
  }, []);



  return (
    <RootLayout>
      <div className="md:container" data-aos="fade-up">
        {/* <Image src={HomeSliderTwo} width={800} height={200} className='w-full md:h-[300px] object-cover' /> */}
        <Image
          src={isMobile ? MobileBannerOne : HomeSliderTwo}
          alt="Banner Image"
          className="w-full h-full"
          width={isMobile ? 768 : 1920}
          height={isMobile ? 768 : 500}
        />
        <br />
        <h3 className="font-semibold md:text-3xl text-lg my-12">{categoryName}</h3>
        <div class="w-fit mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-y-14 gap-x-14">
          {categoriesProductsToDisplay &&
            categoriesProductsToDisplay?.map((product) => (
              <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-red-500  color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
                key={product?._id}
              >
                <div className="productImage">
                  <Image
                    src={product?.colors[0]?.images[0]}
                    width={300}
                    height={300}
                    className="w-[300px] h-[300px] object-cover"
                  />
                </div>
                <hr className="w-full bg-slate-400" />

                <div className="productInfo mt-2 p-2">
                  <h2 className="productName font-bold text-left ">
                    {product?.name}
                  </h2>
                  <div className='flex gap-4'>
                    <h1 className="font-bold text-slate-900">
                      {product?.discount
                        ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                        : `₹ ${Math.floor(product?.price)}`
                      }
                    </h1>
                    <span className="text-sm text-slate-900 line-through mt-1">
                      ₹ {Math.floor(product?.price)}
                    </span>
                    <span className='text-[#eec75b]'>
                      {Math.floor(product?.discount)} % off
                    </span>
                  </div>
                  <p className="productDescription py-3 text-left">
                    {product?.details[0]?.description?.slice(0, 30) + "..."}
                  </p>
                  <div className="productAddToCart flex gap-5 items-center">
                    <div>
                      <Link className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" href={`/product/${product?._id}`}>
                        <FaCartPlus />
                        Product Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            ))}
        </div>
        {/* ====== pagination categories */}
        <div
          className={`items-center justify-center gap-4 mt-11 mb-16`}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex items-center justify-center text-gray-400 ">
            <button
              title="Previous"
              className={`h-14 w-14 text-center ${categoriesPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-red-10"
                } text-white bg-black-10 rounded-l-md border ${categoriesPage === 1 ? "bg-gray-400" : "bg-red-500"
                } flex items-center justify-center`}
              onClick={handlePrevCategoriesPage}
              disabled={categoriesPage === 1}
            >
              <FaArrowLeft className="text-white" />
            </button>
            {Array.from({ length: categoriesTotalPages }).map((_, index) => (
              <button
                key={index}
                className={`h-14 w-14 hover:text-white bg-red-500 ${categoriesPage === index + 1
                  ? "text-white bg-red-600"
                  : "bg-black-10"
                  } text-center hover:bg-red-10 text-white border`}
                onClick={() => setPage(index + 1)}
                disabled={categoriesPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button
              title="Next"
              className={`h-14 w-14 text-center ${categoriesPage === categoriesTotalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-red-10"
                } text-white bg-black-10 rounded-r-md border ${categoriesPage === categoriesTotalPages
                  ? "bg-gray-400"
                  : "bg-red-500"
                } flex items-center justify-center`}
              onClick={handleNextCategoriesPage}
              disabled={categoriesPage === categoriesTotalPages}
            >
              <FaArrowRight className="text-white" />
            </button>
          </div>
        </div>

        <h3 className="text-center text-black font-semibold md:text-3xl text-lg my-12">
          Tranding Products
        </h3>

        <div className="flex flex-end items-center gap-10  ">
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
                spaceBetween: 20,
              },
              360: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
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
            <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productsToDisplay &&
                productsToDisplay?.map((product) => {
                  return (
                    <SwiperSlide className="cursor-grab" key={product?._id}
                    >
                      <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-red-500  color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 ">
                        <div className="productImage ">
                          <Image
                            src={product?.colors[0]?.images[0]}
                            width={300}
                            height={300}
                            className="w-full h-full"
                          />
                        </div>
                        <hr className="w-full bg-slate-400" />

                        <div className="productInfo mt-2 p-2">
                          <h2 className="productName font-bold text-left ">
                            {product?.name}
                          </h2>
                          <div className='flex gap-4'>
                            <h1 className="font-bold text-slate-900">
                              {product?.discount
                                ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                : `₹ ${Math.floor(product?.price)}`
                              }
                            </h1>
                            <span className="text-sm text-slate-900 line-through mt-1">
                              ₹ {Math.floor(product?.price)}
                            </span>
                            <span className='text-[#eec75b]'>
                              {Math.floor(product?.discount)} % off
                            </span>
                          </div>
                          <p className="productDescription py-3 text-left">
                            {product?.details[0]?.description?.slice(0, 30) + "..."}
                          </p>
                          <div className="productAddToCart flex gap-5 items-center">
                            <div>
                              <Link className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" href={`/product/${product?._id}`}>
                                <FaCartPlus />
                                Product Detail
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </div>
          </Swiper>
        </div>

      </div>
    </RootLayout>
  );
};

export default category_product;
