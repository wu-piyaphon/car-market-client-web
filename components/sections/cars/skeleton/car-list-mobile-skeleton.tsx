import { Skeleton } from "@/components/ui/skeleton";

export default function CarListMobileSkeleton() {
  return (
    <>
      {Array.from({ length: 2 }, (_, index) => (
        <div
          key={`skeleton-loading-${Date.now()}-${index}`}
          className="space-y-3"
        >
          {/* -- Image -- */}
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />

          <div className="space-y-2">
            {/* -- Brand and model -- */}
            <Skeleton className="h-4 w-3/4" />

            {/* -- Price -- */}
            <Skeleton className="h-5 w-1/2" />

            {/* -- License plate -- */}
            <Skeleton className="h-3 w-2/3" />

            {/* -- Additional details -- */}
            <div className="flex gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
