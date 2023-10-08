import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import { BeltBannerOne, BeltBannerTwo } from "@/src/Assets";

const BeltBanner = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: "ease-in-out", // Easing for the animation
            once: true, // Only animate elements once
        });
    }, []);


    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: "ease-in-out", // Easing for the animation
            once: true, // Only animate elements once
        });

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Define your mobile breakpoint
        };

        handleResize(); // Check the initial screen width
        window.addEventListener("resize", handleResize); // Listen for window resize events

        return () => {
            window.removeEventListener("resize", handleResize); // Remove the event listener when the component unmounts
        };
    }, []);

    const beltBannerData = [
        {
            id: 1,
            title: "Belts",
            subtitle: "Shop Now",
            desktopBanner: BeltBannerOne,
            mobileBannerImage: BeltBannerOne,
        },
        {
            id: 2,
            title: "Belts",
            subtitle: "Shop Now",
            desktopBanner: BeltBannerTwo,
            mobileBannerImage: BeltBannerTwo,
        },

    ]

    return (
        <section
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div className="hero-slider-container h-[70vh]">
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
                    {beltBannerData &&
                        beltBannerData.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <Image
                                    src={isMobile ? slide?.mobileBannerImage : slide?.desktopBanner}
                                    alt="Banner Image"
                                    className="w-full h-full"
                                    width={isMobile ? 768 : 1920}
                                    height={isMobile ? 768 : 500}
                                    data-aos="fade-up" // Add AOS animation attribute
                                    data-aos-duration="1000" // Set animation duration in milliseconds
                                />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>

        </section>
    );
};

export default BeltBanner;