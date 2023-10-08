import React from 'react';
import Hero from '../Hero/Hero';
import HomeInfoCard from '../HomeInfoCard/HomeInfoCard';
import PopualrCategory from '../PopularCategory/PopularCategory';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import OfferBanner from '../OfferBanner/OfferBanner';
import NewArrivals from '../TrandingArriveProduct/NewArrivals/NewArrivals';
import BeltBanner from '../BeltBanner/BeltBanner';

const HomeComponent = () => {
    return (
        <section>
            <div className="container">
                <Hero />
                {/* ====== HomeInfoCard ====== */}
                <HomeInfoCard />
                {/* ====== PopualrCategory ====== */}
                <PopualrCategory />
                {/* ======FeaturedProducts ====== */}
                <BeltBanner />
                <FeaturedProducts />
                {/* ====== Offer Banner ====== */}
                <OfferBanner />
                {/* ====== TrandingArriveProduct ====== */}
                <NewArrivals />


            </div>
        </section>
    );
};

export default HomeComponent;