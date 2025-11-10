import React from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryCards from '../components/CategoryCards';
import LatestBills from '../components/LatestBills';
import CallToAction from '../components/CallToAction';

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <CategoryCards />
            <LatestBills />
            <CallToAction />
        </div>
    );
};

export default Home;