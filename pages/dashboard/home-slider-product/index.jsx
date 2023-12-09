import DashboardLayout from '@/src/Layouts/DashboardLayout';
import React from 'react';
import Link from 'next/link';
import HomeSliderProduct from '@/src/Components/Dashboard/HomeSliderProduct/HomeSliderProduct';

const HomeSliderProductPage = () => {
	return (
		<DashboardLayout>
			<section className="container">
				<div>
					<Link href="/dashboard/home-slider-product/manage-homeslider-product">
						<div className="common-btn"> Manage Home Slider Product </div>
					</Link>
				</div>

				<HomeSliderProduct />
			</section>
		</DashboardLayout>
	);
};

export default HomeSliderProductPage;
