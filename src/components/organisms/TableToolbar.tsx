"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import HStack from "../atoms/HStack";

type TableToolbarProps<TData> = {
  table: Table<TData>;
};

const TableToolbar = <TData,>({ table }: TableToolbarProps<TData>) => {
  return (
    <HStack className="items-center justify-between">
      <Input
        placeholder="ログを検索する"
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[200px] placeholder:text-xs dark:bg-neutral-950 dark:text-neutral-50"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            表示項目
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {typeof column.columnDef.header}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </HStack>
  );
};

export default TableToolbar;
