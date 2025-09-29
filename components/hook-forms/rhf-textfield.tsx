import { useFormContext } from "react-hook-form";
import {
  fThousandSeparator,
  removeThousandSeparator,
} from "@/lib/format-string";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

type Props = React.ComponentProps<"div"> & {
  name: string;
  label: string;
  placeholder?: string;
  InputProps?: React.ComponentProps<"input">;
  isNumeric?: boolean;
  required?: boolean;
};

export default function RHFTextField({
  name,
  label,
  placeholder,
  InputProps,
  isNumeric = false,
  required = false,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const formatValue =
          isNumeric && field.value
            ? fThousandSeparator(String(field.value))
            : field.value;

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

                  if (isNumeric) {
                    // Remove thousand separators for validation
                    const numericValue = removeThousandSeparator(inputValue);

                    // Only allow digits
                    if (!/^\d*$/.test(numericValue)) {
                      return;
                    }

                    // Store the numeric value without separators
                    field.onChange(numericValue);
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
