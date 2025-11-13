import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Loading from '../components/Loading';
import AllBillCard from '../components/AllBillCard';
import useHelmet from '../hooks/useHelmet';

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
        (
            async () => {
                try {
                    setCategoryLoading(true);
                    setCategoryError(null);
                    const res = await axiosPublic.get('/bills/category');
                    if (res.status !== 200) {
                        throw new Error(res.message);
                    }
                    setCategories(res.data.categories);
                } catch (error) {
                    console.log(error);
                    setCategoryError(error);
                } finally {
                    setCategoryLoading(false);
                }
            }
        )();

    }, [axiosPublic]);


    useEffect(() => {
        (
            async () => {
                try {
                    setBillsLoading(true);
                    setBillsError(null);

                    const res = await axiosPublic.get(`/bills?category=${selectedCategory}`);
                    console.log({categoryRes: res.data});
                    
                    setBills(res.data);

                } catch (error) {
                    console.error('Bills fetch error:', error);
                    setBillsError(error.message || 'Failed to load bills');
                } finally {
                    setBillsLoading(false);
                }
            }
        )();

    }, [selectedCategory, axiosPublic]);


    if (categoryLoading && billsLoading) return <Loading />;

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }


    return (
        <div>
            <HelmetTags />
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl w-11/12 mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Bills In One Place</h1>
                        <p className="text-gray-600 font-semibold"> Track, manage, and pay all your bills in one place</p>
                    </div>

                    <div className='text-end py-3'>
                        {
                            categoryLoading ? (
                                <div className="text-gray-600">Loading categories...</div>
                            ) : categoryError ? (
                                <div className="text-red-600 font-semibold">
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
                                <div className="text-gray-600 font-semibold">
                                    No categories available
                                </div>
                            )
                        }
                    </div>

                    {
                        billsLoading ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                <p className="mt-2 text-gray-600">Loading bills...</p>
                            </div>
                        ) : billsError ? (
                            <div className="text-center text-red-600 font-semibold py-8">
                                Error loading bills: {billsError}
                            </div>
                        ) : bills.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bills.map((bill) => (
                                    <AllBillCard key={bill._id} bill={bill} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-600 font-semibold py-8">
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