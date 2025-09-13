import { useFormContext } from "react-hook-form";
import type { Option } from "@/types/common.types";
import { Autocomplete } from "../ui/autocomplete";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

type Props = React.ComponentProps<"div"> & {
  name: string;
  label: string;
  options: Option[];
  InputProps?: React.ComponentProps<"input">;
  placeholder?: string;
  disabled?: boolean;
};

export default function RHFAutocomplete({
  name,
  label,
  placeholder,
  options,
  InputProps,
  disabled,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem {...other}>
          <FormControl>
            <Autocomplete
              label={label}
              options={options}
              value={field.value}
              onChange={field.onChange}
              InputProps={InputProps}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
