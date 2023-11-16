// import RootLayout from '@/src/Layouts/RootLayout';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import ProductSlider from '@/src/Components/Product/ProductSlider/ProductSlider';
// import useProducts from '@/src/Hooks/useProducts';
// import { FaArrowLeft, FaArrowRight, FaCartPlus } from 'react-icons/fa';
// import { BsFilter } from 'react-icons/bs';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const ProductPage = () => {
//     const [show, setShow] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const { productData, categoryData } = useProducts();
//     const isCloups = categoryData?.length > 0;
//     const productsPerPage = 9;
//     const [page, setPage] = useState(1);

//     useEffect(() => {
//         AOS.init({
//             duration: 1000,
//             once: true,
//         });
//     }, []);


//     const [categoryMap, setCategoryMap] = useState({});

//     useEffect(() => {
//         if (categoryData) {
//             // Create a mapping of main categories to their subcategories
//             const map = {};

//             categoryData && categoryData?.forEach(category => {
//                 if (!category?.parent) {
//                     map[category?.name] = [];
//                 } else {
//                     map[category?.parent].push(category);
//                 }
//             });

//             setCategoryMap(map);
//         }
//     }, [categoryData]);



//     // Function to handle previous page
//     const handlePrevPage = () => {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     };

//     // Function to handle next page
//     const handleNextPage = () => {
//         const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//         if (page < totalPages) {
//             setPage(page + 1);
//         }
//     };

//     // Filter products by selected category
//     const filteredProducts = selectedCategory
//         ? productData.filter((product) => {
//             return (
//                 product.mainCategories === selectedCategory ||  
//                 product.categories === selectedCategory  
//             );
//         })
//         : productData;

//     // Calculate total pages
//     const totalPages = filteredProducts
//         ? Math.ceil(filteredProducts.length / productsPerPage)
//         : 0; // Set totalPages to 0 if filteredProducts is undefined

//     // Calculate the index range for the current page
//     const startIndex = (page - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;

//     // Slice the products to display on the current page
//     const productsToDisplay = filteredProducts
//         ? filteredProducts.slice(startIndex, endIndex)
//         : [];

//     const clearFilter = () => {
//         setSelectedCategory(null);
//         setPage(1); // Reset page to 1 when clearing the filter
//     };
//     return (
//         <RootLayout>
//             <ProductSlider /> <br />
//             <div className="flex flex-col gap-2 md:flex-row md:container">
//                 <div className="md:block hidden p-3  rounded ">
//                     <div>
//                         <button className='font-bold my-2'>
//                             Sort Out :
//                         </button>
//                         <div>
//                             {Object.keys(categoryMap).map(mainCategory => (
//                                 <div key={mainCategory}>

//                                     <button onClick={() => setSelectedCategory(mainCategory)}
//                                         className={`font-bold my-2 ${selectedCategory === mainCategory ? 'text-red-500' : ''}`}
//                                     >
//                                         {mainCategory}
//                                     </button>

//                                     {selectedCategory === mainCategory && (
//                                         <div
//                                             className='flex flex-col gap-2'
//                                             style={{ marginLeft: '1rem' }}
//                                         >
//                                             {categoryMap[mainCategory].map(subcategory => (
//                                                 <button key={subcategory._id} onClick={() => setSelectedCategory(subcategory.name)}>
//                                                     {subcategory.name}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                             <button onClick={clearFilter}
//                                 className="px-3 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
//                             >Clear</button>
//                         </div>
//                     </div>

//                 </div>

//                 <div className="col-span-4 p-4 bg-[#e8eaeb00]">
//                     <div className="relative flex items-center justify-end w-full md:hidden">
//                         <button
//                             onClick={() => setShow(!show)}
//                             className="bg-[#4c667200] p-1 rounded-sm flex items-center gap-2"
//                         >
//                             <h2 className="font-semibold text-md">Sort Out </h2>
//                             <BsFilter className="text-3xl" />
//                         </button>
//                         <div
//                             className={`${show ? 'block' : 'hidden'} bg-[#ffffff] w-[300px] p-3 border rounded shadow-xl absolute right-0 top-9 z-10`}
//                         >
//                             {Object.keys(categoryMap).map(mainCategory => (
//                                 <div key={mainCategory}>

//                                     <button onClick={() => setSelectedCategory(mainCategory)}
//                                         className={`font-bold my-2 ${selectedCategory === mainCategory ? 'text-red-500' : ''}`}
//                                     >
//                                         {mainCategory}
//                                     </button>

//                                     {selectedCategory === mainCategory && (
//                                         <div
//                                             className='flex flex-col gap-2'
//                                             style={{ marginLeft: '1rem' }}
//                                         >
//                                             {categoryMap[mainCategory].map(subcategory => (
//                                                 <button key={subcategory._id} onClick={() => setSelectedCategory(subcategory.name)}>
//                                                     {subcategory.name}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                             <button onClick={clearFilter}
//                                 className="px-3 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
//                             >Clear</button>

//                         </div>
//                     </div>

//                     {/* <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" data-aos="fade-up"> */}
                    // <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-14 gap-x-14 " data-aos="fade-up">
                    //     {productsToDisplay && productsToDisplay.map((product) => {
                    //         return (
                                // <Link key={product?.id} href={`/product/${product?.id}`} data-aos="fade-up">
                                //     <div class="md:w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                //         <div>
                                //             <img src={product?.colors[0]?.images[0]} alt="Product" class="h-80 w-72 object-cover rounded-t-xl p-2" />
                                //             <div class="px-4 py-3 w-80">
                                //                 <p class="text-lg font-bold text-black truncate block capitalize"> {product?.name}</p>
                                //                 <div class="flex items-center">
                                //                     <p class="text-lg font-semibold text-black cursor-auto my-3">
                                //                         {product?.discount
                                //                             ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                //                             : `₹ ${Math.floor(product?.price)}`
                                //                         }
                                //                     </p>
                                //                     <del>
                                //                         <p class="text-sm text-gray-600 cursor-auto ml-2">₹ {Math.floor(product?.price)}</p>
                                //                     </del>
                                //                     <span className='text-[#eec75b] mx-2'>
                                //                         {Math.floor(product?.discount)} % off
                                //                     </span>
                                //                     <div class="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                //                         <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                //                         <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                //                     </svg></div>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     </div>
                                // </Link>
                    //         )
                    //     })}
                    // </div>

//                     {/* Pagination */}
//                     <div className={`items-center justify-center gap-4 mt-11 mb-16`} data-aos="fade-up" data-aos-delay="200">
//                         <div className="flex items-center justify-center text-gray-400 ">
//                             <button
//                                 title="Previous"
//                                 className={`h-14 w-14 text-center ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-10"
//                                     } text-white bg-black-10 rounded-l-md border ${page === 1 ? "bg-gray-400" : "bg-red-500"
//                                     } flex items-center justify-center`}
//                                 onClick={handlePrevPage}
//                                 disabled={page === 1}
//                             >
//                                 <FaArrowLeft className="text-white" />
//                             </button>
//                             {Array.from({ length: totalPages }).map((_, index) => (
//                                 <button
//                                     key={index}
//                                     className={`h-14 w-14 hover:text-white bg-red-500 ${page === index + 1 ? "text-white bg-red-600" : "bg-black-10"
//                                         } text-center hover:bg-red-10 text-white border`}
//                                     onClick={() => setPage(index + 1)}
//                                     disabled={page === index + 1}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             ))}
//                             <button
//                                 title="Next"
//                                 className={`h-14 w-14 text-center ${page === totalPages
//                                     ? "bg-gray-400 cursor-not-allowed"
//                                     : "hover:bg-red-10"
//                                     } text-white bg-black-10 rounded-r-md border ${page === totalPages ? "bg-gray-400" : "bg-red-500"
//                                     } flex items-center justify-center`}
//                                 onClick={handleNextPage}
//                                 disabled={page === totalPages}
//                             >
//                                 <FaArrowRight className="text-white" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </RootLayout>
//     );
// };

// export default ProductPage;



import React, { Fragment, useState, useEffect } from 'react';
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
import {HomeSliderTwo } from '@/src/Assets';



const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const ProductPage = () => {
  const { productData, categoryData } = useProducts();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const itemsPerPage = 9;
  const [page, setPage] = useState(1);

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const currentPageData = productData?.slice(start, end);

  const totalPages = Math.ceil((productData?.length || 0) / itemsPerPage);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const toggleCategory = (category) => {
    if (selectedCategories?.includes(category)) {
      setSelectedCategories(selectedCategories?.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filters = {
    category: false,
    size: false,
    color: false,
    price: false,
  };


  const [activeFilter, setActiveFilter] = useState(null);

  const handleToggleFilter = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null); // Close the currently active filter
    } else {
      setActiveFilter(filter); // Open the selected filter and close any previously active filter
    }
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




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
                  <form className="mt-4 border-t border-gray-200">
                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">Category</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {categoryData && categoryData.length > 0 ? (
                                categoryData.map((category) => {
                                  return (
                                    <li
                                      key={category._id} // or key={category.slug} depending on your unique identifier
                                      className={`cursor-pointer ${selectedCategories.includes(category.name) ? 'text-[#18568C]' : ''}`}
                                      onClick={() => toggleCategory(category.name)}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.name)}
                                        readOnly
                                        className="mr-2"
                                      />
                                      {category.name}
                                    </li>
                                  )
                                })
                              ) : (
                                <div>Loading categories...</div>
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between  border-gray-200 pb-6 pt-10">
            <h1 className="md:text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
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
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
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

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <div className="hidden lg:block">

                <div className="border-b border-gray-200 py-6">
                  <button onClick={() => handleToggleFilter('category')} className=" font-semibold">Category</button>

                  {activeFilter === 'category' && <>
                    <div className="space-y-4">
                      {categoryData && categoryData.length > 0 ? (
                        categoryData.map((category) => {
                          return (
                            <li
                              key={category._id}
                              className={`cursor-pointer mt-2 ${selectedCategories.includes(category.name) ? 'text-[#18568C]' : ''}`}
                              onClick={() => toggleCategory(category.name)}
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.name)}
                                readOnly
                                className="mr-2"
                              />
                              {category.name}
                            </li>
                          )
                        })
                      ) : (
                        <div>Loading categories...</div>
                      )}
                    </div>
                  </>}

                </div>

                <div className="border-b border-gray-200 py-6">
                  <button onClick={() => handleToggleFilter('size')} className="  font-semibold">Size  </button>
                  {activeFilter === 'size' && <>
                    <div className="space-y-4">
                      {sizeData && sizeData.length > 0 ? (
                        sizeData.map((size) => {
                          return (
                            <li
                              key={size.id}
                              className={`cursor-pointer mt-2 ${selectedCategories.includes(size.size) ? 'text-[#18568C]' : ''}`}
                              onClick={() => toggleCategory(size.size)}
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(size.size)}
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

                <div className="border-b border-gray-200 py-6">
                  <button onClick={() => handleToggleFilter('color')} className=" font-semibold">Color</button>
                  {activeFilter === 'color' && <>
                    <div className="space-y-4">
                      {colorData && colorData.length > 0 ? (
                        colorData.map((color) => {
                          return (
                            <li
                              key={color.id}
                              className={`cursor-pointer mt-2 ${selectedCategories.includes(color.name) ? 'text-[#18568C]' : ''}`}
                              onClick={() => toggleCategory(color.name)}
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(color.name)}
                                readOnly
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

                </div>

                <div className="border-b border-gray-200 py-6">
                  <button onClick={() => handleToggleFilter('price')} className=" font-semibold">Price  </button>

                  {activeFilter === 'price' && <>
                    <div className="space-y-4">
                      {/* {priceData && priceData.length > 0 ? (
                        priceData.map((price) => {
                          return (
                            <li
                              key={price.id}
                              className={`cursor-pointer mt-2 ${selectedCategories.includes(price.name) ? 'text-[#18568C]' : ''}`}
                              onClick={() => toggleCategory(price.name)}
                            >
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(price.name)}
                                readOnly
                                className="mr-2"
                              />
                              {price.name}
                            </li>
                          )
                        })
                      ) : (
                        <div>Loading Price...</div>
                      )} */}

<Box sx={{ width: 250 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>

                    </div>

                  </>}
                </div>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
             
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <div className="lg:col-span-4">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                      {currentPageData && currentPageData?.map((product) => {
                        return (
                          <Link key={product?.id} href={`/product/${product?.id}`} data-aos="fade-up">
                          <div class="  bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                              <div>
                                  <img src={product?.colors[0]?.images[0]} alt="Product" class="h-80 w-72 object-cover rounded-t-xl p-2" />
                                  <div class="px-4 py-3 w-80">
                                      <p class="text-lg font-bold text-black truncate block capitalize"> {product?.name}</p>
                                      <div class="flex items-center">
                                          <p class="text-lg font-semibold text-black cursor-auto my-3">
                                              {product?.discount
                                                  ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                                  : `₹ ${Math.floor(product?.price)}`
                                              }
                                          </p>
                                          <del>
                                              <p class="text-sm text-gray-600 cursor-auto ml-2">₹ {Math.floor(product?.price)}</p>
                                          </del>
                                          <span className='text-[#eec75b] mx-2'>
                                              {Math.floor(product?.discount)} % off
                                          </span>

                                      </div>
                                  </div>
                              </div>
                          </div>
                      </Link>
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
                          className={`inline-flex items-center px-4 py-2 text-sm font-semibold border dark:bg-violet-400 dark:text-gray-900 dark:border-gray-700 ${i + 1 === page ? 'dark:bg-violet-400 dark:text-gray-900' : ''
                            }`}
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

 