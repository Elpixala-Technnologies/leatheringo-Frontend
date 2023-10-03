import Link from 'next/link';
import React, { useEffect } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const OfferBanner = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Only trigger the animation once
        });
    }, []);

    return (
        <section className="w-[100%] offer-banner-section" data-aos="fade-up"> {/* Add data-aos attribute */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="flex flex-col items-center justify-center gap-4 offer-banner-content">
                            <h2 className='text-[#ffff] text-[1rem]'>Explore Our Offer</h2>
                            <p className='text-[#ffff] font-bold md:text-[2rem]'>Up to <span className='text-[#f0ab4bf2]'>70% Off </span>  – All Shoes and Footwear</p>

                            <Link href="/product" className='common-btn'>Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferBanner;