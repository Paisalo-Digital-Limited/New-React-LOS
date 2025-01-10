import axios from "axios";
import apiConfig, { setApiMode } from "./apiConfig";

// Automatically set the mode (true for live, false for test)
setApiMode(false); // Set to `true` for live, `false` for test

// Create the Axios instance with dynamic baseURL and headers
const apiClient = axios.create({
  baseURL: apiConfig.baseURL, // Use the dynamic base URL
  headers: apiConfig.headers, // Use the dynamic headers
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
