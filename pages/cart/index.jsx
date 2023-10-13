import { AuthContext } from '@/src/Context/UserContext';
import RootLayout from '@/src/Layouts/RootLayout';
import { getCartUrl, removeFromCartUrl, updateCartUrl, addToCartUrl } from '@/src/Utils/Urls/ProductUrl';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CartPage = () => {
    const { user } = useContext(AuthContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (user) {
            const getCartData = async () => {
                const res = await fetch(getCartUrl(user?.email));
                const data = await res.json();
                setCartData(data?.data);
            };
            getCartData();
        }
    }, [user]);

    const removeFromCart = async (id) => {
        const res = await fetch(removeFromCartUrl(id), {
            method: 'DELETE',
        });
        const data = await res.json();
        console.log(data);

        if (data?.success) {
            Swal.fire({
                icon: 'success',
                title: 'Your item has been removed',
                showConfirmButton: false,
                timer: 1500,
            });
            setCartData(cartData.filter((data) => data._id !== id));
        }
    };

    const calculateItemPrice = (productPrice, itemQuantity, productDiscount, extraDiscount) => {
        // Calculate the item price before any discounts
        const itemPrice = productPrice * itemQuantity;

        // Apply the regular discount
        const discountedPrice = itemPrice - (itemPrice * productDiscount) / 100;

        // Apply the extra discount if eligible
        const finalPrice = extraDiscount > 0 ? discountedPrice - extraDiscount : discountedPrice;

        return finalPrice;
    };

    const calculateExtraDiscount = (product, quantity) => {
        // Example: If the user buys more than 10 items, apply a 10% extra discount
        const minimumQuantity = product?.minimumQuantity || 0;
        if (quantity >= minimumQuantity) {
            return (product?.extraDiscount || 0) * quantity; // Extra discount per item
        }
        return 0; // No extra discount
    };

    const updatedCartData = cartData.map((item) => {
        const { _id, quantity, product } = item;

        // Assuming product.discount is a dynamic discount for each product
        const productDiscount = product?.discount || 0;

        const extraDiscount = calculateExtraDiscount(product, quantity);

        // Determine if extra discount eligibility is met
        const isEligibleForExtraDiscount = extraDiscount > 0;

        return {
            ...item,
            itemPrice: calculateItemPrice(product?.price, quantity, productDiscount, extraDiscount),
            extraDiscount,
            isEligibleForExtraDiscount,
        };
    });

    const totalPriceWithDiscounts = updatedCartData.reduce((acc, item) => {
        return acc + item?.itemPrice;
    }, 0);

    const totalExtraDiscount = updatedCartData.reduce((acc, item) => {
        return acc + item.extraDiscount;
    }, 0);

    const totalQuantity = updatedCartData.reduce((acc, item) => {
        return acc + item?.quantity;
    }, 0);

    const formatPrice = (price) => {
        // Format the price to display as a full number
        return price.toFixed(0);
    };

    const subtotal = formatPrice(totalPriceWithDiscounts - totalExtraDiscount);
    const formattedTotalPriceWithDiscounts = formatPrice(totalPriceWithDiscounts);

    const updateCartItemQuantity = async (id, newQuantity) => {
        const res = await fetch(updateCartUrl(id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: newQuantity,
            }),
        });
        const data = await res.json();
        if (data?.success) {
            // Update the cartData here
            const updatedCartData = cartData.map((item) => {
                if (item._id === id) {
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }
                return item;
            });
            setCartData(updatedCartData);
        }
    };

    return (
        <RootLayout>
            <section className=" ">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                        <div className="bg-white shadow">
                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                <div className="flow-root">
                                    <ul className="-my-8 flex flex-col gap-4">
                                        {updatedCartData &&
                                            updatedCartData?.map((data) => {
                                                const { product, _id, quantity, itemPrice, isEligibleForExtraDiscount, color, size } = data;

                                                return (
                                                    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                                        <Link className="shrink-0"
                                                            href={`/product/${product?._id}`}
                                                        >
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                                                src={product?.colors[0]?.images[0]}
                                                                alt={product?.name}
                                                            />
                                                        </Link>
                                                        <div className="relative flex flex-1 flex-col justify-between">
                                                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2 flex flex-col">
                                                                <div className="pr-8 sm:pr-5">
                                                                    <p className="text-base font-semibold text-gray-900">
                                                                        {product?.name}
                                                                    </p>
                                                                    <p className="text-base font-semibold text-gray-900">
                                                                        Color :  {color}
                                                                    </p>
                                                                    <p className="text-base font-semibold text-gray-900">
                                                                        Size :  {size}
                                                                    </p>
                                                                    <p>
                                                                        Price : <span className="text-xs font-normal text-gray-400">₹</span>{" "}
                                                                        {product?.price}
                                                                    </p>
                                                                    <p>
                                                                        Regular Discount : {product?.discount}%
                                                                    </p>
                                                                    <p>
                                                                        Total Quantity : {totalQuantity}
                                                                    </p>
                                                                    {isEligibleForExtraDiscount && (
                                                                        <p className="text-sm text-green-500 font-semibold">
                                                                            Eligible for Extra Discount ({product.extraDiscount} %)
                                                                        </p>
                                                                    )}

                                                                </div>
                                                                <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start  sm:justify-end">
                                                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                                                        <span className="text-xs font-normal text-gray-400">₹</span>{" "}
                                                                        {
                                                                            Math.round(itemPrice)
                                                                        }
                                                                    </p>
                                                                    <div className="sm:order-1">
                                                                        <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                                                            <button
                                                                                className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                                                onClick={() => {
                                                                                    if (quantity > 1) {
                                                                                        updateCartItemQuantity(_id, quantity - 1);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                -
                                                                            </button>
                                                                            <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                                                                {quantity}
                                                                            </div>
                                                                            <button
                                                                                className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                                                onClick={() =>
                                                                                    updateCartItemQuantity(_id, quantity + 1)
                                                                                }
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeFromCart(_id)}
                                                                    className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                                                >
                                                                    <svg
                                                                        className="h-5 w-5"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M6 18L18 6M6 6l12 12"
                                                                            className=""
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Total</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        <span className="text-xs font-normal text-gray-400">₹</span>{" "}
                                        {formattedTotalPriceWithDiscounts}
                                    </p>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        href="/checkout"
                                        className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                    >
                                        Checkout
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
};

export default CartPage;
