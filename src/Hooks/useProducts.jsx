import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteProductUrl, getAllCategoryUrl, deleteCategoryUrl, getAllCouponUrl, deleteCouponUrl, getProductsUrl, getAllCategorySubCategoryUrl } from "../Utils/Urls/ProductUrl";
import { corsAnywhereUrl } from "../Utils/Network/Network";

const useProducts = () => {
  const {
    data: productData,
    isLoading: productLoaded,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["productData"],
    queryFn: async () => {
      try {


        const res = await fetch(getProductsUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await res.json();
        return data?.data;
      } catch (error) {
        throw error;
      }
    },
  });

  const {
    data: categoryData,
    isLoading: categoryLoaded,
    refetch: refetchCategory,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      const res = await fetch(getAllCategoryUrl);
      const data = await res.json();
      return data.data;
    },
  });

  const {
    data: allCategoryData,
    isLoading: allCategoryLoaded,
    refetch: refetchAllCategory,
  } = useQuery({
    queryKey: ["allCategoryData"],
    queryFn: async () => {
      const res = await fetch(getAllCategorySubCategoryUrl);
      const data = await res.json();
      return data.data;
    },
  });


  const {
    data: couponData,
    isLoading: couponLoaded,
    refetch: refetchCoupon,
  } = useQuery({
    queryKey: ["couponData"],
    queryFn: async () => {
      const res = await fetch(getAllCouponUrl);
      const data = await res.json();
      return data.data;
    },
  });



  const handelProductDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(deleteProductUrl(id), {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: data.message,
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
          title: "Successfully Delete !",
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
        refetchProducts();
      }
    }
  };

  const handelCategoryDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(deleteCategoryUrl(id), {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: data.message,
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
          title: "Successfully Delete  !",
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
        refetchCategory();
        refetchAllCategory();
      }
    }
  };


  const handelCouponDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const res = await fetch(deleteCouponUrl(id), {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: data.message,
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
          title: "Successfully Delete  !",
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
        refetchCoupon();
      }
    }
  };


  return {
    handelProductDelete,
    refetchProducts,
    productLoaded,
    productData,

    handelCategoryDelete,
    refetchCategory,
    categoryData,
    categoryLoaded,

    allCategoryData,
    allCategoryLoaded,
    refetchAllCategory,

    handelCouponDelete,
    couponData,
    couponLoaded,
    refetchCoupon,

  }
};

export default useProducts;