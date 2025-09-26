import { useFormContext } from "react-hook-form";
import type { Option } from "@/types/common.types";
import { Autocomplete, type AutocompleteCommonProps } from "../ui/autocomplete";
import { FormControl, FormField, FormItem } from "../ui/form";

type RHFAutocompleteProps = AutocompleteCommonProps & {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  className?: string;
};

export default function RHFAutocomplete({
  name,
  required = false,
  className,
  InputProps,
  ...props
}: RHFAutocompleteProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <Autocomplete
              {...field}
              {...props}
              InputProps={{ required, ...InputProps }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
