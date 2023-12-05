import Image from "next/image";
import React, { useCallback, useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import Link from "next/link";
import useProducts from "@/src/Hooks/useProducts";
import { FaCartPlus } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";


const RecomendationProduct = () => {
    const sliderRef = useRef(null);
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const { productData } = useProducts()

    return (
        <section className=" mx-2 relative h-full">
            <div className="title my-6 flex justify-between items-center">
                <h2 className=" text-[1rem] md:text-[1.5rem] text-center md:text-left lg:text-3xl uppercase xxs:text-2xl  text-black font-bold">
                    Recomendation
                </h2>

                <div className="flex  items-center gap-10 top-0">
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
            </div>

            <div className="h-full">
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
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={() => { }}
                    onSwiper={(swiper) => { }}
                >
                    <div className="grid grid-cols-1 justify-center items-center mx-auto  gap-4">
                        {productData &&
                            productData?.map((product) => {
                                return (
                                    <SwiperSlide className="cursor-grab" key={product._id}>
                                        <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-red-500  color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 ">
                                            <div className="productImage">
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
                                                <p className="text-left text-gray-600">{product?.brand}</p>
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
                                                <div className="productAddToCart flex gap-10 items-center my-4  justify-between">
                                                    <div>
                                                        <Link className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" href={`/product/${product?._id}`}>
                                                            <FaCartPlus />
                                                            Product Details
                                                        </Link>
                                                    </div>
                                                    <div
                                                        className='border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-full duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500 cursor-pointer'
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

export default RecomendationProduct;