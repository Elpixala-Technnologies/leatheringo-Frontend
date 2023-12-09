import ManegePhotoGelary from '@/src/Components/Dashboard/HomeSlider/HomeSliderMange';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import React from 'react';
import Link from 'next/link';

const HomeSliderPageManage = () => {
	return (
		<DashboardLayout>
			<section className="container">
				<div>
					<Link href="/dashboard/home-slider">
						<div className="common-btn"> Home Slider</div>
					</Link>
				</div>

				<ManegePhotoGelary />
			</section>
		</DashboardLayout>
	);
};

export default HomeSliderPageManage;
