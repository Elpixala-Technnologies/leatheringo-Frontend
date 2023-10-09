// import React, { useEffect, useRef } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { gsap } from "gsap";
// import Image from "next/image";
// import { ShoseBannerOne } from "@/src/Assets";
// import Link from "next/link";

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
//       { opacity: 1, y: 0, duration: 1 },
//       {
//         scrollTrigger: {
//           trigger: ".hero-image",
//           start: "top center",
//           end: "bottom 80%",
//           scrub: true,
//         },
//       },
//       //  === Text Animation ===
//       gsap.fromTo(
//         ".hero-text",
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 1 },
//         {
//           scrollTrigger: {
//             trigger: ".hero-text",
//             start: "top center",
//             end: "bottom 80%",
//             scrub: true,
//           },
//         }
//       )


//     );
//   }, []);

//   return (
//     <div
//       className="hero-slider-container py-10"
//     >
//       <div className="flex justify-center md:flex-row flex-col items-center gap-6">
//         <div
//           className="flex justify-center items-center gap-2 flex-col 
//           animate-pulse transition duration-700 ease-in-out "
//         >
//           <Image
//             src={ShoseBannerOne}
//             alt="Banner Image"
//             className="w-[450px] h-full hero-image"
//             width={350}
//             height={350}
//           />
//         </div>
//         <div className="flex justify-center items-center gap-2 flex-col hero-text"

//         >
//           <h1 className="text-2xl font-bold text-left">Shoe Banner Text</h1>
//           <p className="text-sm text-gray-900 text-left first-letter: animate-pulse transition duration-600 ease-in-out">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
//             voluptatum.
//           </p>
//           <Link
//             href="/products"
//             className="cursor-pointer border-2 border-[#088178] px-6 rounded py-2 text-left capitalize animate-pulse transition duration-700 ease-in-out hover:bg-gray-800 hover:text-white"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </div>
//     </div >
//   );
// };

// export default Hero;


// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { gsap } from "gsap";
// import Image from "next/image";
// import {
//   ShoseBannerOne,
//   ShoseBannerTwo,
//   ShoseBannerThree,
//   ShoseBannerFour,
// } from "@/src/Assets";
// import Link from "next/link";
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

//   return (
//     <div className="hero-slider-container py-10">
//       <Carousel showThumbs={false} infiniteLoop autoPlay>
//         {/* Add multiple slides here */}
//         <div>
//           <div className="flex justify-center md:flex-row flex-col items-center gap-6">
//             <div
//               className="flex justify-center items-center gap-2 flex-col animate-pulse transition duration-700 ease-in-out"
//             >
//               <Image
//                 src={ShoseBannerOne}
//                 alt="Banner Image"
//                 className="w-[200px] h-full hero-image"
//                 width={350}
//                 height={350}
//               />
//             </div>
//             <div className="flex justify-center items-center gap-2 flex-col hero-text">
//               <h1 className="text-2xl font-bold text-left">Shoe Banner Text</h1>
//               <p className="text-sm text-gray-900 text-left first-letter: animate-pulse transition duration-600 ease-in-out">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
//                 voluptatum.
//               </p>
//               <Link
//                 href="/products"
//                 className="cursor-pointer border-2 border-[#088178] px-6 rounded py-2 text-left capitalize animate-pulse transition duration-700 ease-in-out hover:bg-gray-800 hover:text-white"
//               >
//                 Shop Now
//               </Link>
//             </div>
//           </div>
//         </div>
//         {/* Add more slides as needed */}
//       </Carousel>
//     </div>
//   );
// };

// export default Hero;
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
      <Carousel showThumbs={false} infiniteLoop autoPlay
        animation="fade"
        showStatus={false}
        showIndicators={true}
        showArrows={false}
        stopOnHover={true}
        interval={3000}
        transitionTime={1000}
        // use here for animation effect image and text are full animation
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
              <h1 className="text-2xl font-bold text-left" data-aos="fade-up">Shoe Banner Text 1</h1>
              <p className="text-sm text-gray-900 text-left first-letter: animate-pulse transition duration-600 ease-in-out" data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
              </p>
              <Link
                href="/product"
                className="cursor-pointer border-2 border-[#088178] px-6 rounded py-2 text-left capitalize animate-pulse transition duration-700 ease-in-out hover:bg-gray-800 hover:text-white"
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
              <h1 className="text-2xl font-bold text-left" data-aos="fade-up">Shoe Banner Text 2</h1>
              <p className="text-sm text-gray-900 text-left first-letter: animate-pulse transition duration-600 ease-in-out" data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
              </p>
              <Link
                href="/product"
                className="cursor-pointer border-2 border-[#088178] px-6 rounded py-2 text-left capitalize animate-pulse transition duration-700 ease-in-out hover:bg-gray-800 hover:text-white"
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
              <h1 className="text-2xl font-bold text-left" data-aos="fade-up">Shoe Banner Text 3</h1>
              <p className="text-sm text-gray-900 text-left first-letter: animate-pulse transition duration-600 ease-in-out" data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
              </p>
              <Link
                href="/product"
                className="cursor-pointer border-2 border-[#088178] px-6 rounded py-2 text-left capitalize animate-pulse transition duration-700 ease-in-out hover:bg-gray-800 hover:text-white"
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
              <h1 className="text-2xl font-bold text-left" data-aos="fade-up">Shoe Banner Text 4</h1>
              <p className="text-sm text-gray-900 text-left first-letter: animate-pulse transition duration-600 ease-in-out" data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                voluptatum.
              </p>
              <Link
                href="/product"
                className="cursor-pointer border-2 border-[#088178] px-6 rounded py-2 text-left capitalize animate-pulse transition duration-700 ease-in-out hover:bg-gray-800 hover:text-white"
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
