import useHelmet from "../hooks/useHelmet";

const Support = () => {
    const HelmetTags = useHelmet({
        title: "Support",
        description: "Find answers, talk to support, and keep payments on track.",
    });

    const faqs = [
        {
            question: "How do I set up auto-pay?",
            answer:
                "Open any bill detail page and choose Auto-pay. You can pause or change it anytime.",
        },
        {
            question: "Can I pay bills for multiple locations?",
            answer:
                "Yes. Add multiple accounts and switch between them from your dashboard.",
        },
        {
            question: "What happens if a payment fails?",
            answer:
                "You’ll get an instant notification with retry options and support guidance.",
        },
        {
            question: "How do I download receipts?",
            answer:
                "Each bill shows a Download Receipt action after payment confirmation.",
        },
    ];

    return (
        <>
            <HelmetTags />
            <div className="min-h-screen bg-base-100">
                <div className="w-11/12 max-w-6xl mx-auto py-10 lg:py-14">
                    <header className="text-center">
                        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                            Support
                        </p>
                        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-base-content">
                            Help that keeps you in control.
                        </h1>
                        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
                            Browse common answers, or connect with a FastPay specialist for billing
                            help anytime.
                        </p>
                    </header>

                    <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="bg-base-100 rounded-3xl shadow-lg p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-base-content">FAQs</h2>
                            <div className="mt-6 space-y-3">
                                {faqs.map((item) => (
                                    <div key={item.question} className="collapse collapse-arrow bg-base-200">
                                        <input type="checkbox" />
                                        <div className="collapse-title text-base font-semibold text-base-content">
                                            {item.question}
                                        </div>
                                        <div className="collapse-content text-base-content/70">
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-base-100 rounded-3xl shadow-lg p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-base-content">Contact</h2>
                            <p className="mt-3 text-base-content/70">
                                Reach us anytime. We respond within 24 hours.
                            </p>
                            <div className="mt-6 space-y-4 text-sm text-base-content/70">
                                <div>
                                    <p className="font-semibold text-base-content">Email</p>
                                    <p>support@fastpay.com</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-base-content">Phone</p>
                                    <p>+1-800-FASTPAY</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-base-content">Hours</p>
                                    <p>Mon–Fri, 9:00 AM–8:00 PM</p>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-6 w-full">Start a Ticket</button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Support;
