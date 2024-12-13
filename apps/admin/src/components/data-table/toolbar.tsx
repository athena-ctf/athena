import { FacetedFilter, type FacetedFilterProps } from "@/components/data-table/faceted-filter";
import { ViewOptions } from "@/components/data-table/view-options";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

interface ToolbarProps<TData, TValue> {
  table: Table<TData>;
  filters: FacetedFilterProps<TData, TValue>[];
}

export function Toolbar<TData, TValue>({ table, filters }: ToolbarProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters.map((filter) => (
          <FacetedFilter key={filter.title} {...filter} />
        ))}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <ViewOptions table={table} />
    </div>
  );
}
