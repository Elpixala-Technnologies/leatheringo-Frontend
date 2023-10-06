import useProducts from '@/src/Hooks/useProducts';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import { getSingelProductUrl, updateProductsUrl } from '@/src/Utils/Urls/ProductUrl';
import { Button, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UpdatePorductPage = () => {
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
    const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

    const router = useRouter();
    const { productId } = router.query;
    const [singleProductData, setSingleProductData] = useState({});
    const [couponSelected, setCouponSelected] = useState([]);
    const { handleSubmit, register, setValue, } = useForm();
    const { allCategoryData, couponData, categoryData } = useProducts();
    const [loading, setLoading] = useState(false);
    const [prevValues, setPrevValues] = useState({});




    console.log(productId, "allCategoryData")

    useEffect(() => {
        if (productId) {
            const getProduct = async () => {
                try {
                    const reqProduct = await fetch(getSingelProductUrl(productId));
                    const resProduct = await reqProduct.json();
                    console.log(resProduct, "resProduct");

                    // Store the previous values when the product data is fetched
                    setPrevValues(resProduct?.data || {});
                    setSingleProductData(resProduct?.data || {});
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };
            getProduct();
        }
    }, [productId]);

    const {
        name,
        mainCategories,
        categories,
        brand,
        price,
        discount,
        type,
        status,
        details,
        features,
        colors,
        coupon,
    } = singleProductData;

    useEffect(() => {
        setValue("productName", name);
        setValue("productCategories", categories);
        setValue("mainCategories", mainCategories);
        setValue("productBrand", brand);
        setValue("productPrice", price);
        setValue("productDiscount", discount);
        setValue("productType", type);
        setValue("productStatus", status);
        setValue("productDetails", details);
        setValue("productFeatures", features?.join(', '));
        setValue("coupon", coupon);
        setValue("productColors", colors);
    }, [
        name, categories, mainCategories, brand, price, discount, type, status, details, features, colors, coupon
    ]);


    // ===== color =====



    // ===== color =====

    const couponOptions = couponData?.map((couponResponse) => {
        const { _id, coupon } = couponResponse;
        return {
            label: coupon,
            value: _id,
        };
    });
    const handleCouponChange = (value) => {
        setCouponSelected(value);
    };

    // ===== color =====


    // ===== color =====

    const onSubmit = async (inputValue) => {
        try {
            setLoading(true);
            let featuresArray; // Declare it in a higher scope

            if (!inputValue.productName) {
                inputValue.productName = prevValues.name;
            }
            if (!inputValue.productCategories) {
                inputValue.productCategories = prevValues.categories;
            }
            if (!inputValue.mainCategories) {
                inputValue.mainCategories = prevValues.mainCategories;
            }

            // Split the features string into an array
            if (typeof inputValue.productFeatures === 'string') {
                featuresArray = inputValue.productFeatures.split(',');
                // Use featuresArray as needed
            } else {
                featuresArray = inputValue.productFeatures;
            }

            const productUpdateData = {
                name: inputValue.productName,
                categories: inputValue.productCategories,
                mainCategories: inputValue.mainCategories,
                brand: inputValue.productBrand,
                price: inputValue.productPrice,
                discount: inputValue.productDiscount,
                type: inputValue.productType,
                status: inputValue.productStatus,
                details: inputValue.productDetails,
                features: featuresArray,
                colors: color,
                coupon: couponSelected,
            };

            console.log('productUpdateData', productUpdateData);

            const res = await fetch(updateProductsUrl(productId), {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productUpdateData),
            });

            const dataRes = await res.json();
            console.log(dataRes, "dataRes");
            if (!res.ok) {
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
            }
        } catch (error) {
            console.error('Error updating product:', error);
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
                        <div
                            className="add-Porduct-form w-full md:w-full mx-auto flex flex-col gap-4 "
                        >
                            <input
                                placeholder="Porduct Name"
                                name="name"
                                type="text"
                                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                defaultValue={name}
                                {...register("productName")}
                            />

                            <select
                                name="main-category"
                                id="main-category"
                                className="border-2 border-gray-300 rounded-md p-2"
                                defaultValue={mainCategories}
                                {...register("mainCategories")}
                            >
                                <option value="main-category">
                                    {mainCategories}
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
                                defaultValue={categories}
                                {...register("productCategories")}
                            >
                                <option value="category">
                                    {categories}
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
                                defaultValue={brand}
                                {...register("productBrand")}
                            />
                            <input type="text"
                                placeholder="Product Type"
                                className='border-2 border-gray-300 rounded-md p-2'
                                defaultValue={type}
                                {...register("productType")}
                            />

                            <input type="number"
                                placeholder="Price"
                                className='border-2 border-gray-300 rounded-md p-2'
                                defaultValue={price}
                                {...register("productPrice")}
                            />

                            <input type="number"
                                placeholder="Discount Percentage"
                                className='border-2 border-gray-300 rounded-md p-2'
                                defaultValue={discount}
                                {...register("productDiscount")}
                            />

                            <select name="status" id="status"
                                className='border-2 border-gray-300 rounded-md p-2'
                                defaultValue={status}
                                {...register("productStatus")}
                            >
                                <option value="status">
                                    {status}
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
                                defaultValue={coupon}
                                onChange={handleCouponChange}
                                options={couponOptions}
                            />

                            <textarea id="txtid" name="txtname" rows="4" cols="50" maxlength="200"
                                placeholder="Description"
                                defaultValue={details}
                                {...register("productDetails")}
                                className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                            >
                            </textarea>

                            <textarea name="txtname" rows="4" cols="50" maxlength="200"
                                placeholder="Features"
                                defaultValue={features}
                                {...register("productFeatures", {
                                    setValueAs: (value) => {
                                        // Split the value into an array
                                        const featuresArray = value.split(',');
                                        // Set the value as the array
                                        return featuresArray;
                                    }
                                })}
                                className="border-[2px] border-[#090606] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                            >
                            </textarea>

                            {/* ========= color update ========= */}
                            <div>
                                {color && color?.map((item, colorIndex) => (
                                    <div key={colorIndex} className="border-2 border-gray-300 rounded-md p-4 my-2">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Color: </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="color"
                                                value={item.color}
                                                onChange={(event) => onChange(event, colorIndex)}
                                                placeholder="Color"
                                                className="border-2 border-gray-300 rounded-md p-2"
                                            />
                                        </div>

                                        <div className="form-control flex gap-2 py-3 border rounded px-2 my-2">
                                            <input
                                                type="checkbox"
                                                id={`isSizeApplicable-${colorIndex}`}
                                                checked={item.isSizeApplicable}
                                                onChange={(event) => isSizeApplicableChange(event, colorIndex)}
                                                className="form-checkbox h-5 w-5 text-gray-600"
                                            />
                                            <label
                                                className="inline-block text-gray-500"
                                                htmlFor={`isSizeApplicable-${colorIndex}`}
                                            >
                                                Is Size Applicable
                                            </label>
                                        </div>

                                        {item.isSizeApplicable ? (
                                            <>
                                                {item.sizes.map((size, sizeIndex) => (
                                                    <div key={sizeIndex} className="flex gap-4 my-4">
                                                        <div className="form-control flex gap-4">
                                                            <input
                                                                type="text"
                                                                name="size"
                                                                value={size.size}
                                                                onChange={(event) => onChange(event, colorIndex, sizeIndex)}
                                                                placeholder="Size"
                                                                className="border-2 border-gray-300 rounded-md p-2"
                                                            />
                                                            <input
                                                                type="number"
                                                                name="quantity"
                                                                value={size.quantity}
                                                                onChange={(event) => onChange(event, colorIndex, sizeIndex)}
                                                                placeholder="Quantity"
                                                                className="border-2 border-gray-300 rounded-md p-2"
                                                            />
                                                        </div>
                                                        <button
                                                            className="common-btn"
                                                            onClick={() => removeSize(colorIndex, sizeIndex)}
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                    </div>
                                                ))}

                                                <div className="my-4">
                                                    <button className="common-btn" onClick={() => addSize(colorIndex)}>
                                                        Add Size
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Quantity: </span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        value={item.quantity}
                                                        onChange={(event) => onChange(event, colorIndex)}
                                                        placeholder="Quantity"
                                                        className="border-2 border-gray-300 rounded-md p-2"
                                                    />
                                                </div>
                                            </>
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
                                                                    Attach file{' '}
                                                                </p>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                name={`images-${colorIndex}`}
                                                                accept="image/*"
                                                                multiple
                                                                onChange={(event) => handleImageChange(event, colorIndex)}
                                                                className="px-4 pb-4"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Show selected images */}
                                            <div className="flex gap-4 my-4">
                                                {item.images &&
                                                    item.images?.map((image, index) => (
                                                        <div key={index} className="w-1/2">
                                                            <img src={image} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>

                                        <button
                                            className="common-btn flex items-center justify-center"
                                            onClick={() => removeColor(colorIndex)}
                                        >
                                            <FaTrashAlt className="text-2xl mr-2" />
                                            Delete Color
                                        </button>

                                        {/* Add an "Update Color" button */}
                                        <button
                                            className="common-btn flex items-center justify-center"
                                            onClick={() => updateColor(colorIndex)}
                                        >
                                            Update Color
                                        </button>
                                    </div>
                                ))}
                                <button className="btn btn-primary mx-4" onClick={addColor}>
                                    Add Color
                                </button>
                            </div>

                            {/* ========= color update ========= */}

                            <Button type="default"
                                onClick={handleSubmit(onSubmit)}
                                htmlType="submit" style={{
                                    marginTop: '20px',
                                }}>
                                {
                                    loading ? 'Loading...' : 'Update Porduct'
                                }
                            </Button>
                        </div>
                    </div>
                </section>
            </section>
        </DashboardLayout >
    );
};

export default UpdatePorductPage;