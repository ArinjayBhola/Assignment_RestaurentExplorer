const RestaurantSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-card">
    <div className="h-48 w-full bg-gray-200" />
    <div className="space-y-3 p-5">
      <div className="h-4 w-2/3 rounded bg-gray-200" />
      <div className="h-3 w-1/2 rounded bg-gray-200" />
      <div className="h-3 w-full rounded bg-gray-200" />
      <div className="flex gap-2">
        <span className="h-6 flex-1 rounded-full bg-gray-200" />
        <span className="h-6 flex-1 rounded-full bg-gray-200" />
      </div>
      <div className="h-8 w-32 rounded-full bg-gray-200" />
    </div>
  </div>
);

export default RestaurantSkeleton;

