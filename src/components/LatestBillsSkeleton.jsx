import BillCardSkeleton from "./BillCardSkeleton";

const LatestBillsSkeleton = ({ count = 6 }) => {
  return (
    <section className="w-10/12 mx-auto py-8">
      <div className="text-center mb-8">
        <div className="mx-auto skeleton h-7 w-40" />
        <div className="mx-auto mt-3 skeleton h-4 w-44" />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <BillCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default LatestBillsSkeleton;