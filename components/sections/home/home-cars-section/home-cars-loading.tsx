import Container from "@/components/layout/container";

export default function HomeCarsLoading() {
  const carSkeletons = Array.from(
    { length: 4 },
    (_, i) => `car-skeleton-${Date.now()}-${i}`,
  );

  return (
    <>
      <Container className="mt-18 hidden flex-row gap-4 md:flex lg:gap-9">
        <div className="flex-1 space-y-4">
          {/* -- Car List -- */}
          <div className="h-8 animate-pulse rounded-md bg-gray-200" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {carSkeletons.map((id) => (
              <div
                key={id}
                className="h-64 animate-pulse rounded-md bg-gray-200"
              />
            ))}
          </div>
        </div>
        <div className="w-80">
          {/* -- Facebook Cover -- */}
          <div className="h-full animate-pulse rounded-md bg-gray-200" />
        </div>
      </Container>

      {/* -- Car Tabs -- */}
      <div className="mx-4 mt-8 md:hidden">
        <div className="mb-4 h-12 animate-pulse rounded-md bg-gray-200" />
        <div className="grid grid-cols-1 gap-4">
          <div className="h-64 animate-pulse rounded-md bg-gray-200" />
        </div>
      </div>
    </>
  );
}
