import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';
import Link from 'next/link';
import useProducts from '@/src/Hooks/useProducts';
const BottomNav = () => {
    const [on, setOn] = useState(true)
    const { allCategoryData, categoryData } = useProducts()
    return (
        <div className='bg-[#000000] text-[#fff] py-4 md:px-4 border-b md:h-[50px] flex items-center z-80'>
            <div className="container py-0 h-full mx-auto flex justify-between items-center">
                <ul className='md:flex h-full items-center gap-5'>


                    <div className={`${on ? 'md:flex  hidden' : ''} items-center gap-3`}>
                        {
                            categoryData && categoryData?.slice(0, 5)?.map((item, index) => {
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
