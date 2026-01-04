import { ArrowRight, Bolt, Calendar, Droplet, Flame, MapPin, Wifi, Zap } from "lucide-react";
import { Link } from "react-router";

const AllBillCard = ({ bill }) => {

    const getCategoryIcon = (category) => {
        const icons = {
            internet: Wifi,
            gas: Flame,
            water: Droplet,
            electricity: Zap
        };
        return icons[category] || Bolt;
    };

    const Icon = getCategoryIcon(bill.category);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="bg-base-100 rounded-xl border border-base-200 shadow-md hover:shadow-lg transition-all duration-300 hover:border-base-300 cursor-pointer overflow-hidden">
            {/* Image Section */}
            {bill.image && (
                <div className="w-full h-48 overflow-hidden bg-base-200">
                    <img 
                        src={bill.image} 
                        alt={bill.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-base-200">
                        <Icon className="w-6 h-6 text-base-content/70" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-base-200 text-base-content/70 capitalize">
                        {bill.category}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-base-content mb-4 line-clamp-2">
                    {bill.title}
                </h3>

                {bill.amount && (
                    <div className="mb-4">
                        <p className="text-2xl font-bold text-base-content">
                            ${bill.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    <div className="flex items-start text-base-content/70">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm">{bill.location}</span>
                    </div>

                    <div className="flex items-center text-base-content/70">
                        <Calendar className="w-4 h-4 mr-2 shrink-0" />
                        <span className="text-sm">{formatDate(bill.date)}</span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-base-200">
                    <Link
                        to={`/bills/${bill._id}`}
                        className="group"
                    >
                        <button className="w-full py-2.5 px-4 bg-neutral text-neutral-content rounded-lg font-medium text-sm hover:bg-neutral/90 transition-colors duration-200 flex items-center justify-center group">
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllBillCard;
