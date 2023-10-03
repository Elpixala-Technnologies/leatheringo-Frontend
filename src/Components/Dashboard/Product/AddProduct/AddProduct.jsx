import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'antd';
const { TextArea } = Input;
import { Button } from 'antd';
import { Select } from 'antd';
import Swal from "sweetalert2";
import { createProductUrl } from '@/src/Utils/Urls/ProductUrl';
import useProducts from '@/src/Hooks/useProducts';
import { FaTrashAlt } from 'react-icons/fa';


const AddProduct = () => {
  // ==== Cloudinary ==== 
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

  const { handleSubmit, register } = useForm();
  const { allCategoryData, couponData, categoryData } = useProducts()
  const [coupon, setCoupon] = useState("");
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  // === coupon ===
  const couponOptions = couponData?.map((coupon) => ({
    value: coupon._id,
    label: coupon.coupon,
  }));
  const handleCouponChange = (value) => {
    setCoupon(value);
  };


  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = [...imageFiles, ...selectedFiles];
    setImageFiles(updatedFiles);
  };


  const onSubmit = async (inputValue) => {
    try {
      setLoading(true);
      const uploadedUrls = [];
      for (const imageFile of imageFiles) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append("public_id", `${cloud_folder}/Product/${imageFile?.name}`)
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

      
      const productData = {
        name: inputValue.name,
        images: uploadedUrls,
        categories: inputValue.category,
        mainCategories: inputValue.mainCategories,
        brand: inputValue.brand,
        price: inputValue.price,
        discount: inputValue.discountPercentage,
        quantity: inputValue.quantity,
        type: inputValue.type,
        status: inputValue.status,
        size: size,
        details: inputValue.details,
        features: features,
        colors: color,
        coupon: coupon,
      }

      console.log(productData);

      const res = await fetch(createProductUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const dataRes = await res.json();
      if (!dataRes) {
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
          title: "Successfully Added!",
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
    <section className="my-4">
      <div className="flex flex-col w-full gap-4 mx-auto add-book-form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="add-book-form w-full md:w-[60%] mx-auto flex flex-col gap-4 "
        >
          <input type="text"
            placeholder='Product Name'
            className='border-2 border-gray-300 rounded-md p-2'
            {...register("name")}
          />

          <select
            name="main-category"
            id="main-category"
            className="border-2 border-gray-300 rounded-md p-2"
            {...register("mainCategories")}
          >
            <option value="main-category">Main Category</option>
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
            {...register("category")}
          >
            <option value="category">Category</option>
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
            {...register("brand")}
          />

          <input type="number"
            placeholder="Price"
            className='border-2 border-gray-300 rounded-md p-2'
            {...register("price")}
          />

          <input type="number"
            placeholder="Discount Percentage"
            className='border-2 border-gray-300 rounded-md p-2'
            {...register("discountPercentage")}
          />

          <select name="status" id="status"
            className='border-2 border-gray-300 rounded-md p-2'
            {...register("status")}
          >
            <option value="status">Status</option>
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
            onChange={handleCouponChange}
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
            onChange={(e) => setSize(e.target.value)}
          />

          <input
            type="text"
            placeholder="Colors"
            className='border-2 border-gray-300 rounded-md p-2'
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <TextArea
            rows={4}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextArea
            rows={4}
            placeholder="Features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
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
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {/* preview the selected images here  */}

            <div className="flex flex-wrap gap-4 mt-4">
              {imageFiles.map((file) => (
                <div
                  key={file.name}
                  className="relative w-32 h-32 overflow-hidden rounded-md"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>



          </div>

          <Button type="default" htmlType="submit" style={{
            marginTop: '20px',
          }}>
            {
              loading ? 'Loading...' : 'Add Product'
            }
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
