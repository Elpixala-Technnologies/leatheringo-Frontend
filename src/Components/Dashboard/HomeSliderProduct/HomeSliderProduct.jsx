import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { addHomeSliderProductUrl } from '@/src/Utils/Urls/HomeSliderUrl';

const HomeSliderProduct = () => {
	const { handleSubmit, register } = useForm();
	const [ imageFile, setImageFile ] = useState(null);
	const [ imagePreview, setImagePreview ] = useState(null);
	const [ uploadProgress, setUploadProgress ] = useState(0);

	const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
	const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
	const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
	const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);
			setUploadProgress(0);
		}
	};

	const uploadImageToCloudinary = async (file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('public_id', `${cloud_folder}/Slider/${file.name}`);
		formData.append('upload_preset', upload_preset);

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', cloud_api, true);

			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					const progress = Math.round(event.loaded / event.total * 100);
					setUploadProgress(progress);
				}
			};

			xhr.onload = () => {
				if (xhr.status === 200) {
					const response = JSON.parse(xhr.responseText);
					resolve(response.secure_url);
				} else {
					reject('Upload failed');
				}
			};

			xhr.onerror = () => reject('Error during upload');
			xhr.send(formData);
		});
	};

	const onSubmit = async (dataValue) => {
		try {
			const imageUrl = await uploadImageToCloudinary(imageFile);
			// Replace baseUrl with your API's URL
			const res = await fetch(addHomeSliderProductUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: dataValue.title,
					description: dataValue.description,
					price: dataValue.price,
					image: imageUrl
				})
			});
			const dataRes = await res.json();

			if (dataRes.success) {
				Swal.fire({
					position: 'center',
					timerProgressBar: true,
					title: 'Successfully Photo Gallery Added!',
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
				setImageFile(null);
				setImagePreview(null);
				setUploadProgress(0);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!'
				});
			}
		} catch (error) {
			console.error('Error: ', error);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Failed to upload image!'
			});
		}
	};

	return (
		<section className="flex flex-col gap-6">
			<div>
				<div className="w-full h-full my-4">
					<div className="rounded-lg shadow-xl bg-gray-50">
						<div className="p-4">
							<label className="inline-block mb-2 text-gray-500">Upload Slider</label>
							<div className="flex items-center justify-center w-full">
								<label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
									<div className="flex flex-col items-center justify-center pt-7">
										{/* SVG Icon */}
									</div>
									<input
										type="file"
										className="px-4 pb-4"
										name="image"
										accept="image/*"
										onChange={handleFileChange}
									/>
								</label>
							</div>
						</div>
					</div>
				</div>
				{imagePreview && (
					<div className="relative w-1/2">
						<img src={imagePreview} alt="" className="w-full h-full object-cover" />
						<button
							className="absolute top-0 right-0 m-2 p-2 bg-red-500 text-white rounded-full"
							onClick={() => {
								setImageFile(null);
								setImagePreview(null);
								setUploadProgress(0);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				)}
				{uploadProgress > 0 && (
					<div className="my-4">
						<LinearProgress variant="determinate" value={uploadProgress} />
					</div>
				)}
			</div>

			<div>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					{...register('title')}
					className="border-2 border-gray-300 rounded-md p-2 w-full"
				/>
			</div>
			<div>
				<label htmlFor="title">Price</label>
				<input
					type="text"
					name="price"
					{...register('price')}
					className="border-2 border-gray-300 rounded-md p-2 w-full"
				/>
			</div>
			<div>
				<label htmlFor="description">Description</label>
				<textarea
					name="description"
					{...register('description')}
					className="border-2 border-gray-300 rounded-md p-2 w-full"
				/>
			</div>

			<div className="py-6">
				<Button
					variant="contained"
					className="common-btn"
					endIcon={<SendIcon />}
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</div>
		</section>
	);
};

export default HomeSliderProduct;
