import { useRecentActivity } from '../../hooks/api';
import { recentActivities as fallbackActivities } from '../../data/dashboardData';

/**
 * RecentActivity Component
 *
 * Feed of recent admin-relevant events.
 * Fetches from /api/admin/dashboard/activity, falls back to mock data.
 */
const RecentActivity = () => {
    const { data, isLoading, error } = useRecentActivity({ limit: 5 });

    const getIconStyle = (icon) => {
        const iconStyles = {
            shopping_cart: { bg: 'bg-slate-100 dark:bg-slate-800', color: 'text-primary' },
            verified_user: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', color: 'text-emerald-600' },
            person_add: { bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600' },
            edit_note: { bg: 'bg-amber-50 dark:bg-amber-900/20', color: 'text-amber-600' },
            inventory: { bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-600' },
            error: { bg: 'bg-red-50 dark:bg-red-900/20', color: 'text-red-600' }
        };
        return iconStyles[icon] || { bg: 'bg-slate-100 dark:bg-slate-800', color: 'text-slate-500' };
    };

    const rawActivities = data?.activities || data || fallbackActivities;
    const activities = Array.isArray(rawActivities) 
        ? rawActivities.map(activity => {
            const style = getIconStyle(activity.icon);
            return {
                ...activity,
                iconBg: activity.iconBg || style.bg,
                iconColor: activity.iconColor || style.color,
                message: activity.message || activity.description || 'No description provided',
                time: activity.time || activity.createdAt || 'Just now',
                icon: activity.icon || 'notifications'
            };
        })
        : [];

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-default">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Recent Activity</h3>
                <button className="text-primary text-sm font-medium hover:underline hover:text-primary/80 transition-colors">
                    View All
                </button>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Error */}
            {error && !isLoading && (
                <div className="text-center py-8 text-sm text-red-500">
                    Failed to load recent activity
                </div>
            )}

            {/* Activity Items */}
            {!isLoading && !error && (
                <div className="space-y-6">
                    {activities.map((activity, index) => (
                        <div
                            key={activity.id || index}
                            className="flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -m-2 rounded-lg transition-colors cursor-pointer"
                        >
                            <div
                                className={`w-10 h-10 rounded-full ${activity.iconBg || 'bg-primary/10'} flex items-center justify-center shrink-0`}
                            >
                                <span className={`material-symbols-outlined ${activity.iconColor || 'text-primary'}`}>
                                    {activity.icon || 'info'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm">{activity.message || activity.description}</p>
                                <p className="text-xs text-slate-400 mt-1">{activity.time || activity.createdAt}</p>
                            </div>
                        </div>
                    ))}
                    {activities.length === 0 && (
                        <p className="text-center text-sm text-slate-400 py-6">No recent activity</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecentActivity;
