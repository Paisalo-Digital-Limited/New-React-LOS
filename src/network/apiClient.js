import axios from "axios";
import apiConfig, { setApiMode } from "./apiConfig";


setApiMode(false); 

const apiClient = axios.create({
  baseURL: apiConfig.baseURL, 
  headers: {
    ...apiConfig.headers, 
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

// Interceptor for attaching auth tokens dynamically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (config.requireAuth !== false && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling responses and errors
apiClient.interceptors.response.use(
  (response) => {
    debugger;
    const { config } = response;

    // Check if `checkTokenInResponse` is true and validate token in localStorage
    if (config.checkTokenInResponse !== false) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authToken found in response. Redirecting to login.");
        window.location.href = "/"; // Redirect to the root page
        return Promise.reject(new Error("No authToken found. Redirected to login."));
      }
    }

    return response;
  },
  (error) => {
    const { config } = error;

    // Handle missing token if `checkTokenInResponse` is true
    if (config.checkTokenInResponse !== false) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authToken found. Redirecting to login.");
        window.location.href = "/";
        return Promise.reject(new Error("No authToken found. Redirected to login."));
      }
    }

    // Handle 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access. Redirecting to login.");
      window.location.href = "/";
    }

    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
