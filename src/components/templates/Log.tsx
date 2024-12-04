"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TablePagination from "../organisms/TablePagination";
import TableToolbar from "../organisms/TableToolbar";
import TableColumns from "../molecules/TableColumns";
import type { Log } from "@/types";
import { Card } from "../ui/card";
import VStack from "../atoms/VStack";

const data = [
  {
    id: 1,
    type: "auto",
    title: "MEOHタンクの容量を取得しました。",
    command: "RDS R313 3",
    status: "success",
    date: "2024-12-01T10:00:00Z",
  },
  {
    id: 2,
    type: "manual",
    title: "温度センサーのステータスを確認しました。",
    command: "RDS R314 5",
    status: "failed",
    date: "2024-12-01T10:05:00Z",
  },
  {
    id: 3,
    type: "auto",
    title: "圧力センサーの値を取得しました。",
    command: "RDS R315 2",
    status: "success",
    date: "2024-12-01T10:10:00Z",
  },
  {
    id: 4,
    type: "manual",
    title: "ポンプの動作を開始しました。",
    command: "RDS R316 1",
    status: "success",
    date: "2024-12-01T10:15:00Z",
  },
  {
    id: 5,
    type: "auto",
    title: "流量計のステータスを確認しました。",
    command: "RDS R317 7",
    status: "failed",
    date: "2024-12-01T10:20:00Z",
  },
  {
    id: 6,
    type: "auto",
    title: "燃料タンクの残量を確認しました。",
    command: "RDS R318 4",
    status: "success",
    date: "2024-12-01T10:25:00Z",
  },
  {
    id: 7,
    type: "manual",
    title: "バルブを閉じる操作を実行しました。",
    command: "RDS R319 6",
    status: "success",
    date: "2024-12-01T10:30:00Z",
  },
  {
    id: 8,
    type: "auto",
    title: "エアフローセンサーの値を取得しました。",
    command: "RDS R320 8",
    status: "failed",
    date: "2024-12-01T10:35:00Z",
  },
  {
    id: 9,
    type: "manual",
    title: "温度制御システムを再起動しました。",
    command: "RDS R321 3",
    status: "success",
    date: "2024-12-01T10:40:00Z",
  },
  {
    id: 10,
    type: "auto",
    title: "圧力タンクの最大値を取得しました。",
    command: "RDS R322 5",
    status: "success",
    date: "2024-12-01T10:45:00Z",
  },
  {
    id: 11,
    type: "manual",
    title: "燃料ポンプの停止を実行しました。",
    command: "RDS R323 1",
    status: "failed",
    date: "2024-12-01T10:50:00Z",
  },
  {
    id: 12,
    type: "auto",
    title: "タンクの温度を取得しました。",
    command: "RDS R324 2",
    status: "success",
    date: "2024-12-01T10:55:00Z",
  },
  {
    id: 13,
    type: "manual",
    title: "センサーのキャリブレーションを開始しました。",
    command: "RDS R325 7",
    status: "success",
    date: "2024-12-01T11:00:00Z",
  },
  {
    id: 14,
    type: "auto",
    title: "オーバーフロー検知を確認しました。",
    command: "RDS R326 3",
    status: "failed",
    date: "2024-12-01T11:05:00Z",
  },
  {
    id: 15,
    type: "manual",
    title: "燃料レベルの更新しました。",
    command: "RDS R327 5",
    status: "success",
    date: "2024-12-01T11:10:00Z",
  },
  {
    id: 16,
    type: "auto",
    title: "エアフロー量を取得しました。",
    command: "RDS R328 4",
    status: "success",
    date: "2024-12-01T11:15:00Z",
  },
  {
    id: 17,
    type: "manual",
    title: "センサーのエラーログを確認しました。",
    command: "RDS R329 6",
    status: "failed",
    date: "2024-12-01T11:20:00Z",
  },
  {
    id: 18,
    type: "auto",
    title: "燃料流量を取得しました。",
    command: "RDS R330 8",
    status: "success",
    date: "2024-12-01T11:25:00Z",
  },
  {
    id: 19,
    type: "manual",
    title: "タンク容量を計測しました。",
    command: "RDS R331 1",
    status: "success",
    date: "2024-12-01T11:30:00Z",
  },
  {
    id: 20,
    type: "auto",
    title: "圧力センサーの動作を確認しました。",
    command: "RDS R332 3",
    status: "failed",
    date: "2024-12-01T11:35:00Z",
  },
  {
    id: 21,
    type: "manual",
    title: "燃料ポンプの起動を確認しました。",
    command: "RDS R333 5",
    status: "success",
    date: "2024-12-01T11:40:00Z",
  },
  {
    id: 22,
    type: "auto",
    title: "温度センサーのキャリブレーションしました。",
    command: "RDS R334 1",
    status: "success",
    date: "2024-12-01T11:45:00Z",
  },
  {
    id: 23,
    type: "manual",
    title: "オーバーフロー警報を確認しました。",
    command: "RDS R335 2",
    status: "failed",
    date: "2024-12-01T11:50:00Z",
  },
  {
    id: 24,
    type: "auto",
    title: "センサーのエラーログを収集しました。",
    command: "RDS R336 6",
    status: "success",
    date: "2024-12-01T11:55:00Z",
  },
  {
    id: 25,
    type: "manual",
    title: "タンクの燃料流量を測定しました。",
    command: "RDS R337 7",
    status: "success",
    date: "2024-12-01T12:00:00Z",
  },
  {
    id: 26,
    type: "auto",
    title: "温度計のステータスを確認しました。",
    command: "RDS R338 3",
    status: "failed",
    date: "2024-12-01T12:05:00Z",
  },
  {
    id: 27,
    type: "manual",
    title: "燃料の最大圧力を測定しました。",
    command: "RDS R339 4",
    status: "success",
    date: "2024-12-01T12:10:00Z",
  },
  {
    id: 28,
    type: "auto",
    title: "圧力ポンプのエラーを確認しました。",
    command: "RDS R340 8",
    status: "failed",
    date: "2024-12-01T12:15:00Z",
  },
  {
    id: 29,
    type: "manual",
    title: "バルブの閉鎖状態を確認しました。",
    command: "RDS R341 1",
    status: "success",
    date: "2024-12-01T12:20:00Z",
  },
  {
    id: 30,
    type: "auto",
    title: "流量計のキャリブレーションを実行しました。",
    command: "RDS R342 2",
    status: "success",
    date: "2024-12-01T12:25:00Z",
  },
  {
    id: 31,
    type: "manual",
    title: "タンクの容量を取得しました。",
    command: "RDS R343 5",
    status: "failed",
    date: "2024-12-01T12:30:00Z",
  },
  {
    id: 32,
    type: "auto",
    title: "燃料センサーの校正しました。",
    command: "RDS R344 6",
    status: "success",
    date: "2024-12-01T12:35:00Z",
  },
  {
    id: 33,
    type: "manual",
    title: "燃料温度の取得しました。",
    command: "RDS R345 4",
    status: "failed",
    date: "2024-12-01T12:40:00Z",
  },
  {
    id: 34,
    type: "auto",
    title: "圧力センサーのリセットしました。",
    command: "RDS R346 3",
    status: "success",
    date: "2024-12-01T12:45:00Z",
  },
  {
    id: 35,
    type: "manual",
    title: "温度センサーのリセットしました。",
    command: "RDS R347 1",
    status: "success",
    date: "2024-12-01T12:50:00Z",
  },
  {
    id: 36,
    type: "auto",
    title: "燃料ポンプの動作確認しました。",
    command: "RDS R348 7",
    status: "failed",
    date: "2024-12-01T12:55:00Z",
  },
  {
    id: 37,
    type: "manual",
    title: "燃料流量センサーの調整しました。",
    command: "RDS R349 2",
    status: "success",
    date: "2024-12-01T13:00:00Z",
  },
  {
    id: 38,
    type: "auto",
    title: "ポンプシステムの状態確認しました。",
    command: "RDS R350 8",
    status: "success",
    date: "2024-12-01T13:05:00Z",
  },
  {
    id: 39,
    type: "manual",
    title: "タンクの温度を計測しました。",
    command: "RDS R351 4",
    status: "failed",
    date: "2024-12-01T13:10:00Z",
  },
  {
    id: 40,
    type: "auto",
    title: "流量計の初期化しました。",
    command: "RDS R352 6",
    status: "success",
    date: "2024-12-01T13:15:00Z",
  },
  {
    id: 41,
    type: "manual",
    title: "燃料の状態を確認しました。",
    command: "RDS R353 3",
    status: "failed",
    date: "2024-12-01T13:20:00Z",
  },
  {
    id: 42,
    type: "auto",
    title: "圧力システムの監視しました。",
    command: "RDS R354 7",
    status: "success",
    date: "2024-12-01T13:25:00Z",
  },
  {
    id: 43,
    type: "manual",
    title: "ポンプの再起動しました。",
    command: "RDS R355 1",
    status: "success",
    date: "2024-12-01T13:30:00Z",
  },
  {
    id: 44,
    type: "auto",
    title: "バルブシステムのチェックしました。",
    command: "RDS R356 2",
    status: "success",
    date: "2024-12-01T13:35:00Z",
  },
  {
    id: 45,
    type: "manual",
    title: "流量計の値を確認しました。",
    command: "RDS R357 8",
    status: "failed",
    date: "2024-12-01T13:40:00Z",
  },
  {
    id: 46,
    type: "auto",
    title: "タンクのエラーチェックしました。",
    command: "RDS R358 5",
    status: "success",
    date: "2024-12-01T13:45:00Z",
  },
  {
    id: 47,
    type: "manual",
    title: "ポンプ操作のテストしました。",
    command: "RDS R359 4",
    status: "failed",
    date: "2024-12-01T13:50:00Z",
  },
  {
    id: 48,
    type: "auto",
    title: "センサーキャリブレーションの実行しました。",
    command: "RDS R360 7",
    status: "success",
    date: "2024-12-01T13:55:00Z",
  },
  {
    id: 49,
    type: "manual",
    title: "燃料システムのエラー取得しました。",
    command: "RDS R361 3",
    status: "failed",
    date: "2024-12-01T14:00:00Z",
  },
  {
    id: 50,
    type: "auto",
    title: "ポンプの圧力を監視しました。",
    command: "RDS R362 1",
    status: "success",
    date: "2024-12-01T14:05:00Z",
  },
] as Log[];

const Log = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 9,
  });

  const table = useReactTable({
    data,
    columns: TableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
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
    <VStack className="mt-4 w-full space-y-4 px-8">
      <TableToolbar table={table} />
      <Card>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
              <TableRow>
                <TableCell
                  colSpan={TableColumns.length}
                  className="h-24 text-center"
                >
                  ログが見つかりません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <TablePagination table={table} />
    </VStack>
  );
};

export default Log;
