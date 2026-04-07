import { Link, useNavigate } from 'react-router-dom';

/**
 * CustomerNavbar Component
 *
 * Sticky top navigation bar for authenticated customer pages
 * (Catalog, Product Detail, Cart, etc.)
 *
 * Includes: logo, nav links (Home, Furniture, Custom Design, About Us),
 * search bar, cart icon, profile icon, and user avatar.
 *
 * Different from the landing page Navbar which uses "Start Customizing" CTA.
 */
const CustomerNavbar = ({ activeLink = '' }) => {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
        }
    };

    const navLinks = [
        { label: 'Home', href: '/home' },
        { label: 'Furniture', href: '/categories' },
        { label: 'Custom Design', href: '/customizer' },
        { label: 'About Us', href: '/' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/home" className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-primary p-1.5 rounded-lg text-white">
                                <span className="material-symbols-outlined block text-xl">chair</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight">FurniCustom</h2>
                        </Link>
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className={
                                        link.label === activeLink
                                            ? 'text-sm font-semibold text-primary'
                                            : 'text-sm font-medium hover:text-primary transition-colors'
                                    }
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex relative items-center">
                            <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg">
                                search
                            </span>
                            <input
                                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-48 lg:w-64 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-slate-400"
                                placeholder="Search furniture..."
                                type="text"
                                onKeyDown={handleSearch}
                            />
                        </div>
                        <Link className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-300" to="/wishlist">
                            <span className="material-symbols-outlined">favorite</span>
                        </Link>
                        <Link className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-300" to="/cart">
                            <span className="material-symbols-outlined">shopping_cart</span>
                        </Link>
                        <Link className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-300" to="/profile">
                            <span className="material-symbols-outlined">person</span>
                        </Link>
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-800">
                            <img
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBftiqp6eE4mncXaPE6q1yo-Mm7D_S_SGjR9kIU03jnLApNb089RbzFML0cIlDtYWgkKSYr3rtmQG24Stezc3HrH-XoPn_rLTRSb6m828AfABazaqNp6DuxGEF_RPsUrguptrRDomaOiXXWRgN5Nfjguun7B2nzM_xgHgA2Ns5Yd2fvCdIIt6sIe5rwVMwmKaM8MRalQnT-atMkAKyzegCtpiUr2sNKZ5cne1fu7zmC-rTsZYLkqwZ7NDImbzV_j7jhzWkW1RD7w-7U"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CustomerNavbar;
