import useProducts from '@/src/Hooks/useProducts';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import { getSingelProductUrl, updateProductsUrl } from '@/src/Utils/Urls/ProductUrl';
import { Button, Cascader, } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import LinearProgress from '@mui/material/LinearProgress';
import { FaTrashAlt } from "react-icons/fa";
  
import { Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel } from '@mui/material';


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
    
  const [selectedCategories, setSelectedCategories] = useState([]);
 


    useEffect(() => {
        if (productId) {
            const getProduct = async () => {
                try {
                    const reqProduct = await fetch(getSingelProductUrl(productId));
                    const resProduct = await reqProduct.json();

                    // // Store the previous values when the product data is fetched
                    // setPrevValues(resProduct?.data || {});
                    // setSingleProductData(resProduct?.data || {});
                    // setSelectedCategories(resProduct?.data?.categories?.map(cat => cat?.value));

                    if (resProduct?.data) {
                      setPrevValues(resProduct?.data || {});
                      setSingleProductData(resProduct?.data);
                      const defaultSelectedCategories = fetchedProductData?.categories?.map(cat => cat?.value);
                      setSelectedCategories(defaultSelectedCategories);
                    }
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
        setValue("productDetails", singleProductData.details);
        setValue("productFeatures", singleProductData.features);
        setValue("productAdditionalInfo", singleProductData.additionalInfo);
        setValue("coupon", coupon);
        setValue("productColors", colors);
        setValue("minimumQuantity", minimumQuantity);
        setValue("extraDiscount", extraDiscount);
    }, [
        name, categories, mainCategories, brand, price, discount, type, status, colors, coupon
    ]);

    // ====== coupon ------
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

      // ======= detail===

 
    // =========image upload=========
    const [uploadProgress, setUploadProgress] = useState({});

    const uploadImageToCloudinary = async (file, onUploadProgress) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("public_id", `${cloud_folder}/Product/${file?.name}`);
      formData.append("upload_preset", upload_preset);
      formData.append("cloud_name", cloud_name);
    
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", cloud_api, true);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            onUploadProgress(progress);
          }
        };
        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve(response.secure_url);
          } else {
            reject("Upload failed");
          }
        };
        xhr.onerror = () => reject("Error during upload");
        xhr.send(formData);
      });
    };
    
    const handleImageUpload = async (event, colorIndex) => {
      const files = event.target.files;
  
      if (files && files.length > 0) {
          try {
              const uploadedImages = [];
  
              for (let i = 0; i < files.length; i++) {
                  const file = files[i];
                  // Define onUploadProgress function
                  const onUploadProgress = (progress) => {
                      console.log(`Upload progress for ${file.name}: ${progress}%`);
                      // You can also update your progress state here, if needed
                  };
                  // Call uploadImageToCloudinary with the onUploadProgress function
                  const imageUrl = await uploadImageToCloudinary(file, onUploadProgress);
  
                  if (imageUrl) {
                      uploadedImages.push(imageUrl);
                  } else {
                      // Handle the case where the image URL is null
                      console.error('Failed to upload image:', file.name);
                  }
              }
  
              if (uploadedImages.length > 0) {
                  // Get the current colors array from state
                  const updatedColors = [...singleProductData.colors];
                  updatedColors[colorIndex].images = [...updatedColors[colorIndex].images, ...uploadedImages];
  
                  // Update the state with the new colors array
                  setSingleProductData({ ...singleProductData, colors: updatedColors });
              }
          } catch (error) {
              console.error('Error uploading images:', error);
          }
      }
  };
  
    const handleDeleteImage = (colorIndex, imageIndex) => {
      // Make a deep copy of the colors array
      const updatedColors = singleProductData.colors.map((c, index) => 
          index === colorIndex ? { ...c, images: [...c.images] } : c
      );
  
      // Remove the image at the specified index
      updatedColors[colorIndex].images.splice(imageIndex, 1);
  
      // Update your singleProductData state with the modified colors array
      setSingleProductData({ ...singleProductData, colors: updatedColors });
  };
  
  const handleImageChange = async (event, colorIndex) => {
      const updatedColors = [...singleProductData.colors]; // Assuming singleProductData.colors is the correct reference
      const selectedFiles = Array.from(event.target.files);
  
      for (const file of selectedFiles) {
          // Set initial upload progress
          setUploadProgress(prevProgress => ({ ...prevProgress, [file.name]: 0 }));
  
          try {
              // Define the onUploadProgress function
              const onUploadProgress = (progress) => {
                  setUploadProgress(prevProgress => ({ ...prevProgress, [file.name]: progress }));
              };
  
              // Call uploadImageToCloudinary with onUploadProgress function
              const imageUrl = await uploadImageToCloudinary(file, onUploadProgress);
  
              if (imageUrl) {
                  updatedColors[colorIndex].images.push(imageUrl);
                  // Remove the file's progress from state to hide the progress bar
                  setUploadProgress(prevProgress => {
                      const newProgress = { ...prevProgress };
                      delete newProgress[file.name];
                      return newProgress;
                  });
              }
          } catch (error) {
              console.error("Error uploading image:", error);
          }
      }
      // Update singleProductData state with the modified colors array
      setSingleProductData({ ...singleProductData, colors: updatedColors });
  };
  

    const prepareCategoryOptions = (categories = [], parentName = null, level = 0) => {
      return categories?.filter(category => category?.parent === parentName)
        .flatMap(category => ([
          { value: category.name, label: category.name, level },
          ...prepareCategoryOptions(categories, category.name, level + 1)
        ]));
    };

    const handleCategoryChange = (event) => {
      setSelectedCategories(event.target.value);
    };

    const categoryOptions =  categoryData ? prepareCategoryOptions(categoryData) : [];;
    
    

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
        
            // Split the features string into an array
            if (typeof inputValue.productFeatures === 'string') {
                featuresArray = inputValue.productFeatures.split(',');
            } else {
                featuresArray = inputValue.productFeatures;
            }

            // Construct product update data
            const productUpdateData = {
                name: inputValue.productName,
                categories: selectedCategories,
                brand: inputValue.productBrand,
                price: inputValue.productPrice,
                discount: inputValue.productDiscount,
                type: inputValue.productType,
                status: inputValue.productStatus,
                details:inputValue.productDetails,
                features: inputValue.productFeatures,
                additionalInfo: inputValue.productAdditionalInfo,
                extraDiscount: inputValue.extraDiscount,
                minimumQuantity: inputValue.minimumQuantity,
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

            // Send a PATCH request to update the product
            const res = await fetch(updateProductsUrl(productId), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productUpdateData),
            });

            const dataRes = await res.json();

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
                          {/* <FormControl fullWidth>
                            <InputLabel>Categories</InputLabel>
                            <Select
                              multiple
                              value={selectedCategories}
                              onChange={handleCategoryChange}
                              renderValue={(selected) => selected.join(', ')}
                            >
                              {categoryOptions.map((category) => (
                                <MenuItem key={category.value} value={category.value} 
                                          style={{ marginLeft: `${category.level * 20}px` }}>
                                  <Checkbox checked={selectedCategories.indexOf(category.value) > -1} />
                                  <ListItemText primary={category.label} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl> */}
                         <FormControl fullWidth>
                          <InputLabel>Categories</InputLabel>
                          <Select
                            multiple
                            value={selectedCategories}
                            onChange={handleCategoryChange}
                            renderValue={(selected) => selected.join(', ')}
                          >
                            {categoryOptions.map((category) => (
                              <MenuItem key={category.value} value={category.value}
                                        style={{ marginLeft: `${category.level * 20}px` }}>
                                <Checkbox checked={selectedCategories.includes(category.value)} />
                                <ListItemText primary={category.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
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

                                            
                          <div className='flex flex-col gap-4'>
                            <h1 className='my-2'>description</h1>
                            {
                             singleProductData?.details?.map((description, index) => {
                                return (
                                  <section
                                    key={index}
                                    className=""
                                  >
                                    <div className="form-control w-full">
                                      <div className='border p-2'>
                                        <input
                                          type="text"
                                          defultValue={description?.heading}
                                          {...register(`productDetails.${index}.heading`)}
                                          placeholder="heading"
                                          className="border-2 w-full border-gray-300 rounded-md p-2"
                                        />
                                      </div>
                                    </div>

                                    <div className="form-control w-full my-2">
                                      <div className='border p-2'>
                                        <input
                                          type="text"
                                          name="description"
                                          defultValue={description?.description}
                                          {...register(`productDetails.${index}.description`)}
                                          placeholder="description"
                                          className="border-2 w-full border-gray-300 rounded-md p-2"
                                        />
                                      </div>
                                    </div>
                                  </section>
                                )
                              })
                            }
                          </div>

                          <div className='flex flex-col gap-4'>
                            <h1 className='my-2'>features</h1>
                            {
                              singleProductData?.features?.map((features, index) => {
                                return (
                                  <section
                                    key={index}
                                    className=""
                                  >
                                    <div className="form-control w-full">
                                      <div className='border p-2'>
                                        <input
                                          type="text"
                                          name="heading"
                                          defultValue={features?.heading}
                                          {...register(`productFeatures.${index}.heading`)} 
                                          placeholder="heading"
                                          className="border-2 w-full border-gray-300 rounded-md p-2"
                                        />
                                      </div>
                                    </div>

                                    <div className="form-control w-full my-2">
                                      <div className='border p-2'>
                                        <input
                                          type="text"
                                          name="description"
                                          defultValue={features?.description}
                                          {...register(`productFeatures.${index}.description`)}
                                          placeholder="description"
                                          className="border-2 w-full border-gray-300 rounded-md p-2"
                                        />
                                      </div>
                                    </div>

                                  </section>
                                )
                              })
                            }
                          
                          </div>

                          <div className='flex flex-col gap-4'>
                            <h1 className='my-2'>Additional Info</h1>
                            {
                              singleProductData?.additionalInfo?.map((info, index) => {
                                return (
                                  <section
                                    key={index}
                                    className=""
                                  >
                                    <div className="form-control w-full">
                                      <div className='border p-2'>
                                        <input
                                          type="text"
                                          name="heading"
                                          defultValue={info?.heading}
                                          {...register(`productAdditionalInfo.${index}.heading`)} 
                                          placeholder="heading"
                                          className="border-2 w-full border-gray-300 rounded-md p-2"
                                        />
                                      </div>
                                    </div>

                                    <div className="form-control w-full my-2">
                                      <div className='border p-2'>
                                        <input
                                          type="text"
                                          name="description"
                                          defultValue={info?.description}
                                          {...register(`productAdditionalInfo.${index}.description`)}
                                          placeholder="description"
                                          className="border-2 w-full border-gray-300 rounded-md p-2"
                                        />
                                      </div>
                                    </div>

                                  </section>
                                )
                              })
                            }
                          
                          </div>

 
 

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

                                                       <div className="flex gap-4 my-4">
                                                  {item.images &&
                                                      item.images.map((image, index) => (
                                                          <div key={index} className="relative w-1/2">
                                                              <img
                                                                  src={image}
                                                                  alt=""
                                                                  className="w-full h-full object-cover"
                                                              />
                                                              <button className="absolute top-0 right-0 m-2 p-2 bg-red-500 text-white rounded-full"
                                                                onClick={() => handleDeleteImage(colorIndex, index)}
                                                              >
                                                                  {/* Replace with your preferred delete icon */}
                                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                  </svg>
                                                              </button>
                                                          </div>
                                                      ))
                                                     }
                                                    {Object.keys(uploadProgress).map((fileName) => (
                                                    <div key={fileName} className="w-full my-2">
                                                      <p className="text-sm text-gray-600 mb-1">{fileName}</p>
                                                      <LinearProgress variant="determinate" value={uploadProgress[fileName]} />
                                                    </div>
                                                  ))}
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
  }

export default UpdatePorductPage;