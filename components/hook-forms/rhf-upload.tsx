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
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

// ----------------------------------------------------------------------

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  label?: string;
}

type FieldProps = ControllerRenderProps<FieldValues, string>;

type Props = React.ComponentProps<"div"> & {
  name: string;
  label?: string;
  accept?: string;
  helperText?: string;
  placeholder?: string;
  placeholderImage?: React.ReactNode;
  required?: boolean;
};

// ----------------------------------------------------------------------

export default function RHFUpload({
  name,
  label = "คลิกเพื่ออัปโหลดรูปภาพ",
  accept = "image/*",
  helperText,
  required = false,
  placeholderImage = (
    <Image
      width={60}
      height={60}
      alt="Image placeholder"
      src="/images/placeholder/car-placeholder.svg"
      className="lg:20 w-10 object-contain md:w-15"
    />
  ),
  className,
  ...other
}: Props) {
  const { control } = useFormContext();
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (
    files: FileList | null,
    field: FieldProps,
    targetSlotId?: string,
  ) => {
    if (!files || files.length === 0) return;

    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach((file, index) => {
      if (newFiles.length >= 1) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedFile: UploadedFile = {
          id: targetSlotId || `${Date.now()}-${index}`,
          file,
          preview: e.target?.result as string,
          label: undefined,
        };

        field.onChange(uploadedFile);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (field: FieldProps) => {
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

  const handleDrop = (
    e: React.DragEvent,
    field: FieldProps,
    targetSlotId?: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files, field, targetSlotId);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        console.log("🚀 ~ RHFUpload ~ field:", field);

        return (
          <FormItem
            className={cn(
              "min-h-[125px] md:min-h-[180px] lg:min-h-[245px]",
              className,
            )}
            {...other}
          >
            <FormControl>
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
                  type="file"
                  accept={accept}
                  onChange={(e) => handleFileUpload(e.target.files, field)}
                  className="hidden"
                  id={`upload-${name}`}
                />
                <div className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center p-4">
                  {field.value ? (
                    <div className="flex flex-wrap gap-2">
                      <Image
                        fill
                        src={field.value.preview}
                        alt="Uploaded file"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      {placeholderImage}
                    </div>
                  )}

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
                  <span className="absolute bottom-2 font-bold text-base text-slate-900 md:bottom-8 md:mt-4 md:text-xl lg:bottom-8 lg:mt-6 lg:text-3xl">
                    {label}
                  </span>
                </div>
              </label>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
