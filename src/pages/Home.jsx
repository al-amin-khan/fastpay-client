import React from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryCards from '../components/CategoryCards';
import LatestBills from '../components/LatestBills';
import CallToAction from '../components/CallToAction';
import useHelmet from '../hooks/useHelmet';

const Home = () => {
    const HelmetTags = useHelmet({
        title: 'Home',
        description: 'Pay and manage your utility bills in one place.',
    });
    return (
        <div>
            <HelmetTags />
            <HeroSlider />
            <CategoryCards />
            <LatestBills />
            <CallToAction />
        </div>
    );
};

export default Home;