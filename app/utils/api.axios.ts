import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.135:5000", 
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;