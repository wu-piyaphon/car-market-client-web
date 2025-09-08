import type React from "react";
import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from "react-hook-form";

type Props<T> = {
  methods: UseFormReturn<T & FieldValues>;
  onSubmit?: () => void;
  children: React.ReactNode;
};

export default function Form<T>({ methods, onSubmit, children }: Props<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
}
