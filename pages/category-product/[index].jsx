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

    const filterProductData = productData?.filter((data) => {
        return data?.categories === categoryName || data?.mainCategories === categoryName;
    });

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
                <h3 className='font-semibold md:text-3xl text-lg'>Category</h3>
                <div className="grid md:grid-cols-3  gap-4  mt-4">
                    {
                        categoriesProductsToDisplay && categoriesProductsToDisplay?.map(product => (
                            <Link href={`/product/${product?._id}`}>
                                <div
                                    data-aos="fade-up"
                                    className="cardBody md:m-0 w-full mx-auto  flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 ">
                                    <div className="productImage p-2">
                                        <Image
                                            src={product?.colors[0]?.images[0]}
                                            width={280}
                                            height={280}
                                            className="w-full h-full"
                                            alt="Product Image"
                                        />
                                    </div>
                                    <hr className="w-full bg-slate-400" />
                                    <div className="productInfo mt-2 p-2">
                                        <h2 className="productName font-bold ">
                                            {product?.name}
                                        </h2>
                                        <div className='flex items-center gap-4'>
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
                                        <p className="productDescription py-3">
                                            {product?.details?.slice(0, 100)}
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

                <h3 className='font-semibold md:text-3xl text-lg mt-12'>Tranding Products</h3>
                <div className="grid md:grid-cols-3  md:gap-4 gap-2 mt-8">
                    {
                        productsToDisplay && productsToDisplay?.map(product => (
                            <Link href={`/product/${product?._id}`}
                                key={product?._id}
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <div
                                    className="cardBody md:m-0 w-full mx-auto  flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 ">
                                    <div className="productImage p-2">
                                        <Image
                                            src={product?.colors[0]?.images[0]}
                                            width={280}
                                            height={280}
                                            className="w-full h-full"
                                            alt="Product Image"
                                        />
                                    </div>
                                    <hr className="w-full bg-slate-400" />
                                    <div className="productInfo mt-2 p-2">
                                        <h2 className="productName font-bold ">
                                            {product?.name}
                                        </h2>
                                        <div className='flex items-center gap-4'>
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
                                        <p className="productDescription py-3">
                                            {product?.details?.slice(0, 100)}
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