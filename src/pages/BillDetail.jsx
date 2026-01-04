import React, { useMemo, useRef, useState } from 'react';
import Loading from '../components/Loading';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useEffect } from 'react';
import { ArrowLeft, Bolt, Calendar, Droplet, Flame, MapPin, Wifi, Zap } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router';
import PageNotFound from '../components/PageNotFound';
import useHelmet from '../hooks/useHelmet';
import BillDetailSkeleton from '../components/BillDetailSkeleton ';

const BillDetail = () => {
    const HelmetTags = useHelmet({
        title: 'Bill Detail',
        description: 'Pay and manage your utility bills in one place.',
    });

    const { id } = useParams();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const modalRef = useRef(null);

    const handleModal = (e) => {
        e.preventDefault();
        modalRef.current.showModal();
    };

    const handlePayBill = async (e) => {
        e.preventDefault();

        if (!user?.email) {
            Swal.fire({ icon: 'error', title: 'Please log in to pay.' });
            return;
        }

        if (!bill) return;


        const billId = e.target.billId.value;
        const accountNumber = e.target.accountNumber.value;
        const amount = e.target.amount.value;
        const billingMonth = e.target.billingMonth.value;
        const username = e.target.username.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;

        const payload = {
            username,
            email: user.email,
            billId,
            accountNumber,
            amount,
            billingMonth,
            phone,
            address,
            date: new Date(),
        };



        try {
            setIsSubmitting(true);

            const res = await axiosPublic.post('/my-bills', payload);


            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your bill has been paid successfully",
                    showConfirmButton: false,
                    timer: 2000
                });

                const updatedBillStatus = await axiosPublic.patch(`/bills/${id}`, { status: 'paid', date: new Date() });

                if (updatedBillStatus.status !== 200) {
                    throw new Error(updatedBillStatus.message);
                }

                modalRef.current?.close();
            } else {
                throw new Error(res?.data?.message || 'Payment failed');
            }
        } catch (error) {
            console.log(error);
            Swal.fire({ icon: 'error', title: 'Payment failed', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    }


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

    const isCurrentMonthBill = useMemo(() => {
        if (!bill?.date) return false;
        const today = new Date();
        const billDate = new Date(bill.date);
        return (
            today.getMonth() === billDate.getMonth() &&
            today.getFullYear() === billDate.getFullYear()
        );
    }, [bill]);

    const handlePayBillModal = (e) => {
        e.preventDefault();
        const form = e.target;
        const amount = form.amount.value;
        console.log(amount)
    }

    if (loading) return <BillDetailSkeleton />;


    if (!bill) {
        return (
            <div className="">
                <PageNotFound />
            </div>
        );
    }

    const Icon = getCategoryIcon(bill.category);
    const categoryColor = getCategoryColor(bill.category);

    return (
        <>
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
                                <button onClick={handleModal} className={`flex-1 py-3 px-6 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 hover:cursor-pointer ${!isCurrentMonthBill ? "opacity-50 cursor-not-allowed bg-gray-500" : ""}`} disabled={!isCurrentMonthBill}>
                                    {
                                        isCurrentMonthBill ? "Pay Now" : "Only current month bill can be paid"
                                    }
                                </button>
                                <button className="flex-1 py-3 px-6 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                                    Download Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal */}
                <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-center mb-4">Pay Bill</h3>
                        <form onSubmit={handlePayBill} >
                            <fieldset className="fieldset">
                                <label className="label">Bill ID</label>
                                <input type="text" name='billId' className="input w-full text-gray-800" placeholder="Bill ID" readOnly value={bill._id} disabled />

                                <label className="label">Account Number</label>
                                <input type="text" name='accountNumber' className="input w-full text-gray-800" placeholder="Account Number" readOnly value={bill.accountNumber} disabled />

                                <label className="label">Amount</label>
                                <input type="text" name='amount' className="input w-full text-gray-800" placeholder="Bill ID" readOnly value={bill.amount} disabled />

                                <label className="label">Billing Month</label>
                                <input type="text" name='billingMonth' className="input w-full text-gray-800" placeholder="Bill ID" readOnly value={new Date(bill.date).toLocaleString('default', { month: 'long', year: 'numeric' })} disabled />

                                <label className="label">Username</label>
                                <input type="text" name='username' className="input w-full text-gray-800" placeholder="Account Number" defaultValue={user.displayName} />

                                <label className="label">Phone</label>
                                <input type="text" name='phone' className="input w-full text-gray-800" placeholder="Phone Number" />

                                <label className="label">Address</label>
                                <input type="text" name='address' className="input w-full text-gray-800" placeholder="Address" />

                                {
                                    isSubmitting ?
                                        <button type="submit" className="btn loading" disabled>Paying...</button>
                                        :
                                        <button className="btn btn-neutral mt-4">Pay Now</button>
                                }
                            </fieldset>
                        </form>
                        <div className="modal-action">
                            <form method="dialog" onSubmit={handlePayBillModal}>
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </>
    );
};

export default BillDetail;