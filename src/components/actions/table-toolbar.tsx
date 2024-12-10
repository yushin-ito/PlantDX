"use client";

import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import { Card, CardContent } from "../ui/card";
import { HStack } from "../ui/hstack";

type TableToolbarProps<TData> = {
  table: Table<TData>;
};

const TableToolbar = <TData,>({ table }: TableToolbarProps<TData>) => {
  return (
    <HStack className="items-center justify-between">
      <Card className="rounded-md">
        <CardContent className="px-2 py-px">
          <HStack className="items-center">
            <Search className="mr-2 size-4 shrink-0 opacity-50" />
            <Input
              placeholder="ログを検索する"
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="flex h-8 w-[200px] border-none px-0 placeholder:text-xs"
            />
          </HStack>
        </CardContent>
      </Card>
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
                  {column.columnDef.meta?.title}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </HStack>
  );
};

export default TableToolbar;
