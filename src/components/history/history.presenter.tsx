import { flexRender, Table as TableData } from "@tanstack/react-table";
import { memo } from "react";
import { Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent } from "../ui/card";
import { VStack } from "../ui/vstack";
import TableColumns from "./table-column";
import TablePagination from "./table-pagination";
import TableToolbar from "./table-toolbar";
import { History, User } from "@/types";
import { HStack } from "../ui/hstack";

type HistoryPresenterProps = {
  table: TableData<History["Row"] & { user: User["Row"] | null }>;
  pageIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  isLoadingPage: boolean;
};

const HistoryPresenter = memo(
  ({
    table,
    pageIndex,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    isLoadingPage,
  }: HistoryPresenterProps) => {
    return (
      <VStack className="mt-6 w-full space-y-4 px-8 sm:px-10">
        <TableToolbar table={table} />
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoadingPage ? (
                  <TableRow className="h-[420px]">
                    <TableCell colSpan={TableColumns.length}>
                      <HStack className="w-full items-center justify-center space-x-2 text-neutral-500 dark:text-neutral-400">
                        <Loader2 className="size-4 animate-spin" />
                        <span>読み込み中...</span>
                      </HStack>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="border-b text-brand-900 dark:text-neutral-50"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-[420px]">
                    <TableCell
                      colSpan={TableColumns.length}
                      className="text-center text-sm"
                    >
                      ログが見つかりません。
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <TablePagination
          table={table}
          pageIndex={pageIndex}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </VStack>
    );
  }
);

export default HistoryPresenter;
