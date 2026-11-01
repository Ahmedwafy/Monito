const CartLoadingSkeleton = () => {
  return (
    <div
      className="min-h-screen bg-(--commerce-page-bg) pb-20"
      role="status"
      aria-label="Loading cart"
    >
      <div
        className="container mx-auto px-4 py-12 max-w-4xl animate-pulse"
        aria-hidden="true"
      >
        <div className="h-10 w-48 rounded-lg bg-(--commerce-skeleton) mb-8" />

        <div className="space-y-6">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 bg-(--commerce-card-bg) rounded-2xl p-4 md:p-5 shadow"
            >
              <div className="w-full sm:w-28 h-28 rounded-xl shrink-0 bg-(--commerce-skeleton)" />

              <div className="flex-1 min-w-0 space-y-3">
                <div className="h-5 w-2/3 rounded bg-(--commerce-skeleton)" />
                <div className="h-4 w-1/3 rounded bg-(--commerce-skeleton)" />
                <div className="h-4 w-20 rounded bg-(--commerce-skeleton)" />
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-(--commerce-skeleton)" />
                  <div className="h-4 w-8 rounded bg-(--commerce-skeleton)" />
                  <div className="h-8 w-8 rounded-full bg-(--commerce-skeleton)" />
                  <div className="ml-auto h-4 w-14 rounded bg-(--commerce-skeleton)" />
                </div>
              </div>

              <div className="h-5 w-16 rounded bg-(--commerce-skeleton) sm:self-start sm:ml-auto" />
            </div>
          ))}

          <div className="bg-(--commerce-card-bg) rounded-2xl p-6 flex justify-between items-center shadow">
            <div className="h-6 w-20 rounded bg-(--commerce-skeleton)" />
            <div className="h-7 w-24 rounded bg-(--commerce-skeleton)" />
          </div>

          <div className="h-14 w-full rounded-xl bg-(--commerce-skeleton)" />
        </div>
      </div>
      <span className="sr-only">Loading cart...</span>
    </div>
  );
};

export default CartLoadingSkeleton;
