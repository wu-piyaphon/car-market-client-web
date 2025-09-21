import { useFormContext } from "react-hook-form";
import type { Option } from "@/types/common.types";
import { Autocomplete, type AutocompleteCommonProps } from "../ui/autocomplete";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

type RHFAutocompleteProps = AutocompleteCommonProps & {
  name: string;
  label: string;
  options: Option[];
  className?: string;
};

export default function RHFAutocomplete({
  name,
  className,
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
            <Autocomplete {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
