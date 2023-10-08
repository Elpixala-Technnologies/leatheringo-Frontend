// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css'; // Import the AOS CSS

// const BottomNav = () => {
//     useEffect(() => {
//         AOS.init({
//             duration: 1000, // Animation duration (in milliseconds)
//             once: true, // Whether animation should only happen once
//         });
//     }, []);

//     // for mobile menu
//     const [mobileMenuVisible, setMobileMenuVisible] = useState(false);


//     // for mega menu

//     const [megaMenuVisible, setMegaMenuVisible] = useState({
//         shoes: false,
//         bags: false,
//         belts: false,
//     });

//     const handleMouseEnter = (menu) => {
//         setMegaMenuVisible((prevState) => ({
//             ...prevState,
//             [menu]: true,
//         }));
//     };

//     const handleMouseLeave = (menu) => {
//         setMegaMenuVisible((prevState) => ({
//             ...prevState,
//             [menu]: false,
//         }));
//     };

//     return (
//         <section className='relative'>
//             <div className="bottom-navs flex justify-center items-center my-2">
//                 <div className="bottom-nav-items ">
//                     <ul className='flex gap-4 '>
//                         <li>
//                             <div
//                                 onMouseEnter={() => handleMouseEnter('shoes')}
//                                 onMouseLeave={() => handleMouseLeave('shoes')}
//                             >
//                                 <span className="text relative cursor-pointer">Shoes</span>
//                                 {megaMenuVisible.shoes && (
//                                     <div
//                                         className={`mega-menu border bg-white z-10 absolute w-[80%] left-[10%] right-0 rounded p-4 transition-opacity opacity-100`}
//                                         data-aos="fade-up"
//                                     >
//                                         <ul>
//                                             {/* Menu items */}
//                                             <li>
//                                                 <Link href={`/category-product/Shoes`}>
//                                                     <span className="text font-bold">Shoes</span>
//                                                 </Link>
//                                             </li>
//                                             <hr className="border border-gray-300 my-2" />
//                                             <div className='flex gap-6 '>
//                                                 <div>
//                                                     <li>
//                                                         <Link href={`/category-product/Formal`}>
//                                                             <span className="text">Formal</span>
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link href={`/category-product/Sneakers`}>
//                                                             <span className="text">Sneakers</span>
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link href={`/category-product/Casual`}>
//                                                             <span className="text">Casual</span>
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link href={`/category-product/Whole Cut Shoes`}>
//                                                             <span className="text">Whole Cut Shoes</span>
//                                                         </Link>
//                                                     </li>
//                                                 </div>

//                                                 <div>
//                                                     <li>
//                                                         <Link href={`/category-product/Brogues`}>
//                                                             <span className="text">Brogues</span>
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link href={`/category-product/Derbies`}>
//                                                             <span className="text">Derbies</span>
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link href={`/category-product/Chelsea Boots`}>
//                                                             <span className="text">Chelsea Boots</span>
//                                                         </Link>
//                                                     </li>
//                                                 </div>

//                                                 <div>
//                                                     <li>
//                                                         <Link href={`/category-product/Monks`}>
//                                                             <span className="text font-bold">Monks</span>
//                                                         </Link>
//                                                     </li>
//                                                     <hr className="border border-gray-300 my-2" />
//                                                     <li>
//                                                         <Link href={`/category-product/Single Monk`}>
//                                                             <span className="text">
//                                                                 Single Monk
//                                                             </span>
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link href={`/category-product/Double Monk`}>
//                                                             <span className="text">
//                                                                 Double Monk
//                                                             </span>
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                         </li>
//                         <li>
//                             <div
//                                 onMouseEnter={() => handleMouseEnter('bags')}
//                                 onMouseLeave={() => handleMouseLeave('bags')}
//                                 className='cursor-pointer'
//                             >
//                                 <span className="text relative cursor-pointer">Bags</span>
//                                 {megaMenuVisible.bags && (
//                                     <div
//                                         className={`mega-menu border bg-white z-10 absolute w-[80%] left-[10%] right-0 rounded p-4 transition-opacity opacity-100`}
//                                         data-aos="fade-up"
//                                     >
//                                         <ul>
//                                             {/* Menu items */}
//                                             <li>
//                                                 <Link href={`/category-product/Bags`}>
//                                                     <span className="text font-bold cursor-pointer">Bags</span>
//                                                 </Link>
//                                             </li>
//                                             <hr className="border border-gray-300 my-2" />
//                                             <div className='flex gap-6'>
//                                                 <div>
//                                                     <li>
//                                                         <Link href={`/category-product/Duffle Bags`}>
//                                                             <span className="text">Duffle Bags</span>
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link href={`/category-product/Laptop Bags`}>
//                                                             <span className="text">Laptop Bags</span>
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div>
//                                                     <li>
//                                                         <Link href={`/category-product/Ladies Bags`}>
//                                                             <span className="text">Ladies Bags</span>
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link href={`/category-product/Slings`}>
//                                                             <span className="text">Slings</span>
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                         </li>
//                         <li>
//                             <div
//                                 onMouseEnter={() => handleMouseEnter('belts')}
//                                 onMouseLeave={() => handleMouseLeave('belts')}
//                                 className='cursor-pointer'
//                             >
//                                 <span className="text relative cursor-pointer">Belts</span>
//                                 {megaMenuVisible.belts && (
//                                     <div
//                                         className={`mega-menu border bg-white z-10 absolute w-[80%] left-[10%] right-0 rounded p-4 transition-opacity opacity-100`}
//                                         data-aos="fade-up"
//                                     >
//                                         <ul>
//                                             {/* Menu items */}
//                                             <li>
//                                                 <Link href={`/category-product/Belts`}>
//                                                     <span className="text font-bold">Belts</span>
//                                                 </Link>
//                                             </li>
//                                             <hr className="border border-gray-300 my-2" />
//                                             <div className='flex gap-6'>
//                                                 <div>
//                                                     <li>
//                                                         <Link href={`/category-product/Mens`}>
//                                                             <span className="text">Mens Belts</span>
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link href={`/category-product/Womens`}>
//                                                             <span className="text">Womens Belts</span>
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                         </li>
//                         <li>
//                             <Link href={`/category-product/Card Holders`}>
//                                 <span className="text">Card Holders</span>
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href={`/category-product/Wallets`}>
//                                 <span className="text">Wallets</span>
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default BottomNav;



import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS

const BottomNav = () => {
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

    return (
        <section className='relative'>
            <div className="bottom-navs flex justify-center items-center my-2">
                <div className={`bottom-nav-items ${mobileMenuVisible ? 'mobile-menu-open' : ''}`}>
                    <div className='mobile-menu-toggle' onClick={handleMobileMenuToggle}>
                        <div className={`hamburger ${mobileMenuVisible ? 'open' : ''}`}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <ul className='flex gap-4 '>
                        <li>
                            <div
                                onMouseEnter={() => handleMouseEnter('shoes')}
                                onMouseLeave={() => handleMouseLeave('shoes')}
                            >
                                <span className="text relative cursor-pointer">Shoes</span>
                                {megaMenuVisible.shoes && (
                                    <div
                                        className={`mega-menu border bg-white z-10 absolute w-[80%] left-[10%] right-0 rounded p-4 transition-opacity opacity-100`}
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
                                                <div>
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

                                                <div>
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

                                                <div>
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
                                        className={`mega-menu border bg-white z-10 absolute w-[80%] left-[10%] right-0 rounded p-4 transition-opacity opacity-100`}
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
                                                <div>
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
                                                <div>
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
                                        className={`mega-menu border bg-white z-10 absolute w-[80%] left-[10%] right-0 rounded p-4 transition-opacity opacity-100`}
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
                                                <div>
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

                    {/* Mobile menu */}

                    <div className={`mobile-menu ${mobileMenuVisible ? 'open' : ''}`}>
                                    
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BottomNav;
