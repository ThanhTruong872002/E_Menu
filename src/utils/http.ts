import axios, { AxiosInstance } from "axios";
console.log(process.env.REACT_BACKEND_API);

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:4000/",
      timeout: 10000,
      httpsAgent: { rejectUnauthorized: false },
      headers: {
        "Content-Type": "application/json",
        "Content-Security-Policy": "upgrade-insecure-requests",
      },
    });
  }
}

const http = new Http().instance;

export default http;
