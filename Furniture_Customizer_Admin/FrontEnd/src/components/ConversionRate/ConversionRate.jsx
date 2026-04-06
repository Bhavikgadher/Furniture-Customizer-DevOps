import { useConversionMetrics } from '../../hooks/api';
import { conversionMetrics as fallbackMetrics } from '../../data/dashboardData';

/**
 * ConversionRate Component
 *
 * Displays the user-to-purchase conversion rate using:
 * - SVG donut/ring chart
 * - Key metrics: Average Order Value and Retention Rate
 * Now fetches data from /api/admin/dashboard/conversion
 */
const ConversionRate = () => {
    const { data, isLoading, error } = useConversionMetrics();

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center min-h-[320px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-slate-400 mt-3">Loading conversion data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center min-h-[320px]">
                <span className="material-symbols-outlined text-red-400 text-3xl mb-2">error</span>
                <p className="text-sm text-red-500">Failed to load conversion data</p>
            </div>
        );
    }

    const metricsData = data?.conversionMetrics || data;
    const metrics = (metricsData && Object.keys(metricsData).length > 0) ? metricsData : fallbackMetrics;
    
    // Formatting raw values into strings
    const rate = metrics.rate ? (typeof metrics.rate === 'number' ? `${metrics.rate}%` : metrics.rate) : '0%';
    const change = metrics.change || '+0% from last month';
    const averageOrderValue = metrics.averageOrderValue ? (typeof metrics.averageOrderValue === 'number' ? `$${metrics.averageOrderValue.toFixed(2)}` : metrics.averageOrderValue) : '$0.00';
    const retentionRate = metrics.retentionRate ? (typeof metrics.retentionRate === 'number' ? `${metrics.retentionRate}%` : metrics.retentionRate) : '0%';

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-default">
            <div>
                <h3 className="font-bold text-lg mb-1">Conversion Rate</h3>
                <p className="text-sm text-slate-500 mb-6">User visit to purchase ratio</p>

                {/* Donut Chart */}
                <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative flex items-center justify-center">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                                className="text-slate-100 dark:text-slate-800"
                                cx="64" cy="64" fill="transparent" r="56"
                                stroke="currentColor" strokeWidth="8"
                            />
                            <circle
                                className="text-primary"
                                cx="64" cy="64" fill="transparent" r="56"
                                stroke="currentColor"
                                strokeDasharray="351.85"
                                strokeDashoffset="339"
                                strokeWidth="8"
                            />
                        </svg>
                        <span className="absolute text-2xl font-bold">{rate}</span>
                    </div>
                    <p className="mt-4 text-emerald-500 text-sm font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        {change}
                    </p>
                </div>
            </div>

            {/* Bottom Metrics */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Average Order Value</span>
                    <span className="text-sm font-bold">{averageOrderValue}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Retention Rate</span>
                    <span className="text-sm font-bold">{retentionRate}</span>
                </div>
            </div>
        </div>
    );
};

export default ConversionRate;
