"use client";

import { memo, useState } from "react";
import { useInfiniteOffsetPaginationQuery } from "@supabase-cache-helpers/postgrest-swr";
import {
  VisibilityState,
  ColumnFiltersState,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { createBrowserClient } from "@/functions/browser";
import { getHistories } from "@/functions/query";
import HistoryPresenter from "./history.presenter";
import TableColumns from "./table-column";

type HistoryContainerProps = {
  plantId: number;
};

const HistoryContainer = memo(({ plantId }: HistoryContainerProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });

  const supabase = createBrowserClient();
  const history = useInfiniteOffsetPaginationQuery(
    getHistories(supabase, "plantId", plantId).order("createdAt", {
      ascending: !sorting[0]?.desc,
    }),
    { pageSize: pagination.pageSize }
  );

  const table = useReactTable({
    data: history.currentPage || [],
    columns: TableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    manualPagination: true,
    autoResetPageIndex: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <HistoryPresenter
      table={table}
      pageIndex={history.pageIndex}
      hasNextPage={!!history.nextPage}
      hasPreviousPage={!!history.previousPage}
      nextPage={history.nextPage || (() => {})}
      previousPage={history.previousPage || (() => {})}
      isLoadingPage={history.isValidating}
    />
  );
});

export default HistoryContainer;
