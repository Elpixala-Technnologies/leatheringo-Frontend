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
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

  return (
    <div className="hero-slider-container py-10">
      <Carousel 
        showThumbs={false}
         // autoPlay
        // infiniteLoop 
        animation="fade"
        showStatus={false}
        showIndicators={true}
        showArrows={false}
        stopOnHover={true}
        interval={3000}
        transitionTime={2000}
        emulateTouch={true}
        swipeable={true}
        swipeScrollTolerance={100}
      >
        {/* Slide 1 */}
        <div data-aos="fade-up">
          <div className="flex justify-center md:flex-row flex-col items-center gap-6">
            <div
              className="flex justify-center items-center gap-2 flex-col animate-pulse transition duration-700 ease-in-out"
              data-aos="fade-up"
            >
              <Image
                src={ShoseBannerOne}
                alt="Banner Image"
                className="w-[200px] h-full hero-image"
                width={350}
                height={350}
                data-aos="fade-down"
              />
            </div>
            <div className="flex justify-center items-center gap-2 flex-col hero-text">
              <h1 className="text-2xl font-bold text-center" data-aos="fade-up">Shoe Banner Text 1</h1>
              <p className="text-sm px-4  text-gray-900 text-center first-letter: animate-pulse transition duration-600 ease-in-out" data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
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

        {/* Slide 2 */}
        <div data-aos="fade-up">
          <div className="flex justify-center md:flex-row flex-col items-center gap-6">
            <div
              className="flex justify-center items-center gap-2 flex-col animate-pulse transition duration-700 ease-in-out"
              data-aos="fade-up"
            >
              <Image
                src={ShoseBannerTwo}
                alt="Banner Image"
                className="w-[200px] h-full hero-image"
                width={350}
                height={350}
                data-aos="fade-down"
              />
            </div>
            <div className="flex justify-center items-center gap-2 flex-col hero-text">
              <h1 className="text-2xl font-bold text-center" data-aos="fade-up">Shoe Banner Text 2</h1>
              <p className="text-sm text-gray-900 text-center  px-4  first-letter: animate-pulse transition duration-600 ease-in-out" data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
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

        {/* Slide 3 */}
        <div data-aos="fade-up">
          <div className="flex justify-center md:flex-row flex-col items-center gap-6">
            <div
              className="flex justify-center items-center gap-2 flex-col animate-pulse transition duration-700 ease-in-out"
              data-aos="fade-up"
            >
              <Image
                src={ShoseBannerThree}
                alt="Banner Image"
                className="w-[200px] h-full hero-image"
                width={350}
                height={350}
                data-aos="fade-down"
              />
            </div>
            <div className="flex justify-center items-center gap-2 flex-col hero-text">
              <h1 className="text-2xl font-bold text-center" data-aos="fade-up">Shoe Banner Text 3</h1>
              <p className="text-sm text-gray-900  px-4  text-center first-letter: animate-pulse transition duration-600 ease-in-out" data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
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

        {/* Slide 4 */}
        <div data-aos="fade-up">
          <div className="flex justify-center md:flex-row flex-col items-center gap-6">
            <div
              className="flex justify-center items-center gap-2 flex-col animate-pulse transition duration-700 ease-in-out"
              data-aos="fade-up"
            >
              <Image
                src={ShoseBannerFour}
                alt="Banner Image"
                className="w-[200px] h-full hero-image"
                width={350}
                height={350}
                data-aos="fade-down"
              />
            </div>
            <div className="flex justify-center items-center gap-2 flex-col hero-text">
              <h1 className="text-2xl font-bold text-center" data-aos="fade-up">Shoe Banner Text 4</h1>
              <p className="text-sm text-gray-900  px-4  text-center first-letter: animate-pulse transition duration-600 ease-in-out" data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
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

        {/* Add more slides as needed */}
      </Carousel>
    </div>
  );
};

export default Hero;
