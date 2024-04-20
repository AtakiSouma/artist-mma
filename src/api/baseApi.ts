import axios from "axios";


// IP of Nam
const baseURL = "http://192.168.1.9:8888";

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default baseApi;




