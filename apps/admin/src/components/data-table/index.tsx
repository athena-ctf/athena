import type { FacetedFilterProps } from "@/components/data-table/faceted-filter";
import { Pagination } from "@/components/data-table/pagination";
import { Toolbar } from "@/components/data-table/toolbar";
import type { ToolbarActionProps } from "@/components/data-table/toolbar-action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters: (Omit<FacetedFilterProps<TData, TValue>, "column"> & { columnName: string })[];
  search?: string;
  actions: ToolbarActionProps[];
}

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    dateStyle: string;
    setDateStyle: (value: string) => void;
    removeRow(rowIndex: number): void;
    updateRow(newData: TData, rowIndex: number): void;
  }
}

export function DataTable<TData, TValue>({
  columns,
  data: _data,
  filters,
  search,
  actions,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState(_data);
  const [dateStyle, setDateStyle] = useState("relative");

  useEffect(() => {
    setData(_data);
  }, [_data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      dateStyle,
      setDateStyle(value) {
        setDateStyle(value);
      },
      removeRow(rowIndex) {
        setData((old) => old.filter((_, index) => index !== rowIndex));
      },
      updateRow(newData, rowIndex) {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return newData;
            }
            return row;
          }),
        );
      },
    },
  });

  return (
    <div className="space-y-4">
      <Toolbar
        table={table}
        filters={filters.map((filter) => ({
          ...filter,
          column: table.getColumn(filter.columnName)!,
        }))}
        search={search}
        actions={actions}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} />
    </div>
  );
}
