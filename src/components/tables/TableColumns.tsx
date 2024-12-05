"use client";

import { ColumnDef, Column } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle,
  MoreHorizontal,
  ChevronsUpDown,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { HTMLAttributes } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Log } from "@/types";
import { HStack } from "../ui/hstack";

const statuses = [
  {
    value: "success",
    label: "正常",
    icon: CheckCircle,
  },
  {
    value: "failed",
    label: "異常",
    icon: AlertCircle,
  },
];

type ColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
} & HTMLAttributes<HTMLDivElement>;

const ColumnHeader = <TData, TValue>({
  column,
  title,
}: ColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div>{title}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="-ml-3">
          <span>{title}</span>
          {column.getIsSorted() === "desc" ? (
            <ArrowDown className="size-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="size-4" />
          ) : (
            <ChevronsUpDown className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUp className="size-3.5" />
          昇順
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowDown className="size-3.5" />
          降順
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
          <EyeOff className="size-3.5" />
          非表示
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TableColumns: ColumnDef<Log>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="ml-1 translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="ml-1 translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    meta: {
      title: "日付",
    },
    header: ({ column }) => <ColumnHeader column={column} title="日付" />,
    cell: ({ row }) => (
      <div>{format(new Date(row.getValue("date")), "yyyy/MM/dd HH:mm")}</div>
    ),
  },
  {
    accessorKey: "title",
    meta: {
      title: "内容",
    },
    header: ({ column }) => <ColumnHeader column={column} title="内容" />,
    cell: ({ row }) => {
      return (
        <div className="max-w-[500px] truncate">{row.getValue("title")}</div>
      );
    },
  },
  {
    accessorKey: "command",
    meta: {
      title: "コマンド",
    },
    header: ({ column }) => <ColumnHeader column={column} title="コマンド" />,
    cell: ({ row }) => {
      return <div>{row.getValue("command")}</div>;
    },
  },
  {
    accessorKey: "status",
    meta: {
      title: "ステータス",
    },
    header: ({ column }) => <ColumnHeader column={column} title="ステータス" />,
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <HStack className="items-center space-x-1">
          {status.icon && <status.icon className="size-3.5" />}
          <span>{status.label}</span>
        </HStack>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>編集</DropdownMenuItem>
          <DropdownMenuItem>コピー</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>削除する</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default TableColumns;
