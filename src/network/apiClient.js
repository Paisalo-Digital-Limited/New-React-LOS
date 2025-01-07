import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://apiuat.paisalo.in:4015/admin/api", // Global base URL
  headers: {
    "Content-Type": "application/json", // Global headers
  },
});

// Interceptor for attaching auth tokens dynamically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Replace with your token storage logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
