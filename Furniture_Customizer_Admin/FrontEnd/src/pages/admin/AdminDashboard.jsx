
import StatsCard from '../../components/StatsCard/StatsCard';
import SalesChart from '../../components/SalesChart/SalesChart';
import ConversionRate from '../../components/ConversionRate/ConversionRate';
import RecentActivity from '../../components/RecentActivity/RecentActivity';
import TopSellingModels from '../../components/TopSellingModels/TopSellingModels';
import { useDashboardStats } from '../../hooks/api';
import { statsData as fallbackStats } from '../../data/dashboardData';

/**
 * AdminDashboard Page
 *
 * Main admin dashboard view assembling all dashboard widgets.
 * Fetches KPI stats from /api/admin/dashboard/stats.
 * Child components (SalesChart, ConversionRate, etc.) handle their own fetching.
 */
const AdminDashboard = () => {
    const { data, isLoading, error } = useDashboardStats();

    const getIconStyles = (label, index) => {
        const lowerLabel = (label || '').toLowerCase();
        if (lowerLabel.includes('revenue') || lowerLabel.includes('payments')) return { bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600' };
        if (lowerLabel.includes('order')) return { bg: 'bg-orange-50 dark:bg-orange-900/20', color: 'text-orange-600' };
        if (lowerLabel.includes('user')) return { bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-600' };
        if (lowerLabel.includes('vendor')) return { bg: 'bg-emerald-50 dark:bg-emerald-900/20', color: 'text-emerald-600' };
        
        // Fallback cycle based on index
        const colors = [
            { bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600' },
            { bg: 'bg-orange-50 dark:bg-orange-900/20', color: 'text-orange-600' },
            { bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-600' },
            { bg: 'bg-emerald-50 dark:bg-emerald-900/20', color: 'text-emerald-600' }
        ];
        return colors[index % colors.length];
    };

    // Map API response to StatsCard props, fallback to mock data
    const rawStats = data?.stats || data || fallbackStats;
    const stats = Array.isArray(rawStats) 
        ? rawStats.map((stat, i) => {
            const styles = getIconStyles(stat.label, i);
            return {
                ...stat,
                change: stat.change || stat.trend || '0%',
                iconBg: stat.iconBg || styles.bg,
                iconColor: stat.iconColor || styles.color,
                icon: stat.icon || 'info'
            };
        }) 
        : [];

    return (
        <>
            {/* KPI Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {isLoading && (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                <div className="w-16 h-5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                            </div>
                            <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                            <div className="w-20 h-7 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        </div>
                    ))
                )}
                {error && !isLoading && (
                    <div className="col-span-full text-center py-8 text-red-500 text-sm">
                        <span className="material-symbols-outlined text-3xl mb-2 block">error</span>
                        Failed to load dashboard stats
                    </div>
                )}
                {!isLoading && !error && stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        icon={stat.icon}
                        iconBg={stat.iconBg}
                        iconColor={stat.iconColor}
                        label={stat.label}
                        value={stat.value}
                        change={stat.change}
                    />
                ))}
            </div>

            {/* Sales Chart + Conversion Rate Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <SalesChart />
                <ConversionRate />
            </div>

            {/* Recent Activity + Top Selling Models Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentActivity />
                <TopSellingModels />
            </div>
        </>
    );
};

export default AdminDashboard;
