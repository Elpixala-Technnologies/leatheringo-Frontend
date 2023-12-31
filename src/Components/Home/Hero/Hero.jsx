// import AOS from "aos";
// import "aos/dist/aos.css";
// import { gsap } from "gsap";
// import Image from "next/image";
// import Link from "next/link";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import ProductSlide from "./ProductSlide";
// import useHomeSlider from "@/src/Hooks/useHomeSlider";

// import React, { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper";

// const Hero = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: "ease-in-out",
//       once: true, // Change to false to repeat animations
//     });

//     // GSAP animation for the image
//     gsap.fromTo(
//       ".hero-image",
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 1 }
//     );

//     // GSAP animation for the text
//     gsap.fromTo(
//       ".hero-text",
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, duration: 1 }
//     );
//   }, []);

//   const settings = {
//     showThumbs: false,
//     autoPlay: true,
//     animation: "fade",
//     showStatus: false,

//     showArrows: false,
//     stopOnHover: true,
//     interval: 3000,
//     transitionTime: 2000,
//     emulateTouch: true,
//     swipeable: true,
//     swipeScrollTolerance: 100,
//     paginationPosition: "bottom",
//     showIndicators: true,
//   };

//   const { homeSliderData } = useHomeSlider()

//   return (
//     <div className="hero-slider-container ">
//       <div className="hero-slider-container py-4 bg-[#0766AD] h-full">
//         <div className='md:container'>
//           <Swiper
//             spaceBetween={30}
//             centeredSlides={true}
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//             loop={true}
//             modules={[Autoplay, Pagination, Navigation]}
//             pagination={true}
//             className="mySwiper heroSlider"
//           >
//             {homeSliderData && homeSliderData?.map((item) => {
//               return (
//                 <SwiperSlide key={item.id} >
//                   <div className="flex justify-center md:flex-row flex-col items-center gap-6 mb-[4rem] md:mb-0">
//                     <div
//                       className="flex justify-center items-center gap-2 flex-col  transition duration-700 ease-in-out"
//                       data-aos="fade-up"
//                     >
//                       <Image
//                         src={item.image}
//                         alt="Banner Image"
//                         className=" h-full hero-image"
//                         width={550}
//                         height={550}
//                         data-aos="fade-down"
//                       />
//                     </div>
//                     <div className="flex justify-center items-center gap-2 flex-col hero-text">
//                       <h1
//                         className="text-2xl font-bold text-center"
//                         data-aos="fade-up"
//                       >
//                         {item.title}
//                       </h1>
//                       <p
//                         className="text-sm px-4  text-gray-900 text-center first-letter: animate-pulse transition duration-600 ease-in-out"
//                         data-aos="fade-up"
//                       >
//                         {item.description}
//                       </p>
//                       <Link
//                         href="/product"
//                         className="cursor-pointer border-2 border-[#088178] px-6 rounded py-2 text-center capitalize animate-pulse transition duration-700 ease-in-out hover:bg-gray-800 hover:text-white"
//                         data-aos="fade-up"
//                       >
//                         Shop Now
//                       </Link>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         </div>
//         <div className="my-4">
//           <ProductSlide />
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Hero;

import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductSlide from "./ProductSlide";
import useHomeSlider from "@/src/Hooks/useHomeSlider";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { HeroBannerImage } from "@/src/Assets";

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



  const { homeSliderData } = useHomeSlider()

  return (
    <div className="hero-slider-container">
      <div className="hero-slider-container  h-full w-full">
        <Image
          src={HeroBannerImage}
          alt="Home Banner"
          className="h-full w-full hero-image"
          width={1920}
        />
      </div>
    </div>
  );
};

export default Hero;
