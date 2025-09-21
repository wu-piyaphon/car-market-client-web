import type React from "react";
import type { ComponentProps } from "react";
import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from "react-hook-form";

type Props<T> = ComponentProps<"form"> & {
  methods: UseFormReturn<T & FieldValues>;
  onSubmit?: () => void;
  children: React.ReactNode;
};

export default function Form<T>({
  methods,
  onSubmit,
  children,
  ...props
}: Props<T>) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (onSubmit) {
            onSubmit();
          }
        }}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}
