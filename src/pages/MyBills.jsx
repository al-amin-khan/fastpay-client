import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import { autoTable } from 'jspdf-autotable';
import { format } from "date-fns";
import useHelmet from "../hooks/useHelmet";
import BillsTableSkeleton from "../components/BillsTableSkeleton";

const MyBills = () => {

    const HelmetTags = useHelmet({
        title: 'My Bills',
        description: 'Pay and manage your utility bills in one place.',
    });

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const userEmail = user?.email;
    const [myBills, setMyBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [refetch, setRefetch] = useState(false);


    const billUpdateModalRef = useRef(null);

    useEffect(() => {
        if (!userEmail) return;
        (
            async () => {
                try {
                    setLoading(true);
                    const res = await axiosPublic.get(`/my-bills?email=${userEmail}`);

                    if (res.status !== 200) {
                        throw new Error(res.message);
                    }
                    setMyBills(res.data);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
        )();
    }, [refetch, userEmail, axiosPublic]);

    if (loading) return <BillsTableSkeleton />;

    if (!userEmail) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-2xl font-semibold">Please log in to see your bills.</p>
                <Link to="/auth/login"><button className="btn btn-neutral ml-4">Login</button></Link>
            </div>
        )
    }

    const totalBill = myBills.reduce((total, bill) => total + Number(bill.amount), 0);

    const handleUpdateModal = (bill) => {
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
            email: userEmail,
            phone: e.target.phone.value,
            address: e.target.address.value,
            updatedAt: new Date(),
        }

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
            Swal.fire({ icon: 'error', title: 'Update failed', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleDeleteBill = (bill) => {
        Swal.fire({
            title: "Are you sure?",
            text: "you want to delete this bill? You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsSubmitting(true);
                    const res = await axiosPublic.delete(`/my-bills/${bill}`);
                    if (res.data.deletedCount !== 1) {
                        throw new Error(res.message);
                    }
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your bill has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setRefetch(!refetch);
                } catch (error) {
                    Swal.fire({ icon: 'error', title: 'Delete failed', text: error.message });
                } finally {
                    setIsSubmitting(false);
                }

            }
        });
    }


    const generateAllBillsPDFReport = async () => {
        const doc = new jsPDF(
            {
                orientation: "portrait",   // or "landscape"
                unit: "mm",                 // "mm" | "pt" | "cm" | "in" | "px"
                format: "a4"                // A4 paper
            }
        );
        const pageWidth = doc.internal.pageSize.getWidth();

        const monthYear = format(new Date(), 'MMMM yyyy');



        const title = `FastPay \n All Bills Report - ${monthYear}`;
        const subtitle = `Account: ${user?.displayName || 'User'} | ${userEmail}`;

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text(title, pageWidth / 2, 16, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(subtitle, pageWidth / 2, 30, { align: "center" });

        autoTable(doc, {
            title: "All Bills Report",
            head: [
                ["Bill", "Name", "Email", "Amount", "Address", "Phone", "Date"],
            ],
            body: myBills.map((bill, index) => [
                index + 1,
                bill.username,
                bill.email,
                bill.amount,
                bill.address,
                bill.phone,
                (bill.date).split("T")[0],
            ]),
            startY: 35,
            theme: 'striped',
        });

        doc.save("all-bills.pdf");
    }


    return (
        <div>
            <HelmetTags />
            <div className="text-end w-11/12 mx-auto">
                <button className="btn btn-soft mr-4 mt-2" onClick={generateAllBillsPDFReport}>Generate PDF</button>
            </div>
            {
                myBills.length > 0 ?

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
                                                    <SquarePen className="text-success" size={25} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBill(bill._id)}
                                                    className="btn btn-ghost btn-sm lg:tooltip" data-tip="Delete"
                                                >
                                                    <Trash className="text-error" size={25} />
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
                    :
                    error ?
                        <div className='text-center text-error text-2xl font-bold'>{error.message}</div>
                        :
                        <div className='text-center text-base-content/60 text-2xl font-bold'>No Bills Found</div>
            }


            {/* update bill modal */}
            <dialog ref={billUpdateModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center text-base-content">Update Bill</h3>
                    <div>
                        <form
                            onSubmit={handleUpdateBill}
                        >
                            <fieldset className="fieldset">
                                <label className="label">Bill ID</label>
                                <input type="text" name='billId' className="input w-full text-base-content" placeholder="Bill ID" value={selectedBill?._id} readOnly disabled />

                                <label className="label">Account Number</label>
                                <input type="text" name='accountNumber' className="input w-full text-base-content" placeholder="Account Number" defaultValue={selectedBill?.accountNumber} />

                                <label className="label">Amount</label>
                                <input type="text" name='amount' className="input w-full text-base-content" placeholder="Amount" defaultValue={selectedBill?.amount} />

                                <label className="label">Billing Month</label>
                                <input type="text" name='billingMonth' className="input w-full text-base-content" placeholder="Billing Month" defaultValue={selectedBill?.billingMonth} />

                                <label className="label">Username</label>
                                <input type="text" name='username' className="input w-full text-base-content" placeholder="Account Number" defaultValue={selectedBill?.username} />

                                <label className="label">Phone</label>
                                <input type="text" name='phone' className="input w-full text-base-content" placeholder="Phone Number" defaultValue={selectedBill?.phone} />

                                <label className="label">Address</label>
                                <input type="text" name='address' className="input w-full text-base-content" placeholder="Address" defaultValue={selectedBill?.address} />

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
