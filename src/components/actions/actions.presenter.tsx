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
import { Action } from "@/types";
import { HStack } from "../ui/hstack";

type ActionsPresenterProps = {
  table: TableData<Action["Row"]>;
  pageIndex: number;
  nextPage: (() => void) | null;
  previousPage: (() => void) | null;
  isLoadingPage: boolean;
};

const ActionsPresenter = memo(
  ({
    table,
    pageIndex,
    nextPage,
    previousPage,
    isLoadingPage,
  }: ActionsPresenterProps) => {
    return (
      <VStack className="mt-6 w-full space-y-4 px-10">
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
                        <TableCell key={cell.id}>
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
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </VStack>
    );
  }
);

export default ActionsPresenter;
