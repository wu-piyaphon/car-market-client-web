import { useFormContext } from "react-hook-form";
import type { Option } from "@/types/common.types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

// ----------------------------------------------------------------------

type Props = React.ComponentProps<"div"> & {
  name: string;
  options: Option[];
  label?: string;
  row?: boolean;
};

// ----------------------------------------------------------------------

export default function RHFRadioGroup({
  name,
  label,
  options,
  row = false,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem {...other}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className={
                row
                  ? "mt-4 mb-5 flex flex-row flex-wrap gap-6 md:mt-4"
                  : "grid gap-3"
              }
            >
              {options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.id}
                    id={`${name}-${option.id}`}
                  />
                  <label
                    htmlFor={`${name}-${option.id}`}
                    className="cursor-pointer text-xl leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-3xl"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
