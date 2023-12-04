import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCartPlus, FaEye, FaPhabricator } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import Link from "next/link";
import useProducts from "@/src/Hooks/useProducts";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsCartCheck } from "react-icons/bs";


const NewArrivals = () => {
    const { productData } = useProducts();

    const filterProductData = productData?.filter((data) => {
        return data?.status === "New Arrival";
    });

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
            once: true, // Only trigger the animation once
        });
    }, []);


    return (
        <section className="my-4 mx-2" >
            <div className=" my-6 flex flex-col justify-center items-center ">
                <h2 className="title">
                    New  <span>Arrivals</span>
                </h2>
                <p className="my-2  text-[1.2rem] text-muted text-center">
                    Discover the Latest Trends and Must-Have Additions to Elevate Your Style and Lifestyle!
                </p>
            </div>
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
                        {filterProductData &&
                            filterProductData.map((product) => {
                                return (
                                    <SwiperSlide className="cursor-grab" key={product?._id}
                                    >
                                        <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-red-500  color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 ">
                                            <div className="productImage ">
                                                <div className="h-menu border rounded-[1rem] overflow-hidden relative">
                                                    <img
                                                        src={product?.colors[0]?.images[0]}
                                                        alt="First Image"
                                                        className="h-full w-full object-cover duration-200"
                                                    />
                                                    <img
                                                        src={product?.colors[0]?.images[1]}
                                                        alt="Second Image"
                                                        className="hover-img absolute top-0 left-0 w-full h-full object-cover duration-300"
                                                    />
                                                </div>
                                            </div>
                                     
                                            <div className="productInfo mt-2 p-2">
                                                <p className="text-left text-gray-600 mb-2">{product?.brand}</p>
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
                                                <div className="productAddToCart flex gap-10 items-center my-4  ">
                                                    <div>
                                                        <Link className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" href={`/product/${product?._id}`}>
                                                            <FaCartPlus />
                                                            Product Details
                                                        </Link>
                                                    </div>
                                                    <div
                                                        className='border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500 cursor-pointer'
                                                    >
                                                        <BsCartCheck
                                                            className='text-[2rem] '
                                                        />
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
        </section>
    );
};

export default NewArrivals;
