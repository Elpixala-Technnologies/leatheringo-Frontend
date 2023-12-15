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
import Link from "next/link";

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
            className="belt-banner-section"
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="flex flex-col items-center justify-center gap-4 offer-banner-content">
                            <h2 className='text-[#ffff] text-[1rem]'>Explore Our Offer</h2>
                            <p className='text-[#ffff] text-center font-bold md:text-[2rem]'>Up to <span className='text-[#f0ab4bf2]'>40% Off </span>  – All Belts</p>

                            <Link href="/product" className='common-btn'>Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default BeltBanner;