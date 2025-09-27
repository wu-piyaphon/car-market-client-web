type CarouselEmptyStateProps = {
  message?: string;
};

export function CarouselEmptyState({
  message = "No images available",
}: CarouselEmptyStateProps) {
  return (
    <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100">
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
