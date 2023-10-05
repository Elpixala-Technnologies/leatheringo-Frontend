import useProducts from '@/src/Hooks/useProducts';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import { addInventroyProductUrl } from '@/src/Utils/Urls/InventoryUrl';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const ManageInventoryPage = () => {
    const { handleSubmit, register } = useForm();
    const { productData } = useProducts();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        const { productId, quantity } = data;
        console.log(data);

        try {
            setIsLoading(true);
            const res = await fetch(addInventroyProductUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product: productId,
                    quantity: quantity
                })
            });

            const result = await res.json();

            if (!result) {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Something went wrong!",
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "error",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
            } else {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Inventory Product Added Successfully!",
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "success",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <DashboardLayout>
            <div>
                <h2 className="text-2xl">Add Quantity Product</h2>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 w-[80%] mx-auto my-4"
                >

                    <select
                        name="main-product"
                        id="main-product"
                        className="border-2 border-gray-300 rounded-md p-2"
                        {...register("productId")}
                    >
                        <option value="main-product">
                            Select Product
                        </option>
                        {productData && productData?.map((product) => (
                            <option
                                key={product._id}
                                value={product?._id}
                                className="border-2 border-gray-300 rounded-md p-4 my-2"
                            >
                                {product?.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Quantity"
                        className='border-2 border-gray-300 rounded-md p-2'
                        {...register("quantity")}
                    />

                    <button
                        type="submit"
                        className="common-btn"
                    >Add Inventory Product</button>

                </form>

            </div>
        </DashboardLayout>
    );
};

export default ManageInventoryPage;