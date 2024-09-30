"use client";

import type { Table } from "@tanstack/react-table";
import {
  DataTableFacetedFilter,
  type DataTableFacetedFilterProps,
} from "@ui/components/data-table-faceted-filter";
import { DataTableViewOptions } from "@ui/components/data-table-view-options";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { X } from "lucide-react";
import React from "react";
import { type ReactNode, useState } from "react";

interface DataTableToolbarProps<TData, TValue> {
  table: Table<TData>;
  filters: (DataTableFacetedFilterProps<TData, TValue> & {
    colName: string;
  })[];
  actionButton: ReactNode;
  searchableColumns: string[];
}

export function DataTableToolbar<TData, TValue>({
  table,
  filters,
  actionButton,
  searchableColumns,
}: DataTableToolbarProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [columnName, setColumnName] = useState<string>(
    searchableColumns[0] ?? "",
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length ? (
          <>
            <Select onValueChange={setColumnName}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a column" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Columns</SelectLabel>
                  {searchableColumns.map((searchableColumn) => (
                    <SelectItem value={searchableColumn} key={searchableColumn}>
                      {searchableColumn}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              placeholder="Filter column..."
              value={
                (table.getColumn(columnName)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(columnName)?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />
          </>
        ) : (
          <></>
        )}

        {filters.map(
          (filter) =>
            table.getColumn(filter.colName) && (
              <DataTableFacetedFilter
                column={table.getColumn(filter.colName)}
                title={filter.title}
                options={filter.options}
                key={filter.colName}
              />
            ),
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {actionButton}
      <DataTableViewOptions table={table} />
    </div>
  );
}
