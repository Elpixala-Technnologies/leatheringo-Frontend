import DashboardLayout from '@/src/Layouts/DashboardLayout';
import React from 'react';

const BlogPage = () => {
    return (
        <DashboardLayout>
            <section>
                <div className='flex flex-col items-center justify-center w-full '>
                    <div
                        className='text-4xl font-bold text-center text-gray-700'
                    >
                        Hey Wellcome to Blog Page
                    </div>

                    <h1 className='text-4xl font-bold text-center text-gray-700'>
                        Comming Soon ...
                    </h1>
                </div>
            </section>
        </DashboardLayout>
    );
};

export default BlogPage;