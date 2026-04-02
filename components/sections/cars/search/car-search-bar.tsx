"use client";

import { Search } from "lucide-react";
import RHFTextField from "@/components/hook-forms/rhf-textfield";

// ----------------------------------------------------------------------

type CarSearchBarProps = {
  onSearch: (key: string, value: string | string[]) => void;
  InputProps?: React.ComponentProps<"input">;
};

// ----------------------------------------------------------------------

export default function CarSearchBar({
  onSearch,
  InputProps,
}: CarSearchBarProps) {
  return (
    <div className="relative">
      <RHFTextField
        name="keyword"
        label="ค้นหารุ่น หรือทะเบียนรถ"
        InputProps={{
          ...InputProps,
          className: `${InputProps?.className ?? ""} pr-10`,
        }}
        onChange={(val) => onSearch("keyword", val as string)}
      />
      <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 h-5 w-5 text-muted-foreground" />
    </div>
  );
}
