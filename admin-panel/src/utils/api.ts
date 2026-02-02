import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-platform-delta-lovat.vercel.app/api",
  withCredentials: true // this is the key line
});

export default API;
