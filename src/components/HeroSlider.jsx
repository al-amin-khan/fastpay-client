import 'swiper/css';
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import payBills from '../assets/slider/pay-bills.jpg';
import securePay from '../assets/slider/secure-payment.jpg';
import realTimeUsage from '../assets/slider/real-time-usage.jpg';
import multiAccount from '../assets/slider/multi-accout.jpg';
import smartReminder from '../assets/slider/smart-reminder.jpg';
import rewards from '../assets/slider/rewards.jpg';
import { Fade, Slide } from 'react-awesome-reveal';


const HeroSlider = () => {

    const sliderContents = [
        {
            "id": 1,
            "title": "Pay All Bills in One Place",
            "subtitle": "Electricity, gas, water & internet—track, manage, and pay in seconds.",
            "image": payBills
        },
        {
            "id": 4,
            "title": "Secure Pay, Your Way",
            "subtitle": "Cards, mobile wallets, and bank transfers—fast, encrypted, and reliable.",
            "image": securePay
        },
        {
            "id": 2,
            "title": "Real-Time Usage & Insights",
            "subtitle": "See trends, cut waste, and forecast your next bill with smart analytics.",
            "image": realTimeUsage
        },
        {
            "id": 3,
            "title": "Smart Reminders, Zero Late Fees",
            "subtitle": "Auto-alerts and scheduled payments keep you on time—every time.",
            "image": smartReminder
        },
        {
            "id": 5,
            "title": "Multi-Account, One Dashboard",
            "subtitle": "Manage home, office, and family accounts without switching apps.",
            "image": multiAccount
        },
        {
            "id": 7,
            "title": "Rewards & Savings",
            "subtitle": "Earn points, unlock discounts, and discover ways to lower your bills.",
            "image": rewards
        }
    ]


    return (
        <div className='w-11/12 mx-auto'>
            <Swiper
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                loop={true}
                speed={1200}
                modules={[Navigation, Pagination, Keyboard, Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
                className="mySwiper w-full"
            >
                {
                    sliderContents.map((item, index) => (
                        <SwiperSlide key={index} className="relative aspect-21/9 w-full">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-transparent" />
                            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                                <div className="text-center">
                                    <Slide direction="right">
                                        <h1 className="text-neutral-content text-4xl sm:text-6xl font-bold leading-tight tracking-tight [text-shadow:0_2px_6px_rgba(0,0,0,0.5)]">
                                            {item.title}
                                        </h1>
                                    </Slide>
                                    <Fade delay={500} duration={2000} fraction={0.8} triggerOnce >
                                        <p className="mt-4 sm:mt-6 text-neutral-content text-lg sm:text-xl leading-relaxed [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
                                            {item.subtitle}
                                        </p>
                                    </Fade>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default HeroSlider;
