import useHelmet from "../hooks/useHelmet";

const Pricing = () => {
    const HelmetTags = useHelmet({
        title: "Pricing",
        description: "Choose the FastPay plan that fits your billing needs.",
    });

    const plans = [
        {
            name: "Starter",
            price: "Free",
            summary: "For individuals paying a few bills a month.",
            features: ["Up to 5 bills", "Email reminders", "Basic analytics"],
            action: "Start Free",
            badge: "Good for personal",
        },
        {
            name: "Plus",
            price: "$6/mo",
            summary: "For households that want smart automation.",
            features: ["Unlimited bills", "Auto-pay", "Priority reminders"],
            action: "Go Plus",
            badge: "Most popular",
            highlight: true,
        },
        {
            name: "Teams",
            price: "$18/mo",
            summary: "For small teams managing multiple accounts.",
            features: ["Team access", "Exportable reports", "Dedicated support"],
            action: "Talk to Sales",
            badge: "Best for teams",
        },
    ];

    return (
        <>
            <HelmetTags />
            <div className="min-h-screen bg-base-200">
                <div className="w-11/12 max-w-6xl mx-auto py-10 lg:py-14">
                    <header className="text-center">
                        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                            Pricing
                        </p>
                        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-base-content">
                            Simple plans, polished payments.
                        </h1>
                        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
                            All plans include secure bill payment, instant receipts, and access to
                            your FastPay dashboard. Upgrade anytime.
                        </p>
                    </header>

                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`rounded-3xl border ${
                                    plan.highlight
                                        ? "border-primary bg-base-100 shadow-lg"
                                        : "border-base-200 bg-base-100"
                                } p-6`}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-base-content">
                                        {plan.name}
                                    </h3>
                                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                        {plan.badge}
                                    </span>
                                </div>
                                <p className="mt-3 text-3xl font-bold text-base-content">
                                    {plan.price}
                                </p>
                                <p className="mt-2 text-sm text-base-content/70">{plan.summary}</p>
                                <ul className="mt-5 space-y-2 text-sm text-base-content/70">
                                    {plan.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                                <button
                                    className={`mt-6 w-full btn ${
                                        plan.highlight ? "btn-primary" : "btn-neutral"
                                    }`}
                                >
                                    {plan.action}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-base-100 rounded-3xl border border-base-200 p-6 md:p-8 text-center">
                        <h2 className="text-2xl font-bold text-base-content">
                            Need a custom plan?
                        </h2>
                        <p className="mt-2 text-base-content/70">
                            We offer tailored billing workflows for enterprises and municipalities.
                        </p>
                        <button className="btn btn-outline btn-primary mt-5">
                            Contact FastPay
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pricing;
