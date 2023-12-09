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
import RecomendationProduct from '@/src/Components/Shop/RecomendationProduct/RecomendationProduct';
import { BsCart } from 'react-icons/bs';
import { Autoplay, Pagination, Navigation } from "swiper";
import 'swiper/css'; // basic Swiper styles
import 'swiper/css/navigation'; // styles for navigation

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
      <div className='pb-4 md:container h-full mt-[6rem]'>
        <div className="md:container mx-auto mt-3 flex justify-between items-center">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8  ">
            <div className="">
              <div className=" shadow w-full items-center rounded p-2 flex justify-center">
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
                  navigation={true}
                  modules={[Navigation]}
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
                <div className="flex items-center flex-wrap gap-2 my-4">
                  {colors && colors?.map((color, index) => {
                    const availableColor = color.color.toLowerCase();
                    const isSelected = selectedColorIndex === index;
                    return (
                      <div key={index} className="flex flex-col justify-center gap-2">
                        <div
                          className={`bg-[#f1e8e8]  rounded-full w-[4rem] h-[4rem] cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 ${isSelected ? 'bg-opacity-100 ' : 'bg-opacity-50'
                            }`}
                          style={{
                            backgroundColor: availableColor,
                            border: isSelected ? '2px solid #ff5733' : '2px solid #3aa1b8',
                          }}
                          title={color.color}
                          onClick={() => handleColorClick(index)}
                        >
                          <img
                            src={color?.images[0]}
                            alt={color.color}
                            className='rounded-full'
                          />
                        </div>
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

              <div className=" flex gap-4 flex-col">
                <button
                  onClick={() => addToCart(_id)}
                  className="font-semibold hover:before:bg-blackborder-black relative h-[50px] w-full rounded overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-white hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    <BsCart className='text-[1.2rem]' />   Add to Cart
                  </span>
                </button>

                <button
                  onClick={() => handelBuyNow(_id)}
                  className="font-semibold hover:before:bg-blackborder-black relative h-[50px] w-full rounded overflow-hidden border border-black bg-black px-3 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-500 hover:text-black hover:shadow-white hover:before:left-0 hover:before:w-full">
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    <BsCart className='text-[1.2rem]' />Buy Now
                  </span>
                </button>
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
        <div className="flex mx-4 flex-col">
          <h1 className="mt-6  text-3xl font-bold">
            Product Description
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 my-4 w-full">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <hr />
                  <table className="text-left text-sm font-light w-full">
                    <tbody className='flex flex-col gap-2'>
                      <tr className="bg-slate-200 rounded w-full">
                        <td className=" px-2 py-4 font-bold">
                          Brand :
                        </td>
                        <td className="  pr-2 py-4">
                          {brand}
                        </td>
                      </tr>
                      <tr className="w-full bg-slate-200 rounded flex items-center">
                        <td className="px-2 py-4 font-bold">
                          Total Color :
                        </td>
                        <td className="flex flex-wrap pr-2 py-4">
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
                  <table className=" w-full text-left text-sm font-light">
                    <tbody className='flex flex-col gap-2'>
                      <tr className="w-full bg-slate-200 rounded">
                        <td className="whitespace-nowrap px-2 py-4 font-bold">
                          Sizes :
                        </td>
                        <td className="whitespace-nowrap pr-2  py-4 ">
                          {/* <div className='flex gap-2 '>
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
                          </div> */}
                          <div className='flex gap-2 '>
                            {
                              colors && colors.slice(0, 1).map((color, index) => {
                                // Create a new Set to keep track of unique sizes
                                let uniqueSizes = new Set();

                                // Iterate over sizes and add them to the Set
                                color.sizes.forEach(size => {
                                  uniqueSizes.add(size.size);
                                });

                                // Convert the Set back into an array for rendering
                                let sizesArray = Array.from(uniqueSizes);

                                return (
                                  <div key={index + `colorIdx`} className='flex items-center gap-2'>
                                    <div className='text-[0.9rem] text-center flex gap-2 items-center border px-2'>
                                      {sizesArray.map((size, sizeIndex) => {
                                        return (
                                          <p className='text-[0.9rem] text-center'>
                                            {size}{sizeIndex !== sizesArray.length - 1 ? ',' : ''}
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
                      <tr className="w-full bg-slate-200 rounded flex">
                        <td className="px-2 py-4 font-bold">
                          Type :
                        </td>
                        <td className="flex  pr-2 py-4">
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