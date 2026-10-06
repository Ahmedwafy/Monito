const CartLoadingSkeleton = () => {
  return (
    <div
      className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20"
      role="status"
      aria-label="Loading cart"
    >
      <div
        className="container mx-auto px-4 py-12 max-w-4xl animate-pulse"
        aria-hidden="true"
      >
        <div className="h-10 w-48 rounded-lg bg-gray-200 dark:bg-gray-700 mb-8" />

        <div className="space-y-6">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-(--color-neutral-10) rounded-2xl p-4 md:p-5 shadow"
            >
              <div className="w-full sm:w-28 h-28 rounded-xl shrink-0 bg-gray-200 dark:bg-gray-700" />

              <div className="flex-1 min-w-0 space-y-3">
                <div className="h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-8 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="ml-auto h-4 w-14 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>

              <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700 sm:self-start sm:ml-auto" />
            </div>
          ))}

          <div className="bg-white dark:bg-(--color-neutral-10) rounded-2xl p-6 flex justify-between items-center shadow">
            <div className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-7 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="h-14 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <span className="sr-only">Loading cart...</span>
    </div>
  );
};

export default CartLoadingSkeleton;
