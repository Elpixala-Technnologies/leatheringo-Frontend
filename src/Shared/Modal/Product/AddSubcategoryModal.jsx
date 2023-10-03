import useProducts from '@/src/Hooks/useProducts';
import { createSubCategoryUrl } from '@/src/Utils/Urls/ProductUrl';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";

const AddSubcategoryModal = ({ isSubCategoryModalOpen, setIsSubCategoryModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { refetchAllCategory, allCategoryData } = useProducts()

  const handleCancel = () => {
    setIsSubCategoryModalOpen(false);
  };

  const onSubmit = async (data) => {
    const res = await fetch(createSubCategoryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        parentId : data.parentCategory
      }),
    });

    console.log(res);

    const dataRes = await res.json();
    console.log(dataRes);

    if (!dataRes) {
      Swal.fire({
        position: "center",
        timerProgressBar: true,
        title: "Somthing wento wrang !",
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
        title: "Successfully Product Added!",
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
      refetchAllCategory();
    }

  }


  return (
    <div>
      <Modal title="Add Level" open={isSubCategoryModalOpen} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
        <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6">
          <form onSubmit={handleSubmit(onSubmit)}>

            <select
              name="category"
              id="category"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              {...register("parentCategory")}
            >
              <option value="category">Parent Category</option>
              {allCategoryData && allCategoryData?.map((category) => (
                <option
                  key={category?._id}
                  value={category?._id}
                  className="border-2 border-gray-300 rounded-md p-4 my-2"
                >
                  {category?.name}
                </option>
              ))}
            </select>

            <div className="my-6">
              <div className="w-full">
                <input
                  type="text"
                  className=" text-[15px] font-[500] text-gray-700  w-full border-2 border-gray-300 rounded-lg shadow-md pl-10 pr-2.5 py-3"
                  placeholder="Subcategory Name"
                  name="Subcategory"
                  {...register("name")}
                />
              </div>
            </div>

            <div className="">
              <button className="mb-5 common-btn">Create Subcategory</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddSubcategoryModal;