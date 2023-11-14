import RootLayout from '@/src/Layouts/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductSlider from '@/src/Components/Product/ProductSlider/ProductSlider';
import useProducts from '@/src/Hooks/useProducts';
import { FaArrowLeft, FaArrowRight, FaCartPlus } from 'react-icons/fa';
import { BsFilter } from 'react-icons/bs';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductPage = () => {
    const [show, setShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { productData, categoryData } = useProducts();
    const isCloups = categoryData?.length > 0;
    const productsPerPage = 9;
    const [page, setPage] = useState(1);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);


    const [categoryMap, setCategoryMap] = useState({});

    useEffect(() => {
        if (categoryData) {
            // Create a mapping of main categories to their subcategories
            const map = {};

            categoryData && categoryData?.forEach(category => {
                if (!category?.parent) {
                    map[category?.name] = [];
                } else {
                    map[category?.parent].push(category);
                }
            });

            setCategoryMap(map);
        }
    }, [categoryData]);



    // Function to handle previous page
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Function to handle next page
    const handleNextPage = () => {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    // Filter products by selected category
    const filteredProducts = selectedCategory
        ? productData.filter((product) => {
            return (
                product.mainCategories === selectedCategory || // Filter by mainCategories
                product.categories === selectedCategory // Filter by categories
            );
        })
        : productData;

    // Calculate total pages
    const totalPages = filteredProducts
        ? Math.ceil(filteredProducts.length / productsPerPage)
        : 0; // Set totalPages to 0 if filteredProducts is undefined

    // Calculate the index range for the current page
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Slice the products to display on the current page
    const productsToDisplay = filteredProducts
        ? filteredProducts.slice(startIndex, endIndex)
        : [];

    const clearFilter = () => {
        setSelectedCategory(null);
        setPage(1); // Reset page to 1 when clearing the filter
    };
    return (
        <RootLayout>
            <ProductSlider /> <br />
            <div className="flex flex-col gap-2 md:flex-row md:container">
                <div className="md:block hidden p-3  rounded ">
                    <div>
                        <button className='font-bold my-2'>
                            Sort Out :
                        </button>
                        <div>
                            {Object.keys(categoryMap).map(mainCategory => (
                                <div key={mainCategory}>

                                    <button onClick={() => setSelectedCategory(mainCategory)}
                                        className={`font-bold my-2 ${selectedCategory === mainCategory ? 'text-red-500' : ''}`}
                                    >
                                        {mainCategory}
                                    </button>

                                    {selectedCategory === mainCategory && (
                                        <div
                                            className='flex flex-col gap-2'
                                            style={{ marginLeft: '1rem' }}
                                        >
                                            {categoryMap[mainCategory].map(subcategory => (
                                                <button key={subcategory._id} onClick={() => setSelectedCategory(subcategory.name)}>
                                                    {subcategory.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button onClick={clearFilter}
                                className="px-3 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
                            >Clear</button>
                        </div>
                    </div>

                </div>

                <div className="col-span-4 p-4 bg-[#e8eaeb00]">
                    <div className="relative flex items-center justify-end w-full md:hidden">
                        <button
                            onClick={() => setShow(!show)}
                            className="bg-[#4c667200] p-1 rounded-sm flex items-center gap-2"
                        >
                            <h2 className="font-semibold text-md">Sort Out </h2>
                            <BsFilter className="text-3xl" />
                        </button>
                        <div
                            className={`${show ? 'block' : 'hidden'} bg-[#ffffff] w-[300px] p-3 border rounded shadow-xl absolute right-0 top-9 z-10`}
                        >
                            {Object.keys(categoryMap).map(mainCategory => (
                                <div key={mainCategory}>

                                    <button onClick={() => setSelectedCategory(mainCategory)}
                                        className={`font-bold my-2 ${selectedCategory === mainCategory ? 'text-red-500' : ''}`}
                                    >
                                        {mainCategory}
                                    </button>

                                    {selectedCategory === mainCategory && (
                                        <div
                                            className='flex flex-col gap-2'
                                            style={{ marginLeft: '1rem' }}
                                        >
                                            {categoryMap[mainCategory].map(subcategory => (
                                                <button key={subcategory._id} onClick={() => setSelectedCategory(subcategory.name)}>
                                                    {subcategory.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button onClick={clearFilter}
                                className="px-3 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
                            >Clear</button>

                        </div>
                    </div>

                    {/* <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" data-aos="fade-up"> */}
                    <div class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-14 gap-x-14 " data-aos="fade-up">
                        {productsToDisplay && productsToDisplay.map((product) => {
                            return (
                                <Link key={product?.id} href={`/product/${product?.id}`} data-aos="fade-up">
                                    <div class="md:w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
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
                                                    <div class="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                                    </svg></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Pagination */}
                    <div className={`items-center justify-center gap-4 mt-11 mb-16`} data-aos="fade-up" data-aos-delay="200">
                        <div className="flex items-center justify-center text-gray-400 ">
                            <button
                                title="Previous"
                                className={`h-14 w-14 text-center ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-10"
                                    } text-white bg-black-10 rounded-l-md border ${page === 1 ? "bg-gray-400" : "bg-red-500"
                                    } flex items-center justify-center`}
                                onClick={handlePrevPage}
                                disabled={page === 1}
                            >
                                <FaArrowLeft className="text-white" />
                            </button>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    className={`h-14 w-14 hover:text-white bg-red-500 ${page === index + 1 ? "text-white bg-red-600" : "bg-black-10"
                                        } text-center hover:bg-red-10 text-white border`}
                                    onClick={() => setPage(index + 1)}
                                    disabled={page === index + 1}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                title="Next"
                                className={`h-14 w-14 text-center ${page === totalPages
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "hover:bg-red-10"
                                    } text-white bg-black-10 rounded-r-md border ${page === totalPages ? "bg-gray-400" : "bg-red-500"
                                    } flex items-center justify-center`}
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                            >
                                <FaArrowRight className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
};

export default ProductPage;
