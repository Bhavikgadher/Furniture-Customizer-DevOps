import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';

/**
 * AdminLayout Component
 * 
 * Wraps the admin pages with a consistent layout:
 * - Fixed sidebar on the left
 * - Header at the top
 * - Scrollable content area
 * 
 * This layout is separated from AdminDashboard so future admin pages
 * (Users, Vendors, Products, etc.) can reuse the same shell.
 */
const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto p-8">
                    {children || <Outlet />}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
