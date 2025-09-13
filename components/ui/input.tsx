import type * as React from "react";

import { cn } from "@/lib/utils";
import { FormLabel } from "./form";

type Props = React.ComponentProps<"input"> & {
  label?: string;
  endIcon?: React.ReactNode;
};

function Input({ className, value, label, type, endIcon, ...props }: Props) {
  return (
    <div className="relative">
      {!!value && (
        <FormLabel
          className={cn(
            "absolute top-1.5 left-3 lg:top-2",
            value ? "text-sm lg:text-lg" : "text-base lg:text-lg",
          )}
        >
          {label}
        </FormLabel>
      )}
      <input
        value={value}
        type={type}
        data-slot="input"
        placeholder={label}
        className={cn(
          "flex h-12 w-full min-w-0 rounded-md border border-input bg-transparent px-3 shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 lg:h-15 dark:bg-input/30",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          value ? "pt-3 text-sm lg:pt-5 lg:text-lg" : "text-base lg:text-lg",
          className,
        )}
        {...props}
      />
      {endIcon && (
        <div className="-translate-y-1/2 absolute top-1/2 right-3">
          {endIcon}
        </div>
      )}
    </div>
  );
}

export { Input };
