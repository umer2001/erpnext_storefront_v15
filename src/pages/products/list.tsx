import {
  IResourceComponentsProps,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import CountrySelect from "../../components/CountrySelect";
import StateSelect from "../../components/StateSelect";
import CitySelect from "../../components/CitySelect";
import Cart from "../../components/cart/Cart";
import { useCart } from "../../hooks/useCart";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const [location, setlocation] = useState({
    country: "",
    state: "",
    city: "",
  });
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

  const { show, create } = useNavigation();
  const t = useTranslate();

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    setColumnFilters,
    refineCore: {
      tableQueryResult: { data: tableData },
    },
    getState,
    setPageIndex,
    getCanPreviousPage,
    getPageCount,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable({
    columns,
    initialState: {
      columnFilters: [
        // {
        //   id: "field_filters.item_code",
        //   value: "lhcs3",
        // },
      ],
    },
  });

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
      <Cart />
      <h1>{"List"}</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          Search
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
          />
        </div>
        <button onClick={() => create("blog_posts")}>{t("Create")}</button>
      </div>
      <div style={{ maxWidth: "100%", marginTop: "5%", overflowY: "scroll" }}>
        <table>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <>
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                </tr>
                <tr key={headerGroup.id + "x"}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id + "x"}>
                      {header.column.getCanFilter() ? (
                        <div>
                          <input
                            value={
                              (header.column.getFilterValue() as string) ?? ""
                            }
                            onChange={(e) =>
                              header.column.setFilterValue(e.target.value)
                            }
                          />
                        </div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "12px" }}>
        <button
          onClick={() => setPageIndex(0)}
          disabled={!getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
          {">"}
        </button>
        <button
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
        >
          {">>"}
        </button>
        <span>
          <strong>
            {" "}
            {getState().pagination.pageIndex + 1} / {getPageCount()}{" "}
          </strong>
        </span>
        <span>
          | {"Go"}:{" "}
          <input
            type="number"
            defaultValue={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
          />
        </span>{" "}
        <select
          value={getState().pagination.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {"Show"} {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <h3>Dependent Location Example</h3>
        <CountrySelect
          name="country"
          onChange={(country) =>
            setlocation({ ...location, country: country.value })
          }
          value={location.country}
        />
        <StateSelect
          name="state"
          onChange={(state) => setlocation({ ...location, state: state.value })}
          value={location.state}
          country={location.country}
        />
        <CitySelect
          name="city"
          onChange={(city) => setlocation({ ...location, city: city.value })}
          value={location.city}
          state={location.state}
          country={location.country}
        />
      </div>
    </div>
  );
};
