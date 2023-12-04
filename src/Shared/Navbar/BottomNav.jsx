
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Fragment, useEffect, useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import useProducts from '@/src/Hooks/useProducts';

const navigation = {
    categories: [
        {
            id: 'Shoes',
            name: 'Shoes',
            featured: [
                {
                    name: 'Formal wholecut Shoes',
                    href: '/product/655660fa699dfa36877d6c37',
                    imageSrc: 'https://res.cloudinary.com/elpixala/image/upload/v1700116313/cvywhqscos2srl54sxpy.jpg',
                    imageSrcHover: "https://res.cloudinary.com/elpixala/image/upload/v1700116313/n1fftpexkqdduledm4aw.jpg",
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                    price: 2609,
                },
                {
                    name: 'Olive swede chelsea Shoes',
                    href: '/product/655660fa699dfa36877d6c3a',
                    imageSrc: 'https://res.cloudinary.com/elpixala/image/upload/v1700119214/gyioogroac77mpw1weam.jpg',
                    imageSrcHover: "https://res.cloudinary.com/elpixala/image/upload/v1700119214/gyioogroac77mpw1weam.jpg",
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                    price: 3537,
                },
                {
                    name: 'Aldo Chealsea boot Shoes',
                    href: '/product/655660fa699dfa36877d6c39',
                    imageSrc: 'https://res.cloudinary.com/elpixala/image/upload/v1700117947/c74feggbi0tphlsdpopt.jpg',
                    imageSrcHover: "https://res.cloudinary.com/elpixala/image/upload/v1700117947/c74feggbi0tphlsdpopt.jpg",
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                    price: 4714
                },
            ],
            sections: [
                {
                    id: 'Trending',
                    name: 'Trending',
                    items: [

                        { name: 'Formal', href: '/category-product/Formal' },
                        { name: 'Sneakers', href: '/category-product/Sneakers' },
                        { name: 'Casual', href: '/category-product/Casual' },
                        { name: 'Brogues', href: '/category-product/Brogues' },

                    ],
                },
                {
                    id: 'New Arrival',
                    name: 'New Arrival',
                    items: [
                        { name: 'Chelsea Boots', href: '/category-product/Chelsea Boots' },
                        { name: 'Whole Cut Shoes', href: '/category-product/Whole Cut Shoes' },
                        { name: 'Derbies', href: '/category-product/Derbies' },
                    ],
                },
                {
                    id: 'Popular Products',
                    name: 'Popular',
                    items: [

                        { name: 'Single Monk', href: '/category-product/Single Monk' },
                        { name: 'Double Monk', href: '/category-product/Double Monk' },
                    ],
                },
            ],
        },

    ],
    pages: [
        { name: 'Bags', href: '/category-product/Bags' },
        { name: 'Belts', href: '/category-product/Belts' },
        { name: 'Card Holders', href: '/category-product/Card Holders' },
        { name: 'Wallets', href: '/category-product/Wallets' }
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Navbar = () => {
    const { categoryData } = useProducts()
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const handleCategoryMouseEnter = (categoryName) => {
        setHoveredCategory(categoryName);
    };

    const handleCategoryMouseLeave = () => {
        setHoveredCategory(null);
    };

    const [open, setOpen] = useState(false)
    // const [fix,setFix] = useState(false)

    // const setFixedPosition = ()=>{
    //     if(window.scrollY >=392){
    //         setFix(true)
    //     } else {
    //         setFix(false)
    //     }
    // }

    // window.addEventListener('scroll', setFixedPosition)

    const [fix, setFix] = useState(false);

    const setFixedPosition = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY >= 100) {
                setFix(true);
            } else {
                setFix(false);
            }
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', setFixedPosition);

            // Cleanup the event listener on component unmount
            return () => {
                window.removeEventListener('scroll', setFixedPosition);
            };
        }
    }, []); // empty dependency array ensures the effect runs only once on mount


    return (

        <div
            // className='bg-white sticky top-0 z-50 mx-auto h-full'
            className={
                classNames(
                    'bg-[#E3E6F3] sticky top-0 z-50 mx-auto h-full',
                    fix && 'bg-white sticky'
                )
            }
        >
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 ">
                                                <div className="grid grid-cols-3 gap-x-4"
                                                >
                                                    {category.featured.map((item) => (
                                                        <Link
                                                            href={item?.href}
                                                            className='cursor-pointer'
                                                        >

                                                            <div className="group relative text-base border rounded p-4">
                                                                <div className="h-menu border rounded-[1rem] overflow-hidden relative">
                                                                    <img
                                                                        src={item.imageSrc}
                                                                        alt={item.imageAlt}
                                                                        className="h-full w-full object-cover duration-200"
                                                                    />
                                                                    <img
                                                                        src={item.imageSrcHover}
                                                                        alt={item.imageAlt}
                                                                        className="hover-img absolute top-0 left-0 w-full h-full object-cover duration-300"
                                                                    />
                                                                </div>
                                                                <Link href={item.href} className="my-2 block font-semibold text-gray-900">
                                                                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                    {item.name}
                                                                </Link>
                                                                <p className="block font-medium text-gray-900">
                                                                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                    Rs. {item.price}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className="mt-6 flex flex-col space-y-6"
                                                        >
                                                            {section.items.map((item) => (
                                                                <li key={item.name} className="flow-root">
                                                                    <Link href={item.href} className="-m-2 block p-2 text-gray-500">
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 px-4 py-6">
                                    <a href="#" className="-m-2 flex items-center p-2">
                                        <img
                                            src="https://res.cloudinary.com/elpixala/image/upload/v1698970076/koburg/Icons/uamqwt9m45v7lkkqsusj.png"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-base font-medium text-gray-900">IND</span>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative "
                style={{
                    zIndex: "9999999"
                }}
            >
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b">
                        <div className="flex h-16 items-center justify-between mainNav">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            <Popover.Group className="hidden lg:block ">
                                <div className="flex h-full space-x-8"
                                    style={{
                                        zIndex: "9999999"
                                    }}
                                >
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex"
                                                        style={{
                                                            zIndex: "9999999"
                                                        }}
                                                        onMouseEnter={() => handleCategoryMouseEnter(category.name)}
                                                        onMouseLeave={handleCategoryMouseLeave}
                                                    >
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-indigo-600 text-indigo-600'
                                                                    : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out font-bold text-[1rem]'
                                                            )}

                                                        >

                                                            <p class="font-bold relative w-max one">
                                                                <span>
                                                                    {category.name}
                                                                </span>
                                                                <span class="absolute -bottom-1 left-0 w-0 transition-all h-[2px] bg-black"></span>
                                                            </p>
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-6">
                                                                        <div className="col-start-2 grid grid-cols-3 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <Link
                                                                                    href={item?.href}
                                                                                    className='cursor-pointer'
                                                                                >
                                                                                    <div className="group relative text-base border rounded p-4">
                                                                                        <div className="h-menu border rounded-[1rem] overflow-hidden relative">
                                                                                            <img
                                                                                                src={item.imageSrc}
                                                                                                alt={item.imageAlt}
                                                                                                className="h-full w-full object-cover duration-200"
                                                                                            />
                                                                                            <img
                                                                                                src={item.imageSrcHover}
                                                                                                alt={item.imageAlt}
                                                                                                className="hover-img absolute top-0 left-0 w-full h-full object-cover duration-300"
                                                                                            />
                                                                                        </div>
                                                                                        <Link href={item.href} className="my-2 block font-semibold text-gray-900">
                                                                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                            {item.name}
                                                                                        </Link>
                                                                                        <p className="block font-medium text-gray-900">
                                                                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                            Rs. {item.price}
                                                                                        </p>
                                                                                    </div>
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-bold text-[1.4rem] text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <Link href={item.href} className="hover:text-gray-800">
                                                                                                    {/* {item.name} */}
                                                                                                    <p class="font-bold  relative w-max one">
                                                                                                        <span>
                                                                                                            {item.name}
                                                                                                        </span>
                                                                                                        <span class="absolute -bottom-1 left-0 w-0 transition-all h-[2px] bg-black"></span>
                                                                                                    </p>
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            <p class="font-bold   relative w-max one">
                                                <span>
                                                    {page.name}
                                                </span>
                                                <span class="absolute -bottom-1 left-0 w-0 transition-all h-[2px] bg-black"></span>
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link href="https://m.facebook.com/marketing.virajent/" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        <FaFacebook className="text-[1.4rem]" />
                                    </Link>
                                    <Link href="https://www.instagram.com/thekoburg/" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                        <FaInstagram className="text-[1.4rem]" />
                                    </Link>
                                </div>

                                <div className="hidden lg:ml-8 lg:flex">
                                    <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                        <img
                                            src="https://res.cloudinary.com/elpixala/image/upload/v1698970076/koburg/Icons/uamqwt9m45v7lkkqsusj.png"
                                            alt=""
                                            className="block h-auto w-5 flex-shrink-0"
                                        />
                                        <span className="ml-3 block text-sm font-medium">IND</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
