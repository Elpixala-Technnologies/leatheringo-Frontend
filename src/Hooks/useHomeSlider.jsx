import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
	deleteHomeSliderProductUrl,
	deleteHomeSliderUrl,
	getHomeSliderProductUrl,
	getHomeSliderUrl
} from '../Utils/Urls/HomeSliderUrl';

const useHomeSlider = () => {
	const { data: homeSliderData, isLoading: homeSlierLoaded, refetch: refetchHomeSlider } = useQuery({
		queryKey: [ 'homeSliderData' ],
		queryFn: async () => {
			try {
				const res = await fetch(getHomeSliderUrl);
				if (!res.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await res.json();
				return data.data;
			} catch (error) {
				console.error('Error fetching data:', error);
				throw error;
			}
		}
	});

	const handelHomeSliderDelete = async (id) => {
		const confirmed = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		});

		if (confirmed.isConfirmed) {
			const res = await fetch(deleteHomeSliderUrl(id), {
				method: 'DELETE'
			});
			const data = await res.json();
			if (!data) {
				Swal.fire({
					position: 'center',
					timerProgressBar: true,
					title: data.message,
					iconColor: '#ED1C24',
					toast: true,
					icon: 'error',
					showClass: {
						popup: 'animate__animated animate__fadeInRight'
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutRight'
					},
					showConfirmButton: false,
					timer: 3500
				});
			} else {
				Swal.fire({
					position: 'center',
					timerProgressBar: true,
					title: 'Successfully Delete !',
					iconColor: '#ED1C24',
					toast: true,
					icon: 'success',
					showClass: {
						popup: 'animate__animated animate__fadeInRight'
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutRight'
					},
					showConfirmButton: false,
					timer: 3500
				});
				refetchHomeSlider();
			}
		}
	};

	const {
		data: homeSliderProductData,
		isLoading: homeSlierProductLoaded,
		refetch: refetchHomeSliderProduct
	} = useQuery({
		queryKey: [ 'homeSliderProductData' ],
		queryFn: async () => {
			try {
				const res = await fetch(getHomeSliderProductUrl);
				if (!res.ok) {
					throw new Error('Failed to fetch data');
				}
				const data = await res.json();
				return data.data;
			} catch (error) {
				console.error('Error fetching data:', error);
				throw error;
			}
		}
	});

	const handelHomeSliderProductDelete = async (id) => {
		const confirmed = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		});

		if (confirmed.isConfirmed) {
			const res = await fetch(deleteHomeSliderProductUrl(id), {
				method: 'DELETE'
			});
			const data = await res.json();
			if (!data) {
				Swal.fire({
					position: 'center',
					timerProgressBar: true,
					title: data.message,
					iconColor: '#ED1C24',
					toast: true,
					icon: 'error',
					showClass: {
						popup: 'animate__animated animate__fadeInRight'
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutRight'
					},
					showConfirmButton: false,
					timer: 3500
				});
			} else {
				Swal.fire({
					position: 'center',
					timerProgressBar: true,
					title: 'Successfully Delete !',
					iconColor: '#ED1C24',
					toast: true,
					icon: 'success',
					showClass: {
						popup: 'animate__animated animate__fadeInRight'
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutRight'
					},
					showConfirmButton: false,
					timer: 3500
				});
				refetchHomeSliderProduct();
			}
		}
	};

	return {
		handelHomeSliderDelete,
		homeSliderData,
		homeSlierLoaded,
		refetchHomeSlider,
		handelHomeSliderProductDelete,
		homeSliderProductData,
		homeSlierProductLoaded,
		refetchHomeSliderProduct
	};
};

export default useHomeSlider;
