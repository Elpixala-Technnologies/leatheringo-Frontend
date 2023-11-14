import { HomeSliderTwo, MobileBannerOne, } from '@/src/Assets';
import useProducts from '@/src/Hooks/useProducts';
import RootLayout from '@/src/Layouts/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCartPlus } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const category_product = () => {
    const { productData } = useProducts()
    const router = useRouter();
    const categoryName = router?.query?.index;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    // const filterProductData = productData?.filter((data) => {
    //     return data?.categories === categoryName || data?.mainCategories === categoryName;
    // });

    const filterProductData = productData?.filter((data) => {
        // Check if either 'mainCategories' or 'categories' includes the 'categoryName'
        return (
            data.mainCategories === categoryName ||
            (data.categories && data.categories.includes(categoryName))
        );
    })

    const filterTrandingProductData = productData?.filter((data) => {
        return data?.status === "Tranding";
    });


    const [page, setPage] = useState(1);
    const productsPerPage = 6; // Number of products per page

    // Calculate total pages
    const totalPages = Math.ceil(filterTrandingProductData?.length / productsPerPage);

    // Calculate the index range for the current page
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Filter products for the current page
    const productsToDisplay = filterTrandingProductData?.slice(startIndex, endIndex);

    // Function to handle previous page
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Function to handle next page
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    // ========= pagination for category product =========

    const [categoriesPage, setCategoriesPage] = useState(1);
    const categoriesProductsPerPage = 6; // Number of products per page

    // Calculate total pages
    const categoriesTotalPages = Math.ceil(filterProductData?.length / categoriesProductsPerPage);

    // Calculate the index range for the current page
    const categoriesStartIndex = (categoriesPage - 1) * categoriesProductsPerPage;

    const categoriesEndIndex = categoriesStartIndex + categoriesProductsPerPage;

    // Filter products for the current page
    const categoriesProductsToDisplay = filterProductData?.slice(categoriesStartIndex, categoriesEndIndex);

    // Function to handle previous page

    const handlePrevCategoriesPage = () => {
        if (categoriesPage > 1) {
            setCategoriesPage(categoriesPage - 1);
        }
    }

    // Function to handle next page

    const handleNextCategoriesPage = () => {
        if (categoriesPage < categoriesTotalPages) {
            setCategoriesPage(categoriesPage + 1);
        }
    }

    // ========
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Define your mobile breakpoint
        };

        handleResize(); // Check the initial screen width
        window.addEventListener("resize", handleResize); // Listen for window resize events

        return () => {
            window.removeEventListener("resize", handleResize); // Remove the event listener when the component unmounts
        };
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: "ease-in-out", // Easing for the animation
            once: true, // Only trigger the animation once
        });
    }, []);




    return (
        <RootLayout>
            <div className="md:container" data-aos="fade-up">
                {/* <Image src={HomeSliderTwo} width={800} height={200} className='w-full md:h-[300px] object-cover' /> */}
                <Image
                    src={isMobile ? MobileBannerOne : HomeSliderTwo}
                    alt="Banner Image"
                    className="w-full h-full"
                    width={isMobile ? 768 : 1920}
                    height={isMobile ? 768 : 500}
                />
                <br />
                <h3 className='font-semibold md:text-3xl text-lg my-12'>Category</h3>
                <div  class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-14 gap-x-14 ">
                    {
                       
                        categoriesProductsToDisplay && categoriesProductsToDisplay?.map(product => (
                            <Link href={`/product/${product?._id}`}  data-aos="fade-up" key={product?._id}>
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
                        ))
                    }
                </div>
                {/* ====== pagination categories */}
                <div className={`items-center justify-center gap-4 mt-11 mb-16`} data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center justify-center text-gray-400 ">
                        <button
                            title="Previous"
                            className={`h-14 w-14 text-center ${categoriesPage === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-10"
                                } text-white bg-black-10 rounded-l-md border ${categoriesPage === 1 ? "bg-gray-400" : "bg-red-500"
                                } flex items-center justify-center`}
                            onClick={handlePrevCategoriesPage}
                            disabled={categoriesPage === 1}
                        >
                            <FaArrowLeft className="text-white" />
                        </button>
                        {Array.from({ length: categoriesTotalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={`h-14 w-14 hover:text-white bg-red-500 ${categoriesPage === index + 1 ? "text-white bg-red-600" : "bg-black-10"
                                    } text-center hover:bg-red-10 text-white border`}
                                onClick={() => setPage(index + 1)}
                                disabled={categoriesPage === index + 1}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            title="Next"
                            className={`h-14 w-14 text-center ${categoriesPage === categoriesTotalPages
                                ? "bg-gray-400 cursor-not-allowed"
                                : "hover:bg-red-10"
                                } text-white bg-black-10 rounded-r-md border ${categoriesPage === categoriesTotalPages ? "bg-gray-400" : "bg-red-500"
                                } flex items-center justify-center`}
                            onClick={handleNextCategoriesPage}
                            disabled={categoriesPage === categoriesTotalPages}
                        >
                            <FaArrowRight className="text-white" />
                        </button>
                    </div>
                </div>

                <h3 className='font-semibold md:text-3xl text-lg my-12'>Tranding Products</h3>
                <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-14 gap-x-14 ">
                    {
                        productsToDisplay && productsToDisplay?.map(product => (
                            <Link href={`/product/${product?._id}`}
                                key={product?._id}
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                               <div className="md:w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
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
                        ))
                    }
                </div>


                {/* Pagination */}
                <div className={`items-center justify-center gap-4 mt-11 mb-16`}
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
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
        </RootLayout>
    );
};

export default category_product;