import gas from '../assets/category/gas-meter.png';
import electricity from '../assets/category/transmission-tower.png';
import water from '../assets/category/faucet.png';
import internet from '../assets/category/wifi.png';

const CategoryCards = () => {
    const categoryIcons = [
        { icon: gas, label: 'gas' },
        { icon: electricity, label: 'electricity' },
        { icon: water, label: 'water' },
        { icon: internet, label: 'internet' }
    ];

    return (
        <div className='w-full md:w-11/12 lg:w-11/12 mx-auto py-15'>
            <div className='pb-10 text-center'>
                <div className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800">Pay Your Bills</div>
                <div className="text-2xl md:text-3xl lg:text-2xl font-semibold text-gray-600">Fast, secure, and easy</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 justify-items-center">
                {categoryIcons.map((icon, index) => {
                    return (
                        <div key={index} className="shadow-lg h-35 w-35 md:h-50 lg:h-50 md:w-50 lg:w-50 bg-white transition-all transform hover:scale-110 active:scale-95 flex justify-center items-center bg-linear-to-br from-emerald-500 to-cyan-500 rounded-md p-5 text-center">
                            <div className="space-y-2.5">
                                <div className="grid place-content-center">
                                    <img className='w-25 h-25' src={icon.icon} alt={icon.label} />
                                </div>
                                <div className="text-gray-100 text-2xl font-semibold ">{icon.label}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-linear-to-br hover:from-emerald-500 hover:to-cyan-500 transition-all transform hover:scale-115 active:scale-100"

export default CategoryCards;