import useProducts from "@/src/Hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

const ManageProduct = () => {
    const { handelProductDelete, productData } = useProducts();
    return (
        <section>
            <div className="grid md:grid-cols-3 gap-4 justify-center items-center">

                <div>
                    {
                        productData && productData?.length === 0 && <div className="flex justify-center items-center">
                            <h2>
                                No Product Found !
                            </h2>
                        </div>
                    }
                </div>

                {productData &&
                    productData?.length &&
                    productData?.map((porductData) => {
                        const { _id, name, price, colors, discount } = porductData;
                        return (
                            <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                                key={_id}
                            >
                                <a
                                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                                    href="#"
                                >

                                    <img
                                        width={300}
                                        height={300}
                                        src={colors[0]?.images[0]}
                                        className="w-full h-full object-cover object-center"
                                        alt="product image"
                                    />

                                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                                        {discount}%
                                    </span>
                                </a>
                                <div className="mt-4 px-5 pb-5">
                                    <a href="#">
                                        <h5 className="text-xl tracking-tight text-slate-900">
                                            {name}
                                        </h5>
                                    </a>
                                    <div className="mt-2 mb-5 flex items-center justify-between">
                                        <p>
                                            <span className="text-3xl font-bold text-slate-900">{price}</span>
                                            <span className="text-sm text-slate-900 line-through">
                                                {Math.round(price + (price * discount) / 100)}
                                            </span>
                                        </p>
                                    </div>

                                    <div className='flex gap-4  items-center'>
                                        <button className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            onClick={() => handelProductDelete(_id)}
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                        <Link className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            href={`/dashboard/update-product/${_id}`}
                                        >
                                            <FaRegEdit /> Update
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </section>
    );
};

export default ManageProduct;