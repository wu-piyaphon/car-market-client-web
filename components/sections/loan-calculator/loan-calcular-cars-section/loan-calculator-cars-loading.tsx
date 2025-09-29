export default function LoanCalculatorCarsLoading() {
  const skeletons = Array.from(
    { length: 4 },
    (_, i) => `skeleton-${Date.now()}-${i}`,
  );

  return (
    <div className="space-y-4">
      <div className="h-8 animate-pulse rounded-md bg-gray-200" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {skeletons.map((id) => (
          <div key={id} className="h-64 animate-pulse rounded-md bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
