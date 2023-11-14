import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import Image from "next/image";
import {
  ShoseBannerOne,
  ShoseBannerTwo,
  ShoseBannerThree,
  ShoseBannerFour,
} from "@/src/Assets";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductSlide from "./ProductSlide";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      // duration: 1000,
      easing: "ease-in-out",
      once: true, // Change to false to repeat animations
    });

    // GSAP animation for the image
    gsap.fromTo(
      ".hero-image",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // GSAP animation for the text
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const settings = {
    showThumbs: false,
    // autoPlay: true,
    // infiniteLoop: true,
    animation: "fade",
    showStatus: false,
    showIndicators: true,
    showArrows: false,
    stopOnHover: true,
    // interval: 3000,
    // transitionTime: 2000,
    emulateTouch: true,
    swipeable: true,
    // swipeScrollTolerance: 100,
  };

  const bannarData = [
    {
      id: 1,
      image: ShoseBannerOne,
      title: "Shoe Banner Text 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 2,
      image: ShoseBannerTwo,
      title: "Shoe Banner Text 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 3,
      image: ShoseBannerThree,
      title: "Shoe Banner Text 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      id: 4,
      image: ShoseBannerFour,
      title: "Shoe Banner Text 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
  ];

  return (
    <div className="hero-slider-container py-4">
      <div className="hero-slider-container py-4">
        <Carousel
          {...settings}
          className="hero-slider"
          data-aos="fade-up"
          // data-aos-duration="1000"
        >
          {bannarData.map((item) => {
            return (
              <div key={item.id} data-aos="fade-up">
                <div className="flex justify-center md:flex-row flex-col items-center gap-6">
                  <div
                    className="flex justify-center items-center gap-2 flex-col  transition duration-700 ease-in-out"
                    data-aos="fade-up"
                  >
                    <Image
                      src={item.image}
                      alt="Banner Image"
                      className=" h-full hero-image"
                      width={550}
                      height={550}
                      data-aos="fade-down"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-2 flex-col hero-text">
                    <h1
                      className="text-2xl font-bold text-center"
                      data-aos="fade-up"
                    >
                      {item.title}
                    </h1>
                    <p
                      className="text-sm px-4  text-gray-900 text-center first-letter: animate-pulse transition duration-600 ease-in-out"
                      data-aos="fade-up"
                    >
                      {item.description}
                    </p>
                    <Link
                      href="/product"
                      className="cursor-pointer border-2 border-[#088178] px-6 rounded py-2 text-center capitalize animate-pulse transition duration-700 ease-in-out hover:bg-gray-800 hover:text-white"
                      data-aos="fade-up"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>

      <div>
        <ProductSlide />
      </div>
    </div>
  );
};

export default Hero;
