import api from "./api-client";

export const auth = {
  login: async ({ usr, pwd }: { usr: string; pwd: string }): Promise<any> =>
    api.post("/method/login", { usr, pwd }).then((res) => res.data),
  whoami: async (): Promise<any> =>
    api.get("/method/frappe.auth.get_logged_user").then((res) => res.data),
  logout: async (): Promise<any> =>
    api.get("/method/logout").then((res) => res.data),
};

export const products = {
  list: (params: any) =>
    api
      .get("method/webshop.webshop.api.get_product_filter_data", {
        params: { query_args: JSON.stringify(params) },
      })
      .then((res) => res.data),
  get: (itemCode: string) =>
    api
      .get(
        "method/webshop.webshop.shopping_cart.product_info.get_product_info_for_website",
        { params: { item_code: itemCode } }
      )
      .then((res) => res.data),
  create: null,
  update: null,
  delete: null,
};

export const categories = {
  list: (params: any) =>
    api
      .get("webshop.templates.pages.product_search.get_category_suggestions", {
        params: params,
      })
      .then((res) => res.data),
  get: null,
  create: null,
  update: null,
  delete: null,
};

export const address = {
  list: (params: any) =>
    api
      .get("method/headless_e_commerce.api.get_addresses", {
        params: params,
      })
      .then((res) => res.data),
  create: (data: any) =>
    api
      .post("method/webshop.webshop.shopping_cart.cart.add_new_address", {
        doc: data,
      })
      .then((res) => res.data),
  get: null,
  update: null,
  delete: null,
};

export const cart = {
  get: (params?: any) =>
    api
      .get("method/webshop.webshop.shopping_cart.cart.get_cart_quotation", {
        params: params,
      })
      .then((res) => res.data),
  update: (cart: Record<string, number | undefined>) =>
    api
      .post("method/webshop.webshop.api.update_cart", { cart })
      .then((res) => res.data),
  list: null,
  create: null,
  delete: null,
};

export const wishlist = {
  list: (params: any) =>
    api
      .get("resource/Wishlist/Administrator", {
        params: params,
      })
      .then((res) => res.data),
  update: (
    action: "add_to_wishlist" | "remove_from_wishlist",
    itemCode: string
  ) =>
    api
      .put(`method/webshop.webshop.doctype.wishlist.wishlist.${action}`, {
        item_code: itemCode,
      })
      .then((res) => res.data),
  create: null,
  get: null,
  delete: null,
};

export default {
  products,
  address,
};
