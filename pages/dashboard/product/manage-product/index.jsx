import ManageProduct from '@/src/Components/Dashboard/Product/ManageProduct/ManageProduct';
import DashboardLayout from '@/src/Layouts/DashboardLayout';

const ManagePorductPage = () => {
  return (
    <DashboardLayout>
      <div className='manage-Porduct-section container'>
        <div className='manage-porduct-title my-2'>
          <h2 className='font-bold text-2xl'>Update Porducts</h2>
        </div>
        <ManageProduct />
      </div>
    </DashboardLayout>
  );
};

export default ManagePorductPage;