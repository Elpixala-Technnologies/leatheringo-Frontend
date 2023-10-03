import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import {
    HomeSliderOne,
    HomeSliderTwo,

    MobileBannerOne,
    MobileBannerTwo,
} from "@/src/Assets";

const Hero = () => {
    const sliderData = [
        {
            id: 1,
            brandSliderImage: HomeSliderOne,
            mobileSliderImage: MobileBannerOne,
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        },
        {
            id: 2,
            brandSliderImage: HomeSliderTwo,
            mobileSliderImage: MobileBannerTwo,
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        }
    ]

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
                                    src={isMobile ? slide?.mobileSliderImage : slide?.brandSliderImage}
                                    alt="Banner Image"
                                    className="w-full h-full"
                                    width={isMobile ? 768 : 1920}
                                    height={isMobile ? 768 : 500}
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </>
    );
};

export default Hero;
