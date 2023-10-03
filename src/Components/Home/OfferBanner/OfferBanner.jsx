import { OfferBannerImage } from '@/src/Assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OfferBanner = () => {
    return (
        <section className="w-[100%] offer-banner-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="offer-banner-content flex flex-col justify-center items-center gap-4">
                            <h2 className='text-[#ffff] text-[1rem]'>Explore Our Offer</h2>
                            <p className='text-[#ffff] font-bold text-[2rem]'>Up to <span className='text-[#f0ab4bf2]'>70% Off </span>  – All Shoes and Footwear</p>

                            <Link href="/shop" className='common-btn'>Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferBanner;