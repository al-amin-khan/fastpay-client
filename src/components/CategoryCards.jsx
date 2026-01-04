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
                <div className="text-3xl md:text-3xl lg:text-3xl font-bold text-base-content">Pay Your Bills</div>
                <div className="text-lg md:text-2xl lg:text-lg font-semibold text-base-content/70">Fast, secure, and easy</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 justify-items-center gap-4 md:gap-8 lg:gap-8">
                {categoryIcons.map((icon, index) => {
                    return (
                        <div key={index} className="shadow-lg h-40 w-40 md:h-50 lg:h-50 md:w-50 lg:w-50 transition-all transform hover:scale-110 active:scale-95 flex justify-center items-center bg-linear-to-br from-primary to-secondary rounded-md text-center">
                            <div className="space-y-2.5">
                                <div className="grid place-content-center">
                                    <img className='w-25 h-25' src={icon.icon} alt={icon.label} />
                                </div>
                                <div className="text-primary-content text-2xl font-semibold ">{icon.label}</div>
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
