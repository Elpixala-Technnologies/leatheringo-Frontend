import DashboardLayout from '@/src/Layouts/DashboardLayout';
import React from 'react';
import Link from 'next/link';
import HomeSlider from '@/src/Components/Dashboard/HomeSlider/HomeSlider';

const HomeSliderPage = () => {
	return (
		<DashboardLayout>
			<section className="container">
				<div>
					<Link href="/dashboard/home-slider/manage-homeslider">
						<div className="common-btn">Manage Home Slider </div>
					</Link>
				</div>

				<HomeSlider />
			</section>
		</DashboardLayout>
	);
};

export default HomeSliderPage;
