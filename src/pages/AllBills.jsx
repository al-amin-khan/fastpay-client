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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    useEffect(() => {
        (
            async () => {
                try {
                    setLoading(true);
                    const res = await axiosPublic.get('/bills/category');
                    if (res.status !== 200) {
                        throw new Error(res.message);
                    }
                    setCategories(res.data.categories);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
        )();

    }, [axiosPublic, setCategories]);


    useEffect(() => {
        (
            async () => {
                try {
                    setLoading(true);
                    const res = await axiosPublic.get(`/bills?category=${selectedCategory}`);
                    if (res.status !== 200) {
                        throw new Error(res.message);
                    }
                    setBills(res.data);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
        )();

    }, [selectedCategory]);


    if (loading) return <Loading />;

    const handleCategoryChange = (e) => {
        e.preventDefault();
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
                            categories.length > 0 ?
                                <select
                                    onChange={handleCategoryChange}
                                    value={selectedCategory}
                                    className="select"
                                >
                                    <option disabled={true} value="">Pick a Category</option>
                                    <option value="">All</option>
                                    {
                                        categories ?
                                            categories.map((category, index) => {
                                                return (
                                                    <option key={index} value={category}>{category}</option>
                                                );
                                            })
                                            :
                                            error ?
                                                <div className="text-center text-red-600 font-semibold">loading category failed wit error:{error.message}</div>
                                                :
                                                <div className="text-center text-gray-600 font-semibold">No Bills Found</div>
                                    }
                                </select>
                                :
                                error ?
                                    <div className="text-center text-red-600 font-semibold">{error.message}</div>
                                    :
                                    <div className="text-center text-gray-600 font-semibold">No Bills Found</div>
                        }
                    </div>

                    {
                        bills.length > 0 ?
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {bills.map((bill) => {
                                        return (
                                            <AllBillCard key={bill._id} bill={bill} />
                                        );
                                    })}
                                </div>
                            </div>

                            :

                            error ?
                                <div className="text-center text-red-600 font-semibold">{error.message}</div>
                                :
                                <div className="text-center text-gray-600 font-semibold">No Bills Found</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AllBills;