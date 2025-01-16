import axios from 'axios';
//// apidepartment.js
// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'https://apiuat.paisalo.in:4015/admin/api/Masters',
});

// Use a function to get the token securely, this can be updated to your case
const getToken = () => {
  // Example: Replace this with your actual logic to retrieve the token or set it directly for testing
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE1OSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJTQVRJU0ggTUFVUllBICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImRvdG5ldGRldjFAcGFpc2Fsby5pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTU5IiwiQ3JlYXRvciI6IlZIREVMSEkiLCJFbXBDb2RlIjoiUDAwMDAwMTUzNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IkphbiBGcmkgMTcgMjAyNSAwNjozMjo1NiBBTSIsIm5iZiI6MTczNzAwOTE3NiwiZXhwIjoxNzM3MDk1NTc2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTg4IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE4OCJ9.ryG_cYRKIpPrDn5ZyV12ksTsbv7o8PEIK8r5qXPMXWw'; // Sample Token
  return token;
};

// Request interceptor to dynamically attach the token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(); // Use the function to retrieve token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;