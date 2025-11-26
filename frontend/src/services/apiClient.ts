import axios from 'axios';
import { API_BASE_URL } from '@/config';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'Unable to complete the request';
    return Promise.reject(new Error(message));
  },
);

