import type { PopoverContentProps } from "@radix-ui/react-popover";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fCurrency } from "@/lib/format-string";
import type { CarFilterSchema } from "@/lib/schemas/car-filter-schema";
import { cn } from "@/lib/utils";
import { Input } from "../input";

type FieldPopoverProps = {
  type: "PRICE" | "MILEAGE";
  label: string;
  children: React.ReactNode;
  InputProps?: React.ComponentProps<"input">;
  PopoverContentProps?: PopoverContentProps;
};

export default function FieldPopover({
  type,
  label,
  children,
  InputProps,
  PopoverContentProps,
}: FieldPopoverProps) {
  const [open, setOpen] = useState(false);

  const { control } = useFormContext<CarFilterSchema>();

  const [minPrice, maxPrice, minMileage, maxMileage] = useWatch({
    control,
    name: ["minPrice", "maxPrice", "minMileage", "maxMileage"],
  });

  const displayValue = useMemo(() => {
    if (type === "PRICE") {
      if (!minPrice && !maxPrice) return "";

      return `${fCurrency(minPrice || 0)} ${maxPrice ? `- ${fCurrency(maxPrice)}` : ""}`;
    }

    if (!minMileage && !maxMileage) return "";
    return `${fCurrency(minMileage || 0)} ${maxMileage ? `- ${fCurrency(maxMileage)}` : ""}`;
  }, [minPrice, maxPrice, minMileage, maxMileage, type]);

  const { className: InputClassName, ...otherInputProps } = InputProps || {};
  const { className: PopoverContentClassName, ...otherPopoverContentProps } =
    PopoverContentProps || {};

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative">
        <Input
          label={label}
          value={displayValue}
          readOnly
          className={cn("cursor-pointer caret-transparent", InputClassName)}
          {...otherInputProps}
        />
        <div className="-translate-y-1/2 absolute top-1/2 right-3 cursor-pointer text-gray-500">
          {PopoverContentProps?.side === "right" ? (
            <ChevronRight className="size-4 lg:size-5" />
          ) : (
            <ChevronDown className="size-4 lg:size-5" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-fit p-2", PopoverContentClassName)}
        {...otherPopoverContentProps}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
