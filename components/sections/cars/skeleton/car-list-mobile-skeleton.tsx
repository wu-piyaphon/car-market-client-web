import { Skeleton } from "@/components/ui/skeleton";

type CarListMobileSkeletonProps = {
  count?: number;
};

export default function CarListMobileSkeleton({
  count = 2,
}: CarListMobileSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
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
