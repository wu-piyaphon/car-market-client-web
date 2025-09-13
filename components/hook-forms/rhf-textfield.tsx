import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

type Props = React.ComponentProps<"div"> & {
  name: string;
  label: string;
  placeholder?: string;
  InputProps?: React.ComponentProps<"input">;
};

export default function RHFTextField({
  name,
  label,
  placeholder,
  InputProps,
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
            <Input {...field} {...InputProps} label={label} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
