import { useFormContext } from "react-hook-form";
import {
  fThousandSeparator,
  removeThousandSeparator,
} from "@/lib/format-string";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

type Props = React.ComponentProps<"div"> & {
  type?: "number" | "currency";
  name: string;
  label: string;
  placeholder?: string;
  InputProps?: React.ComponentProps<"input">;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string | string[]) => void;
  value?: string | string[];
};

export default function RHFTextField({
  type,
  name,
  label,
  placeholder,
  InputProps,
  required = false,
  disabled = false,
  onChange,
  value,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        let formatValue = value ?? field.value;

        if (type === "currency") {
          formatValue = fThousandSeparator(String(formatValue || ""));
        }

        return (
          <FormItem {...other}>
            <FormControl>
              <Input
                {...field}
                {...InputProps}
                label={label}
                value={formatValue}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  if (type === "currency") {
                    // Remove thousand separators for validation
                    const numericValue = removeThousandSeparator(inputValue);
                    // Only allow digits and decimal point (with at most one decimal point)
                    if (!/^\d*\.?\d*$/.test(numericValue)) return;
                    // Store the numeric value without separators
                    field.onChange(numericValue);
                    if (onChange) onChange(numericValue);
                  } else if (type === "number") {
                    // Only allow digits
                    if (!/^\d*$/.test(inputValue)) return;
                    field.onChange(e);
                    if (onChange) onChange(inputValue);
                  } else {
                    field.onChange(e);
                    if (onChange) onChange(inputValue);
                  }
                }}
                required={required}
                disabled={disabled}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
