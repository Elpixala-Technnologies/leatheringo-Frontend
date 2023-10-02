import React from 'react';
import Hero from '../Hero/Hero';
import HomeInfoCard from '../HomeInfoCard/HomeInfoCard';
import PopualrCategory from '../PopularCategory/PopularCategory';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

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
                <FeaturedProducts />
                {/* ====== Hero ====== */}
            </div>
        </section>
    );
};

export default HomeComponent;