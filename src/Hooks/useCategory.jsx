import { useQuery } from "@tanstack/react-query";
import { deletePopularCategoryUrl, getPopularCategoryUrl } from "../Utils/Urls/CategoryUrl";
import Swal from "sweetalert2";

const usePopularCategory = () => {
    const {
        data: popularCategoryData,
        isLoading: popularCategoryLoaded,
        refetch: refetchPopularCategory,
    } = useQuery({
        queryKey: ["popularCategoryData"],
        queryFn: async () => {
            try {
                const res = await fetch(getPopularCategoryUrl);
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                return data.data;
            } catch (error) {
                // Handle the error, you can log it or return a default value
                console.error("Error fetching data:", error);
                throw error; // Rethrow the error so it's propagated to the caller
            }
        },
    });
    const handelPopularCategoryDelete = async (id) => {
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
            const res = await fetch(deletePopularCategoryUrl(id), {
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
                refetchPopularCategory();
            }
        }
    };

    return {
        popularCategoryData,
        popularCategoryLoaded,
        refetchPopularCategory,
        handelPopularCategoryDelete

    };
};

export default usePopularCategory;