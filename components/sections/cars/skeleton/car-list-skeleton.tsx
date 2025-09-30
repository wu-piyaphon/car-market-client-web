import { Skeleton } from "@/components/ui/skeleton";

export default function CarListSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={`desktop-skeleton-${Date.now()}-${index}`}
          className="space-y-3"
        >
          {/* -- Car Image -- */}
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
