import type { PopoverContentProps } from "@radix-ui/react-popover";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "../input";

type FieldPopoverProps = {
  label: string;
  children: React.ReactNode;
  InputProps?: React.ComponentProps<"input">;
  PopoverContentProps?: PopoverContentProps;
};

export default function FieldPopover({
  label,
  children,
  InputProps,
  PopoverContentProps,
}: FieldPopoverProps) {
  const [open, setOpen] = useState(false);

  const { className: InputClassName, ...otherInputProps } = InputProps || {};
  const { className: PopoverContentClassName, ...otherPopoverContentProps } =
    PopoverContentProps || {};

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative">
        <Input
          label={label}
          className={cn("cursor-pointer caret-transparent", InputClassName)}
          {...otherInputProps}
        />
        <div className="-translate-y-1/2 absolute top-1/2 right-3 cursor-pointer">
          {PopoverContentProps?.side === "right" ? (
            <ChevronRight className="size-4 lg:size-6" />
          ) : (
            <ChevronDown className="size-4 lg:size-6" />
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
