import {
  IResourceComponentsProps,
  useParsed,
  useTranslate,
  useTable,
} from "@refinedev/core";
import React, { useCallback, useEffect } from "react";
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
import ProductCard from "@/components/ProductCard";
import ProductListSkeleton from "@/components/skeletons/ProductListSkeleton";
import { useSearchParams } from "react-router-dom";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const {
    params: { filters, resetPagenation },
  } = useParsed();
  const [_, SetURLSearchParams] = useSearchParams();
  const t = useTranslate();

  const {
    tableQueryResult: { data: tableData, isFetching, isLoading, isRefetching },
    current,
    setCurrent,
    pageCount,
    filters: appliedFilters,
    setFilters,
  } = useTable({
    pagination: {
      pageSize: 2,
    },
  });

  const numberOfLastPageLinks = 4;

  const getCanNextPage = useCallback(
    () => current < pageCount,
    [current, pageCount]
  );

  const nextPage = useCallback(() => {
    console.log({
      current,
      getPageCount: pageCount,
    });

    if (getCanNextPage()) {
      setCurrent((prev) => prev + 1);
    }
  }, [getCanNextPage, setCurrent]);

  const getCanPreviousPage = useCallback(() => current > 1, [current]);

  const previousPage = useCallback(() => {
    if (getCanPreviousPage()) {
      setCurrent((prev) => prev - 1);
    }
  }, [current, setCurrent]);

  useEffect(() => {
    if (filters?.length) {
      // compare filters with appliedFilters
      // if they are not equal then update the filters
      if (JSON.stringify(filters) !== JSON.stringify(appliedFilters)) {
        setFilters(filters);
      }
    }

    if (resetPagenation == 1) {
      setCurrent(1);
      SetURLSearchParams({
        resetPagenation: "0",
      });
    }
  }, [filters, resetPagenation]);

  return (
    <div style={{ padding: "16px" }}>
      <h1 className="text-3xl font-semibold text-center">
        {t("All products")}
      </h1>
      <div className="flex justify-between items-center">
        <div>
          <strong>{t("All products")}</strong> ({tableData?.total})
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
      {isFetching || isLoading || isRefetching ? (
        <ProductListSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-1 my-4">
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
              {pageCount > numberOfLastPageLinks &&
                Array.from({
                  length: 4,
                }).map((_, index) => {
                  return (
                    <PaginationItem key={index} className="hidden md:block">
                      <PaginationLink
                        onClick={() => setCurrent(index + 1)}
                        disabled={current === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              {pageCount > numberOfLastPageLinks && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {pageCount > numberOfLastPageLinks &&
                Array.from({
                  length: 4,
                }).map((_, index) => {
                  return (
                    <PaginationItem key={index} className="hidden md:block">
                      <PaginationLink
                        onClick={() =>
                          setCurrent(
                            pageCount - (numberOfLastPageLinks - 1) + index
                          )
                        }
                        disabled={
                          current ===
                          pageCount - (numberOfLastPageLinks - 1) + index
                        }
                      >
                        {pageCount - (numberOfLastPageLinks - 1) + index}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              <PaginationItem>
                <PaginationNext
                  onClick={nextPage}
                  disabled={!getCanNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};
