const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// File upload API instance (doesn't include default Content-Type so browser can set it for multipart)
const fileUploadApi = axios.create({
  baseURL: `${API_URL}/api`,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add token to file upload requests
fileUploadApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me')
};

// Booking APIs
export const bookingAPI = {
  createBooking: (formData) => {
    return fileUploadApi.post('/booking/create', formData);
  },
  getAllBookings: () => api.get('/booking/all'),
  getUserBookings: () => api.get('/booking/user'),
  updateStatus: (data) => api.put('/booking/update-status', data),
  getNearbyAmbulances: (lat, lng) => api.get(`/booking/ambulances/nearby?lat=${lat}&lng=${lng}`),
  getAllAmbulances: () => api.get('/booking/ambulances/all'),
  updateAmbulanceLocation: (data) => api.put('/booking/ambulance/location', data)
};

export default api;
