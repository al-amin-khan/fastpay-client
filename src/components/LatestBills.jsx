import { useEffect } from "react";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "./Loading";
import { Link } from "react-router";
import BillCard from "./BillCard";

const LatestBills = () => {
    const axiosPublic = useAxiosPublic();
    const [latestBills, setLatestBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    setLoading(true);
                    const res = await axiosPublic.get('/latest-bills');
                    if (res.status !== 200) {
                        throw new Error(res.message);
                    }
                    setLatestBills(res.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        )();

    }, [axiosPublic, setLatestBills]);

    if (loading) return <Loading />;


    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl w-11/12 mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest Bills</h1>
                        <p className="text-gray-600 font-semibold">Check out the latest bills</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestBills.map((bill) => {
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

export default LatestBills;