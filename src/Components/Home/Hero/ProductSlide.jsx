import useProducts from '@/src/Hooks/useProducts';
import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCartPlus, FaEye, FaPhabricator } from "react-icons/fa";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
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



    return (
        <div className='flex justify-center md:flex-row flex-col items-center gap-4 m-4 md:m-0'>

            <div className='md:flex flex-col justify-center gap-4 md:w-[20%] hidden'
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
                data-aos-duration="1000"
            >
                <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {homeSliderProductData &&
                        homeSliderProductData?.map((product) => {
                            return (
                                <SwiperSlide className="cursor-grab" key={product?.title + 'produc'}>
                                    <div className='flex gap-4 justify-center items-center p-6'>
                                        <div className='md:w-[7rem]'>
                                            <Image
                                                src={product?.image}
                                                width={80}
                                                height={80}
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <div className='text-left'>
                                            <h1 className='font-bold'>
                                                {product?.title}
                                            </h1>
                                            <h1>
                                                {product?.description}
                                            </h1>
                                            <h1 className='font-bold'>
                                                ₹ {product?.price}
                                            </h1>
                                        </div>
                                    </div>


                                    {/* <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-red-500  color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 ">
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
                                                {product?.details?.slice(0, 46) + "..."}
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
                                    </div> */}
                                </SwiperSlide>
                            );
                        })}
                </div>
            </Swiper>
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
