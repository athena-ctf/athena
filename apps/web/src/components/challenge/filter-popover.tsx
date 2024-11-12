import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { cn } from "@repo/ui/lib/utils";

interface FilterOption {
  id: string;
  value: string;
}

interface FilterPopoverProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  options: FilterOption[];
  selected: string[];
  onSelect: (value: string) => void;
  placeholder: string;
  buttonText: string;
}

export function FilterPopover({
  open,
  setOpen,
  options,
  selected,
  onSelect,
  placeholder,
  buttonText,
}: FilterPopoverProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[130px] justify-between"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "Enter") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        >
          {selected.length > 0 ? `${buttonText} (${selected.length})` : buttonText}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No {buttonText} found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((option) => option.value.toLowerCase().includes(inputValue.toLowerCase()))
                .map((option) => (
                  <CommandItem
                    key={option.id || option.value}
                    value={option.value}
                    onSelect={onSelect}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        selected.includes(option.value) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.value}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
