import AddProduct from '@/src/Components/Dashboard/Product/AddProduct/AddProduct';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import Link from "next/link";

const AddPorductPage = () => {
    return (
        <DashboardLayout>
           <section>
                <div className="add-Porduct-container">
                    <Link href="/dashboard/product/manage-product" className="common-btn">
                        Update Porduct
                     </Link>   
                </div>

                <div className="add-Porduct-section"> 
                    <AddProduct/>
                </div>
           </section>
        </DashboardLayout>
    );
};

export default AddPorductPage;