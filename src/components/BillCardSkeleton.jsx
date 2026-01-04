const BillCardSkeleton = () => {
    return (
        <div className="card bg-base-100 shadow-md border border-base-200 rounded-2xl">
            <div className="card-body p-5">
                
                <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-base-200 flex items-center justify-center">
                        <div className="skeleton w-6 h-6 rounded-md" />
                    </div>

                    <div className="skeleton h-6 w-16 rounded-full" />
                </div>

                <div className="mt-3 space-y-2">
                    <div className="skeleton h-5 w-5/6" />
                    <div className="skeleton h-5 w-2/3" />
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <div className="skeleton h-4 w-4 rounded-md" />
                    <div className="skeleton h-4 w-3/4" />
                </div>

                <div className="mt-3 flex items-center gap-2">
                    <div className="skeleton h-4 w-4 rounded-md" />
                    <div className="skeleton h-4 w-24" />
                </div>

                <div className="mt-4 h-px bg-base-200" />

                <div className="mt-4">
                    <div className="skeleton h-11 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default BillCardSkeleton;