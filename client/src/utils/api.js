import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL,
  withCredentials: true, // Important for handling cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth tokens from localStorage if needed
api.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage as a fallback
    const token = localStorage.getItem('accessToken');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    // Store token if it's in the response
    if (response.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (user not logged in or token expired)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Try refreshing the token
      try {
        const refreshResponse = await axios.post(
          `${baseURL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );
        
        if (refreshResponse.data?.accessToken) {
          localStorage.setItem('accessToken', refreshResponse.data.accessToken);
          
          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Clear auth data and redirect to login
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
