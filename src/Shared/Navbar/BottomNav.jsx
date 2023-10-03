import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';
import Link from 'next/link';
import useProducts from '@/src/Hooks/useProducts';
const BottomNav = () => {
    const [on, setOn] = useState(true)
    const { allCategoryData,categoryData } = useProducts()
    return (
        <div className='bg-[#000000] text-[#fff] py-4 md:px-4 border-b md:h-[50px] flex items-center z-80'>
            <div className="container py-0 h-full mx-auto flex justify-between items-center">
                <ul className='md:flex h-full items-center gap-5'>
                    <div className="flex md:w-auto w-[100%] justify-between items-center gap-2 ">
                        <li className='text-sm flex items-center gap-2 dropdown relative'>
                            <h1 className='flex justify-center gap-4 items-center font-bold text-[1.2rem]'>  <BsFillGridFill /> ALL CATEGORY <FaAngleDown /></h1>

                            <div className="dropdown-menu hidden overflow-y-auto h-[400px] bg-[white] p-3 text-black absolute w-[300px] top-[20px] md:left-0 left-[-30px] shadow-lg rounded-sm duration-200 shadow-[#00000042] z-100">
                                <ul>
                                    {
                                        allCategoryData && allCategoryData.map((item, index) => {
                                            return (
                                                <Link href={`/category-product/${item?.name}`} key={index + "category"}>
                                                    <li className='p-2 rounded duration-200 hover:bg-[#80808024] text-[#000]' >
                                                        {item?.name}
                                                    </li>
                                                </Link>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                        </li>
                    </div>

                    <div className={`${on ? 'md:flex  hidden' : ''} items-center gap-3`}>
                         {
                            categoryData && categoryData?.slice(0,5)?.map((item, index) => {
                                return (
                                    <li className='hover:bg-[#19343972] text-sm h-full flex items-center p-2 duration-200' key={index + "category"}>
                                        <Link href={`/category-product/${item?.name}`}>{item?.name}</Link>
                                    </li>
                                )
                            })
                         }           
                    </div>
                </ul>
            </div>

        </div>
    );
};

export default BottomNav;