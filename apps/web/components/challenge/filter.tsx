"use client";

import type { components } from "@repo/api";
import { Button } from "@ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { cn } from "@ui/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { useState } from "react";

export function MainChallengesFilter({
  tag,
}: { tag: components["schemas"]["TagModel"][] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] justify-between"
        >
          {value ? tag.find((tag) => tag.value === value)?.value : "Filter"}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Filter..." />
          <CommandList>
            <CommandEmpty>No Filter found.</CommandEmpty>
            <CommandGroup>
              {tag.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === tag.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {tag.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function MobileChallengesFilter({
  tag,
}: { tag: components["schemas"]["TagModel"][] }) {
  const [openFilter1, setOpenFilter1] = useState(false);
  const [openFilter2, setOpenFilter2] = useState(false);
  const [valueFilter1, setValueFilter1] = useState("");
  const [valueFilter2, setValueFilter2] = useState("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <Popover open={openFilter1} onOpenChange={setOpenFilter1}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openFilter1}
              className="w-[100px] justify-between"
            >
              {valueFilter1
                ? tag.find((tag) => tag.value === valueFilter1)?.value
                : "Filter"}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Filter..." />
              <CommandList>
                <CommandEmpty>No Filter found.</CommandEmpty>
                <CommandGroup>
                  {tag.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      value={tag.value}
                      onSelect={(currentValue) => {
                        setValueFilter1(
                          currentValue === valueFilter1 ? "" : currentValue,
                        );
                        setOpenFilter1(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          valueFilter1 === tag.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {tag.value}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={openFilter2} onOpenChange={setOpenFilter2}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openFilter2}
              className="w-[100px] justify-between"
            >
              {valueFilter2
                ? tag.find((tag) => tag.value === valueFilter2)?.value
                : "Filter"}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Filter..." />
              <CommandList>
                <CommandEmpty>No Filter found.</CommandEmpty>
                <CommandGroup>
                  {tag.map((tag) => (
                    <CommandItem
                      key={tag.id}
                      value={tag.value}
                      onSelect={(currentValue) => {
                        setValueFilter2(
                          currentValue === valueFilter2 ? "" : currentValue,
                        );
                        setOpenFilter2(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          valueFilter2 === tag.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {tag.value}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
