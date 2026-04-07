import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications as fallbackNotifications, userMenuItems } from '../../data/dashboardData';
import { useCurrentAdmin, useNotifications, useLogout } from '../../hooks/api';

/**
 * Header Component
 * 
 * Top navigation bar with:
 * - Search input
 * - Notification bell with dropdown
 * - User profile with dropdown menu
 */
const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const navigate = useNavigate();
    const logoutMutation = useLogout();

    const notificationRef = useRef(null);
    const userMenuRef = useRef(null);

    // API Hooks
    const { data: adminData } = useCurrentAdmin();
    const { data: notifData } = useNotifications({ unread: true });

    const admin = adminData || { name: 'Admin User', role: 'Super Admin' };
    const notifications = notifData?.notifications || notifData || fallbackNotifications;
    const unreadCount = notifData?.unreadCount || (Array.isArray(notifications) ? notifications.length : 0);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        search
                    </span>
                    <input
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary/30"
                        placeholder="Search analytics, orders, products..."
                        type="text"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <div className="relative" ref={notificationRef}>
                    <button
                        className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all active:opacity-70"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <span className="material-symbols-outlined">notifications</span>
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h4 className="font-bold text-sm">Notifications</h4>
                                <span className="text-xs text-primary font-medium cursor-pointer hover:underline active:opacity-70 transition-all">
                                    Mark all as read
                                </span>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.map((notif, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer active:opacity-70 last:border-b-0"
                                    >
                                        <p className={`text-sm font-medium ${notif.highlight ? notif.highlightColor : ''}`}>
                                            {notif.message}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 text-center">
                                <button className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors active:opacity-70">
                                    View All Notifications
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>

                {/* User Profile */}
                <div className="relative" ref={userMenuRef}>
                    <div
                        className="flex items-center gap-3 cursor-pointer group active:opacity-70 transition-all"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold leading-none">{admin.name}</p>
                            <p className="text-xs text-slate-500 mt-1">{admin.role}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/10">
                            <img
                                alt="Admin Profile"
                                className="w-full h-full object-cover"
                                src={admin.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.name)}&background=1152d4&color=fff`}
                            />
                        </div>
                    </div>

                    {/* User Dropdown */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden">
                            <div className="p-2">
                                {userMenuItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setShowUserMenu(false);
                                            navigate(item.href);
                                        }}
                                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors w-full text-left"
                                    >
                                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                                <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1"></div>
                                <button
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        logoutMutation.mutate();
                                    }}
                                    disabled={logoutMutation.isPending}
                                    className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors font-medium w-full text-left"
                                >
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    <span>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
