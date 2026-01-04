// BillsTableSkeleton.jsx
import React from "react";

const BillsTableSkeleton = ({ rows = 3 }) => {
    return (
        <div className="w-10/12 mx-auto py-8">
            <div className="overflow-x-auto rounded-2xl border border-base-200 bg-base-100 shadow-sm">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="font-semibold">Bill</th>
                            <th className="font-semibold">Name</th>
                            <th className="font-semibold">Email</th>
                            <th className="font-semibold">Amount</th>
                            <th className="font-semibold">Address</th>
                            <th className="font-semibold">Phone</th>
                            <th className="font-semibold">Date</th>
                            <th className="w-24" />
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: rows }).map((_, i) => (
                            <tr key={i} className="hover:bg-transparent">
                                <td>
                                    <div className="skeleton h-4 w-6" />
                                </td>

                                <td>
                                    <div className="skeleton h-4 w-28" />
                                </td>

                                <td>
                                    <div className="skeleton h-4 w-44" />
                                </td>

                                <td>
                                    <div className="skeleton h-4 w-20" />
                                </td>

                                <td>
                                    <div className="skeleton h-4 w-24" />
                                </td>

                                <td>
                                    <div className="skeleton h-4 w-28" />
                                </td>

                                <td>
                                    <div className="skeleton h-4 w-24" />
                                </td>

                                <td>
                                    <div className="flex items-center justify-end gap-3">
                                        <div className="skeleton h-9 w-9 rounded-lg" />
                                        <div className="skeleton h-9 w-9 rounded-lg" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="border-t border-base-200 px-4 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <div className="skeleton h-4 w-16" />
                            <div className="skeleton h-4 w-10" />
                        </div>

                        <div className="flex items-center gap-2 sm:justify-end">
                            <div className="skeleton h-4 w-12" />
                            <div className="skeleton h-4 w-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillsTableSkeleton;
