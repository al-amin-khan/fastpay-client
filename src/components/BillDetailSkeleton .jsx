
const BillDetailSkeleton = () => {
    return (
        <div className="w-9/12 mx-auto py-8">
            <div className="card bg-base-100 shadow-md border border-base-200 rounded-2xl">
                <div className="card-body p-6 sm:p-8">

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center">
                            <div className="skeleton w-6 h-6 rounded-md" />
                        </div>
                        <div className="skeleton h-7 w-24 rounded-full" />
                    </div>
                    
                    <div className="mt-5 space-y-3">
                        <div className="skeleton h-7 w-5/6" />
                        <div className="skeleton h-7 w-2/3" />
                    </div>

                    <div className="mt-6 rounded-2xl border border-base-200 bg-base-200/40 p-5 sm:p-6">
                        <div className="skeleton h-4 w-28" />
                        <div className="mt-3 skeleton h-10 w-56" />
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-base-200 flex items-center justify-center">
                                <div className="skeleton w-5 h-5 rounded-md" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="skeleton h-4 w-16" />
                                <div className="skeleton h-5 w-64 max-w-full" />
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-base-200 flex items-center justify-center">
                                <div className="skeleton w-5 h-5 rounded-md" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="skeleton h-4 w-20" />
                                <div className="skeleton h-5 w-72 max-w-full" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 h-px bg-base-200" />

                    <div className="mt-6">
                        <div className="skeleton h-5 w-28" />
                        <div className="mt-4 space-y-3">
                            <div className="skeleton h-4 w-full" />
                            <div className="skeleton h-4 w-11/12" />
                            <div className="skeleton h-4 w-9/12" />
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="skeleton h-12 w-full rounded-xl" />
                        <div className="skeleton h-12 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillDetailSkeleton;
