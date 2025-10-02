"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  type ControllerRenderProps,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem } from "../ui/form";

// ----------------------------------------------------------------------

type FieldProps = ControllerRenderProps<FieldValues, string>;

type Props = React.ComponentProps<"div"> & {
  name: string;
  label?: string;
  accept?: string;
  helperText?: string;
  placeholder?: string;
  placeholderImage?: string;
  required?: boolean;
};

// ----------------------------------------------------------------------

export default function RHFUpload({
  name,
  label = "คลิกเพื่ออัปโหลดรูปภาพ",
  accept = "image/*",
  helperText,
  required = false,
  placeholderImage,
  className,
  ...other
}: Props) {
  const { control } = useFormContext();
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (files: FileList | null, field: FieldProps) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      if (index > 0) return; // Only handle first file

      // For array fields, just set the File object directly
      field.onChange(file);
    });
  };

  const handleRemoveFile = (field: FieldProps) => {
    // Clean up object URL to prevent memory leaks
    if (field.value instanceof File) {
      const currentUrl = URL.createObjectURL(field.value);
      URL.revokeObjectURL(currentUrl);
    }

    // Reset the file input value to allow re-uploading the same file
    const fileInput = document.getElementById(
      `upload-${name}`,
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    field.onChange(undefined);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, field: FieldProps) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files, field);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const hasFile = !!field.value;
        const previewUrl = hasFile ? URL.createObjectURL(field.value) : null;

        return (
          <FormItem
            className={cn(
              "min-h-[125px] md:min-h-[180px] lg:min-h-[245px]",
              className,
            )}
            {...other}
          >
            <FormControl className={cn(error && "border-red-500")}>
              <label
                htmlFor={`upload-${name}`}
                className={cn(
                  "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 hover:border-gray-400",
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => handleDrop(e, field)}
              >
                <input
                  id={`upload-${name}`}
                  type="file"
                  accept={accept}
                  onChange={(e) => handleFileUpload(e.target.files, field)}
                  className="hidden"
                />
                <div className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center px-2 pt-2 md:px-3 md:pt-3 lg:px-4 lg:pt-4">
                  <div className="relative mb-8 flex h-full w-full justify-center rounded-md md:mb-13 lg:mb-17">
                    {previewUrl ? (
                      <Image
                        fill
                        alt="Uploaded file"
                        src={previewUrl}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <Image
                        fill={!!placeholderImage}
                        width={placeholderImage ? undefined : 80}
                        height={placeholderImage ? undefined : 80}
                        alt="Image placeholder"
                        src={
                          placeholderImage || "/images/placeholder/image.png"
                        }
                        className="w-10 object-contain opacity-60 md:w-15 lg:w-25"
                      />
                    )}
                  </div>

                  {hasFile && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFile(field);
                      }}
                      className="-right-2 -top-2 md:-right-3 md:-top-3 absolute flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 md:h-8 md:w-8"
                    >
                      <X className="h-4 w-4 md:h-6 md:w-6" />
                    </button>
                  )}
                  <span className="absolute bottom-2 font-bold text-base text-slate-900 md:bottom-4 md:text-xl lg:bottom-6 lg:text-3xl">
                    {label}
                  </span>
                </div>
              </label>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}
