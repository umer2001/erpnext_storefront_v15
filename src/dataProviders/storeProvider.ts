import {
  BaseRecord,
  DataProvider,
  DeleteOneParams,
  DeleteOneResponse,
  LogicalFilter,
  UpdateParams,
  UpdateResponse,
} from "@refinedev/core";
import apis from "../client/api";
import { transformArgs } from "./transformArgs";
import { transformRes } from "./transformRes";

export const storeProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    // pagenation
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
  getOne: async ({ resource, id, meta }) => {
    return await apis[resource as keyof typeof apis]?.get?.(id as string);
  },
  create: async ({ resource, variables, meta }) => {
    return await apis[resource as keyof typeof apis]?.create?.(variables);
  },
  update: function <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateParams<TVariables>
  ): Promise<UpdateResponse<TData>> {
    throw new Error("Function not implemented.");
  },
  deleteOne: function <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: DeleteOneParams<TVariables>
  ): Promise<DeleteOneResponse<TData>> {
    throw new Error("Function not implemented.");
  },
  getApiUrl: () => `${import.meta.env.VITE_BACKEND_URL}/api`,
};
