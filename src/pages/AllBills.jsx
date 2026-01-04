import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import AllBillCard from '../components/AllBillCard';
import useHelmet from '../hooks/useHelmet';
import BillCardSkeleton from '../components/BillCardSkeleton';

const AllBills = () => {
    const HelmetTags = useHelmet({
        title: 'Bills',
        description: 'Pay and manage your utility bills in one place.',
    });

    const axiosPublic = useAxiosPublic();
    const [bills, setBills] = useState([]);
    const [billsLoading, setBillsLoading] = useState(true);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [billsError, setBillsError] = useState(null);
    const [categoryError, setCategoryError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');


    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                setCategoryLoading(true);
                setCategoryError("");

                const res = await axiosPublic.get("/bills/category");

                if (!isMounted) return;

                const data = res.data?.categories ?? [];
                setCategories(data);
            } catch (error) {
                console.error("Category fetch error:", error);

                if (!isMounted) return;

                const message =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to load categories";
                setCategoryError(message);
            } finally {
                if (isMounted) {
                    setCategoryLoading(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [axiosPublic]);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                setBillsLoading(true);
                setBillsError("");

                const paramsCategory = encodeURIComponent(selectedCategory);
                const res = await axiosPublic.get(`/bills?category=${paramsCategory}`);

                if (!isMounted) return;

                setBills(res.data ?? []);
            } catch (error) {
                console.error("Bills fetch error:", error);

                if (!isMounted) return;

                const message =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to load bills";
                setBillsError(message);
            } finally {
                if (isMounted) {
                    setBillsLoading(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [selectedCategory, axiosPublic]);



    if (billsLoading) return (
        <div className="w-10/12 mx-auto py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-base-content mb-2">All Bills In One Place</h1>
                <p className="text-base-content/70 font-semibold"> Track, manage, and pay all your bills in one place</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    Array.from({ length: 12 }).map((_, i) => (
                        <BillCardSkeleton key={i} />
                    ))
                }
            </div>
        </div>
    );

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }


    return (
        <div>
            <HelmetTags />
            <div className="min-h-screen bg-base-200 p-8">
                <div className="max-w-7xl w-11/12 mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-base-content mb-2">All Bills In One Place</h1>
                        <p className="text-base-content/70 font-semibold"> Track, manage, and pay all your bills in one place</p>
                    </div>

                    <div className='text-end py-3'>
                        {
                            categoryLoading ? (
                                <div className="text-base-content/70">Loading categories...</div>
                            ) : categoryError ? (
                                <div className="text-error font-semibold">
                                    Error loading categories: {categoryError}
                                </div>
                            ) : categories.length > 0 ? (
                                <select
                                    onChange={handleCategoryChange}
                                    value={selectedCategory}
                                    className="select"
                                    disabled={billsLoading}
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="text-base-content/70 font-semibold">
                                    No categories available
                                </div>
                            )
                        }
                    </div>

                    {
                        billsLoading ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-base-content"></div>
                                <p className="mt-2 text-base-content/70">Loading bills...</p>
                            </div>
                        ) : billsError ? (
                            <div className="text-center text-error font-semibold py-8">
                                Error loading bills: {billsError}
                            </div>
                        ) : bills.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bills.map((bill) => (
                                    <AllBillCard key={bill._id} bill={bill} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-base-content/70 font-semibold py-8">
                                No bills found
                                {selectedCategory && ` in category "${selectedCategory}"`}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AllBills;
