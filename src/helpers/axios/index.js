import axios from "axios";
import { setupInterceptorsTo } from "./interceptor";

const customAxios = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {},
});
const http = setupInterceptorsTo(customAxios);
export default http;
