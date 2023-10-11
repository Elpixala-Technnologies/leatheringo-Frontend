import useProducts from '@/src/Hooks/useProducts';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import { getSingelProductUrl, updateProductsUrl } from '@/src/Utils/Urls/ProductUrl';
import { Button, Cascader, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
    const { handleSubmit, register, setValue,
        getValues, } = useForm();
    const { couponData, categoryData, refetchProducts } = useProducts();
    const [loading, setLoading] = useState(false);
    const [prevValues, setPrevValues] = useState({});


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
        minimumQuantity,
        extraDiscount,
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
        setValue("minimumQuantity", minimumQuantity);
        setValue("extraDiscount", extraDiscount);
    }, [
        name, categories, mainCategories, brand, price, discount, type, status, details, features, colors, coupon
    ]);

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
                    } else {
                        console.error(`Failed to upload image ${file.name}`);
                    }
                }

                if (uploadedImages.length > 0) {
                    // Get the current form values
                    const formValues = getValues();

                    // Update the images for the specific color
                    formValues.productColors[colorIndex].images = [
                        ...formValues.productColors[colorIndex].images,
                        ...uploadedImages,
                    ];

                    // Update the entire "productColors" field in the form
                    setValue("productColors", formValues.productColors);
                }
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        }
    };


    // ===== color =====


    // ========== category========

    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedProductCategories, setSelectedProductCategories] = useState([]);

    const handleMainCategoryChange = (value) => {
        setSelectedMainCategory(value);
        setSelectedSubcategory('');
    };

    const handleSubCategoryChange = (value) => {
        setSelectedSubcategory(value);
    };


    useEffect(() => {
        if (selectedMainCategory) {
            setSelectedSubcategory('');
            setSelectedProductCategories([]);
        }
    }, [selectedMainCategory]);

    const mainCategoryData = categoryData?.find((category) => category.name === selectedMainCategory);
    const subcategories = mainCategoryData ? mainCategoryData.children : [];

    const createIndentedSubcategoryOptions = (subcategories, parentIndent = '') => {
        return subcategories?.flatMap((subcategory) => {
            const subcategoryWithIndentation = {
                value: subcategory.name,
                label: parentIndent + subcategory.name,
            };

            if (subcategory.children && subcategory.children.length > 0) {
                return [
                    subcategoryWithIndentation,
                    ...createIndentedSubcategoryOptions(subcategory.children, parentIndent + '  '),
                ];
            }

            return subcategoryWithIndentation;
        });
    };

    const indentedSubcategoryOptions = createIndentedSubcategoryOptions(subcategories);

    const createCascaderOptions = (categories) => {
        return categories?.map((category) => {
            const children = category.children && category.children.length > 0
                ? createCascaderOptions(category.children)
                : null;

            return {
                label: category.name,
                value: category.name,
                children,
            };
        });
    };

    const cascaderOptions = createCascaderOptions(categoryData);

    const handleProductCategoriesChange = (value, selectedOptions) => {
        if (value && value.length === 2) {
            setSelectedMainCategory(value[0]);
            setSelectedSubcategory(value[1]);
        } else {
            setSelectedMainCategory('');
            setSelectedSubcategory('');
        }
    };


    // ========== category========



    const onSubmit = async (inputValue) => {
        try {
            setLoading(true);
            let featuresArray;

            // Handle fallback for empty fields
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
            } else {
                featuresArray = inputValue.productFeatures;
            }

            // Construct product update data
            const productUpdateData = {
                name: inputValue.productName,
                categories: selectedProductCategories,
                mainCategories: selectedMainCategory,
                brand: inputValue.productBrand,
                price: inputValue.productPrice,
                discount: inputValue.productDiscount,
                type: inputValue.productType,
                status: inputValue.productStatus,
                details: inputValue.productDetails,
                extraDiscount: inputValue.extraDiscount,
                minimumQuantity: inputValue.minimumQuantity,
                features: featuresArray,
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
                            : singleProductData.colors[colorIndex]?.images || [],
                    };
                }),
                coupon: couponSelected,
            };

            // Log the update data
            console.log('productUpdateData', productUpdateData);

            // Send a PATCH request to update the product
            const res = await fetch(updateProductsUrl(productId), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productUpdateData),
            });

            const dataRes = await res.json();
            console.log(dataRes, "dataRes");

            if (!res.ok) {
                // Handle error message
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
                // Handle success message
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
                refetchProducts();
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
                            <input
                                placeholder="Minimum Quantity"
                                name="minimumQuantity"
                                type="text"
                                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                defaultValue={minimumQuantity}
                                {...register("minimumQuantity")}
                            />
                            <input
                                placeholder="Extra Discount"
                                name="extraDiscount"
                                type="text"
                                className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                defaultValue={extraDiscount}
                                {...register("extraDiscount")}
                            />

                            {/* <select
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
                            </select> */}

                            <select
                                name="main-category"
                                id="main-category"
                                className="border-2 border-gray-300 rounded-md p-2"
                                value={selectedMainCategory}
                                onChange={(e) => handleMainCategoryChange(e.target.value)}
                            >
                                <option value="">
                                    {
                                        mainCategories
                                    }
                                </option>
                                {categoryData?.map((category) => (
                                    <option key={category._id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            <div className="category-select">
                                <Select
                                    mode="multiple"
                                    size="large"
                                    placeholder="Select SubCategory"
                                    value={selectedSubcategory}
                                    defaultValue={categories}
                                    onChange={handleSubCategoryChange}
                                    style={{
                                        width: '100%',
                                    }}
                                    options={indentedSubcategoryOptions}
                                />
                            </div>

                            <div className="category-select">
                                <Cascader
                                    options={cascaderOptions}
                                    value={[selectedMainCategory, selectedSubcategory]}
                                    onChange={(value, selectedOptions) => handleProductCategoriesChange(value, selectedOptions)}
                                    placeholder="Select Categories"
                                />

                            </div>

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
                                {
                                    colors && colors?.map((item, colorIndex) => {
                                        const { isSizeApplicable, sizes, quantity, images, color } = item;
                                        return (
                                            <div key={colorIndex} className="border-2 border-gray-300 rounded-md p-4 my-2">
                                                <div className="form-control my-2">
                                                    <label className="label">
                                                        <span className="label-text">Color: </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="color"
                                                        defaultValue={color}
                                                        {...register(`productColors.${colorIndex}.color`)}
                                                        placeholder="Color"
                                                        className="border-2 border-gray-300 rounded-md p-2"
                                                    />
                                                </div>

                                                {
                                                    isSizeApplicable ? sizes?.map((sizeItem, sizeIndex) => {
                                                        const { size, quantity } = sizeItem;
                                                        return (
                                                            <div key={sizeIndex} className="flex justify-between items-center gap-4">
                                                                <div className="form-control flex gap-4">

                                                                    <div className='flex items-center gap-2'>
                                                                        <label htmlFor="sizeof">
                                                                            Size :
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            name="size"
                                                                            defaultValue={size}
                                                                            {...register(`productColors.${colorIndex}.sizes.${sizeIndex}.size`)}
                                                                            placeholder="Size"
                                                                            className="border-2 my-2 border-gray-300 rounded-md p-2"
                                                                        />
                                                                    </div>
                                                                    <div className='flex items-center gap-2'>
                                                                        <label htmlFor="quantity">
                                                                            Quantity :
                                                                        </label>

                                                                        <input
                                                                            type="number"
                                                                            name="quantity"
                                                                            defaultValue={quantity}
                                                                            {...register(`productColors.${colorIndex}.sizes.${sizeIndex}.quantity`)}
                                                                            placeholder="Quantity"
                                                                            className="border-2 my-2 border-gray-300 rounded-md p-2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : (
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Quantity: </span>
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="quantity"
                                                                defaultValue={quantity}
                                                                {...register(`productColors.${colorIndex}.quantity`)}
                                                                placeholder="Quantity"
                                                                className="border-2 border-gray-300 rounded-md p-2"
                                                            />
                                                        </div>
                                                    )
                                                }

                                                {/* ==== Image ===== */}
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
                                                                        onChange={(event) => handleImageUpload(event, colorIndex)}
                                                                        name={
                                                                            `productColors.${colorIndex}.images`
                                                                        }
                                                                        multiple
                                                                        className="px-4 pb-4"
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {/* ------ show seleted image------- */}

                                                        <div className="flex gap-4 flex-wrap my-4">
                                                            {images &&
                                                                images?.map((image, index) => (
                                                                    <div key={index}>
                                                                        <img src={image} alt="" className="w-40 h-40 object-cover " />
                                                                    </div>
                                                                ))}
                                                        </div>

                                                    </div>
                                                </div>
                                                {/* ==== Image ===== */}

                                            </div>
                                        )
                                    })
                                }
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