import React from 'react';
import { Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import fastPayLogo from '../assets/fastpay.png';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = {
        company: {
            title: 'Company',
            links: [
                { label: 'About Us', href: '#about' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Careers', href: '#careers' },
                { label: 'Press Kit', href: '#press' },
                { label: 'Blog', href: '#blog' }
            ]
        },
        services: {
            title: 'Services',
            links: [
                { label: 'Pay Bills', href: '#pay-bills' },
                { label: 'Bill Reminders', href: '#reminders' },
                { label: 'Auto-Pay', href: '#auto-pay' },
                { label: 'Bill Analysis', href: '#analysis' },
                { label: 'Payment History', href: '#history' }
            ]
        },
        utilities: {
            title: 'Utilities',
            links: [
                { label: 'Electricity', href: '#electricity' },
                { label: 'Water', href: '#water' },
                { label: 'Gas', href: '#gas' },
                { label: 'Internet', href: '#internet' },
                { label: 'Phone', href: '#phone' }
            ]
        },
        support: {
            title: 'Support',
            links: [
                { label: 'Help Center', href: '#help' },
                { label: 'Contact Us', href: '#contact' },
                { label: 'FAQs', href: '#faqs' },
                { label: 'Payment Issues', href: '#issues' },
                { label: 'System Status', href: '#status' }
            ]
        },
        legal: {
            title: 'Legal',
            links: [
                { label: 'Privacy Policy', href: '#privacy' },
                { label: 'Terms of Service', href: '#terms' },
                { label: 'Cookie Policy', href: '#cookies' },
                { label: 'Security', href: '#security' },
                { label: 'Compliance', href: '#compliance' }
            ]
        }
    };

    const socialLinks = [
        { icon: FaFacebook, href: '#facebook', label: 'Facebook' },
        { icon: FaXTwitter, href: '#twitter', label: 'Twitter' },
        { icon: FaLinkedin, href: '#linkedin', label: 'LinkedIn' },
        { icon: FaInstagram, href: '#instagram', label: 'Instagram' }
    ];

    const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay'];

    return (
        <footer className="bg-neutral text-neutral-content">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                {/* Top Section - Brand & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-12 md:gap-8 lg:gap-12 pb-12 border-b border-neutral/30">
                    {/* Brand Section */}
                    <div className="col-span-5">
                        <div className="flex items-center gap-2 mb-4 ">
                            <img src={fastPayLogo} alt="FastPay Logo" className=" h-10 bg-base-200 rounded-md px-1" />

                        </div>
                        <p className="text-neutral-content/70 mb-6 leading-relaxed">
                            Simplifying utility bill management with secure, fast, and reliable payment solutions. Pay all your bills in one place, effortlessly.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm text-neutral-content/70">Email Us</p>
                                    <a href="mailto:support@fastpay.com" className="text-neutral-content hover:text-primary transition-colors">
                                        support@fastpay.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm text-neutral-content/70">Call Us</p>
                                    <a href="tel:+1-800-FASTPAY" className="text-neutral-content hover:text-primary transition-colors">
                                        +1-800-FASTPAY
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm text-neutral-content/70">Visit Us</p>
                                    <p className="text-neutral-content">123 Finance Street, NY 10001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="col-span-1 col-start-3 md:col-span-5 lg:col-span-5 md:col-start-8 lg:col-start-8 pt-5">
                        <div className="w-full text-center md:text-start lg:text-start">
                            <h3 className="text-neutral-content font-semibold text-lg mb-4">Stay Updated</h3>
                            <p className="text-neutral-content/70 mb-4 text-sm">
                                Subscribe to get updates on new features, payment reminders, and exclusive offers.
                            </p>
                            <div className="flex flex-col md:flex-row lg:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2.5 bg-base-200 border border-base-300 rounded-lg text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                                <button className="px-6 py-2.5 bg-linear-to-r from-primary to-secondary text-primary-content font-medium rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all transform hover:scale-105 active:scale-95">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-neutral-content/60 mt-3">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
                    {Object.entries(footerSections).map(([key, section]) => (
                        <div key={key}>
                            <h3 className="text-neutral-content font-semibold text-base mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-neutral-content/70 hover:text-primary transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Payment Methods & Social */}
                <div className="pt-8 border-t border-neutral/30">
                    <div className="flex flex-col md:flex-col justify-center items-center gap-6">
                        {/* Payment Methods */}
                        <div className="text-center md:text-left">
                            <p className="text-sm text-neutral-content/70 mb-3 text-center">Accepted Payment Methods</p>
                            <div className="flex flex-wrap items-center gap-3 justify-center">
                                {paymentMethods.map((method, index) => (
                                    <div
                                        key={index}
                                        className="bg-base-100 px-3 py-1.5 rounded text-base-content text-xs font-semibold flex items-center gap-1"
                                    >
                                        <CreditCard className="w-3 h-3" />
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="text-center flex flex-col">
                            <p className="text-sm text-neutral-content/70 mb-3">Follow Us</p>
                            <div className="flex gap-3 justify-center md:justify-end">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            aria-label={social.label}
                                            className="w-10 h-10 bg-base-200 rounded-full flex items-center justify-center hover:bg-linear-to-br hover:from-primary hover:to-secondary transition-all transform hover:scale-115 active:scale-100"
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral/30 bg-neutral/90">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-content/60">
                        <p>© {currentYear} FastPay. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href="#accessibility" className="hover:text-primary transition-colors">
                                Accessibility
                            </a>
                            <a href="#sitemap" className="hover:text-primary transition-colors">
                                Sitemap
                            </a>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                                <span className="text-success">All Systems Operational</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
