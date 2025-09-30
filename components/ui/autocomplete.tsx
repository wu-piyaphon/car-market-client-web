import type { PopoverContentProps } from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
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

  const selectedOption = useMemo(
    () => options.find((option) => option.name === value),
    [options, value],
  );

  const filterOptions = useMemo(() => {
    if (!searchInput) {
      return options;
    }

    if (selectedOption && searchInput?.trim() === value) {
      return options;
    }

    return options.filter((option) =>
      option.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [options, searchInput, selectedOption, value]);

  const reset = () => {
    onChange("" as T);
    setSearchInput("");
  };

  const onInputBlur = () => {
    if (!selectedOption || selectedOption.name !== searchInput) {
      reset();
    }
    setOpen(false);
  };

  const onSelectItem = (inputValue: string) => {
    if (inputValue === value) {
      reset();
    } else {
      onChange(inputValue as T);
      setSearchInput(inputValue);
    }
    setOpen(false);
  };

  const handleClickDropdown = () => {
    setOpen((open) => !open);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!value) {
      setSearchInput("");
      return;
    }

    setSearchInput(value);
  }, [value]);

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false} className={InputProps?.className}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchInput}
              onValueChange={setSearchInput}
              onKeyDown={(e) => setOpen(e.key !== "Escape")}
              onMouseDown={() => setOpen((open) => !!searchInput || !open)}
              onFocus={() => setOpen(true)}
              onBlur={onInputBlur}
            >
              <FormControl>
                <Input
                  ref={inputRef}
                  label={label}
                  value={searchInput}
                  disabled={disabled}
                  endIcon={
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={handleClickDropdown}
                      className={cn(
                        "flex cursor-pointer items-center justify-center",
                        disabled && "opacity-50",
                      )}
                      aria-label="Toggle dropdown"
                    >
                      {PopoverContentProps?.side === "right" ? (
                        <ChevronRight className="size-4 lg:size-6" />
                      ) : (
                        <ChevronDown className="size-4 lg:size-6" />
                      )}
                    </button>
                  }
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
              {filterOptions.length > 0 && !loading ? (
                <CommandGroup>
                  {filterOptions.map((option) => (
                    <CommandItem
                      key={option.name}
                      value={option.name}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={onSelectItem}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.name ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {"image" in option && (
                        <Image
                          src={option.image}
                          alt={option.name}
                          width={80}
                          height={80}
                          className="h-auto w-6 object-cover"
                        />
                      )}
                      <p className="mt-0.75">{option.name}</p>
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
