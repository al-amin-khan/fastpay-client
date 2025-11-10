import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Loading from '../components/Loading';
import BillCard from '../components/BillCard';

const AllBills = () => {
    const axiosPublic = useAxiosPublic();
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    setLoading(true);
                    const res = await axiosPublic.get('/bills');
                    if (res.status !== 200) {
                        throw new Error(res.message);
                    }
                    setBills(res.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        )();

    }, [axiosPublic]);

    if (loading) return <Loading />;

    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl w-11/12 mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Bills In One Place</h1>
                        <p className="text-gray-600 font-semibold"> Track, manage, and pay all your bills in one place</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bills.map((bill) => {
                            return (
                                <BillCard key={bill._id} bill={bill} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllBills;