import apiClient from '../network/apiClient';
import Swal from "sweetalert2";
import axios from "axios";
export const insertBranchMaster = async (payload) => {
    try {
      const response = await apiClient.post("https://apiuat.paisalo.in:4015/admin/api/Masters/InsertBranchMaster", payload);
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


export const fetchBranchMasterDetails = async () => {
  try {
    const response = await apiClient.get("https://apiuat.paisalo.in:4015/admin/api/Masters/GetBranchMasterDetails");
    if (response.data.statuscode === 200) {
      return response.data.data.map((item) => ({
        Id: item.id,
        Code: item.code,
        Name: item.name,
        CreatorID: item.creatorID,
        Location: item.location,
        // isActive: item.isActive, 
        // isDeleted: item.isDeleted, 
        OffAdd1: item.offAdd1,
        OffAdd2: item.offAdd2,
        OffAdd3: item.offAdd3,
        BankAcNo: item.bankAcNo,
        BankName: item.bankName,
        BankBranch: item.bankBranch,
        OffMob1: item.offMob1,
        OffMob2: item.offMob2,
        Creation_Date: item.creation_Date,
        RecoveryAuth: item.recoveryAuth,
      }));
    } else {
      Swal.fire("Error", response.data.message || "Failed to fetch data.", "error");
      return [];
    }
  } catch (error) {
    console.error("API Error:", error);
    Swal.fire("Error", "An error occurred while fetching data.", "error");
    throw error;
  }
};


export const deleteBranchMaster = async (id, params) => {
  try {
    const response = await apiClient.post(
      `https://apiuat.paisalo.in:4015/admin/api/Masters/DeleteBranchMaster?Id=${id}`,
      params,
      {
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error?.response?.data?.message || "Failed to update branch status.",
    });
    throw error;
  }
};


export const fetchBranchMasterById = async (id) => {
  try {

    const response = await apiClient.get(`https://apiuat.paisalo.in:4015/admin/api/Masters/GetBranchMasterById/?Id=${id}`);
    if (response.data.statuscode === 200 && response.data.data.length > 0) {
      return response.data.data[0]; // Return the branch data object
    } else {
      throw new Error(response.data.message || "Branch data not found");
    }
  } catch (error) {
    console.error("Error fetching branch by ID:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch branch details."
    );
  }
};

export const updateBranchMaster = async (payload) => {
  try {
    const response = await apiClient.post("https://apiuat.paisalo.in:4015/admin/api/Masters/UpdateBranchMaster", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.statuscode === 200) {
      return response.data; 
    } else {
      throw new Error(response.data.message || "Update failed.");
    }
  } catch (error) {
    console.error("Error updating branch master:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update branch master."
    );
  }
};
