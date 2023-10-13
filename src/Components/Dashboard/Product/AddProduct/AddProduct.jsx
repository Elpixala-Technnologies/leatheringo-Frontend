import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Cascader, Input } from 'antd';
const { TextArea } = Input;
import { Select } from 'antd';
import Swal from "sweetalert2";
import { createProductUrl } from '@/src/Utils/Urls/ProductUrl';
import useProducts from '@/src/Hooks/useProducts';
import { FaTrashAlt } from 'react-icons/fa';
const { Option } = Select;





const AddProduct = () => {
  // ==== Cloudinary ==== 
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

  const { handleSubmit, register } = useForm();
  const { couponData, categoryData } = useProducts()
  const [coupon, setCoupon] = useState("");
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(null);
  const [isSizeApplicable, setIsSizeApplicable] = useState(false);

  // ===== category +++++
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleMainCategoryChange = (value) => {
    setSelectedMainCategory(value);
    setSelectedSubcategory('');
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSubcategory(value);
  };

  const mainCategoryData = categoryData?.find((category) => category.name === selectedMainCategory);
  const subcategories = mainCategoryData ? mainCategoryData.children : [];

  useEffect(() => {
    if (subcategories.length > 0) {
      setSelectedSubcategory(subcategories[0].name);
    }
  }, [subcategories, selectedMainCategory]);

  const createIndentedSubcategoryOptions = (subcategories, parentIndent = '') => {
    return subcategories.flatMap((subcategory) => {
      const subcategoryWithIndentation = {
        value: subcategory.name,
        label: parentIndent + subcategory.name,
      };

      if (subcategory?.children && subcategory.children.length > 0) {
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
      const children = category?.children && category.children.length > 0
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

  const handleCascaderChange = (value) => {
    if (Array.isArray(value) && value.length === 2) {
      setSelectedMainCategory(value[0]);
      setSelectedSubcategory(value[1]);
    } else {
      setSelectedMainCategory('');
      setSelectedSubcategory('');
    };
  };

  // ===== category +++++


  const [color, setColor] = useState([
    {
      color: '',
      isSizeApplicable: isSizeApplicable,
      sizes: [{ size: '', quantity: '' }],
      images: [], // Initialize images as an empty array
      quantity: '', // Initialize quantity
    },
  ]);

  const addColor = () => {
    setColor((prevColors) => [
      ...prevColors,
      {
        color: '',
        isSizeApplicable: isSizeApplicable,
        sizes: [{ size: '', quantity: '' }],
        images: [], // Initialize images as an empty array
        quantity: '', // Initialize quantity
      },
    ]);
  };

  const removeColor = (colorIndex) => {
    const updatedColors = [...color];
    updatedColors.splice(colorIndex, 1);
    setColor(updatedColors);
  };

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

  const handleImageChange = async (event, colorIndex) => {
    const updatedColors = [...color];
    const selectedFiles = Array.from(event.target.files);
    const imageUrls = [];

    for (const file of selectedFiles) {
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    }

    updatedColors[colorIndex].images = [...imageUrls];
    setColor(updatedColors);
  };

  const onChange = (event, colorIndex, sizeIndex) => {
    setColor((prevColors) => {
      const updatedColors = [...prevColors];

      if (event.target.name === 'color') {
        updatedColors[colorIndex].color = event.target.value;
      } else if (event.target.name === 'quantity1') {
        updatedColors[colorIndex].quantity = event.target.value;
      } else if (event.target.name === 'isSizeApplicable') {
        updatedColors[colorIndex].isSizeApplicable = event.target.checked;
        if (!event.target.checked) {
          // Reset the sizes array if isSizeApplicable is unchecked
          updatedColors[colorIndex].sizes = [];
        }
      } else if (event.target.name === 'size') {
        if (!updatedColors[colorIndex].sizes[sizeIndex]) {
          updatedColors[colorIndex].sizes[sizeIndex] = {};
        }
        updatedColors[colorIndex].sizes[sizeIndex].size = event.target.value;
      } else if (event.target.name === 'quantity') {
        if (!updatedColors[colorIndex].sizes[sizeIndex]) {
          updatedColors[colorIndex].sizes[sizeIndex] = {};
        }
        updatedColors[colorIndex].sizes[sizeIndex].quantity = event.target.value;
      } else {
        updatedColors[colorIndex][event.target.name] = event.target.value;
      }

      return updatedColors;
    });
  };

  const addSize = (colorIndex) => {
    const updatedColors = [...color];
    updatedColors[colorIndex].sizes.push({ size: '', quantity: '' });
    setColor(updatedColors);
  }

  const removeSize = (colorIndex, sizeIndex) => {
    const updatedColors = [...color];
    updatedColors[colorIndex].sizes.splice(sizeIndex, 1);
    setColor(updatedColors);
  }

  const isSizeApplicableChange = (event, colorIndex) => {
    setIsSizeApplicable(event.target.checked);
    const updatedColors = [...color];
    updatedColors[colorIndex].isSizeApplicable = event.target.checked;
    setColor(updatedColors);
  }

  // === coupon ===
  const couponOptions = couponData?.map((coupon) => ({
    value: coupon._id,
    label: coupon.coupon,
  }));
  const handleCouponChange = (value) => {
    setCoupon(value);
  };


  // ===== category +++++

  const onSubmit = async (inputValue) => {
    console.log(inputValue);
    console.log('hello how are you')
    try {
      setLoading(true);
      const productData = {
        name: inputValue.name,
        categories: selectedSubcategory,
        mainCategories: selectedMainCategory,
        brand: inputValue.brand,
        price: inputValue.price,
        discount: inputValue.discountPercentage,
        type: inputValue.type,
        status: inputValue.status,
        details: description,
        features: features,
        colors: color,
        coupon: coupon,
        extraDiscount: inputValue.extraDiscount,
        minimumQuantity: inputValue.minimumQuantity,
      }


      const res = await fetch(createProductUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      const dataRes = await res.json();

      if (!dataRes) {
        Swal.fire({
          position: 'center',
          timerProgressBar: true,
          title: 'Something went wrong!',
          iconColor: '#ED1C24',
          toast: true,
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInRight',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutRight',
          },
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          position: 'center',
          timerProgressBar: true,
          title: 'Successfully Added!',
          iconColor: '#ED1C24',
          toast: true,
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInRight',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutRight',
          },
          showConfirmButton: false,
          timer: 3500,
        });
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        timerProgressBar: true,
        title: 'Something went wrong!',
        iconColor: '#ED1C24',
        toast: true,
        icon: 'error',
        showClass: {
          popup: 'animate__animated animate__fadeInRight',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutRight',
        },
        showConfirmButton: false,
        timer: 3500,
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(color);

  return (
    <section className="my-4">
      <div className="flex flex-col w-full gap-4 mx-auto add-book-form">
        <div
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
            value={selectedMainCategory}
            onChange={(e) => handleMainCategoryChange(e.target.value)}
          >
            <option value="">Main Category</option>
            {categoryData?.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <Select
            mode="multiple"
            size="large"
            placeholder="Select SubCategory"
            value={selectedSubcategory}
            onChange={handleSubCategoryChange}
            style={{
              width: '100%',
            }}
            dropdownStyle={{ marginLeft: '2rem' }} // Adjust the margin as needed
            options={indentedSubcategoryOptions}
          />


          <Cascader
            options={cascaderOptions}
            value={[selectedMainCategory, selectedSubcategory]}
            onChange={handleCascaderChange}
            placeholder="Select Categories"
          />


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

          <input type="number"
            placeholder="Minimum Quantity"
            className='border-2 border-gray-300 rounded-md p-2'
            {...register("minimumQuantity")}
          />
          <input type="number"
            placeholder="Extra Discount"
            className='border-2 border-gray-300 rounded-md p-2'
            {...register("extraDiscount")}
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

          {/* ========color ========= */}

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

                <div className="form-control flex gap-2 py-3 border rounded  px-2 my-2">
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

                {
                  item.isSizeApplicable ? (
                    <>
                      {item.sizes.map((size, sizeIndex) => (
                        <div key={sizeIndex} className="flex gap-4  my-4">
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
                            className="common-btn "
                            onClick={() => removeSize(colorIndex, sizeIndex)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      ))}

                      <div className='my-4'>
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
                          type="text"
                          name="quantity1"
                          value={item.quantity}
                          onChange={(event) => onChange(event, colorIndex)}
                          placeholder="Quantity"
                          className="border-2 border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </>
                  )
                }
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

                  <div>
                    {/* ------ show seleted image------- */}

                    <div className="flex gap-4 my-4">
                      {item.images &&
                        item.images?.map((image, index) => (
                          <div key={index} className="w-1/2">
                            <img src={image} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                    </div>

                  </div>
                </div>
                <button
                  className="common-btn flex items-center justify-center"
                  onClick={() => removeColor(colorIndex)}
                >
                  <FaTrashAlt className="text-2xl mr-2" />
                  Delete Color
                </button>
              </div>
            ))}
            <button className="btn btn-primary mx-4" onClick={addColor}>
              Add Color
            </button>
          </div>


          {/* ========color ========= */}

          <button
            style={{
              marginTop: '20px',
            }}
            onClick={handleSubmit(onSubmit)}
            className="common-btn"
          >
            {
              loading ? 'Loading...' : 'Add Product'
            }
          </button>
        </div>
      </div>
    </section>
  );
};


export default AddProduct;