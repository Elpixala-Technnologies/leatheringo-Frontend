import React from "react";
import { useRouter } from "next/router";
import RootLayout from "@/src/Layouts/RootLayout";
import CategoryProduct from "@/src/Shared/Cards/CategoryProduct/CategoryProduct";
import useProducts from "@/src/Hooks/useProducts";
import Link from "next/link";

const SingelCategoryPage = () => {
    const { productData } = useProducts();
    const router = useRouter();
    const { index } = router.query;
    const CategoryName = index;

    const filterProductData = productData?.filter((data) => {
        return data.categories === CategoryName;
    });

    return (
        <RootLayout>
            <section className="my-4">
                <CategoryProduct
                    filterProductData={filterProductData}
                />

                {/* ======== Most Sela ========= */}

                <h3 className='font-semibold md:text-3xl text-lg mt-12'>Most Seal</h3>
                <div className="grid md:grid-cols-4  md:gap-4 gap-2 mt-8">
                    {
                        productData && productData?.slice(0, 12)?.map(product => (
                            <Link href={`/product/${product?._id}`}>
                                <div className="card bg-white px-3 pt-2 pb-[20px] md:h-[500px] shadow-lg rounded hover">
                                    <div className="bg-[#e1e6e9]">
                                        <Image
                                            src={product?.image[0] || NotFoundImage}
                                            width={400}
                                            height={350}
                                            alt="Description"
                                            className='md:h-[350px] h-full w-full rounded'
                                        />
                                    </div>

                                    <div className="pb-4 text-left">
                                        <h4 className='font-bold my-2'>
                                            {product?.category}
                                        </h4>
                                        <h4 className="text-lg">{product?.name?.slice(0, 28) + ".."}</h4>
                                        <div className='flex items-center gap-4'>
                                            <h1 className="text-xl font-bold text-slate-900">
                                                {
                                                    product?.discount
                                                        ? `₹ ${product?.price - (product?.price * product?.discount) / 100}`
                                                        : `₹ ${product?.price}`
                                                }
                                            </h1>
                                            <span className="text-sm text-slate-900 line-through mt-1">
                                                ₹ {product?.price}
                                            </span>
                                            <span className='text-[#eec75b]'>
                                                {product?.discount} % off
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>
        </RootLayout>
    );
};

export default SingelCategoryPage;
