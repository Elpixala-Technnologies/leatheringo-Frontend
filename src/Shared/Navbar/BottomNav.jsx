import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS
import useProducts from '@/src/Hooks/useProducts';
import { FaAlignLeft, FaArrowDown, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';

const BottomNav = () => {
    const { productData } = useProducts();

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration (in milliseconds)
            once: true, // Whether animation should only happen once
        });
    }, []);

    // for mobile menu
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

    // for mega menu
    const [megaMenuVisible, setMegaMenuVisible] = useState({
        shoes: false,
        bags: false,
        belts: false,
    });

    const handleMouseEnter = (menu) => {
        setMegaMenuVisible((prevState) => ({
            ...prevState,
            [menu]: true,
        }));
    };

    const handleMouseLeave = (menu) => {
        setMegaMenuVisible((prevState) => ({
            ...prevState,
            [menu]: false,
        }));
    };

    const handleMobileMenuToggle = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuVisible(false);
    }

    const handleMobileMenuOpen = () => {
        setMobileMenuVisible(true);
    }

    const ShopFilterData = productData?.filter((item) => item?.mainCategories === "Shoes") || [];

    const ShopFilterDataBags = productData?.filter((item) => item?.mainCategories === 'Bags') || [];

    const ShopFilterDataBelts = productData?.filter((item) => item?.mainCategories === 'Belts') || [];


    // Function to toggle mega menu visibility
    const toggleMegaMenu = (menu) => {
        setMegaMenuVisible((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };


    return (
        <section className='relative'>
            <div className="bottom-navs  w-[100%] h-[100%] flex justify-center items-center my-2">
                <div className="hidden md:block">
                    <ul className='flex gap-4 '>
                        <li>
                            <div
                                onMouseEnter={() => handleMouseEnter('shoes')}
                                onMouseLeave={() => handleMouseLeave('shoes')}
                            >
                                <span className="text relative cursor-pointer">Shoes</span>
                                {megaMenuVisible.shoes && (
                                    <div
                                        className={`mega-menu border z-50 bg-white  absolute w-[100%]  left-0 right-0 rounded p-4 transition-opacity opacity-100`}
                                        data-aos="fade-up"
                                    >
                                        <ul>
                                            {/* Menu items */}
                                            <li>
                                                <Link href={`/category-product/Shoes`}>
                                                    <span className="text font-bold">Shoes</span>
                                                </Link>
                                            </li>
                                            <hr className="border border-gray-300 my-2" />
                                            <div className='flex gap-6 md:flex-row flex-col'>
                                                <div className='md:border-r-2 md:p-4'>
                                                    <li>
                                                        <Link href={`/category-product/Formal`}>
                                                            <span className="text">Formal</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`/category-product/Sneakers`}>
                                                            <span className="text">Sneakers</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`/category-product/Casual`}>
                                                            <span className="text">Casual</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`/category-product/Whole Cut Shoes`}>
                                                            <span className="text">Whole Cut Shoes</span>
                                                        </Link>
                                                    </li>
                                                </div>

                                                <div className='md:border-r-2 md:p-4'>
                                                    <li>
                                                        <Link href={`/category-product/Brogues`}>
                                                            <span className="text">Brogues</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`/category-product/Derbies`}>
                                                            <span className="text">Derbies</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`/category-product/Chelsea Boots`}>
                                                            <span className="text">Chelsea Boots</span>
                                                        </Link>
                                                    </li>
                                                </div>

                                                <div className='md:border-r-2 md:p-4'>
                                                    <li>
                                                        <Link href={`/category-product/Monks`}>
                                                            <span className="text font-bold">Monks</span>
                                                        </Link>
                                                    </li>
                                                    <hr className="border border-gray-300 my-2" />
                                                    <li>
                                                        <Link href={`/category-product/Single Monk`}>
                                                            <span className="text">
                                                                Single Monk
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`/category-product/Double Monk`}>
                                                            <span className="text">
                                                                Double Monk
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </div>

                                                <div className=' md:p-4'>
                                                    <li>
                                                        <div className='flex gap-4 flex-wrap '>
                                                            {
                                                                ShopFilterData?.slice(0, 3)?.map((product) => {
                                                                    return (
                                                                        <Link key={product?.id} href={`/product/${product?.id}`} data-aos="fade-up">
                                                                            <div
                                                                                className="cardBody md:m-0  mx-auto w-[200px]  flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
                                                                            >
                                                                                <div className="p-2 productImage">
                                                                                    <Image
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
                                                                                    <div className='flex items-center gap-4 text-[0.8rem]'>
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
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </li>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li>
                            <div
                                onMouseEnter={() => handleMouseEnter('bags')}
                                onMouseLeave={() => handleMouseLeave('bags')}
                                className='cursor-pointer'
                            >
                                <span className="text relative cursor-pointer">Bags</span>
                                {megaMenuVisible.bags && (
                                    <div
                                        className={`mega-menu border bg-white z-50 absolute w-[100%] left-0 right-0 rounded p-4 transition-opacity opacity-100`}
                                        data-aos="fade-up"
                                    >
                                        <ul>
                                            {/* Menu items */}
                                            <li>
                                                <Link href={`/category-product/Bags`}>
                                                    <span className="text font-bold cursor-pointer">Bags</span>
                                                </Link>
                                            </li>
                                            <hr className="border border-gray-300 my-2" />
                                            <div className='flex gap-6 md:flex-row flex-col'>
                                                <div className='border-r-2 p-4'>
                                                    <li>
                                                        <Link href={`/category-product/Duffle Bags`}>
                                                            <span className="text">Duffle Bags</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`/category-product/Laptop Bags`}>
                                                            <span className="text">Laptop Bags</span>
                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className='p-4 border-r-2'>
                                                    <li>
                                                        <Link href={`/category-product/Ladies Bags`}>
                                                            <span className="text">Ladies Bags</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`/category-product/Slings`}>
                                                            <span className="text">Slings</span>
                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className=' md:p-4'>
                                                    <li>
                                                        <div className='flex gap-4 flex-wrap '>
                                                            {
                                                                ShopFilterDataBags && ShopFilterDataBags?.slice(0, 3)?.map((product) => {
                                                                    return (
                                                                        <Link key={product?.id} href={`/product/${product?._id}`} data-aos="fade-up">
                                                                            <div
                                                                                className="cardBody md:m-0  mx-auto w-[200px]  flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
                                                                            >
                                                                                <div className="p-2 productImage">
                                                                                    <Image
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
                                                                                    <div className='flex items-center gap-4 text-[0.8rem]'>
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
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </li>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li>
                            <div
                                onMouseEnter={() => handleMouseEnter('belts')}
                                onMouseLeave={() => handleMouseLeave('belts')}
                                className='cursor-pointer'
                            >
                                <span className="text relative cursor-pointer">Belts</span>
                                {megaMenuVisible.belts && (
                                    <div
                                        className={`mega-menu border bg-white z-50 absolute w-[100%] left-0 right-0 rounded p-4 transition-opacity opacity-100`}
                                        data-aos="fade-up"
                                    >
                                        <ul>
                                            {/* Menu items */}
                                            <li>
                                                <Link href={`/category-product/Belts`}>
                                                    <span className="text font-bold">Belts</span>
                                                </Link>
                                            </li>
                                            <hr className="border border-gray-300 my-2" />
                                            <div className='flex gap-6'>
                                                <div className='md:p-4 border-r-2'>
                                                    <li>
                                                        <Link href={`/category-product/Mens`}>
                                                            <span className="text">Mens Belts</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href={`/category-product/Womens`}>
                                                            <span className="text">Womens Belts</span>
                                                        </Link>
                                                    </li>
                                                </div>

                                                <div className=' md:p-4'>
                                                    <li>
                                                        <div className='flex gap-4 flex-wrap '>
                                                            {
                                                                ShopFilterDataBelts && ShopFilterDataBelts?.slice(0, 3)?.map((product) => {
                                                                    return (
                                                                        <Link key={product?.id} href={`/product/${product?._id}`} data-aos="fade-up">
                                                                            <div
                                                                                className="cardBody md:m-0  mx-auto w-[200px]  flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
                                                                            >
                                                                                <div className="p-2 productImage">
                                                                                    <Image
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
                                                                                    <div className='flex items-center gap-4 text-[0.8rem]'>
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
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </li>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li>
                            <Link href={`/category-product/Card Holders`}>
                                <span className="text">Card Holders</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/category-product/Wallets`}>
                                <span className="text">Wallets</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="md:hidden block z-50">
                    <div
                        onClick={handleMobileMenuToggle}
                        className='flex px-4 items-center gap-2 bg-white p-2 rounded-md shadow-md cursor-pointer w-[100vw]'
                    >
                        <FaAlignLeft
                            className='text-[1.5rem]'
                        /> <span className='text-[1.5rem]'>Categories</span>
                    </div>
                    {
                        mobileMenuVisible && (
                            <ul className='flex gap-4 flex-col bg-white my-2 w-[100vw] p-4 z-50'
                                data-aos="fade-up"
                            >
                                <li>
                                    <div
                                        onClick={() => toggleMegaMenu('shoes')}
                                        className='cursor-pointer flex justify-between items-center gap-4'
                                    >
                                        <span className="text relative cursor-pointer">Shoes</span>
                                        {megaMenuVisible.shoes ? (
                                            <FaChevronDown />
                                        ) : (
                                            <FaChevronUp />
                                        )}
                                    </div>

                                    {megaMenuVisible.shoes && (
                                        <div
                                            className={`mega-menu border z-50 bg-white  absolute w-[100%]  left-0 right-0 rounded p-4 transition-opacity opacity-100`}
                                            data-aos="fade-up"
                                        >
                                            <ul>
                                                {/* Menu items */}
                                                <li>
                                                    <Link href={`/category-product/Shoes`}>
                                                        <span className="text font-bold">Shoes</span>
                                                    </Link>
                                                </li>
                                                <hr className="border border-gray-300 my-2" />
                                                <div className='flex gap-6 md:flex-row flex-col  z-50'>
                                                    <div className='md:border-r-2 md:p-4'>
                                                        <li>
                                                            <Link href={`/category-product/Formal`}>
                                                                <span className="text">Formal</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/category-product/Sneakers`}>
                                                                <span className="text">Sneakers</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/category-product/Casual`}>
                                                                <span className="text">Casual</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/category-product/Whole Cut Shoes`}>
                                                                <span className="text">Whole Cut Shoes</span>
                                                            </Link>
                                                        </li>
                                                    </div>

                                                    <div className='md:border-r-2 md:p-4'>
                                                        <li>
                                                            <Link href={`/category-product/Brogues`}>
                                                                <span className="text">Brogues</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/category-product/Derbies`}>
                                                                <span className="text">Derbies</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/category-product/Chelsea Boots`}>
                                                                <span className="text">Chelsea Boots</span>
                                                            </Link>
                                                        </li>
                                                    </div>

                                                    <div className='md:border-r-2 md:p-4'>
                                                        <li>
                                                            <Link href={`/category-product/Monks`}>
                                                                <span className="text font-bold">Monks</span>
                                                            </Link>
                                                        </li>
                                                        <hr className="border border-gray-300 my-2" />
                                                        <li>
                                                            <Link href={`/category-product/Single Monk`}>
                                                                <span className="text">
                                                                    Single Monk
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/category-product/Double Monk`}>
                                                                <span className="text">
                                                                    Double Monk
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    </div>

                                                    <div className=' md:p-4'>
                                                        <li>
                                                            <div className='flex gap-4 flex-wrap '>
                                                                {
                                                                    ShopFilterData?.slice(0, 3)?.map((product) => {
                                                                        return (
                                                                            <Link key={product?.id} href={`/product/${product?.id}`} data-aos="fade-up">
                                                                                <div
                                                                                    className="cardBody md:m-0  mx-auto   flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
                                                                                >
                                                                                    <div className="p-2 productImage">
                                                                                        <Image
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
                                                                                        <div className='flex items-center gap-4 text-[0.8rem]'>
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
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        )
                                                                    })
                                                                }

                                                            </div>
                                                        </li>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <div
                                        onClick={() => toggleMegaMenu('bags')}
                                        className='cursor-pointer flex justify-between items-center gap-4'
                                    >
                                        <span className="text relative cursor-pointer">Bags</span>
                                        {megaMenuVisible.bags ? (
                                            <FaChevronDown />
                                        ) : (
                                            <FaChevronUp />
                                        )}
                                    </div>
                                    {megaMenuVisible.bags && (
                                        <div
                                            className={`mega-menu border bg-white z-50 absolute w-[100%] left-0 right-0 rounded p-4 transition-opacity opacity-100`}
                                            data-aos="fade-up"
                                        >
                                            <ul>
                                                {/* Menu items */}
                                                <li>
                                                    <Link href={`/category-product/Bags`}>
                                                        <span className="text font-bold cursor-pointer">Bags</span>
                                                    </Link>
                                                </li>
                                                <hr className="border border-gray-300 my-2" />
                                                <div className='flex gap-6 md:flex-row flex-col  z-50'>
                                                    <div className='border-r-2 p-4'>
                                                        <li>
                                                            <Link href={`/category-product/Duffle Bags`}>
                                                                <span className="text">Duffle Bags</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/category-product/Laptop Bags`}>
                                                                <span className="text">Laptop Bags</span>
                                                            </Link>
                                                        </li>
                                                    </div>
                                                    <div className='p-4 border-r-2'>
                                                        <li>
                                                            <Link href={`/category-product/Ladies Bags`}>
                                                                <span className="text">Ladies Bags</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/category-product/Slings`}>
                                                                <span className="text">Slings</span>
                                                            </Link>
                                                        </li>
                                                    </div>
                                                    <div className=' md:p-4'>
                                                        <li>
                                                            <div className='flex gap-4 flex-wrap '>
                                                                {
                                                                    ShopFilterDataBags && ShopFilterDataBags?.slice(0, 3)?.map((product) => {
                                                                        return (
                                                                            <Link key={product?.id} href={`/product/${product?._id}`} data-aos="fade-up">
                                                                                <div
                                                                                    className="cardBody md:m-0  mx-auto   flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
                                                                                >
                                                                                    <div className="p-2 productImage">
                                                                                        <Image
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
                                                                                        <div className='flex items-center gap-4 text-[0.8rem]'>
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
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        )
                                                                    })
                                                                }

                                                            </div>
                                                        </li>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <div
                                        onClick={() => toggleMegaMenu('belts')}
                                        className='cursor-pointer flex justify-between items-center gap-4'
                                    >
                                        <span className="text relative cursor-pointer">Belts</span>
                                        {megaMenuVisible.belts ? (
                                            <FaChevronDown />
                                        ) : (
                                            <FaChevronUp />
                                        )}
                                    </div>
                                    {megaMenuVisible.belts && (
                                        <div
                                            className={`mega-menu border bg-white z-50 absolute w-[100%] left-0 right-0 rounded p-4 transition-opacity opacity-100`}
                                            data-aos="fade-up"
                                        >
                                            <ul>
                                                {/* Menu items */}
                                                <li>
                                                    <Link href={`/category-product/Belts`}>
                                                        <span className="text font-bold">Belts</span>
                                                    </Link>
                                                </li>
                                                <hr className="border border-gray-300 my-2" />
                                                <div className='flex gap-6 flex-col  z-50'>
                                                    <div className='md:p-4 border-r-2'>
                                                        <li>
                                                            <Link href={`/category-product/Mens`}>
                                                                <span className="text">Mens Belts</span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href={`/category-product/Womens`}>
                                                                <span className="text">Womens Belts</span>
                                                            </Link>
                                                        </li>
                                                    </div>

                                                    <div className=' md:p-4'>
                                                        <li>
                                                            <div className='flex gap-4 flex-wrap '>
                                                                {
                                                                    ShopFilterDataBelts && ShopFilterDataBelts?.slice(0, 3)?.map((product) => {
                                                                        return (
                                                                            <Link key={product?.id} href={`/product/${product?._id}`} data-aos="fade-up">
                                                                                <div
                                                                                    className="cardBody md:m-0  mx-auto  flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "
                                                                                >
                                                                                    <div className="p-2 productImage">
                                                                                        <Image
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
                                                                                        <div className='flex items-center gap-4 text-[0.8rem]'>
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
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        )
                                                                    })
                                                                }

                                                            </div>
                                                        </li>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <Link href={`/category-product/Card Holders`}>
                                        <span className="text">Card Holders</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/category-product/Wallets`}>
                                        <span className="text">Wallets</span>
                                    </Link>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default BottomNav;
