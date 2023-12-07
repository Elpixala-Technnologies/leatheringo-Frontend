
import React, { useCallback, useEffect, useRef, useState, } from "react";
import Image from "next/image";
import { FaCartPlus, FaEye, FaPhabricator } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import Link from "next/link";
import useProducts from "@/src/Hooks/useProducts";
import AOS from 'aos';
import 'aos/dist/aos.css';

const FeaturedProducts = () => {
    const { productData } = useProducts();
    const [isHovered, setIsHovered] = useState(false);

    const filterProductData = productData?.filter((data) => {
        return data?.status === "Featured";
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
            <div className="my-6 flex flex-col justify-center items-center">
                <h2 className="title">
                    Featured <span>Products</span>
                </h2>
                <p className="my-2 text-[1.2rem] text-muted text-center">
                    Summer Collection New Modern Design
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
                                const { colors } = product
                                return (
                                    <SwiperSlide className="cursor-grab" key={product?._id}
                                    >
                                        <div className='border rounded-[0.6rem] relative'>
                                            <div>
                                                <Link href={`/product/${product?._id}`}>
                                                    <div className="productImage">
                                                        <div className="h-menu border rounded-t-[0.6rem] overflow-hidden relative">
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
                                                </Link>
                                            </div>

                                            <div className='px-4 w-[60%] py-1 bg-[#000] rounded-r absolute top-4 text-[#fff] text-[0.6rem] font-semibold'>
                                                🎉 New Launch
                                            </div>

                                            <div className='rounded-b-[0.6rem] bg-[#fafafa] p-4 relative'>
                                                <div className='px-6 py-1 bg-yellow-500 rounded-md w-[60%] absolute top-[-1rem] text-center font-semibold left-[15%]'>
                                                    {product.status}
                                                </div>

                                                <div className='my-2 text-left'>
                                                    <Link href={`/product/${product?._id}`} className='font-semibold'>{product?.name.slice(0, 30)}</Link>
                                                    <div className='flex justify-end'>
                                                        <div className="flex items-center flex-wrap gap-2">
                                                            {colors && colors?.slice(0, 3)?.map((color, index) => {
                                                                return (
                                                                    <div key={index} className="flex flex-col justify-center gap-2">
                                                                        <div
                                                                            className={`bg-[#f1e8e8]  rounded-full w-[2rem] h-[2rem] cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 `}
                                                                            style={{
                                                                                '2px solid #ff5733': '2px solid #3aa1b8',
                                                                            }}
                                                                            title={color.color}
                                                                            onClick={() => handleColorClick(index)}
                                                                        >
                                                                            <img
                                                                                src={color?.images[0]}
                                                                                alt={color.color}
                                                                                className='rounded-full'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })} {colors.length} +
                                                        </div>
                                                    </div>

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

                                                    <div className='flex justify-end mt-2'>
                                                        <Link href={`/product/${product?._id}`}
                                                            className='border px-4  rounded py-1 bg-black text-white flex items-center gap-2'
                                                        >
                                                            <FaCartPlus /> Add To Cart
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
        </section>
    );
};

export default FeaturedProducts;
