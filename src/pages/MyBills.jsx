import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../components/Loading";
import { SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyBills = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [myBills, setMyBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [refetch, setRefetch] = useState(false);


    const billUpdateModalRef = useRef(null);

    useEffect(() => {
        if (!user?.email) return;
        (
            async () => {
                try {
                    setLoading(true);
                    const res = await axiosPublic.get(`/my-bills?email=${user.email}`);

                    if (res.status !== 200) {
                        throw new Error(res.message);
                    }
                    setMyBills(res.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        )();
    }, [refetch, user.email, axiosPublic]);

    if (loading) return <Loading />;

    if (!user && !user.email) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-2xl font-semibold">Please log in to see your bills.</p>
                <Link to="/auth/login"><button className="btn btn-neutral ml-4">Login</button></Link>
            </div>
        )
    }

    const totalBill = myBills.reduce((total, bill) => total + Number(bill.amount), 0);

    const handleUpdateModal = (bill) => {
        console.log(bill);
        setSelectedBill(bill);
        billUpdateModalRef.current.showModal();
    }

    const handleUpdateBill = async (e) => {
        e.preventDefault();

        const payload = {
            billId: e.target.billId.value,
            accountNumber: e.target.accountNumber.value,
            amount: e.target.amount.value,
            billingMonth: e.target.billingMonth.value,
            username: e.target.username.value,
            email: user?.email,
            phone: e.target.phone.value,
            address: e.target.address.value,
            updatedAt: new Date(),
        }

        console.log('updated payload:', payload);

        try {
            setIsSubmitting(true);
            const res = await axiosPublic.patch(`/my-bills/${selectedBill._id}`, payload);

            if (res.status !== 200) {
                throw new Error(res.message);
            }

            if (res.data.modifiedCount === 1) {
                setIsSubmitting(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Bill has been updated.",
                    showConfirmButton: false,
                    timer: 2000
                });
                billUpdateModalRef.current.close();
                setSelectedBill(null);
                setRefetch(!refetch);
            } else {
                throw new Error(res?.data?.message || 'Update failed');
            }

        } catch (error) {
            console.log(error);
            Swal.fire({ icon: 'error', title: 'Update failed', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleDeleteBill = (bill) => {
        console.log(bill);
    }

    return (
        <div>
            <div className="overflow-x-auto w-11/12 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Bill</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myBills.map((bill, index) => (
                                <tr key={index}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {bill.username}
                                    </td>
                                    <td>
                                        <div>
                                            {bill.email}
                                        </div>
                                    </td>
                                    <td>
                                        BDT {bill.amount}
                                    </td>
                                    <td>{bill.address}</td>
                                    <td>{bill.phone}</td>
                                    <td> {(new Date(bill.date)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} </td>
                                    <th>
                                        <button
                                            onClick={() => handleUpdateModal(bill)}
                                            disabled={isSubmitting}
                                            className="btn btn-ghost btn-sm lg:tooltip" data-tip="Edit"
                                        >
                                            <SquarePen className=" text-white" color="#009966" size={25} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBill(bill._id)}
                                            className="btn btn-ghost btn-sm lg:tooltip" data-tip="Delete"
                                        >
                                            <Trash className="text-white" size={25} color="#FF3333" />
                                        </button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Bill Paid: {myBills.length}</th>
                            <th></th>
                            <th></th>
                            <th>Total: BDT {totalBill}</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>


            {/* update bill modal */}
            <dialog ref={billUpdateModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center text-gray-800">Update Bill</h3>
                    <div>
                        <form
                            onSubmit={handleUpdateBill}
                        >
                            <fieldset className="fieldset">
                                <label className="label">Bill ID</label>
                                <input type="text" name='billId' className="input w-full text-gray-800" placeholder="Bill ID" value={selectedBill?._id} readOnly disabled />

                                <label className="label">Account Number</label>
                                <input type="text" name='accountNumber' className="input w-full text-gray-800" placeholder="Account Number" defaultValue={selectedBill?.accountNumber} />

                                <label className="label">Amount</label>
                                <input type="text" name='amount' className="input w-full text-gray-800" placeholder="Amount" defaultValue={selectedBill?.amount} />

                                <label className="label">Billing Month</label>
                                <input type="text" name='billingMonth' className="input w-full text-gray-800" placeholder="Billing Month" defaultValue={selectedBill?.billingMonth} />

                                <label className="label">Username</label>
                                <input type="text" name='username' className="input w-full text-gray-800" placeholder="Account Number" defaultValue={selectedBill?.username} />

                                <label className="label">Phone</label>
                                <input type="text" name='phone' className="input w-full text-gray-800" placeholder="Phone Number" defaultValue={selectedBill?.phone} />

                                <label className="label">Address</label>
                                <input type="text" name='address' className="input w-full text-gray-800" placeholder="Address" defaultValue={selectedBill?.address} />

                                {
                                    isSubmitting ?
                                        <button type="submit" className="btn loading" disabled>Bill Updating...</button>
                                        :
                                        <button className="btn btn-neutral mt-4">Bill Update Now</button>
                                }
                            </fieldset>
                        </form>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyBills;