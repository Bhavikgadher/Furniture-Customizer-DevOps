import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Navbar Component
 *
 * Sticky top navigation bar for the main customer-facing pages.
 * Includes: logo, category links, search bar, and CTA button.
 * Responsive: search bar hidden on mobile, nav links hidden below md.
 */
const Navbar = () => {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
        }
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [personalInfo, setPersonalInfo] = useState(() => {
        const saved = localStorage.getItem('userProfileData');
        return saved ? JSON.parse(saved) : {
            fullName: 'Alex Johnson',
            email: 'alex.johnson@example.com'
        };
    });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Also listen for local storage changes in case profile is updated
    useEffect(() => {
        const handleStorageChange = () => {
            const saved = localStorage.getItem('userProfileData');
            if (saved) {
                setPersonalInfo(JSON.parse(saved));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleMenuAction = (action) => {
        setMenuOpen(false);
        if (action === 'orders') {
            navigate('/orders');
        } else if (action === 'address') {
            navigate('/addresses');
        } else if (action === 'cart') {
            navigate('/cart');
        } else if (action === 'support') {
            navigate('/support');
        } else if (action === 'profile') {
            navigate('/profile');
            // If already on profile, trigger a custom event or scroll down
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (action === 'logout') {
            localStorage.clear();
            alert('Logged out');
            navigate('/');
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link to="/home" className="flex items-center gap-2 group">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-white text-2xl">grid_view</span>
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                            Furni<span className="text-primary">Custom</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link className="nav-link-hover text-sm font-semibold text-slate-600 dark:text-slate-300" to="/products">
                            Sofas
                        </Link>
                        <Link className="nav-link-hover text-sm font-semibold text-slate-600 dark:text-slate-300" to="/products">
                            Chairs
                        </Link>
                        <Link className="nav-link-hover text-sm font-semibold text-slate-600 dark:text-slate-300" to="/products">
                            Tables
                        </Link>
                        <Link className="nav-link-hover text-sm font-semibold text-slate-600 dark:text-slate-300" to="/customizer">
                            Customizer
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/wishlist" className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">favorite</span>
                    </Link>
                    <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-transparent focus-within:border-primary transition-all">
                        <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-400"
                            placeholder="Find inspiration..."
                            type="text"
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <Link to="/customizer" className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 active:scale-95">
                        <span className="material-symbols-outlined text-sm">tune</span>
                        Start Customizing
                    </Link>

                    {/* User Profile Dropdown Header element */}
                    <div className="relative ml-2" ref={dropdownRef}>
                        <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 group hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-full transition-colors focus:ring-2 focus:ring-primary focus:outline-none">
                            <img alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvvr0LKOAuKogYOCglGobjfj5xgecRyZ3245pmfiFkanH4jDmXX3UmzNyvLSEcNNc7rKEqBAmyhJ2RTJhNL-xFsu1en_duqolaI9svg9ofikk02xFtesdf5mlTIROCPAeUfoUIiz-qlkXYDhEWV_-ebgonIasqdKYENz1qBTqlsiVZMtU1aN6etz9J9xr-yI2mz76LGdKeBQ9C-bUeM2U7j6iRtr-13QNlydTj7EcCE1ofImLFp0Y5ra-EbdiMM-xiNwwMFstd21kj" className="size-10 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-800" />
                        </button>

                        {menuOpen && (
                            <div className="absolute top-14 right-0 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-50 origin-top-right transition-all duration-200">
                                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{personalInfo.fullName}</p>
                                    <p className="text-xs text-slate-500 truncate">{personalInfo.email}</p>
                                </div>
                                <div className="py-2">
                                    <button onClick={() => handleMenuAction('orders')} className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg">shopping_bag</span> Orders
                                    </button>
                                    <button onClick={() => handleMenuAction('address')} className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg">location_on</span> Address
                                    </button>
                                    <button onClick={() => handleMenuAction('cart')} className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg">shopping_cart</span> Cart
                                    </button>
                                    <button onClick={() => handleMenuAction('profile')} className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg">person</span> User Profile
                                    </button>
                                    <button onClick={() => handleMenuAction('support')} className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg">support_agent</span> Support
                                    </button>
                                </div>
                                <div className="py-2 border-t border-slate-100 dark:border-slate-800">
                                    <button onClick={() => handleMenuAction('logout')} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg">logout</span> Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
