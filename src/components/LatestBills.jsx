import { useEffect } from "react";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import BillCard from "./BillCard";
import LatestBillsSkeleton from "./LatestBillsSkeleton";


const LatestBills = () => {
    const axiosPublic = useAxiosPublic();
    const [latestBills, setLatestBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    setError(error)

                } finally {
                    setLoading(false);
                }
            }
        )();

    }, [axiosPublic, setLatestBills]);

    if (loading) return <LatestBillsSkeleton count={6}/>;


    return (
        <div>
            <div className="min-h-screen bg-base-200 p-8">
                <div className="max-w-7xl w-11/12 mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-base-content mb-2">Latest Bills</h1>
                        <p className="text-base-content/70 font-semibold">Check out the latest bills</p>
                    </div>

                    {
                        latestBills.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                latestBills.map((bill) => {
                                    return (
                                        <BillCard key={bill._id} bill={bill} />
                                    );
                                })
                            }
                        </div> 
                        :
                        <div>
                            {
                                error ?
                                <p className="text-error font-semibold">{error.message}</p>
                                :
                                <p className="text-base-content/70 font-semibold">No latest bills found.</p>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default LatestBills;
