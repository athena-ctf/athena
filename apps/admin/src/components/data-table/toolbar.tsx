import { FacetedFilter, type FacetedFilterProps } from "@/components/data-table/faceted-filter";
import { ViewOptions } from "@/components/data-table/view-options";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import type { Table } from "@tanstack/react-table";
import { type LucideIcon, X } from "lucide-react";

export interface ToolbarAction {
  label: string;
  action: () => void;
  icon: LucideIcon;
}

interface ToolbarProps<TData, TValue> {
  table: Table<TData>;
  filters: FacetedFilterProps<TData, TValue>[];
  search?: string;
  actions: ToolbarAction[];
}

export function Toolbar<TData, TValue>({
  table,
  filters,
  search,
  actions,
}: ToolbarProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {search && (
          <Input
            placeholder="Search..."
            value={(table.getColumn(search)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(search)?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
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
      <div className="flex items-center space-x-2">
        {actions.map((action) => (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            key={action.label}
            onClick={() => action.action()}
          >
            <action.icon className="mr-2 h-4 w-4" />
            {action.label}
          </Button>
        ))}
        <ViewOptions table={table} />
      </div>
    </div>
  );
}
