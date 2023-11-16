import DashboardLayout from '@/src/Layouts/DashboardLayout';
import React from 'react';
import Link from 'next/link';
import HomeSliderManageProduct from '@/src/Components/Dashboard/HomeSliderProduct/HomeSliderMangeProduct';

const HomeSliderProductPageManage = () => {
	return (
		<DashboardLayout>
			<section className="container">
				<div>
					<Link href="/dashboard/home-slider-product">
						<div className="common-btn">Home Slider Product</div>
					</Link>
				</div>

				<HomeSliderManageProduct />
			</section>
		</DashboardLayout>
	);
};

export default HomeSliderProductPageManage;
