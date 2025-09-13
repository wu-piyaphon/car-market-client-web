import { useFormContext } from "react-hook-form";
import type { Option } from "@/types/common.types";
import { Autocomplete, type AutocompleteCommonProps } from "../ui/autocomplete";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

type RHFAutocompleteProps = AutocompleteCommonProps & {
  name: string;
  label: string;
  options: Option[];
};

export default function RHFAutocomplete({
  name,
  ...props
}: RHFAutocompleteProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Autocomplete {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
