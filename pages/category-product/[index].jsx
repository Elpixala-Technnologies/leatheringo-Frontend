// import { HomeSliderTwo, MobileBannerOne } from "@/src/Assets";
// import useProducts from "@/src/Hooks/useProducts";
// import RootLayout from "@/src/Layouts/RootLayout";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { FaArrowLeft, FaArrowRight, FaCartPlus } from "react-icons/fa";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
// import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";

// const category_product = () => {
//   const { productData } = useProducts();
//   const router = useRouter();
//   const categoryName = router?.query?.index;

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [categoryName]);

//   const sliderRef = useRef
//     (null);
//   const filterProductData = productData?.filter((data) => {
//     return data?.categories?.includes(categoryName);
//   });


//   const filterTrandingProductData = productData?.filter((data) => {
//     return data?.status === "Tranding";
//   });

//   const [page, setPage] = useState(1);
//   const productsPerPage = 6; // Number of products per page

//   // Calculate total pages
//   const totalPages = Math.ceil(
//     filterTrandingProductData?.length / productsPerPage
//   );

//   // Calculate the index range for the current page
//   const startIndex = (page - 1) * productsPerPage;
//   const endIndex = startIndex + productsPerPage;

//   // Filter products for the current page
//   const productsToDisplay = filterTrandingProductData?.slice(
//     startIndex,
//     endIndex
//   );

//   // Function to handle previous page
//   const handlePrev = useCallback(() => {
//     if (!sliderRef.current) return;
//     sliderRef.current.swiper.slidePrev();
//   }, []);

//   const handleNext = useCallback(() => {
//     if (!sliderRef.current) return;
//     sliderRef.current.swiper.slideNext();
//   }, []);


//   // ========= pagination for category product =========

//   const [categoriesPage, setCategoriesPage] = useState(1);
//   const categoriesProductsPerPage = 6; // Number of products per page

//   // Calculate total pages
//   const categoriesTotalPages = Math.ceil(
//     filterProductData?.length / categoriesProductsPerPage
//   );

//   // Calculate the index range for the current page
//   const categoriesStartIndex = (categoriesPage - 1) * categoriesProductsPerPage;

//   const categoriesEndIndex = categoriesStartIndex + categoriesProductsPerPage;

//   // Filter products for the current page
//   const categoriesProductsToDisplay = filterProductData?.slice(
//     categoriesStartIndex,
//     categoriesEndIndex
//   );

//   // Function to handle previous page

//   const handlePrevCategoriesPage = () => {
//     if (categoriesPage > 1) {
//       setCategoriesPage(categoriesPage - 1);
//     }
//   };

//   // Function to handle next page

//   const handleNextCategoriesPage = () => {
//     if (categoriesPage < categoriesTotalPages) {
//       setCategoriesPage(categoriesPage + 1);
//     }
//   };

//   // ========
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768); // Define your mobile breakpoint
//     };

//     handleResize(); // Check the initial screen width
//     window.addEventListener("resize", handleResize); // Listen for window resize events

//     return () => {
//       window.removeEventListener("resize", handleResize); // Remove the event listener when the component unmounts
//     };
//   }, []);

//   useEffect(() => {
//     AOS.init({
//       duration: 1000, // Animation duration in milliseconds
//       easing: "ease-in-out", // Easing for the animation
//       once: true, // Only trigger the animation once
//     });
//   }, []);



//   return (
//     <RootLayout>
//       <div className="md:container" data-aos="fade-up">
//         {/* <Image src={HomeSliderTwo} width={800} height={200} className='w-full md:h-[300px] object-cover' /> */}
//         <Image
//           src={isMobile ? MobileBannerOne : HomeSliderTwo}
//           alt="Banner Image"
//           className="w-full h-full"
//           width={isMobile ? 768 : 1920}
//           height={isMobile ? 768 : 500}
//         />
//         <br />
//         <h3 className="font-semibold md:text-3xl text-lg my-12">{categoryName}</h3>
//         <div class="w-fit mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-y-14 gap-x-14">
//           {categoriesProductsToDisplay &&
//             categoriesProductsToDisplay?.map((product) => (
//               <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-red-500  color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
//                 key={product?._id}
//               >
//                 <div className="productImage">
//                   <Image
//                     src={product?.colors[0]?.images[0]}
//                     width={300}
//                     height={300}
//                     className="w-[300px] h-[300px] object-cover"
//                   />
//                 </div>
//                 <hr className="w-full bg-slate-400" />

//                 <div className="productInfo mt-2 p-2">
//                   <h2 className="productName font-bold text-left ">
//                     {product?.name}
//                   </h2>
//                   <div className='flex gap-4'>
//                     <h1 className="font-bold text-slate-900">
//                       {product?.discount
//                         ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
//                         : `₹ ${Math.floor(product?.price)}`
//                       }
//                     </h1>
//                     <span className="text-sm text-slate-900 line-through mt-1">
//                       ₹ {Math.floor(product?.price)}
//                     </span>
//                     <span className='text-[#eec75b]'>
//                       {Math.floor(product?.discount)} % off
//                     </span>
//                   </div>
//                   <p className="productDescription py-3 text-left">
//                     {product?.details[0]?.description?.slice(0, 30) + "..."}
//                   </p>
//                   <div className="productAddToCart flex gap-5 items-center">
//                     <div>
//                       <Link className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" href={`/product/${product?._id}`}>
//                         <FaCartPlus />
//                         Product Detail
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             ))}
//         </div>
//         {/* ====== pagination categories */}
//         <div
//           className={`items-center justify-center gap-4 mt-11 mb-16`}
//           data-aos="fade-up"
//           data-aos-delay="100"
//         >
//           <div className="flex items-center justify-center text-gray-400 ">
//             <button
//               title="Previous"
//               className={`h-14 w-14 text-center ${categoriesPage === 1
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "hover:bg-red-10"
//                 } text-white bg-black-10 rounded-l-md border ${categoriesPage === 1 ? "bg-gray-400" : "bg-red-500"
//                 } flex items-center justify-center`}
//               onClick={handlePrevCategoriesPage}
//               disabled={categoriesPage === 1}
//             >
//               <FaArrowLeft className="text-white" />
//             </button>
//             {Array.from({ length: categoriesTotalPages }).map((_, index) => (
//               <button
//                 key={index}
//                 className={`h-14 w-14 hover:text-white bg-red-500 ${categoriesPage === index + 1
//                   ? "text-white bg-red-600"
//                   : "bg-black-10"
//                   } text-center hover:bg-red-10 text-white border`}
//                 onClick={() => setPage(index + 1)}
//                 disabled={categoriesPage === index + 1}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               title="Next"
//               className={`h-14 w-14 text-center ${categoriesPage === categoriesTotalPages
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "hover:bg-red-10"
//                 } text-white bg-black-10 rounded-r-md border ${categoriesPage === categoriesTotalPages
//                   ? "bg-gray-400"
//                   : "bg-red-500"
//                 } flex items-center justify-center`}
//               onClick={handleNextCategoriesPage}
//               disabled={categoriesPage === categoriesTotalPages}
//             >
//               <FaArrowRight className="text-white" />
//             </button>
//           </div>
//         </div>

//         <h3 className="text-center text-black font-semibold md:text-3xl text-lg my-12">
//           Tranding Products
//         </h3>

//         <div className="flex flex-end items-center gap-10  ">
//           <button
//             className="prev-arrow cursor-pointer bg-[#ED1C24] p-3 rounded-full"
//             onClick={handlePrev}
//           >
//             <TbArrowBigLeft className="h-6 w-6 text-white" />
//           </button>
//           <button
//             className="next-arrow cursor-pointer bg-[#ED1C24] p-3 rounded-full"
//             onClick={handleNext}
//           >
//             <TbArrowBigRight className="h-6 w-6 text-white" />
//           </button>
//         </div>

//         <div className='mt-6'>
//           <Swiper
//             ref={sliderRef}
//             modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//             breakpoints={{
//               320: {
//                 slidesPerView: 1,
//                 spaceBetween: 20,
//               },
//               360: {
//                 slidesPerView: 1,
//                 spaceBetween: 20,
//               },
//               480: {
//                 slidesPerView: 1,
//                 spaceBetween: 20,
//               },
//               640: {
//                 slidesPerView: 1,
//                 spaceBetween: 20,
//               },
//               768: {
//                 slidesPerView: 2,
//                 spaceBetween: 30,
//               },
//               1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 20,
//               },
//             }}
//             spaceBetween={20}
//             slidesPerView={3}
//             onSlideChange={() => { }}
//             onSwiper={(swiper) => { }}
//             data-aos="fade-up"
//             data-aos-anchor-placement="center-bottom"
//           >
//             <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {productsToDisplay &&
//                 productsToDisplay?.map((product) => {
//                   return (
//                     <SwiperSlide className="cursor-grab" key={product?._id}
//                     >
//                       <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-red-500  color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 ">
//                         <div className="productImage ">
//                           <Image
//                             src={product?.colors[0]?.images[0]}
//                             width={300}
//                             height={300}
//                             className="w-full h-full"
//                           />
//                         </div>
//                         <hr className="w-full bg-slate-400" />

//                         <div className="productInfo mt-2 p-2">
//                           <h2 className="productName font-bold text-left ">
//                             {product?.name}
//                           </h2>
//                           <div className='flex gap-4'>
//                             <h1 className="font-bold text-slate-900">
//                               {product?.discount
//                                 ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
//                                 : `₹ ${Math.floor(product?.price)}`
//                               }
//                             </h1>
//                             <span className="text-sm text-slate-900 line-through mt-1">
//                               ₹ {Math.floor(product?.price)}
//                             </span>
//                             <span className='text-[#eec75b]'>
//                               {Math.floor(product?.discount)} % off
//                             </span>
//                           </div>
//                           <p className="productDescription py-3 text-left">
//                             {product?.details[0]?.description?.slice(0, 30) + "..."}
//                           </p>
//                           <div className="productAddToCart flex gap-5 items-center">
//                             <div>
//                               <Link className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" href={`/product/${product?._id}`}>
//                                 <FaCartPlus />
//                                 Product Detail
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   );
//                 })}
//             </div>
//           </Swiper>
//         </div>

//       </div>
//     </RootLayout>
//   );
// };

// export default category_product;




import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { AiOutlineSearch } from 'react-icons/ai';
import useProducts from '@/src/Hooks/useProducts';
import { colorData, priceData, sizeData } from '@/src/Utils/Mock/CommonData';
import Link from 'next/link';
import RootLayout from '@/src/Layouts/RootLayout';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import Image from 'next/image';
import { HomeSliderTwo } from '@/src/Assets';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { FaCartPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';



const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getPaddingStyle = (level) => {
  return { paddingLeft: `${level * 20}px` };
};


const ProductPage = () => {
  const { productData, productLoaded, categoryData } = useProducts();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [selectedSizes, setSelectedSizes] = useState(new Set());
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]);
  const [selectedSortOption, setSelectedSortOption] = useState('Price: Low to High');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const router = useRouter()

  const categoryName = router?.query?.index;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  const filterProductData = productData?.filter((data) => {
    return data?.categories?.includes(categoryName);
  });


  function valuetext(value) {
    return `${value} Rs.`;
  }
  // Logic to prepare nested category options
  const prepareCategoryOptions = (categories, parentName = null, level = 0) => {
    return categories.filter(category => category.parent === parentName)
      .flatMap(category => ([
        { value: category.name, label: category.name, level },
        ...prepareCategoryOptions(categories, category.name, level + 1)
      ]));
  };

  const categoryOptions = categoryData ? prepareCategoryOptions(categoryData) : [];

  const totalPages = Math.ceil(filterProductData?.length / itemsPerPage);
  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, filterProductData]);

  const handleToggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };


  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((c) => c !== category);
      }
      return [...prevSelected, category];
    });
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) => {
      const newSizes = new Set(prevSizes);
      if (newSizes.has(size)) {
        newSizes.delete(size);
      } else {
        newSizes.add(size);
      }
      return newSizes;
    });
  };

  const handlePriceChange = (event, newValue) => {
    setSelectedPriceRange(newValue);
  };

  const handleSortChange = (option) => {
    setSelectedSortOption(option);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const resetFilters = () => {
    setSelectedCategories(['All']);
    setSelectedSizes(new Set());
    setSelectedPriceRange([0, 10000]);
    setSearchInput('');
    setPage(1);
    setActiveFilter(null);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = filterProductData || [];

    // Apply search filter
    if (searchInput) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    // Apply category filter
    if (!selectedCategories.includes('All')) {
      result = result.filter(product =>
        selectedCategories.some(category => product.categories.includes(category))
      );
    }

    // Apply size filter
    if (selectedSizes.size > 0) {
      result = result.filter(product =>
        product.colors.some(color =>
          color.sizes.some(sizeObj => selectedSizes.has(sizeObj.size))
        )
      );
    }

    // Apply price range filter
    result = result.filter(product =>
      product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1]
    );

    // Apply sorting
    if (selectedSortOption === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSortOption === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [productData, searchInput, selectedCategories, selectedSizes, selectedPriceRange, selectedSortOption]);


  const currentPageData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    return filteredAndSortedProducts.slice(start, end);
  }, [filteredAndSortedProducts, page]);

  if (productLoaded) {
    return <div>Loading...</div>;
  }


  return (
    <RootLayout>
      <div>
        <Image
          src={HomeSliderTwo}
          alt='Product'
          width={250}
          height={1920}
          className='w-full h-full'
        />
      </div>
      <div className="container bg-[#fff]">
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <div className="border-b border-gray-200 py-6">
                            <button onClick={() => handleToggleFilter('category')} className="font-semibold w-full flex gap-4 justify-between items-center">
                              Category
                              {activeFilter === 'category' ? <MdExpandLess className='text-2xl' /> : <MdExpandMore className='text-2xl' />}
                            </button>

                            {activeFilter === 'category' && (
                              <div className="space-y-4">
                                {categoryData && categoryData.length > 0 ? (
                                  categoryData.map((category) => (
                                    <li
                                      key={category._id}
                                      className={`cursor-pointer mt-2`}
                                      onClick={() => handleCategoryChange(category.name)}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.name)}
                                        onChange={() => handleCategoryChange(category.name)}
                                        className="mr-2"
                                      />
                                      {category.name}
                                    </li>
                                  ))
                                ) : (
                                  <div>Loading categories...</div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="border-b border-gray-200 py-6">
                            <button onClick={() => handleToggleFilter('size')} className="font-semibold w-full flex gap-4 justify-between items-center">
                              Size
                              {activeFilter === 'size' ? <MdExpandLess className='text-2xl' /> : <MdExpandMore className='text-2xl' />}
                            </button>
                            {activeFilter === 'size' && (
                              <div className="space-y-4">
                                {sizeData && sizeData.length > 0 ? (
                                  sizeData.map((size) => (
                                    <li
                                      key={size.id}
                                      className="cursor-pointer mt-2"
                                      onClick={() => handleSizeChange(size.size)}
                                    >
                                      <input
                                        type="checkbox"
                                        onChange={() => handleSizeChange(size.size)}
                                        className="mr-2"
                                      />
                                      {size.size}
                                    </li>
                                  ))
                                ) : (
                                  <div>Loading Size...</div>
                                )}
                              </div>
                            )}
                          </div>


                          <div className="border-b border-gray-200 py-6">
                            <button onClick={() => handleToggleFilter('price')} className=" font-semibold w-full flex gap-4 justify-between items-center">Price
                              {activeFilter === 'price' ? <MdExpandLess className='text-2xl' /> : <MdExpandMore className='text-2xl' />}
                            </button>
                            {activeFilter === 'price' && (
                              <div className="space-y-4">
                                <Box sx={{ width: 250 }}>
                                  <Slider
                                    getAriaLabel={() => 'Price'}
                                    value={selectedPriceRange}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    min={0}
                                    max={3000}
                                  />
                                </Box>
                                <div className='flex justify-between items-center gap-2'>
                                  <div className='border p-2'>{`Rs. ${selectedPriceRange[0]}`}</div>
                                  <div className='border p-2'>{`Rs. ${selectedPriceRange[1]}`}</div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="border-b border-gray-200 py-6">
                            <button
                              className=" font-semibold w-full flex gap-4 border p-2 rounded justify-between items-center"
                              onClick={() => resetFilters()}
                            >
                              Reset Filters
                            </button>
                          </div>

                        </>
                      )}
                    </Disclosure>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between  border-gray-200 pb-6 pt-10">
            <h1 className="md:text-4xl font-bold tracking-tight text-gray-900">Selected : {categoryName}</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort {
                      selectedSortOption === 'Price: Low to High' ? 'Low to High' : 'High to Low'
                    }
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => setSelectedSortOption(option.name)}
                            >
                              {option.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-10">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="flex gap-10  justify-center md:flex-row flex-col">
              <div className="hidden lg:block w-[14rem]">

                <div className="border-b border-gray-200 py-6">
                  <button onClick={() => handleToggleFilter('category')} className=" font-semibold w-full flex gap-4 justify-between items-center">
                    Category
                    {activeFilter === 'category' ? <MdExpandLess className='text-2xl' /> : <MdExpandMore className='text-2xl' />}
                  </button>
                  {activeFilter === 'category' && <>
                    <div className="space-y-4">
                      {categoryOptions?.map((option) => (
                        <li
                          key={option.value}
                          className={`cursor-pointer mt-2 ${selectedCategories.includes(option.value) ? 'text-[#18568C]' : ''}`}
                          onClick={() => handleCategoryChange(option.value)}
                          style={{ paddingLeft: `${option.level * 20}px` }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(option.value)}
                            readOnly
                            className="mr-2"
                          />
                          {option.label}
                        </li>
                      ))}
                    </div>
                  </>}
                </div>

                <div className="border-b border-gray-200 py-6">
                  <button onClick={() => handleToggleFilter('size')} className=" font-semibold w-full flex gap-4 justify-between items-center">Size
                    {activeFilter === 'size' ? <MdExpandLess className='text-2xl' /> : <MdExpandMore className='text-2xl' />}
                  </button>
                  {activeFilter === 'size' && <>
                    <div className="space-y-4">
                      {sizeData && sizeData.length > 0 ? (
                        sizeData.map((size) => {
                          return (
                            <li
                              key={size.id}
                              className={`cursor-pointer mt-2 ${selectedCategories.includes(size.size) ? 'text-[#18568C]' : ''}`}
                              onClick={() => handleSizeChange(size.size)}
                            >
                              <input
                                type="checkbox"
                                onChange={() => handleSizeChange(size.size)}
                                readOnly
                                className="mr-2"
                              />
                              {size.size}
                            </li>
                          )
                        })
                      ) : (
                        <div>Loading Size...</div>
                      )}
                    </div>
                  </>}
                </div>

                {/* <div className="border-b border-gray-200 py-6">
                  <button onClick={() => handleToggleFilter('color')} className=" font-semibold w-full flex gap-4 justify-between items-center">Color
                    {activeFilter === 'color' ? <MdExpandLess className='text-2xl' /> : <MdExpandMore className='text-2xl' />}
                  </button>
                  {activeFilter === 'color' && <>
                    <div className="space-y-4">
                      {colorData && colorData.length > 0 ? (
                        colorData?.map((color) => {
                          return (
                            <li
                              key={color.id}
                              className={`cursor-pointer mt-2 ${selectedCategories.includes(color.name) ? 'text-[#18568C]' : ''}`}
                              onClick={
                                () => handleColorChange(color.name)
                              }
                            >
                              <input
                                type="checkbox"
                                // checked={selectedCategories.includes(color.name)}
                                checked={selectedCategories.includes(color.name)}
                                className="mr-2 checkbox-container"
                              />
                              {color.name}
                            </li>
                          )
                        })
                      ) : (
                        <div>Loading Color...</div>
                      )}
                    </div>

                  </>}

                </div> */}

                <div className="border-b border-gray-200 py-6">
                  <button onClick={() => handleToggleFilter('price')} className=" font-semibold w-full flex gap-4 justify-between items-center">Price
                    {activeFilter === 'price' ? <MdExpandLess className='text-2xl' /> : <MdExpandMore className='text-2xl' />}
                  </button>

                  {activeFilter === 'price' && <>
                    <div className="space-y-4">
                      <Box sx={{ width: 200 }}>
                        <Slider
                          getAriaLabel={() => 'Price'}
                          value={selectedPriceRange}
                          onChange={handlePriceChange}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                          min={0}
                          max={10000}
                        />
                      </Box>
                      <div className='flex justify-between items-center gap-2'>
                        <div className='border p-2'>{`Rs. ${selectedPriceRange[0]}`}</div>
                        <div className='border p-2'>{`Rs. ${selectedPriceRange[1]}`}</div>
                      </div>
                    </div>
                  </>}
                </div>

                <div className="border-b border-gray-200 py-6">
                  <button
                    className=" font-semibold w-full flex gap-4 border p-2 rounded justify-between items-center"
                    onClick={() => resetFilters()}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <li className="flex items-center my-4 rounded-xl border border-[#999] relative  gap-2 w-full">
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="w-full px-6 p-2 no-outline focus:outline-none rounded-xl text-black border border-[#999]"
                    placeholder='Search ...'
                  />
                  <AiOutlineSearch className='text-black text-[1.5rem] mx-6' />
                </li>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <div className="lg:col-span-4">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {currentPageData && currentPageData?.map((product) => {
                        return (
                          <div className="cardBody md:m-0  mx-auto  flex flex-col hover:border-red-500  color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 ">
                            <div className="productImage">
                              <Image
                                src={product?.colors[0]?.images[0]}
                                width={300}
                                height={300}
                                className="w-[300px] h-[300px] object-cover"
                              />
                            </div>
                            <hr className="w-full bg-slate-400" />

                            <div className="productInfo mt-2 p-2">
                              <h2 className="productName font-bold text-left ">
                                {product?.name}
                              </h2>
                              <div className='flex gap-4'>
                                <h1 className="font-bold text-slate-900">
                                  {product?.discount
                                    ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                    : `₹ ${Math.floor(product?.price)}`
                                  }
                                </h1>
                                <span className="text-sm text-slate-900 line-through mt-1">
                                  ₹ {Math.floor(product?.price)}
                                </span>
                                <span className='text-[#eec75b]'>
                                  {Math.floor(product?.discount)} % off
                                </span>
                              </div>
                              <p className="productDescription py-3 text-left">
                                {product?.details[0]?.description?.slice(0, 30) + "..."}
                              </p>
                              <div className="productAddToCart flex gap-5 items-center">
                                <div>
                                  <Link className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" href={`/product/${product?._id}`}>
                                    <FaCartPlus />
                                    Product Detail
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>

                        )
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  {/* Pagination controls */}
                  <div className="flex justify-center mt-6">
                    <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-100">
                      <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className={`inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-700 ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'
                          }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => setPage(i + 1)}
                          className={`inline-flex items-center px-4 py-2 text-sm font-semibold border ${i + 1 === page ? 'bg-indigo-600 text-white' : 'dark:bg-violet-400 dark:text-gray-900 dark:border-gray-700'}`}

                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={handleNextPage}
                        disabled={page === totalPages}
                        className={`inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-700 ${page === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'
                          }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>
    </RootLayout>
  )
}

export default ProductPage;