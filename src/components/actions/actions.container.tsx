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
import { getActions } from "@/functions/query";
import ActionsPresenter from "./actions.presenter";
import TableColumns from "./table-column";

type ActionsContainerProps = {
  plantId: number;
};

const ActionsContainer = memo(({ plantId }: ActionsContainerProps) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const supabase = createBrowserClient();
  const actions = useInfiniteOffsetPaginationQuery(
    getActions(supabase, "plantId", plantId).order("createdAt", {
      ascending: !sorting[0]?.desc,
    }),
    { pageSize: pagination.pageSize }
  );

  const table = useReactTable({
    data: actions.currentPage || [],
    columns: TableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    autoResetPageIndex: false,
    autoResetExpanded: false,
    enableRowSelection: true,
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
    <ActionsPresenter
      table={table}
      pageIndex={actions.pageIndex}
      nextPage={actions.nextPage}
      previousPage={actions.previousPage}
      isLoadingPage={actions.isValidating}
    />
  );
});

export default ActionsContainer;
