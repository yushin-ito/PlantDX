import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../ui/button";
import { HStack } from "../ui/hstack";

type TablePaginationProps<TData> = {
  table: Table<TData>;
  pageIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
};

const TablePagination = <TData,>({
  table,
  pageIndex,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  previousPage,
}: TablePaginationProps<TData>) => {
  return (
    <HStack className="items-start justify-between px-2">
      {table.getFilteredSelectedRowModel().rows.length === 0 ? (
        <div />
      ) : (
        <div className="text-xs">
          {table.getFilteredSelectedRowModel().rows.length} 個を選択中
        </div>
      )}
      <HStack className="items-center space-x-6">
        <div className="text-xs">{pageIndex + 1}ページ目</div>
        <HStack className="items-center space-x-4">
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => previousPage()}
            disabled={!hasPreviousPage}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => nextPage()}
            disabled={!hasNextPage}
          >
            <ChevronRight className="size-4" />
          </Button>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default TablePagination;
