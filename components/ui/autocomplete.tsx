import type { PopoverContentProps } from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronDown, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Option } from "@/types/common.types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command";
import { FormControl } from "./form";
import { Input } from "./input";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { Skeleton } from "./skeleton";

// ----------------------------------------------------------------------

export type AutocompleteCommonProps = {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  PopoverContentProps?: PopoverContentProps;
  InputProps?: React.ComponentProps<"input">;
};

type AutocompleteProps<T extends string> = AutocompleteCommonProps & {
  value: T;
  options: Option[];
  emptyMessage?: string;
  onChange: (value: T) => void;
};

// ----------------------------------------------------------------------

export function Autocomplete<T extends string>({
  value,
  onChange,
  options,
  label,
  loading,
  InputProps,
  disabled,
  PopoverContentProps,
  emptyMessage = "ไม่พบตัวเลือก",
}: AutocompleteProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);

  // Find the selected option based on the value (option.id)
  const selectedOption = useMemo(
    () => options.find((option) => option.id === value),
    [options, value],
  );

  // Filter options based on search input (searching by name)
  const filteredOptions = useMemo(() => {
    if (!searchInput.trim()) {
      return options;
    }

    return options.filter((option) =>
      option.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [options, searchInput]);

  // Reset selection
  const reset = () => {
    onChange("" as T);
    setSearchInput("");
  };

  // Handle selection from dropdown
  const onSelectItem = (selectedId: string) => {
    const selectedOption = options.find((option) => option.id === selectedId);

    if (selectedId === value) {
      // If clicking the same item, reset
      reset();
    } else if (selectedOption) {
      // Update value with option.id and display with option.name
      onChange(selectedId as T);
      setSearchInput(selectedOption.name);
    }
    setOpen(false);
  };

  // Handle input blur - validate that the input matches a valid option name
  const onInputBlur = () => {
    const matchingOption = options.find(
      (option) =>
        option.name.toLowerCase() === searchInput.toLowerCase().trim(),
    );

    if (matchingOption) {
      // If input matches a valid option name, select it
      onChange(matchingOption.id as T);
      setSearchInput(matchingOption.name);
    } else if (selectedOption) {
      // If no match but we have a selected option, revert to selected option name
      setSearchInput(selectedOption.name);
    } else {
      // No match and no selection, clear everything
      reset();
    }
    setOpen(false);
  };

  const handleClickDropdown = () => {
    setOpen((open) => !open);
    inputRef.current?.focus();
  };

  // ----------------------------------------------------------------------

  const renderEndIcon = (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClickDropdown}
      className={cn(
        "flex cursor-pointer items-center justify-center text-gray-500",
        disabled && "cursor-auto opacity-50",
      )}
      aria-label="Toggle dropdown"
    >
      {PopoverContentProps?.side === "right" ? (
        <ChevronRight className="size-4 lg:size-5" />
      ) : (
        <ChevronDown className="size-4 lg:size-5" />
      )}
    </button>
  );

  const renderClearIcon = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        reset();
      }}
      className={cn(
        "flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-200",
        "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1",
        "active:scale-95",
        "dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300",
      )}
      aria-label="Clear selection"
    >
      <X className="h-3 w-3" />
    </button>
  );

  // ----------------------------------------------------------------------

  // Sync search input with selected option display name
  useEffect(() => {
    if (selectedOption) {
      setSearchInput(selectedOption.name);
    } else if (!value) {
      setSearchInput("");
    }
  }, [selectedOption, value]);

  // ----------------------------------------------------------------------

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false} className={InputProps?.className}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchInput}
              onValueChange={selectedOption ? undefined : setSearchInput}
              onKeyDown={(e) =>
                selectedOption ? undefined : setOpen(e.key !== "Escape")
              }
              onMouseDown={() =>
                selectedOption
                  ? undefined
                  : setOpen((open) => !!searchInput || !open)
              }
              onFocus={() => (selectedOption ? undefined : setOpen(true))}
              onBlur={selectedOption ? undefined : onInputBlur}
              className={cn(selectedOption && "cursor-auto")}
            >
              <FormControl>
                <Input
                  ref={inputRef}
                  label={label}
                  value={searchInput}
                  disabled={disabled}
                  readOnly={!!selectedOption}
                  endIcon={searchInput ? renderClearIcon : renderEndIcon}
                  autoComplete="off"
                  placeholder={label}
                  {...InputProps}
                />
              </FormControl>
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault();
              }
            }}
            className="p-0"
            {...PopoverContentProps}
          >
            <CommandList>
              {loading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {filteredOptions.length > 0 && !loading ? (
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={option.id}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                      className="items-center"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {"image" in option && (
                        <Image
                          src={option.image}
                          alt={option.name}
                          width={80}
                          height={80}
                          className="h-auto w-6 object-cover pb-0.5"
                        />
                      )}
                      <p>{option.name}</p>
                      {"count" in option && option.count !== undefined && (
                        <span className="ml-auto font-bold text-base text-gray-600">
                          {option.count}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!loading ? <CommandEmpty>{emptyMessage}</CommandEmpty> : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
