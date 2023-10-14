import UserdashboardLayout from '@/src/Layouts/UserDashboardLayout';
import React from 'react';

const OrderPage = () => {
    return (
        <UserdashboardLayout>
            <section
                className='flex flex-col items-center justify-center w-full h-full py-20 text-4xl text-center h-screen' 
            >
                <h1
                    className='text-4xl font-bold text-center text-gray-700'
                >
                    Comming Soon ...
                </h1>
            </section>
        </UserdashboardLayout>
    );
};

export default OrderPage;