import { useState, useEffect } from 'react';
import { FaCartPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import useProducts from '@/src/Hooks/useProducts';
import AOS from 'aos';
import 'aos/dist/aos.css';


const FeaturedProducts = () => {
    const { productData } = useProducts();
    const filterProductData = productData?.filter((data) => {
        return data?.status === "Featured";
    });

    // Pagination state
    const [page, setPage] = useState(1);
    const productsPerPage = 6; // Number of products per page

    // Calculate total pages
    const totalPages = Math.ceil(filterProductData?.length / productsPerPage);

    // Calculate the index range for the current page
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Filter products for the current page
    const productsToDisplay = filterProductData?.slice(startIndex, endIndex);

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

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Only trigger the animation once
        });
    }, []);

    console.log('filterProductData', productsToDisplay);


    return (
        <section data-aos="fade-up">
            <div className='flex flex-col items-center justify-center my-6 title'>
                <h2 className=" text-[1rem] md:text-[1.8rem] text-center md:text-left  xxs:text-2xl  text-black font-bold">
                    Featured Products
                </h2>
                <p className='my-2 text-muted text-center'>
                    Summer Collection New Modern Design
                </p>
            </div>
            <div className="grid items-center justify-center grid-cols-1 gap-4 mx-auto md:grid-cols-3 lg:grid-cols-3">
                {productsToDisplay && productsToDisplay?.map((product, index) => {
                    return (
                        <div
                            key={index}
                            data-aos="fade-up"
                            className="cardBody md:m-0 w-full mx-auto  flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
                        >
                            <div className="p-2 productImage">
                                <Image
                                    key={index}
                                    src={product?.colors[0]?.images[0]}
                                    width={280}
                                    height={280}
                                    className="w-full h-full"
                                    alt="Product Image"
                                />
                            </div>
                            <hr className="w-full bg-slate-400" />
                            <div className="p-2 mt-2 productInfo">
                                <h2 className="font-bold productName ">
                                    {product?.name}
                                </h2>
                                <div className='flex items-center gap-4'>
                                    <h1 className="font-bold text-slate-900">
                                        {product?.discount
                                            ? `₹ ${Math.floor(product?.price - (product?.price * product?.discount) / 100)}`
                                            : `₹ ${Math.floor(product?.price)}`
                                        }
                                    </h1>
                                    <span className="mt-1 text-sm line-through text-slate-900">
                                        ₹ {Math.floor(product?.price)}
                                    </span>
                                    <span className='text-[#eec75b]'>
                                        {Math.floor(product?.discount)} % off
                                    </span>
                                </div>
                                <p className="py-3 productDescription">
                                    {product?.details?.slice(0, 100)}
                                </p>
                                <div className="flex items-center gap-5 productAddToCart">
                                    <div>
                                        <Link className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" href={`/product/${product?._id}`}>
                                            <FaCartPlus />
                                            Product Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className={`items-center justify-center gap-4 mt-11 mb-16`}>
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
        </section>
    );
};

export default FeaturedProducts;
