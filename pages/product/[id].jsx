'use client'
import Image from 'next/image';
import { useRouter } from 'next/router';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useContext, useState } from 'react';
import RootLayout from '@/src/Layouts/RootLayout';
import { addToCartUrl } from '@/src/Utils/Urls/ProductUrl';
import Swal from 'sweetalert2';
import { AuthContext } from '@/src/Context/UserContext';
import useProducts from '@/src/Hooks/useProducts';
import CouponSlider from '@/src/Components/Shop/CopuonSlider/CopuonSlider';
import RecomendationProduct from '@/src/Components/Shop/RecomendationProduct/RecomendationProduct';

const ProductDetails = () => {
  const { productData } = useProducts();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;
  const [showImg, setShowImg] = useState('')


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
    images,
    mainCategories,
    categories,
    brand,
    price,
    discount,
    quantity,
    type,
    status,
    size,
    details,
    features,
    colors,
    coupon,
    _id,
  } = mainProductData || {};

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
        status: "unpaid"
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



  return (
    <RootLayout>
      <div className='pb-4 container h-full'>
        <div className="container mx-auto mt-3 flex justify-between items-center">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="">
              <div className="img-box shadow rounded bg-[#f1e8e8] p-2 flex justify-center">
                {images && images.length > 0 ? (
                  <Image src={images[0]} alt={name}
                    width={300}
                    height={300}
                    className='cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-130'
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <br />
              <div className='h-[10%]'>
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
                    images && images?.map((img, index) => {
                      return (
                        <SwiperSlide key={index} onClick={() => setShowImg(img)}>
                          <Image
                            src={img}
                            alt={name}
                            width={100}
                            height={100}
                            className='bg-[#f1e8e8] border-2 border-[#3aa1b8] p-1 rounded cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100' />
                        </SwiperSlide>
                      )
                    })
                  }
                </Swiper>
              </div>

              <div className="flex mt-5 items-center space-x-4">
                <button
                  onClick={() => addToCart(_id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded  hover:bg-blue-600 focus:outline-none cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100"
                >
                  Add to Cart
                </button>
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


              <div className="flex  items-center gap-2 mt-2">
                <button className='bg-[#1db7ff] text-white px-12 py-2 rounded'>Buy</button>
              </div>
              <p className="text-gray-400 text-sm my-4">
                {details?.slice(0, 200)}...
              </p>
              <hr />
              <div className='my-4'>
                {/* {
                  coupon && coupon?.map((coupon, index) => {
                    return (
                      <CouponSlider
                        key={index}
                        coupon={coupon}
                        applyCoupon={applyCoupon} 
                        appliedCoupon={appliedCoupon} 
                      />
                    )
                  })
                } */}
                <CouponSlider />
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
                              Type :
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {type}
                            </td>
                          </tr>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Status:
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {status}
                            </td>
                          </tr>

                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Size :
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {
                                size && size?.map((size, index) => {
                                  return (
                                    <span key={index} className='mr-2'>{size}</span>
                                  )
                                })
                              }
                            </td>
                          </tr>

                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Category :
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {categories?.name}
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