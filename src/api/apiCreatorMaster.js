import apiClient from '../network/apiClient';
import axios from "axios";
const API_BASE_URL = 'https://apiuat.paisalo.in:4015';


export const insertCreator = async (data) => {
  try {
    console.log("🚀 Sending Data with Axios:", data);

    const response = await apiClient.post(`https://apiuat.paisalo.in:4015/admin/api/Masters/InsertCreator`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ API Response:", response.data);
    if (response.status === 200 && response.data.statuscode === 200) {
      return response.data;
    } else {
      console.warn("❌ API returned an error:", response.data.message);
      throw new Error(response.data.message || "Failed to insert record.");
    }
  } catch  {
    if (axios.isAxiosError()) {
      console.error(
        "❌ Axios API Error:",
    
      );
      throw new Error(

      );
    } else {
  
      throw new Error("An unknown error occurred");
    }
  }
};


export const fetchCreators = async () => {
  try {
    const response = await apiClient.get('https://apiuat.paisalo.in:4015/admin/api/Masters/GetCreator');
    return response.data;
  } catch (error) {
    console.error('Error fetching creators:', error);
    throw error;
  }
};

export const fetchCreatorDetails = async (creatorId) => {
  try {
    const response = await fetch(
      `https://apiuat.paisalo.in:4015/admin/api/Masters/GetCreatorById?CreatorId=${creatorId}`
    );
    const data = await response.json();

    if (data.statuscode === 200) {
      return data.data[0]; 
    } else {
      throw new Error(data.message || "Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching creator details:", error);
    throw error;
  }
};



export const updateCreator = async (creatorData) => {
  try {
    const response = await fetch("https://apiuat.paisalo.in:4015/admin/api/Masters/UpdateCreator", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creatorData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update creator");
    }
    return result;
  } catch  {
    
  }
};



