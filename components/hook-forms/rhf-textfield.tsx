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
};

export default function RHFTextField({
  type,
  name,
  label,
  placeholder,
  InputProps,
  required = false,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        let formatValue = field.value;

        if (type === "currency") {
          formatValue = fThousandSeparator(String(field.value));
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
                    // Only allow digits
                    if (!/^\d*$/.test(numericValue)) return;
                    // Store the numeric value without separators
                    field.onChange(numericValue);
                  } else if (type === "number") {
                    // Only allow digits
                    if (!/^\d*$/.test(inputValue)) return;
                    field.onChange(e);
                  } else {
                    field.onChange(e);
                  }
                }}
                required={required}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
