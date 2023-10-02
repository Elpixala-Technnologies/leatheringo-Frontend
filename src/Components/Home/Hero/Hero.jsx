import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import {
    HomeSliderOne,
    HomeSliderTwo,
    HomeSliderThree,
} from "@/src/Assets";

const Hero = () => {
    const sliderData = [
        {
            id: 1,
            brandSliderImage: HomeSliderOne,
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        },
        {
            id: 2,
            brandSliderImage: HomeSliderTwo,
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        },
        {
            id: 3,
            brandSliderImage: HomeSliderThree,
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        },
    ]

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper heroSlider"
            >
                {sliderData &&
                    sliderData.map((slide) => {
                        return (
                            <SwiperSlide key={slide.id}>
                                <Image
                                    src={slide.brandSliderImage}
                                    alt="Red Rose Auto Trading"
                                    layout="responsive"
                                    width={750}
                                    height={300}
                                    className="w-[100%] h-[100%]"
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </>
    );
};

export default Hero;
