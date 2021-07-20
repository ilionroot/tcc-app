import axios from "axios";

const api = axios.create({
  baseURL: "https://tcc-app-back.herokuapp.com",
  // baseURL: "https://prime-monitor-api.herokuapp.com/",
});

export default api;
