export default function CarSellingCarsLoading() {
  const skeletons = Array.from(
    { length: 4 },
    (_, i) => `skeleton-${Date.now()}-${i}`,
  );

  return (
    <div className="grid grid-cols-4">
      {skeletons.map((id) => (
        <div key={id} className="h-64 animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}
