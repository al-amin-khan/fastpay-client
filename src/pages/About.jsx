import useHelmet from "../hooks/useHelmet";

const About = () => {
    const HelmetTags = useHelmet({
        title: "About",
        description: "Learn how FastPay helps you manage utility bills with speed and confidence.",
    });

    const values = [
        {
            title: "Clarity First",
            description: "Every bill, fee, and status is visible upfront so you can make fast decisions.",
        },
        {
            title: "Secure by Design",
            description: "Industry-grade encryption and verified vendors protect every transaction.",
        },
        {
            title: "Human Support",
            description: "Real people, real help. Quick answers when payment questions pop up.",
        },
    ];

    const milestones = [
        { year: "2021", detail: "FastPay launches with electricity and gas billing." },
        { year: "2022", detail: "Auto-pay and smart reminders ship to all users." },
        { year: "2023", detail: "Real-time usage insights and bill analytics go live." },
    ];

    return (
        <>
            <HelmetTags />
            <div className="min-h-screen bg-base-100">
                <div className="w-11/12 max-w-6xl mx-auto py-10 lg:py-14">
                    <section className="bg-base-100 border border-base-200 rounded-3xl shadow-lg p-8 lg:p-12">
                        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                            About FastPay
                        </p>
                        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-base-content">
                            A calmer way to pay every utility bill.
                        </h1>
                        <p className="mt-4 text-base-content/70 text-lg leading-relaxed">
                            FastPay brings electricity, gas, water, and internet payments into a single,
                            reliable flow. We combine clean interfaces with secure processing so you
                            never miss a due date and always understand what you’re paying for.
                        </p>
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-base-200 bg-base-100 p-5"
                                >
                                    <h3 className="text-lg font-semibold text-base-content">
                                        {value.title}
                                    </h3>
                                    <p className="mt-2 text-base-content/70 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="bg-base-100 rounded-3xl shadow-lg p-6 lg:p-10">
                            <h2 className="text-2xl font-bold text-base-content">
                                Why people stay with FastPay
                            </h2>
                            <ul className="mt-5 space-y-3 text-base-content/70">
                                <li>Unified dashboard for every monthly bill.</li>
                                <li>Smart reminders that adapt to your billing cycle.</li>
                                <li>Clean receipts and downloadable reports.</li>
                                <li>Secure, verified billers and payment gateways.</li>
                            </ul>
                        </div>
                        <div className="bg-base-100 rounded-3xl shadow-lg p-6 lg:p-10">
                            <h2 className="text-2xl font-bold text-base-content">Milestones</h2>
                            <div className="mt-5 space-y-4">
                                {milestones.map((milestone) => (
                                    <div
                                        key={milestone.year}
                                        className="flex items-start gap-4 rounded-2xl bg-base-200 px-4 py-3"
                                    >
                                        <span className="text-sm font-semibold text-primary">
                                            {milestone.year}
                                        </span>
                                        <p className="text-sm text-base-content/70">
                                            {milestone.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default About;
