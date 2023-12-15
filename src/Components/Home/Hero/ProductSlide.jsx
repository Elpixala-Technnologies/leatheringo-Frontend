import useProducts from '@/src/Hooks/useProducts';
import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCartPlus, FaEye, FaPhabricator } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import { BsCartCheck } from "react-icons/bs";
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    ShoseOne,
    ShoseTow,
    ShoseTheree,
    ShoseFour
} from '@/src/Assets';
import useHomeSlider from '@/src/Hooks/useHomeSlider';

const ProductSlide = () => {
    const { productData } = useProducts()
    const { homeSliderProductData } = useHomeSlider()
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

    const sliderData = [
        {
            image: ShoseOne,
            name: "Adidas Ultraboost 21",
            collection: "Running collections",
            star: "4.5",
            price: "180",
        },
        {
            image: ShoseTow,
            name: "Puma Future Rider",
            collection: "Casual collections",
            star: "4.2",
            price: "120",
        },
        {
            image: ShoseTheree,
            name: "Nike Air Max 270",
            collection: "Athletic collections",
            star: "4.7",
            price: "160",
        },
        {
            image: ShoseFour,
            name: "New Balance Fresh Foam X",
            collection: "Running collections",
            star: "4.3",
            price: "130",
        }
    ];

    console.log(homeSliderProductData, "homeSliderProductData")



    return (
        <div className='md:container'>
            <div className='flex justify-around md:flex-row flex-col items-center gap-4 md:m-0'>
                <div className='md:flex flex-col justify-center gap-4 md:w-[20%]   hidden'
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <div className='md:text-left text-center'>
                        <h1 className='text-1xl font-bold '>
                            Our Recent Products
                        </h1>
                        <p>
                            Explore Our Latest Innovations and Elevate Your Lifestyle with Our Cutting-Edge Products!
                        </p>
                    </div>
                    <div className="flex items-center gap-10 top-0">
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


                <Swiper
                     autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
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
                            slidesPerView: 1,
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
                    data-aos-duration="1000"
                >
                    <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-2 lg:grid-cols-3 ">
                        {homeSliderProductData &&
                            homeSliderProductData?.map((product) => {
                                return (
                                    <SwiperSlide className="cursor-grab w-full " key={product?.title + 'produc'}>
                                        <Link
                                            href={`/product/${product?.product?._id}`}
                                        >
                                            <div className='flex justify-around md:items-center p-6 border rounded-[20px] bg-[#fefefe] md:w-full'>
                                                <div className='md:w-[4rem]  relative'>
                                                    <div className='md:absolute  top-[-45px] left-[-60px]  '>
                                                        <Image
                                                            src={product?.image}
                                                            width={60}
                                                            height={200}
                                                            id='shoes'
                                                            className="w-full h-full product-slider-img z-[9999]"
                                                        />
                                                    </div>
                                                </div>
                                                <div className=' md:text-left ml-2'>
                                                    <h1 className='font-extrabold text-sm'>
                                                        {product?.product.name.toUpperCase().slice(0, 15, "..")}
                                                    </h1>
                                                    <h1>
                                                        {product?.description}
                                                    </h1>

                                                    <div className='flex gap-4'>
                                                        <h1 className="text-sm text-slate-400">
                                                          Running Collection
                                                        </h1>
                                                    </div>

                                                    <div className='flex items-center  gap-6'>
                                                        <h1 className="font-bold text-2xl text-slate-900">
                                                            {
                                                                `₹ ${Math.floor(product.product?.price - (product?.product?.price * product?.product?.discount) / 100)}`
                                                                
                                                            }
                                                        </h1>
                                                        <div>
                                                            <FaCartPlus className='text-[1.2rem]' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default ProductSlide;



<>
    {/* UI card from https://uxplanet.org/ultimate-guide-for-designing-ui-cards-59488a91b44f */}
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
        <div className="relative m-3 flex flex-wrap mx-auto justify-center">
            <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                <div className="overflow-x-hidden rounded-2xl relative">
                    <img
                        className="h-40 rounded-2xl w-full object-cover"
                        src="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
                    />
                    <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 group-hover:opacity-50 opacity-70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="black"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </p>
                </div>
                <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                        <p className="text-lg font-semibold text-gray-900 mb-0">
                            Product Name
                        </p>
                        <p className="text-md text-gray-800 mt-0">$340</p>
                    </div>
                    <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 group-hover:opacity-70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="gray"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                <div className="overflow-x-hidden rounded-2xl relative">
                    <img
                        className="h-40 rounded-2xl w-full object-cover"
                        src="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
                    />
                    <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 group-hover:opacity-50 opacity-70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="black"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </p>
                </div>
                <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                        <p className="text-lg font-semibold text-gray-900 mb-0">
                            Product Name
                        </p>
                        <p className="text-md text-gray-800 mt-0">$340</p>
                    </div>
                    <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 group-hover:opacity-70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="gray"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
