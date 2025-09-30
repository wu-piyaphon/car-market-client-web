import type React from "react";

type CarListTriggerProps = {
  ref: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
};

export default function CarListTrigger({
  ref,
  isLoading,
}: CarListTriggerProps) {
  return (
    <div
      ref={ref}
      className="col-span-2 flex justify-center py-4 lg:col-span-4"
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-md text-muted-foreground md:text-lg">
            กำลังโหลดเพิ่มเติม...
          </span>
        </div>
      ) : (
        <div className="text-md text-muted-foreground md:text-lg">
          เลื่อนลงเพื่อดูเพิ่มเติม
        </div>
      )}
    </div>
  );
}
