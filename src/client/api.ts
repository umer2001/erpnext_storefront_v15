import { AxiosRequestConfig } from "axios";
import api from "./api-client";

export const auth = {
  login: async ({ usr, pwd }: { usr: string; pwd: string }): Promise<any> =>
    api.post("/method/login", { usr, pwd }).then((res) => res.data),
  whoami: async (): Promise<any> =>
    api.get("/method/frappe.auth.get_logged_user").then((res) => res.data),
  logout: async (): Promise<any> =>
    api.get("/method/logout").then((res) => res.data),
};

export const getProducts = (params: AxiosRequestConfig<any>) =>
  api.get("/products/", { params }).then((res) => res.data);
