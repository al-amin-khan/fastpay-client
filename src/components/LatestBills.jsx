import { ArrowRight, Bolt, Calendar, Droplet, Flame, MapPin, Wifi, Zap } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "./Loading";
import { Link } from "react-router";

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


    const getCategoryIcon = (category) => {
        const icons = {
            internet: Wifi,
            gas: Flame,
            water: Droplet,
            electricity: Zap
        };
        return icons[category] || Bolt;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };


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
                            const Icon = getCategoryIcon(bill.category);

                            return (
                                <div
                                    key={bill._id}
                                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:border-gray-300 cursor-pointer"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-lg bg-gray-100">
                                            <Icon className="w-6 h-6 text-gray-700" />
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                                            {bill.category}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2">
                                        {bill.title}
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex items-start text-gray-600">
                                            <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                                            <span className="text-sm">{bill.location}</span>
                                        </div>

                                        <div className="flex items-center text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2 shrink-0" />
                                            <span className="text-sm">{formatDate(bill.date)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <Link
                                            to={`/bills/${bill._id}`}
                                            className="group"
                                        >
                                            <button className="w-full py-2.5 px-4 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center group">
                                                <span>View Details</span>
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestBills;