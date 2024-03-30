import {
  BaseRecord,
  DataProvider,
  DeleteOneParams,
  DeleteOneResponse,
  LogicalFilter,
  UpdateParams,
  UpdateResponse,
} from "@refinedev/core";
import apis, { auth, cart } from "../client/api";
import { transformArgs } from "./transformArgs";
import { transformRes } from "./transformRes";

export const storeProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    // pagenation
    console.log("ss", pagination);

    const start =
      ((pagination?.current ?? 0) - 1) * (pagination?.pageSize ?? 20);

    // transform args
    const args = transformArgs[resource as keyof typeof transformArgs]?.list({
      resource,
      filters: filters as LogicalFilter[],
      pagination,
      sorters,
    });

    // call api
    const res = await apis[resource as keyof typeof apis]?.list({
      start,
      ...args,
    });

    // return data
    return transformRes[resource as keyof typeof transformRes]?.list(res);
  },
  getMany: async ({ resource, ids, dataProviderName, meta }) => {
    return await apis[resource as keyof typeof apis]?.list?.(ids as string[]);
  },
  getOne: async ({ resource, id, meta }) => {
    return await apis[resource as keyof typeof apis]?.get?.(id as string);
  },
  create: async ({ resource, variables, meta }) => {
    return await apis[resource as keyof typeof apis]?.create?.(variables);
  },
  update: async ({ resource, id, variables, meta }) => {
    return await apis[resource as keyof typeof apis]?.update?.(
      id as string,
      variables
    );
  },
  deleteOne: function <TData extends BaseRecord = BaseRecord>(
    params: DeleteOneParams
  ): Promise<DeleteOneResponse<TData>> {
    throw new Error("Function not implemented.");
  },
  getApiUrl: () => `${import.meta.env.VITE_BACKEND_URL}/api`,
  custom: async ({ url, payload }) => {
    const customMap = {
      update_profile: auth.updateProfile,
      apply_shipping_rule: cart.applyShippingRule,
      apply_coupon_code: cart.applyCouponCode,
      update_cart_address: cart.updateCartAddress,
      place_order: cart.placeOrder,
    };
    return await customMap[url as keyof typeof customMap]?.(payload);
  },
};
