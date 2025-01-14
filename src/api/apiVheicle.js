import apiClient from '../network/apiClient';

const API_BASE_URL = 'https://apiuat.paisalo.in:4015';


export const createVehicleType = async (vehicleTypeVM) => {
  try {
    const response = await apiClient.post(
      `${API_BASE_URL}/admin/api/Masters/CreateVehicleType`,
      vehicleTypeVM
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while creating the vehicle type.' };
  }
};


export const getVehicleTypes = async () => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/admin/api/Masters/GetVehicleType`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while fetching vehicle types.' };
  }
};


export const updateVehicleType = async (vehicleTypeVM) => {
  try {
    const response = await apiClient.post(`${API_BASE_URL}/admin/api/Masters/UpdateVehicleType`,
  
      vehicleTypeVM
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred while updating the vehicle type.' };
  }
};


export const toggleVehicleTypeStatus = async (vehicleId) => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/admin/api/Masters/DeleteVehicleType?VehicleId=${vehicleId}`);
    return response.data; // Return the response for further use
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle vehicle type status.');
  }
};



// Function to create a brand
// export const createBrand = async (brandData) => {
//   try {
//     const response = await apiClient.post(
//       `https://apiuat.paisalo.in:4015/admin/api/Masters/CreateBrand`,
//       brandData
//     );
//     return response.data; 
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || "Failed to create brand."
//     );
//   }
// };

export const createBrand = async (brandData) => {
  try {
    const response = await apiClient.post(`https://apiuat.paisalo.in:4015/admin/api/Masters/CreateBrand`, brandData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create brand."
    );
  }
};


export const getBrandDetails = async () => {
  try {
    const response = await apiClient.get("https://apiuat.paisalo.in:4015/admin/api/Masters/GetBrandDetails");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch brand details.");
  }
};

export const updateBrand = async (brandData) => {
  try {
    const response = await apiClient.post(`https://apiuat.paisalo.in:4015/admin/api/Masters/UpdateBrand`, brandData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update brand.");
  }
};


export const deleteBrand = async (brandId) => {
  try {
    const response = await apiClient.get(`https://apiuat.paisalo.in:4015/admin/api/Masters/DeleteBrand?BrandId=${brandId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete brand."
    );
  }
};


export const createFuelType = async (fuelTypeData) => {
  try {
    const response = await apiClient.post("https://apiuat.paisalo.in:4015/admin/api/Masters/CreateFueltype", fuelTypeData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create fuel type."
    );
  }
};
export const getFuelTypeDetails = async () => {
  try {
    const response = await apiClient.get("https://apiuat.paisalo.in:4015/admin/api/Masters/GetFuelTypeDetails");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch fuel type details."
    );
  }
};

export const updateFuelType = async (fuelTypeData) => {
  try {
    const response = await apiClient.post(
      "https://apiuat.paisalo.in:4015/admin/api/Masters/UpdateFueltype",
      fuelTypeData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update fuel type."
    );
  }
};

export const deleteFuelType = async (fuelTypeId) => {
  try {
    const response = await apiClient.get(`https://apiuat.paisalo.in:4015/admin/api/Masters/DeleteFueltype?FueltypeId=${fuelTypeId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete fuel type."
    );
  }
};

// export const createNewModel  = async (fuelTypeId) => {
//   try {
//     const response = await apiClient.post(`https://apiuat.paisalo.in:4015/admin/api/Masters/CreateNewModel`);
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || "Failed to delete fuel type."
//     );
//   }
// };

export const createNewModel = async (modelData) => {
  try {
    const response = await apiClient.post(
      "https://apiuat.paisalo.in:4015/admin/api/Masters/CreateNewModel",
      modelData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create the model."
    );
  }
};

export const getModelDetails = async () => {
  try {
    const response = await apiClient.get("https://apiuat.paisalo.in:4015/admin/api/Masters/GetModelDetails");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch model details.");
  }
};

export const updateModel = async (modelData) => {
  try {
    const response = await apiClient.post("https://apiuat.paisalo.in:4015/admin/api/Masters/UpdateModel", modelData);
    return response.data;
  } catch (error) {
    console.error("Error updating model:", error.message);
    throw error;
  }
};
export const deleteModel = async (modelId) => {
  try {
    const response = await apiClient.get(`https://apiuat.paisalo.in:4015/admin/api/Masters/DeleteModel?ModelId=${modelId}`);
    return response.data;
  } catch (error) {
    console.error("Error updating model:", error.message);
    throw error;
  }
};




// export const deleteModel = async (modelId) => {
//   try {
//     const response = await axios.get(
//       `https://apiuat.paisalo.in:4015/admin/api/Masters/DeleteModel?ModelId=${modelId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${yourAuthToken}`, // Replace with your authentication token logic
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error toggling model status:", error.message);
//     throw error;
//   }
// };