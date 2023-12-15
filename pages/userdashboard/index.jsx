import { AuthContext } from '@/src/Context/UserContext';
import UserdashboardLayout from '@/src/Layouts/UserDashboardLayout';
import React, { useContext } from 'react';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);


    return (
        <UserdashboardLayout>
            <section>
                <div className='flex flex-col items-center justify-center w-full '>
                    <div
                        className='text-4xl font-bold text-center text-gray-700'
                    >
                        Hey Wellcome to  {
                            user && user.displayName
                                ? user.displayName
                                : 'User Dashboard'
                        }
                    </div>

                    <h1 className='text-4xl font-bold text-center text-gray-700'>
                        Comming Soon ...
                    </h1>
                </div>
            </section>
        </UserdashboardLayout>
    );
};

export default UserDashboard;