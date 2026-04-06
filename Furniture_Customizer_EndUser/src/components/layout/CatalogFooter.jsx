import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * CatalogFooter Component
 *
 * Simpler footer for catalog/product pages.
 * Includes: Shop, Services, Support links, email subscription, and legal bar.
 * Different from the full landing page Footer which has brand info and showroom details.
 */
const CatalogFooter = () => {
    const [email, setEmail] = useState('');

    const handleJoin = (e) => {
        e.preventDefault();
        // TODO: Integrate with newsletter API
        console.log('Join newsletter:', email);
    };

    return (
        <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Shop */}
                    <div>
                        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">
                            Shop
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li>
                                <Link className="hover:text-primary transition-colors" to="/products">
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" to="/products">
                                    Bestsellers
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" to="/products">
                                    Sale
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">
                            Services
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li>
                                <Link className="hover:text-primary transition-colors" to="/customizer">
                                    Custom Builds
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" to="/categories">
                                    Interior Design
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" to="/checkout">
                                    Financing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">
                            Support
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li>
                                <Link className="hover:text-primary transition-colors" to="/track-order">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" to="/return-request">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition-colors" to="/support">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Join */}
                    <div>
                        <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">
                            Join FurniCustom
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Get exclusive access to new designs and custom tips.
                        </p>
                        <form className="flex gap-2" onSubmit={handleJoin}>
                            <input
                                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 focus:ring-1 focus:ring-primary"
                                placeholder="Email address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold"
                                type="submit"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© 2024 FurniCustom Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-primary transition-colors" href="#">
                            Privacy Policy
                        </a>
                        <a className="hover:text-primary transition-colors" href="#">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default CatalogFooter;
