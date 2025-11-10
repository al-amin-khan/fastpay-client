import React, { useState } from 'react';
import { Link, useParams } from 'react-router';
import Loading from '../components/Loading';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useEffect } from 'react';
import { ArrowLeft, Bolt, Calendar, Droplet, Flame, MapPin, Wifi, Zap } from 'lucide-react';

const BillDetail = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (
            async () => {
                try {
                    setLoading(true);
                    const res = await axiosPublic.get(`/bills/${id}`);
                    if (res.status !== 200) {
                        throw new Error(res.message);
                    }
                    setBill(res.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        )();
    }, [id, axiosPublic]);

    const getCategoryIcon = (category) => {
        const icons = {
            internet: Wifi,
            gas: Flame,
            water: Droplet,
            electricity: Zap
        };
        return icons[category] || Bolt;
    };

    const getCategoryColor = (category) => {
        const colors = {
            internet: "bg-blue-100 text-blue-700",
            gas: "bg-orange-100 text-orange-700",
            water: "bg-cyan-100 text-cyan-700",
            electricity: "bg-yellow-100 text-yellow-700"
        };
        return colors[category] || "bg-gray-100 text-gray-700";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) return <Loading />;


    if (!bill) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Bill not found</p>
                    <Link to="/bills" className="text-blue-600 hover:underline mt-4 inline-block">
                        Back to all bills
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = getCategoryIcon(bill.category);
    const categoryColor = getCategoryColor(bill.category);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/bills"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span className="font-medium">Back to Bills</span>
                </Link>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Image Section */}
                    {bill.image && (
                        <div className="w-full h-80 overflow-hidden bg-gray-200">
                            <img
                                src={bill.image}
                                alt={bill.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-8">
                        {/* Category Badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-xl ${categoryColor}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${categoryColor}`}>
                                {bill.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">
                            {bill.title}
                        </h1>

                        {/* Amount */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <p className="text-sm font-medium text-gray-600 mb-1">Total Amount</p>
                            <p className="text-4xl font-bold text-gray-900">
                                BDT {bill.amount.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="space-y-6 mb-8">
                            {/* Date */}
                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-gray-100 mr-4">
                                    <Calendar className="w-5 h-5 text-gray-700" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Date</p>
                                    <p className="text-base text-gray-900">{formatDate(bill.date)}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start">
                                <div className="p-2 rounded-lg bg-gray-100 mr-4">
                                    <MapPin className="w-5 h-5 text-gray-700" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                                    <p className="text-base text-gray-900">{bill.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {bill.description && (
                            <div className="border-t border-gray-200 pt-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {bill.description}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                            <button className="flex-1 py-3 px-6 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                                Pay Bill Now
                            </button>
                            <button className="flex-1 py-3 px-6 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                                Download Receipt
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillDetail;