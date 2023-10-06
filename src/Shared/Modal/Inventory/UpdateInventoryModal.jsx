import useProducts from '@/src/Hooks/useProducts';
import { updateProductsUrl } from '@/src/Utils/Urls/ProductUrl';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdateInventoryModal = ({
    isUpdateInventoryModalOpen,
    setIsUpdateInventoryModalOpen,
    selectedProduct
}) => {
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
    const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm();
    const { refetchProducts } = useProducts()

    const {
        _id,
        colors,
        discount,
        price,
    } = selectedProduct;

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('public_id', `${cloud_folder}/Product/${file?.name}`);
        formData.append('upload_preset', upload_preset);
        formData.append('cloud_name', cloud_name);

        try {
            const response = await fetch(cloud_api, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const imageData = await response.json();
            const imageUrl = imageData.secure_url;
            return imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    useEffect(() => {
        setValue('price', price);
        setValue('discount', discount);
        setValue('productColors', colors);
    }, [selectedProduct]);

    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = async (event, colorIndex) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            try {
                const uploadedImages = [];

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const imageUrl = await uploadImageToCloudinary(file);

                    if (imageUrl) {
                        uploadedImages.push(imageUrl);
                    }
                }

                if (uploadedImages.length > 0) {
                    const updatedColors = [...getValues("productColors")];
                    updatedColors[colorIndex].images = [
                        ...updatedColors[colorIndex].images,
                        ...uploadedImages,
                    ];

                    // Update the entire "productColors" field in the form
                    setValue("productColors", updatedColors);
                }
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        }
    };

    const onSubmit = async (inputValue) => {
        const { discount, price } = inputValue;
        console.log(inputValue);

        try {
            setIsLoading(true);
            const res = await fetch(updateProductsUrl(_id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    discount: discount,
                    price: price,
                    colors: inputValue.productColors.map((item, colorIndex) => {
                        const { color, sizes, quantity, images } = item;
                        return {
                            color,
                            isSizeApplicable: sizes?.length > 0,
                            sizes: sizes?.map((sizeItem) => {
                                const { size, quantity } = sizeItem;
                                return {
                                    size,
                                    quantity,
                                };
                            }),
                            quantity,
                            images: images?.length > 0
                                ? images.map((image) => {
                                    if (typeof image === 'string') {
                                        return image;
                                    } else {
                                        return uploadImageToCloudinary(image);
                                    }
                                })
                                : selectedProduct.colors[colorIndex]?.images || [],
                        };
                    }),
                })
            });

            const result = await res.json();

            if (!result) {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Something went wrong!",
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "error",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
            } else {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Inventory Product Added Successfully!",
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "success",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
                setIsLoading(false);
                setIsUpdateInventoryModalOpen(false);
                refetchProducts()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Update Inventory"
            visible={isUpdateInventoryModalOpen}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={() => setIsUpdateInventoryModalOpen(false)}
            width={800}
        >
            <div className='flex justify-center items-center flex-col gap-4 mb-4'>
                <h1 className="text-3xl font-semibold text-center">Update Inventory</h1>
                <p>
                    Update Inventory of <span className="font-semibold">{selectedProduct?.name}</span>
                </p>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 mx-auto my-4 "
                >
                    <div className='border-2 rounded px-2'>
                        <label htmlFor="price">Price :</label>
                        <input
                            type="number"
                            placeholder="Price"
                            id='price'
                            defaultValue={price}
                            className='border-2 border-black rounded-md p-2'
                            {...register("price")}
                        />
                    </div>

                    <div className='border-2 rounded px-2'>
                        <label htmlFor="discount">Discount :</label>
                        <input
                            type="number"
                            placeholder="Discount"
                            id='discount'
                            defaultValue={discount}
                            className='border-2 border-black rounded-md p-2'
                            {...register("discount")}
                        />
                    </div>

                    <div>
                        {colors &&
                            colors?.map((item, colorIndex) => {
                                const { isSizeApplicable, sizes, quantity, images, color } = item;
                                return (
                                    <div key={colorIndex} className="border-2 border-gray-300 rounded-md p-4 my-2">
                                        <div className="form-control  border-2 rounded px-2 my-2">
                                            <label className="label">
                                                <span className="label-text">Color: </span>
                                            </label>
                                            <input
                                                type="text"
                                                name={`productColors.${colorIndex}.color`}
                                                defaultValue={color}
                                                placeholder="Color"
                                                className="border-2 border-gray-300 rounded-md p-2"
                                                {...register(`productColors.${colorIndex}.color`)}
                                            />
                                        </div>

                                        {isSizeApplicable ? (
                                            sizes?.map((sizeItem, sizeIndex) => {
                                                const { size, quantity } = sizeItem;
                                                return (
                                                    <div key={sizeIndex} className="flex justify-between items-center gap-4">
                                                        <div className="form-control flex gap-4">
                                                            <div className='flex items-center gap-2 border-2 rounded px-2 my-2'>
                                                                <label htmlFor="sizeof">
                                                                    Size :
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name={`productColors.${colorIndex}.sizes.${sizeIndex}.size`}
                                                                    defaultValue={size}
                                                                    placeholder="Size"
                                                                    className="border-2 my-2 border-gray-300 rounded-md p-2"
                                                                    {...register(`productColors.${colorIndex}.sizes.${sizeIndex}.size`)}
                                                                />
                                                            </div>
                                                            <div className='flex items-center gap-2  border-2 rounded px-2 my-2'>
                                                                <label htmlFor="quantity">
                                                                    Quantity :
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name={`productColors.${colorIndex}.sizes.${sizeIndex}.quantity`}
                                                                    defaultValue={quantity}
                                                                    placeholder="Quantity"
                                                                    className="border-2 my-2 border-gray-300 rounded-md p-2"
                                                                    {...register(`productColors.${colorIndex}.sizes.${sizeIndex}.quantity`)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Quantity: </span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name={`productColors.${colorIndex}.quantity`}
                                                    defaultValue={quantity}
                                                    placeholder="Quantity"
                                                    className="border-2 border-gray-300 rounded-md p-2"
                                                    {...register(`productColors.${colorIndex}.quantity`)}
                                                />
                                            </div>
                                        )}

                                        <div className="form-control my-4">
                                            <div className="w-full h-full">
                                                <div className="rounded-lg shadow-xl bg-gray-50 p-4">
                                                    <label className="inline-block mb-2 text-gray-500">Upload Product Image</label>
                                                    <div className="flex items-center justify-center w-full">
                                                        <label className="flex flex-col w-full max-w-xs md:max-w-md h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                            <div className="flex flex-col items-center justify-center pt-7">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                                    />
                                                                </svg>
                                                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                    Attach Product Image{' '}
                                                                </p>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                name={`productColors.${colorIndex}.images`}
                                                                onChange={(e) => handleImageUpload(e, colorIndex)}
                                                                multiple
                                                                className="px-4 pb-4"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex gap-4  my-4">
                                                    {images &&
                                                        images?.map((image, index) => (
                                                            <div key={index}>
                                                                <img src={image} alt="" className="w-20 h-20 object-cover " />
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <button type="submit" className="common-btn">
                        {isLoading ? (
                            <div className="flex justify-center items-center gap-2">
                                <div className="lds-dual-ring"></div>
                                <span>Updating...</span>
                            </div>
                        ) : (
                            <span>Update</span>
                        )}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default UpdateInventoryModal;
