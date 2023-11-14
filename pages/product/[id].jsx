'use client'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useContext, useEffect, useState } from 'react';
import RootLayout from '@/src/Layouts/RootLayout';
import { addToCartUrl } from '@/src/Utils/Urls/ProductUrl';
import Swal from 'sweetalert2';
import { AuthContext } from '@/src/Context/UserContext';
import useProducts from '@/src/Hooks/useProducts';
import CouponSlider from '@/src/Components/Shop/CopuonSlider/CopuonSlider';
import RecomendationProduct from '@/src/Components/Shop/RecomendationProduct/RecomendationProduct';

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const { productData } = useProducts();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;
  let mainProductData;

  const filterproductData = productData?.filter((data) => {
    return data?._id === id;
  });

  if (filterproductData && filterproductData.length > 0) {
    mainProductData = filterproductData[0];
  } else {
    console.error(`No data found for ID: ${id}`);
  }

  const {
    name,
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
    _id,
  } = mainProductData || {};

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedColorData, setSelectedColorData] = useState(null);


  const [selectedColorImages, setSelectedColorImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null); // State variable to store the selected image URL


  const handleColorClick = (index) => {
    const clickedColor = colors[index];
    setSelectedColorIndex(index);
    setSelectedColorData(clickedColor);

    if (clickedColor?.images) {
      setSelectedColorImages(clickedColor.images);
    }
  };

  console.log(selectedColorIndex);


  useEffect(() => {
    if (colors && colors?.length > 0) {
      setSelectedColorIndex(colors[0] || 0);
      setSelectedColorData(colors[0] || {});
      setSelectedColorImages(colors[0]?.images || []);
    }
  }, [colors]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };




  // ====== Add to cart ======

  const addToCart = async (id) => {
    const convertPrice = parseInt(price);
    // Check if the user is logged in
    if (!user) {
      // User is not logged in, show an alert
      Swal.fire({
        icon: 'error',
        title: 'Please log in to add the product to your cart',
        showConfirmButton: true,
      });
      return;
    }

    const res = await fetch(addToCartUrl(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: _id,
        quantity: 1,
        totalPrice: convertPrice,
        email: user?.email,
        status: "unpaid",
        size: selectedSize,
        color: selectedColorData?.color,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Your product added to cart',
        showConfirmButton: false,
        timer: 1500,
      })
      router.push('/cart');
    }
  }

  const handelBuyNow = async (id) => {
    const convertPrice = parseInt(price);
    // Check if the user is logged in
    if (!user) {
      // User is not logged in, show an alert
      Swal.fire({
        icon: 'error',
        title: 'Please log in to add the product to your cart',
        showConfirmButton: true,
      });
      return;
    }

    const res = await fetch(addToCartUrl(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: _id,
        quantity: 1,
        totalPrice: convertPrice,
        email: user?.email,
        status: "unpaid",
        size: selectedSize,
        color: selectedColorData?.color,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Your product added to cart',
        showConfirmButton: false,
        timer: 1500,
      })
      router.push('/checkout');
    }



  }
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const handleCopyCoupon = (couponCode) => {
    navigator.clipboard.writeText(couponCode)
      .then(() => {
        setCopiedCoupon(couponCode);
        setTimeout(() => setCopiedCoupon(null), 2000);
      })
      .catch((err) => console.error('Failed to copy:', err));
  };



  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(mainProductData?.price || 0);

  const applyCoupon = (couponCode) => {
    // Find the coupon with the given code
    const appliedCoupon = coupon.find((coupon) => coupon.code === couponCode);

    if (appliedCoupon) {
      // Calculate the discounted price
      const discountAmount = (parseInt(price) * appliedCoupon.discountPercentage) / 100;
      const newPrice = parseInt(price) - discountAmount;

      setAppliedCoupon(couponCode);
      setDiscountedPrice(newPrice);
    }
  };

  console.log(coupon, "coupon");

  return (
    <RootLayout>
      <div className='pb-4 md:container h-full'>
        <div className="md:container mx-auto mt-3 flex justify-between items-center">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="">
              <div className="img-box shadow w-full items-center rounded bg-[#f1e8e8] p-2 flex justify-center">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt={name}
                    width={300}
                    height={300}
                    className='cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130'
                  />
                ) : (
                  <Image
                    src={mainProductData?.colors[0]?.images[0]}
                    alt={mainProductData?.colors[0]?.color}
                    width={300}
                    height={300}
                    className='cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130'
                  />
                )}
              </div>

              <br />
              <div className="md:h-[8%] h-[15%]">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[]}
                  className="mySwiper"
                >
                  {
                    selectedColorImages && selectedColorImages?.map((image, index) => {
                      return (
                        <SwiperSlide key={index}
                          onClick={() => setSelectedImage(image)}
                        >
                          <Image
                            src={image}
                            alt={colors[selectedColorData]?.color}
                            width={100}
                            height={100}
                            className='cursor-pointer rounded hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130'
                          />
                        </SwiperSlide>
                      )
                    })
                  }
                </Swiper>
              </div>

            </div>
            <div className="md:col-span-2">
              <h1 className="text-xl font-[500] md:w-[500px]">{name}</h1>
              <br />
              <div className='flex items-center gap-4'>
                <h1 className="font-bold text-slate-900">
                  {discount
                    ? `₹ ${Math.floor(price - (price * discount) / 100)}`
                    : `₹ ${Math.floor(price)}`
                  }
                </h1>
                <span className="text-sm text-slate-900 line-through mt-1">
                  ₹ {Math.floor(price)}
                </span>
                <span className='text-[#eec75b]'>
                  {Math.floor(discount)} % off
                </span>
              </div>


              <p className="text-gray-400 text-sm my-4">
                {details?.slice(0, 200)}...
              </p>
              <hr />
              <div className="mt-5">
                <h4 className="text-lg font-semibold capitalize">Available Colors</h4>
                <p className='my-2'>
                  {selectedColorData?.color}
                </p>
                <div className="flex items-center gap-2 my-4">

                  {colors && colors?.map((color, index) => {
                    const availableColor = color.color.toLowerCase();
                    const isSelected = selectedColorIndex === index;

                    return (
                      <div key={index} className="flex flex-col justify-center gap-2">
                        <div
                          className={`bg-[#f1e8e8] p-1 rounded-full w-[2rem] h-[2rem] cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 ${isSelected ? 'bg-opacity-100 ' : 'bg-opacity-50'
                            }`}
                          style={{
                            backgroundColor: availableColor,
                            border: isSelected ? '4px solid #ff5733' : '2px solid #3aa1b8',
                          }}
                          title={color.color}
                          onClick={() => handleColorClick(index)}
                        ></div>
                      </div>
                    );
                  })}

                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold capitalize">Available Sizes</h4>
                <div className="flex items-center gap-2 my-4">
                  {
                    selectedColorData?.isSizeApplicable ? (
                      <div className='flex flex-wrap gap-4'>
                        {
                          selectedColorData?.sizes.map((size, index) => {
                            return (
                              <div
                                key={index + `size`}
                                onClick={() => handleSizeClick(size.size)}
                                className={`cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${selectedSize === size.size ? 'bg-[#ff5733] text-white' : 'bg-[#f1e8e8] text-black'} `}
                              >
                                <p className='text-[0.9rem] text-center border-2 px-3 py-1 rounded'>
                                  {size?.size}
                                </p>
                              </div>
                            )
                          })
                        }
                      </div>
                    ) : (
                      <>
                        <p className='text-[0.9rem] text-center'>
                          Not applicable
                        </p>
                      </>
                    )
                  }
                </div>
              </div>

              <hr />

              <div className="flex mt-5 md:flex-row  gap-2 items-center space-x-4">
                <button
                  onClick={() => addToCart(_id)}
                  className="common-btn flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-[#1db7ff] hover:bg-[#0095da] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handelBuyNow(_id)}
                  className='common-btn flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-[#1db7ff] hover:bg-[#0095da] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'>Buy Now</button>
              </div>


              <div className='my-4 '>
                <Swiper
                  className="couponSwiper"
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                >
                  {coupon && coupon?.map((coupon, index) => (
                    <SwiperSlide key={index}
                     
                    >
                      <div className="bg-gradient-to-br w-full from-purple-600 to-indigo-600 text-white text-center py-6 px-6 rounded-lg shadow-md relative">
                        <h3 className="text-2xl font-semibold mb-4">
                          {coupon.couponText}
                        </h3>
                        <div className="flex items-center justify-center md:flex-row gap-4 flex-col space-x-2 mb-6">
                          <span
                            id="cpnCode"
                            className="border-dashed border text-white px-4 py-2 rounded-l"
                          >
                            {coupon.coupon}
                          </span>
                          <span
                            id="cpnBtn"
                            className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer"
                            onClick={() => handleCopyCoupon(coupon?.coupon)}
                          >
                            {copiedCoupon === coupon.coupon ? 'Copied!' : 'Copy Code'}
                          </span>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6" />
                        <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <hr />
              <h4 className="text-lg mt-5 font-semibold capitalize">Product Description</h4>
              <p className="text-gray-700">
                {details}
              </p>
              <p className='text-lg mt-5 font-semibold capitalize'>Features</p>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <ul className="">
                  {
                    features && features?.map((feature, index) => {
                      return (
                        <li key={index} className='relative after:w-[10px] mt-2 after:rounded-full after:top-0 after:bottom-0 after:my-auto after:h-[10px] after:bg-[#3d3c3c] after:absolute after:left-0 pl-4'>{feature}</li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 my-4">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <hr />
                      <table className="min-w-full text-left text-sm font-light">
                        <tbody>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Brand :
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {brand}
                            </td>
                          </tr>
                        
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Total Color :
                            </td>
                            <td className="whitespace-nowrap flex  px-6 py-4">
                              {/* {
                                colors && colors?.map((color, index) => {
                                  return (
                                    <div key={index + `colroIdsx`} className='flex items-center gap-2'>
                                      <p className='text-[0.9rem] text-center'>
                                        {color.color} ,
                                      </p>
                                    </div>
                                  )
                                })
                              } */}
                              {
                                colors && colors?.map((color, index) => {
                                  return (
                                    <div key={index + `colorIdx`} className='flex items-center gap-2'>
                                      <p className='text-[0.9rem] text-center'>
                                        {color.color}{index !== colors.length - 1 ? ',' : ''}
                                      </p>
                                    </div>
                                  );
                                })
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr
          className='my-4 bg-[#000] '
        />

        <div>
          <RecomendationProduct />
        </div>
      </div>
    </RootLayout>
  );
};

export default ProductDetails;
