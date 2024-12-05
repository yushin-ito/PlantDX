import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "../ui/button";
import { HStack } from "../ui/hstack";

type TablePaginationProps<TData> = {
  table: Table<TData>;
};

const TablePagination = <TData,>({ table }: TablePaginationProps<TData>) => {
  return (
    <HStack className="items-center justify-between px-2">
      {table.getFilteredSelectedRowModel().rows.length === 0 ? (
        <div />
      ) : (
        <div className="text-xs">
          {table.getFilteredSelectedRowModel().rows.length} 個を選択中
        </div>
      )}
      <HStack className="items-center space-x-6">
        <div className="text-xs">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </div>
        <HStack className="items-center space-x-4">
          <HStack className="items-center space-x-2">
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-4" />
            </Button>
          </HStack>
          <HStack className="items-center space-x-3">
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="size-4" />
            </Button>
          </HStack>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default TablePagination;
