import RootLayout from '@/src/Layouts/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import ProductSlider from '@/src/Components/Product/ProductSlider/ProductSlider';
import useProducts from '@/src/Hooks/useProducts';
import { FaArrowLeft, FaArrowRight, FaCartPlus } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductPage = () => {
    const [show, setShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { productData, categoryData } = useProducts();
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [isCloups, setIsCloups] = useState(true);

    const filteredproducts = selectedCategory
        ? productData.filter((product) => product.category === selectedCategory)
        : productData;

    const clearFilter = () => {
        setSelectedCategory(null);
    };



    // Pagination state
    const [page, setPage] = useState(1);
    const productsPerPage = 9; // Number of products per page

    // Calculate total pages
    const totalPages = Math.ceil(productData?.length / productsPerPage);

    // Calculate the index range for the current page
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Filter products for the current page
    const productsToDisplay = productData?.slice(startIndex, endIndex);

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

    return (
        <RootLayout>
            <ProductSlider /> <br />
            <div className="flex flex-col gap-2 md:flex-row md:container">
                {/* <div className="md:block hidden p-3 bg-slate-200 rounded h-[75%]">
                    <div>
                        <h2 className="text-lg font-bold"
                        >Sort Out :</h2>
                        {
                            isCloups && <div className="flex flex-col gap-2">
                                {categoryData && categoryData?.map((categoryresult) => (
                                    <div
                                        className="flex items-center mt-3 space-x-2 transition duration-500 ease-in-out transform cursor-pointer hover:animate-pulse hover:-translate-y-1 hover:scale-100"
                                        key={categoryresult?._id}
                                    >
                                        <input
                                            type="checkbox"
                                            id={categoryresult?.category}
                                            className="w-5 h-5 text-blue-600 form-checkbox"
                                            value={categoryresult?.category}
                                            onChange={() => setSelectedCategory(categoryresult?.category)}
                                        />
                                        <label
                                            htmlFor={categoryresult?.category}
                                            className="text-gray-700 cursor-pointer"
                                        >
                                            {categoryresult?.category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        }
                        <button
                            onClick={() => selectedCategory && clearFilter()}
                            className="p-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                            Clear Filter
                        </button>

                    </div>
                </div> */}

                <div className="col-span-4 p-4 bg-[#e8eaeb00]">
                    <div className="relative flex items-center justify-end w-full md:hidden">
                        {/* <button
                            onClick={() => setShow(!show)}
                            className="bg-[#4c667200] p-1 rounded-sm flex items-center gap-2"
                        >
                            <h2 className="font-semibold text-md">Sort Out </h2>
                            <BsFilter className="text-3xl" />
                        </button> */}
                        {/* <div
                            className={`${show ? 'block' : 'hidden'} bg-[#ffffff] w-[300px] p-3 border rounded shadow-xl absolute right-0 top-9 z-10`}
                        >
                            {categoryData?.map((category) => (
                                <div
                                    className="flex items-center mt-3 space-x-2"
                                    key={category?.id}
                                >
                                    <input
                                        type="checkbox"
                                        id={category?.category}
                                        className="w-5 h-5 text-blue-600 form-checkbox"
                                        value={category?.category}
                                        onChange={() => setSelectedCategory(category?.category)}
                                    />
                                    <label
                                        htmlFor={category?.category}
                                        className="text-gray-700 cursor-pointer"
                                    >
                                        {category?.category}
                                    </label>
                                </div>
                            ))}
                            <button
                                onClick={() => selectedCategory && clearFilter()}
                                className="p-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600"
                            >
                                Clear Filter
                            </button>

                        </div> */}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" data-aos="fade-up">
                        {productsToDisplay && productsToDisplay.map((product) => {
                            return (
                                <Link key={product?.id} href={`/product/${product?.id}`} data-aos="fade-up">
                                    <div
                                        className="cardBody md:m-0 w-full mx-auto  flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
                                    >
                                        <div className="p-2 productImage">
                                            <Image
                                                src={product?.images[0]}
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
