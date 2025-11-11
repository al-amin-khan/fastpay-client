import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../components/Loading";
import { SquarePen, Trash } from "lucide-react";

const MyBills = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [myBills, setMyBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, [user.email, setMyBills, axiosPublic]);

    if (loading) return <Loading />;

    const totalBill = myBills.reduce((total, bill) => total + Number(bill.amount), 0);

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
                                        <button className="btn btn-ghost btn-sm lg:tooltip" data-tip="Edit">
                                            <SquarePen className=" text-white" color="#009966" size={25} />
                                        </button>
                                        <button className="btn btn-ghost btn-sm lg:tooltip" data-tip="Delete">
                                            <Trash className="text-white" size={25} color="#FF3333" />
                                        </button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total Bill: {myBills.length}</th>
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
        </div>
    );
};

export default MyBills;