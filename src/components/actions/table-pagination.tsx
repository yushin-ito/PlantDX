import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../ui/button";
import { HStack } from "../ui/hstack";

type TablePaginationProps<TData> = {
  table: Table<TData>;
  pageIndex: number;
  nextPage: (() => void) | null;
  previousPage: (() => void) | null;
};

const TablePagination = <TData,>({
  table,
  pageIndex,
  nextPage,
  previousPage,
}: TablePaginationProps<TData>) => {
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
          {pageIndex + 1}ページ目
        </div>
        <HStack className="items-center space-x-4">
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => previousPage && previousPage()}
            disabled={!previousPage}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => nextPage && nextPage()}
            disabled={!nextPage}
          >
            <ChevronRight className="size-4" />
          </Button>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default TablePagination;
