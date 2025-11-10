import React from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryCards from '../components/CategoryCards';
import LatestBills from '../components/LatestBills';

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <CategoryCards />
            <LatestBills />
        </div>
    );
};

export default Home;