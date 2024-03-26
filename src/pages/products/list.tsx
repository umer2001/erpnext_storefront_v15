import {
  IResourceComponentsProps,
  useNavigation,
  useParsed,
  useTranslate,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCart } from "../../hooks/useCart";
import ProductCard from "@/components/ProductCard";
import { useParams } from "react-router-dom";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const { addToCart, removeFromCart } = useCart();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "item_code",
        header: "ID",
      },
      {
        id: "title",
        accessorKey: "item_name",
        header: "Title",
      },
      {
        id: "field_filters.item_group",
        accessorKey: "item_group",
        header: "Item Group",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "price",
        accessorKey: "price_list_rate",
        header: "Price",
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "item_code",
        cell: function render({ getValue }) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              <button
                onClick={() => {
                  show("products", getValue() as string);
                }}
              >
                Details
              </button>
              <button
                onClick={() => {
                  addToCart(getValue() as string);
                }}
              >
                Add to cart
              </button>
              <button
                onClick={() => {
                  removeFromCart(getValue() as string);
                }}
              >
                Remove from cart
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const { show } = useNavigation();
  const t = useTranslate();

  const {
    setOptions,
    refineCore: {
      tableQueryResult: { data: tableData },
    },
    getState,
    setPageIndex,
    getCanPreviousPage,
    getCanNextPage,
    nextPage,
    previousPage,
    setColumnFilters,
  } = useTable({
    columns,
    pageCount: 10,
    initialState: {
      pagination: {
        pageSize: 12,
        pageIndex: undefined,
      },
      // columnFilters: [
      //   // {
      //   //   id: "item_group",
      //   //   value: params?.categoryId,
      //   // },
      // ],
    },
  });

  const getPageCount = useCallback(
    () => Math.ceil((tableData?.total ?? 10) / getState().pagination.pageSize),
    [tableData, getState().pagination.pageSize]
  );

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      productData: tableData?.data ?? [],
    },
  }));

  const currentFilterValues = useMemo(() => {
    // Filters can be a LogicalFilter or a ConditionalFilter. ConditionalFilter not have field property. So we need to filter them.
    // We use flatMap for better type support.
    const logicalFilters = getState().columnFilters.flatMap((item) =>
      "id" in item ? item : []
    );

    return {
      search:
        (logicalFilters.find((item) => item.id === "search")
          ?.value as string) ?? "",
    };
  }, [getState().columnFilters]);

  return (
    <div style={{ padding: "16px" }}>
      <h1 className="text-3xl font-semibold text-center">
        {t("All products")}
      </h1>
      <div className="flex justify-between items-center">
        <div>
          <strong>{t("All products")}</strong> ({tableData?.total})
          {/* Search
          <input
            placeholder="Search by title"
            value={currentFilterValues.search}
            onChange={(e) => {
              setColumnFilters([
                {
                  id: "search",
                  value: e.target.value,
                },
              ]);
            }}
          /> */}
        </div>
        <div className="flex items-center gap-4">
          <strong>{t("Sort by")}</strong>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{t("Default")}</SelectItem>
              <SelectItem value="dark">{t("Price High to Low")}</SelectItem>
              <SelectItem value="system">{t("Price Low to High")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mx-1 my-4">
        {tableData?.data.map((item) => (
          <ProductCard
            key={item.item_code}
            itemCode={item.item_code}
            name={item.item_name}
            price={item.formatted_price}
            image={item.website_image ?? "https://via.placeholder.com/341"}
            width={341}
            height={341}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              title="Previous Page"
              onClick={() => previousPage()}
              disabled={!getCanPreviousPage()}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => setPageIndex(0)}
              disabled={!getCanPreviousPage()}
            >
              1
            </PaginationLink>
          </PaginationItem>
          {getPageCount() > 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {
            // @ts-ignore
            Array.from({
              length: getPageCount() > 4 ? 4 : getPageCount() - 1,
            }).map((_, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() =>
                      setPageIndex(
                        getPageCount() > 4
                          ? getPageCount() - 4 + index
                          : index + 1
                      )
                    }
                    disabled={
                      getState().pagination.pageIndex + 1 ===
                      (getPageCount() > 4
                        ? getPageCount() - 3 + index
                        : index + 1)
                    }
                  >
                    {getPageCount() > 4
                      ? getPageCount() - 3 + index
                      : index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })
          }
          <PaginationItem>
            <PaginationNext
              onClick={() => nextPage()}
              disabled={!getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
