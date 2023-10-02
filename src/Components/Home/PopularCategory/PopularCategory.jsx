import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {
    BagsIcons,
    Belts,
    CardHolders,
    DuffleBags,
    LadiesBags,
    Shoes,
    Sneakers,
    Wallets,
    ChelseaBoots,
} from "@/src/Assets";

const cetegoryData = [
    {
        id: 1,
        categories: "Shoes",
        image: Shoes,
    },
    {
        id: 2,
        categories: "Bags",
        image: BagsIcons,
    },
    {
        id: 3,
        categories: "Belts",
        image: Belts,
    },
    {
        id: 4,
        categories: "Card Holders",
        image: CardHolders,
    },
    {
        id: 5,
        categories: "Wallets",
        image: Wallets,
    },
    {
        id: 6,
        categories: "Duffle Bags",
        image: DuffleBags,
    },
    {
        id: 7,
        categories: "Sneakers",
        image: Sneakers,
    },
    {
        id: 8,
        categories: "ladies Bags",
        image: LadiesBags,
    },
    {
        id: 9,
        categories: "Chelsea Boots",
        image: ChelseaBoots,
    }
];

const PopualrCategory = () => {
    const [updateData, setUpdateData] = useState(12);
    const showCard = () => {
        if (updateData == 12) {
            setUpdateData((p) => p + cetegoryData.length);
        } else {
            setUpdateData((p) => p - cetegoryData.length);
        }
    };

    return (
        <section>
            <div className="">
                <div className="md:w-[100%] mx-auto mt-7 md:mt-10 mb-5 md:mb-20 md:block ">
                    <div className="text-center leading-10 mb-5 md:mb-8">
                        <h1 className="lg:text-3xl uppercase xxs:text-2xl  text-black font-bold">
                            Popular Categories
                        </h1>
                    </div>
                    <div className=" rounded-lg pb-[1px]">
                        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  md:pt-5 gap-5">
                            {cetegoryData.slice(0, updateData).map((child) => {
                                const { id, categories, image } = child;
                                return (
                                    <div
                                        className="color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500"
                                        key={id}
                                    >
                                        <Link href={`/category/${categories}`}>
                                            <Image
                                                alt="image"
                                                src={image}
                                                className="chele items-center justify-center  inline-flex"
                                                width={65}
                                                height={65}
                                            />

                                            <div className="dark:text-black text-sm font-semibold tracking-wide cursor-pointer">
                                                {categories}
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <p
                            className="flex justify-end items-center text-black hover:text-red-500 text-[12px] my-2 px-1 pr-4 tracking-wide  hover:text-red-10 cursor-pointer"
                            onClick={() => showCard()}
                        >
                            {`Read ${updateData == 12 ? "Less" : "More"}`}{" "}
                            {updateData == 12 ? (
                                <AiFillCaretUp className="mt-1 text-[15px]" />
                            ) : (
                                <AiFillCaretDown className="mt-1 text-[15px]" />
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopualrCategory;
