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
import useHomeSlider from "@/src/Hooks/useHomeSlider";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
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
    autoPlay: true,
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
    swipeScrollTolerance: 100,
  };
 
  const {homeSliderData} = useHomeSlider()


  // const bannarData = [
  //   {
  //     id: 1,
  //     image: ShoseBannerOne,
  //     title: "Elevate Your Style with Our Latest Shoe Collection",
  //     description:
  //       "Discover the perfect blend of comfort and fashion. Our new shoe collection is designed to complement your unique style and keep you on-trend.",
  //   },
  //   {
  //     id: 2,
  //     image: ShoseBannerTwo,
  //     title: "Step Out in Confidence with Our Stylish Shoes",
  //     description:
  //       "Walk with confidence in our high-quality and stylish shoes. Unleash your personality with footwear that speaks volumes about your taste and individuality.",
  //   },
  //   {
  //     id: 3,
  //     image: ShoseBannerThree,
  //     title: "Find Your Perfect Fit: Comfortable and Fashionable Shoes",
  //     description:
  //       "Experience unmatched comfort without compromising on style. Our shoes are crafted to provide the perfect fit, ensuring you look and feel great wherever you go.",
  //   },
  //   {
  //     id: 4,
  //     image: ShoseBannerFour,
  //     title: "Upgrade Your Wardrobe with Our Trendsetting Shoes",
  //     description:
  //       "Stay ahead in the fashion game with our trendsetting shoe collection. Elevate your wardrobe and make a statement with every step you take.",
  //   },
  // ];
  

  return (
    <div className="hero-slider-container py-4">
      <div className="hero-slider-container py-4">
        <Carousel
          {...settings}
          className="hero-slider"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {homeSliderData && homeSliderData?.map((item) => {
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
