import apiClient from '../network/apiClient';
import Swal from "sweetalert2";
export const insertBranchMaster = async (payload) => {
    try {
      const response = await apiClient.post("/Masters/InsertBranchMaster", payload);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "An error occurred while submitting the form.",
      });
      throw error;
    }
  };