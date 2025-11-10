import React from 'react';

const CallToAction = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-[#4758f0] via-indigo-400 to-[#4758f0]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to Simplify Your Bill Payments?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                    Join millions of users who trust PayUtility for their bill management
                </p>
                <button className="bg-black/90 text-white/90 px-10 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105">
                    Create Free Account
                </button>
            </div>
        </section>
    );
};

export default CallToAction;