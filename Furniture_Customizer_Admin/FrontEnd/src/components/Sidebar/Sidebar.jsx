import { NavLink, useLocation } from 'react-router-dom';
import { sidebarNavItems } from '../../data/dashboardData';

/**
 * Sidebar Component
 * 
 * Left-side navigation panel with:
 * - Brand logo & name
 * - Navigation links with active state driven by current route
 * - Help center support section at bottom
 * 
 * Uses React Router's NavLink for proper client-side navigation.
 * Items with path '#' are rendered as plain <a> tags (future pages).
 */
const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-y-auto">
            {/* Brand Logo */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">chair</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                    FurniCustom
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-1">
                {sidebarNavItems.map((item) => {
                    // Items with real routes use NavLink; placeholder '#' items use <a>
                    if (item.path === '#') {
                        return (
                            <a
                                key={item.label}
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:translate-x-1"
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        );
                    }

                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:translate-x-1'
                                }`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Support Section */}
            <div className="p-4 mt-auto">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Support
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors active:scale-95 duration-200">
                        <span className="material-symbols-outlined text-sm">help</span>
                        Help Center
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
