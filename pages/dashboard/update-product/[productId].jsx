import useProducts from '@/src/Hooks/useProducts';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import { getSingelProductUrl, updateProductsUrl } from '@/src/Utils/Urls/ProductUrl';
import { Button, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdatePorductPage = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [singelPorductData, setSingelPorductData] = useState({});
    const [couponSelected, setCouponSelected] = useState([]);
    const { handleSubmit, register } = useForm();
    const { allCategoryData, couponData, categoryData } = useProducts()
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);


    useEffect(() => {
        if (productId) {
            const getPorduct = async () => {
                const reqPorduct = await fetch(getSingelProductUrl(productId));
                const resPorduct = await reqPorduct.json();
                setSingelPorductData(resPorduct?.data);
                console.log(resPorduct);
            }
            getPorduct();
        }
    }, [productId]);

    const couponOptions = couponData?.map((couponResponse) => {
        const { _id, coupon } = couponResponse;
        return {
            label: coupon,
            value: _id,
        }
    })
    const handelCouponChange = (value) => {
        setCouponSelected(value);
    }

    const couponDefaultValue = singelPorductData?.coupon?.map((couponResponse) => {
        const { coupon } = couponResponse;
        return coupon;
    })

    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
    const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

    const [imageFiles, setImageFiles] = useState([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const updatedFiles = selectedFiles.map((file) => {
            const publicId = `${cloud_folder}/${file.name.replace(/\s+/g, '_')}`;
            file.uploadPreset = publicId;
            return file;
        });
        setImageFiles(updatedFiles);
    };

    const onSubmit = async (inputValue) => {
        try {
            setLoading(true);
            const uploadedUrls = [];
            for (const imageFile of imageFiles) {
                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('upload_preset',
                    `${cloud_folder}/Product/${imageFile?.name}`);
                formData.append('upload_preset', upload_preset);
                formData.append('cloud_name', cloud_name);

                const imgRes = await fetch(cloud_api, {
                    method: 'POST',
                    body: formData,
                });

                if (!imgRes.ok) {
                    const errorResponse = await imgRes.text();
                    throw new Error(`Error uploading image: ${imgRes.status} - ${imgRes.statusText}\n${errorResponse}`);
                }

                const imgdata = await imgRes.json();
                const imgurl = imgdata?.secure_url;
                if (imgurl) {
                    uploadedUrls.push(imgurl);
                } else {
                    throw new Error('Failed to retrieve the image URL from Cloudinary response.');
                }
            }
            setUploadedImageUrls(uploadedUrls);

            const PorductUpdateData = {
                name: inputValue.name,
                categories: inputValue.categories,
                mainCategories: inputValue.mainCategories,
                brand: inputValue.brand,
                price: inputValue.price,
                discount: inputValue.discount,
                quantity: inputValue.quantity,
                type: inputValue.type,
                status: inputValue.status,
                size: size,
                details: inputValue.details,
                features: features,
                colors: color,
                coupon: couponSelected,
                images: uploadedUrls || singelPorductData?.image,
            }

            const res = await fetch(updateProductsUrl(productId), {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(PorductUpdateData),
            });
            const dataRes = await res.json();
            if (!res) {
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
                    title: "Successfully Updated",
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
                setLoading(false);

            }
        } catch (error) {
            console.error('Error uploading images to Cloudinary:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <section>
                <div>
                    <h1>
                        Update Porduct
                    </h1>
                </div>
                <section className="my-4">
                    <div className="flex flex-col w-full gap-4 mx-auto add-Porduct-form">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="add-Porduct-form w-full md:w-full mx-auto flex flex-col gap-4 "
                        >
                            <input
                                placeholder="Porduct Name"
                                name="name"
                                type="text"
                                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                defaultValue={singelPorductData?.name}
                                {...register("name")}
                            />

                            <select
                                name="main-category"
                                id="main-category"
                                className="border-2 border-gray-300 rounded-md p-2"
                                defaultValue={singelPorductData?.mainCategories}
                                {...register("mainCategories")}
                            >
                                <option value="main-category">
                                    {singelPorductData?.mainCategories}
                                </option>
                                {categoryData && categoryData?.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category?.name}
                                        className="border-2 border-gray-300 rounded-md p-4 my-2"
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="category"
                                id="category"
                                className="border-2 border-gray-300 rounded-md p-2"
                                defaultValue={singelPorductData?.categories}
                                {...register("categories")}
                            >
                                <option value="category">
                                    {singelPorductData?.categories}
                                </option>
                                {allCategoryData && allCategoryData?.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category?.name}
                                        className="border-2 border-gray-300 rounded-md p-4 my-2"
                                    >
                                        {category?.name}
                                    </option>
                                ))}
                            </select>

                            <input type="text"
                                placeholder="Brand"
                                className='border-2 border-gray-300 rounded-md p-2'
                                defaultValue={singelPorductData?.brand}
                                {...register("brand")}
                            />

                            <input type="number"
                                placeholder="Price"
                                className='border-2 border-gray-300 rounded-md p-2'
                                defaultValue={singelPorductData?.price}
                                {...register("price")}
                            />

                            <input type="number"
                                placeholder="Discount Percentage"
                                className='border-2 border-gray-300 rounded-md p-2'
                                defaultValue={singelPorductData?.discount}
                                {...register("discount")}
                            />

                            <select name="status" id="status"
                                className='border-2 border-gray-300 rounded-md p-2'
                                defaultValue={singelPorductData?.status}
                                {...register("status")}
                            >
                                <option value="status">
                                    {singelPorductData?.status}
                                </option>
                                <option value="Tranding"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'
                                >Tranding</option>
                                <option value="New Arrival"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'
                                >New Arrival</option>
                                <option value="Best Seller"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'>Best Seller</option>
                                <option value="Featured"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'>Featured</option>

                                <option value="Popular"
                                    className='border-2 border-gray-300 rounded-md p-4 my-2'>Popular</option>
                            </select>

                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Coupon"
                                defaultValue={couponDefaultValue}
                                onChange={handelCouponChange}
                                options={couponOptions}
                            />

                            <input type="number"
                                placeholder="Quantity"
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("quantity")}
                            />
                            <input
                                type="text"
                                placeholder="Size"
                                className='border-2 border-gray-300 rounded-md p-2'
                                value={size}
                                defaultValue={singelPorductData?.size}
                                onChange={(e) => setSize(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Colors"
                                className='border-2 border-gray-300 rounded-md p-2'
                                value={color}
                                defaultValue={singelPorductData?.colors}
                                onChange={(e) => setColor(e.target.value)}
                            />

                            <textarea id="txtid" name="txtname" rows="4" cols="50" maxlength="200"
                                placeholder="Description"
                                defaultValue={singelPorductData?.details}
                                {...register("details")}
                                className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                            >
                            </textarea>
                            <textarea name="txtname" rows="4" cols="50" maxlength="200"
                                placeholder="Features"
                                defaultValue={singelPorductData?.features}
                                onChange={
                                    (e) => {
                                        const featuresArray = e.target.value.split(',');
                                        setFeatures(featuresArray);
                                    }
                                }
                                className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                            >
                            </textarea>
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
                                                    Attach file{' '}
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                className="px-4 pb-4"
                                                name="images"
                                                accept="image/*"
                                                defaultValue={singelPorductData?.images}
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-wrap gap-4 my-4 justify-center items-center">
                                        {singelPorductData && singelPorductData?.images?.map((uploadedImageUrl, index) => (
                                            <div key={index} className="relative flex  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                                <a
                                                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                                                    href="#"
                                                >
                                                    <img
                                                        className=""
                                                        src={uploadedImageUrl}
                                                        alt="product image"
                                                    />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Button type="default" htmlType="submit" style={{
                                marginTop: '20px',
                            }}>
                                {
                                    loading ? 'Loading...' : 'Update Porduct'
                                }
                            </Button>
                        </form>
                    </div>
                </section>
            </section>
        </DashboardLayout>
    );
};

export default UpdatePorductPage;