import apiClient from "../network/apiClient";
export const fetchCreatorsApi = async () => {
  try {
    const response = await apiClient.get("https://apiuat.paisalo.in:4015/admin/api/Masters/GetCreator");
    if (response.data.statuscode === 200 && Array.isArray(response.data.data)) {
      return response.data.data; // Return the creators array
    } else {
      throw new Error(response.data.message || "Unexpected response format");
    }
  } catch (error) {
    console.error("Error fetching creators:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch creators."
    );
  }
};
