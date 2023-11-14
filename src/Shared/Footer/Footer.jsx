import { Facebook, LinkedIn, WhatsApp, Instagram } from "@material-ui/icons";
import Link from "next/link";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import Image from "next/image";
import { AppIcon, MainLogo, PayIcon, PlayStoreIcon } from "@/src/Assets";
import useProducts from "@/src/Hooks/useProducts";

const Footer = () => {
  const { allCategoryData } = useProducts();

  return (
    // <footer className="bg-[#000] container">
    //     <div className=' text-[#fff] px-4 py-16 grid sm:grid-cols-1 grid-cols-2 md:grid-cols-5 gap-4  justify-items-center'>
    //         <div className="">
    //             <Link href="/">
    //                 <Image src={MainLogo}
    //                     width={150}
    //                     height={150}
    //                     alt="" className='w-[150px] cursor-pointer' />
    //             </Link>

    //             <p className='my-4'>
    //                 {/* write about leatheringo      */}
    //                 One Stop Platform for all Premium leather Products
    //             </p>
    //             <div>
    //                 <Link href={"/"}>
    //                     <Image
    //                         src={PayIcon}
    //                         width={150}
    //                         height={150}
    //                         className='cursor-pointer  w-full h-full rounded object-cover'
    //                     />
    //                 </Link>
    //             </div>
    //         </div>
    //         <div className="md:mt-[0] mt-6">
    //             <ul>
    //                 <li className='font-semibold text-lg text-[#fff]'>
    //                     <Link href="">Categories</Link>
    //                 </li>
    //                 {
    //                     allCategoryData && allCategoryData.slice(0, 5).map((item, index) => {
    //                         return (
    //                             <Link href={`/category-product/${item?._id}`} key={index + "category"}>
    //                                 <li className='p-2 rounded duration-200 hover:bg-[#80808024] text-[#fff]' >
    //                                     {item?.name}
    //                                 </li>
    //                             </Link>
    //                         )
    //                     })
    //                 }
    //             </ul>
    //         </div>
    //         <div className="">
    //             <ul>
    //                 <li className='font-semibold text-lg text-[#fff]'>
    //                     <span>Contact Us</span>
    //                 </li>
    // <li className='mt-3 font-[300]'>
    //     <span className="font-[400]">Address</span>
    //     <br />
    //     <small>C-185 Kedar nagar Shahganj near  Rajkamal school
    //         Agra, Uttar Pradesh-282010</small>
    // </li>
    // <li className='mt-6 font-[300]'>
    //     <span className="font-[400] ">Office / Mobile</span>
    //     <br />
    //     <small >9311667479</small>
    // </li>
    // <li className='mt-6 font-[300]'>
    //     <span className="font-[400] ">Email</span>
    //     <br />
    //     <small>payments@leatheringo.com</small>
    // </li>
    //             </ul>
    //         </div>

    //         <div className="md:mt-[0] mt-6">
    //             <ul>
    //                 <li className='font-semibold text-lg text-[#ffff]'>
    //                     <Link href="">Follow Us</Link>
    //                 </li>
    //                 <li className='mt-3 font-[300]'>
    //                     <Link href="https://www.facebook.com/profile.php?id=61551923318076" className='flex items-center gap-2 '>
    //                         <Facebook className='text-2xl ' /> Facebook
    //                     </Link>
    //                 </li>
    //                 <li className='mt-6 font-[300]'>
    //                     <Link href="https://instagram.com/leatheringo11?igshid=MzRlODBiNWFlZA==" className='flex items-center gap-2 '>
    //                         <Instagram className='text-2xl ' /> Instagram
    //                     </Link>
    //                 </li>
    //                 <li className='mt-6 font-[300]'>
    //                     <Link href="" className='flex items-center gap-2 '>
    //                         <WhatsApp className='text-2xl ' /> WhatsApp
    //                     </Link>
    //                 </li>

    //             </ul>
    //         </div>
    //         <div className="md:mt-[0] mt-6 w-full">
    // <ul>
    //     <li className='font-semibold text-lg text-[#fff]'>
    //         <Link href="">Join Us</Link>
    //     </li> <br />
    //     <li className='mt-3 font-[300]'>
    //         <h2 className='text-2lg font-[500] text-[#fff]'>Subscribe to our newsletters</h2>
    //         <form className='flex items-center border border-[#4c5a5f] bg-[#73c3f58b]  rounded-md mt-3 w-full'>
    //             <input type="text" className='w-full text-[#fff] py-1 px-2 bg-[transparent]' placeholder='email...' /><button className='bg-[#088178] px-2 py-2'>Subscribe</button>
    //         </form>
    //     </li>
    // </ul>
    //         </div>
    //     </div>
    // </footer>
    <footer className="p-6 bg-[#000] py-12 text-[#fff]">
      <div className="container grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
        <div className="flex flex-col space-y-4">
          <div className="">
            <Link href="/">
              <Image
                src={MainLogo}
                width={150}
                height={150}
                alt=""
                className="w-[150px] cursor-pointer"
              />
            </Link>

            <p className="my-4">
              {/* write about leatheringo      */}
              One Stop Platform for all Premium leather Products
            </p>
            <div>
              <Link href={"/"}>
                <Image
                  src={PayIcon}
                  width={150}
                  height={150}
                  className="cursor-pointer  w-full h-full rounded object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 md:pl-8 pl-0">
          <h2 className="font-medium">Categories</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            {allCategoryData &&
              allCategoryData.slice(0, 5).map((item, index) => {
                return (
                  <Link
                    href={`/category-product/${item?._id}`}
                    key={index + "category"}
                  >
                    <li className=" rounded duration-200 hover:bg-[#80808024] text-[#fff]">
                      {item?.name}
                    </li>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Contact Us</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <li className="mt-3 font-[300]">
              <span className="font-[400]">Address</span>
              <br />
              <small>
                C-185 Kedar nagar Shahganj near Rajkamal school Agra,
                Uttar Pradesh-282010
              </small>
            </li>
            <li className="mt-6 font-[300]">
              <span className="font-[400] ">Office / Mobile</span>
              <br />
              <small>9311667479</small>
            </li>
            <li className="mt-6 font-[300]">
              <span className="font-[400] ">Email</span>
              <br />
              <small>payments@leatheringo.com</small>
            </li>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Follow Us</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <ul>
              <li className="mt-3 font-[300]">
                <Link
                  href="https://www.facebook.com/profile.php?id=61551923318076"
                  className="flex items-center gap-2 "
                >
                  <Facebook className="text-2xl " /> Facebook
                </Link>
              </li>
              <li className="mt-4 font-[300]">
                <Link
                  href="https://instagram.com/leatheringo11?igshid=MzRlODBiNWFlZA=="
                  className="flex items-center gap-2 "
                >
                  <Instagram className="text-2xl " /> Instagram
                </Link>
              </li>
              <li className="mt-4 font-[300]">
                <Link href="" className="flex items-center gap-2 ">
                  <WhatsApp className="text-2xl " /> WhatsApp
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium">Join Us</h2>
          <div className="flex flex-col space-y-2 text-sm dark:text-gray-400">
            <ul>
              <li className="mt-3 font-[300]">
                <h2 className="text-2lg font-[500] text-[#fff]">
                  Subscribe to our newsletters
                </h2>
                <form className="flex items-center border border-[#4c5a5f] bg-[#fff] overflow-hidden rounded-md mt-3 w-full">
                  <input
                    type="text"
                    className="w-full text-[#000] py-1 px-2 bg-[transparent]"
                    placeholder="email..."
                  />
                  <button className="bg-[#424c62] px-2 py-2">Subscribe</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 pt-12 text-sm">
        <span className="dark:text-gray-400">
          © Copyright 2023. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
