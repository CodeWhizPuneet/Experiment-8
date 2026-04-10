import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

export const api = axios.create({
  baseURL,
  timeout: 12000,
});

export function setBearerToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}
