const apiConfig = {
    isLive: false, // Flag to toggle between live and test environments
    baseURLs: {
      live: "https://api.paisalo.in/admin/api", // Live URL
      test: "https://apiuat.paisalo.in:4015/admin/api", // Test URL
    },
    headers: {
      "Content-Type": "application/json", // Global headers
    },
    get baseURL() {
      return this.isLive ? this.baseURLs.live : this.baseURLs.test; // Dynamically return baseURL
    },
  };
  
  export const setApiMode = (isLive) => {
    apiConfig.isLive = isLive; // Update the environment flag
  };
  
  export default apiConfig;
  