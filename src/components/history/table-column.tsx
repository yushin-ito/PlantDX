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
import { History, User } from "@/types";
import { HStack } from "../ui/hstack";

const statuses = {
  success: {
    label: "正常",
    icon: CheckCircle,
  },
  failed: {
    label: "異常",
    icon: AlertCircle,
  },
};

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

const TableColumns: ColumnDef<History["Row"] & { user: User["Row"] | null }>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          className="ml-1 border-brand-900 shadow-none dark:border-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="ml-1 border-brand-900 shadow-none dark:border-white"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "createdAt",
      meta: { title: "日付" },
      header: ({ column }) => <ColumnHeader column={column} title="日付" />,
      cell: ({ row }) => (
        <div>
          {format(new Date(row.getValue("createdAt")), "yyyy/MM/dd HH:mm")}
        </div>
      ),
    },
    {
      accessorKey: "content",
      meta: { title: "内容" },
      header: ({ column }) => <ColumnHeader column={column} title="内容" />,
      cell: ({ row }) => {
        return (
          <div className="min-w-[100px] max-w-[300px] truncate">
            {row.getValue("content")}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "command",
      meta: { title: "コマンド" },
      header: ({ column }) => <ColumnHeader column={column} title="コマンド" />,
      cell: ({ row }) => {
        return <div className="min-w-[80px]">{row.getValue("command")}</div>;
      },
      enableSorting: false,
    },
    {
      accessorKey: "user",
      meta: { title: "操作者" },
      accessorFn: (row) => row.user?.name || "退会済みユーザー",
      header: ({ column }) => <ColumnHeader column={column} title="操作者" />,
      cell: ({ row }) => {
        return <div className="min-w-[60px]">{row.getValue("user")}</div>;
      },
      enableSorting: false,
    },
    {
      accessorKey: "status",
      meta: { title: "ステータス" },
      header: ({ column }) => (
        <ColumnHeader column={column} title="ステータス" />
      ),
      cell: ({ row }) => {
        const status =
          statuses[row.getValue("status") as keyof typeof statuses];

        if (!status) {
          return null;
        }

        return (
          <HStack className="min-w-[60px] items-center space-x-1">
            {status.icon && <status.icon className="size-3.5" />}
            <span>{status.label}</span>
          </HStack>
        );
      },
      enableSorting: false,
    },

    {
      id: "menu",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="-mr-2.5 size-8 p-0">
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
