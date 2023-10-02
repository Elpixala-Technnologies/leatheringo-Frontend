import { useState } from 'react';

const FeaturedProducts = () => {
    const [filterProductData, setFilterProductData] = useState([]);

    return (
        <section>
            <div className='title mb-6 flex flex-col justify-center items-center'>
                <h2 className=" text-[1rem] md:text-[1.8rem] text-center md:text-left lg:text-3xl uppercase xxs:text-2xl  text-black font-bold">
                    Featured Products
                </h2>
                <p className='text-muted my-2'>
                    Summer Collection New Modern Design
                </p>
            </div>
            <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-4 lg:grid-cols-4 gap-4">
                {filterProductData &&
                    filterProductData.map((product, index) => {
                        return (
                            <div
                                className="cardBody md:m-0 w-[320px] mx-auto  flex flex-col hover:border-red-500 color-b bg-white p-2 md:p-3 rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 "

                            >
                                <div className="productImage p-2">
                                    <Image
                                        src={product?.images[0]}
                                        width={280}
                                        height={280}
                                        className="w-full h-full"
                                        alt="Product Image"
                                    />
                                </div>
                                <hr className="w-full bg-slate-400" />
                                <div className="productInfo mt-2 p-2">
                                    <h2 className="productName font-bold ">
                                        {product?.name}
                                    </h2>
                                    <p className="productPrice text-red-500 font-semibold pt-3">
                                        $ {product?.price}
                                    </p>
                                    <p className="productDescription py-3">
                                        {product?.details?.slice(0, 150)}
                                    </p>

                                    <div className="productAddToCart flex gap-5 items-center">
                                        <div>
                                            <Link className="border  px-4 py-4 flex justify-center items-center gap-4 hover:border-red-500 color-b bg-white p-2 md:p-3 text-center rounded-md duration-300 transform  shadow-sm hover:-translate-y-1.5 border-t border-slate-100 hover:bg-red-10 hover:text-red-500" href={`/product-detail/${product?._id}`}>
                                                <FaCartPlus />
                                                Product Detail
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default FeaturedProducts;