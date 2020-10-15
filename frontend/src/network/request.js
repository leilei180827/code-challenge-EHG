// base of all network request with shared configs
import axios from "axios";
export function request(option) {
  const instance = axios.create({
    baseURL: "/api/images",
    timeout: 5000,
  });
  return instance(option);
}
