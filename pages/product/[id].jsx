'use client'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useContext, useEffect, useState, useCallback } from 'react';
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
    additionalInfo,
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

  const [value, setValue] = useState([20, 37]);

  const handleRangeChange = () => {
    setValue(newValue === null ? [0, 37] : newValue);
  };


  return (
    <RootLayout>
      <div className='pb-4 container h-full'>
        <div className="md:container mx-auto mt-3 flex justify-between items-center">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8  ">
            <div className="detailImageContent">
              <div className="img-box shadow w-full items-center rounded bg-[#f1e8e8] p-2 flex justify-center">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt={name}
                    width={500}
                    height={300}
                    className='w-full h-full cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130'
                  />
                ) : (
                  <Image
                    src={mainProductData?.colors[0]?.images[0]}
                    alt={mainProductData?.colors[0]?.color}
                    width={500}
                    height={300}
                    className='w-full h-full cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130'
                  />
                )}
              </div>

              <br />
              <div className="md:h-[12%] h-[15%]">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  // pagination={{
                  //   clickable: true,
                  // }}
                  navigation={true}
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
                            width={150}
                            height={150}
                            className='cursor-pointer w-full h-full rounded hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130 m-2'
                          />
                        </SwiperSlide>
                      )
                    })
                  }
                </Swiper>
              </div>

              <br />

            </div>
            <div className="md:col-span-1">
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

              <div className="flex items-center gap-3 mt-2 text-sm">
                <div className="mt-8 ">
                  <h1 className="text-3xl font-bold">Features</h1>
                  <div className='flex flex-col my-2  gap-4'>

                    {
                      features && features?.map((dt) => {
                        return (
                          <div className='flex flex-col gap-2'>
                            <h1 className='font-bold'>  {dt?.heading} :</h1>
                            <hr />
                            <h2>{dt?.description}</h2>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='grid md:grid-cols-2 gap-6 mt-2'>
          <div className='flex flex-col gap-4'>
            <h1 className="  text-3xl font-bold">
              Additional Infomation
            </h1>

            {
              additionalInfo && additionalInfo?.map((adt) => {
                return (
                  <div className='flex gap-2 border p-2 bg-slate-200 rounded'>
                    <h1 className='font-bold'>  {adt?.heading} :</h1>
                    <h2>{adt?.description}</h2>
                  </div>
                )
              })
            }

          </div>

          <div className='flex flex-col   gap-4'>
            <h1 className="text-3xl font-bold  ">Details</h1>
            {
              details && details?.map((dt) => {
                return (
                  <div className='flex gap-2 border p-2 bg-slate-200 rounded'>
                    <h1 className='font-bold'>   {dt?.heading} :</h1>
                    <h2>{dt?.description}</h2>
                  </div>
                )
              })
            }
          </div>
        </div>
        <hr
          className='my-4 bg-[#000] '
        />
        <div className="flex flex-col">
          <h1 className="mt-6  text-3xl font-bold">
            Product Description
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 my-4 w-full">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <hr />
                  <table className="min-w-full text-left text-sm font-light">
                    <tbody className='flex flex-col gap-2'>
                      <tr className="bg-slate-200 rounded">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          Brand :
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {brand}
                        </td>
                      </tr>
                      <tr className=" bg-slate-200 rounded flex items-center">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          Total Color :
                        </td>
                        <td className="whitespace-nowrap flex  px-6 py-4">

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
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 my-4 w-full">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <hr />
                  <table className="min-w-full text-left text-sm font-light">
                    <tbody className='flex flex-col gap-2'>
                      <tr className=" bg-slate-200 rounded">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          Sizes :
                        </td>
                        <td className="whitespace-nowrap px-6  py-4 ">
                          <div className='flex gap-2 '>
                            {
                              colors && colors?.map((color, index) => {
                                return (
                                  <div key={index + `colorIdx`} className='flex items-center gap-2'>
                                    <div className='text-[0.9rem] text-center flex gap-2 items-center border px-2'>
                                      {color.sizes.map((size) => {
                                        return (
                                          <p className='text-[0.9rem] text-center  '>
                                            {size.size}{index !== color.sizes?.length - 1 ? ',' : ''}
                                          </p>
                                        )
                                      })}
                                    </div>
                                  </div>
                                );
                              })
                            }
                          </div>
                        </td>
                      </tr>
                      <tr className="bg-slate-200 rounded flex">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          Type :
                        </td>
                        <td className="whitespace-nowrap flex  px-6 py-4">
                          {type}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div>
          <RecomendationProduct />
        </div>
      </div>
    </RootLayout>
  );
};

export default ProductDetails;