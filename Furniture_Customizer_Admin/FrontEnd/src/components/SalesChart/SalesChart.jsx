import { useState } from 'react';
import { useSalesChart } from '../../hooks/api';

/**
 * SalesChart Component
 *
 * Visual bar chart showing sales growth.
 * Daily/Monthly toggle switches between API calls.
 * Fetches from /api/admin/dashboard/sales-chart?period={daily|monthly}
 */

const fallbackMonthly = [
    { label: 'Jan', height: '40%', value: '$14.2k' },
    { label: 'Feb', height: '55%', value: '$19.5k' },
    { label: 'Mar', height: '45%', value: '$16.0k' },
    { label: 'Apr', height: '70%', value: '$24.8k' },
    { label: 'May', height: '65%', value: '$23.1k' },
    { label: 'Jun', height: '85%', value: '$30.2k' },
    { label: 'Jul', height: '95%', value: '$33.7k' },
];

const fallbackDaily = [
    { label: 'Mon', height: '60%', value: '$2.1k' },
    { label: 'Tue', height: '45%', value: '$1.6k' },
    { label: 'Wed', height: '80%', value: '$2.8k' },
    { label: 'Thu', height: '35%', value: '$1.2k' },
    { label: 'Fri', height: '90%', value: '$3.2k' },
    { label: 'Sat', height: '70%', value: '$2.5k' },
    { label: 'Sun', height: '50%', value: '$1.8k' },
];

const SalesChart = () => {
    const [activeTab, setActiveTab] = useState('Monthly');
    const period = activeTab === 'Monthly' ? 'monthly' : 'daily';

    const { data, isLoading } = useSalesChart({ period });

    // If the API returns labels+datasets, transform them into our bar format.
    // Otherwise, fall back to mock data.
    let chartData;
    if (data?.labels && data?.datasets) {
        chartData = data.labels.map((label, i) => {
            const value = data.datasets[0]?.data?.[i] || 0;
            const maxVal = Math.max(...(data.datasets[0]?.data || [1]));
            const height = `${Math.round((value / maxVal) * 100)}%`;
            return { label, height, value: `$${(value / 1000).toFixed(1)}k` };
        });
    } else {
        chartData = activeTab === 'Monthly' ? fallbackMonthly : fallbackDaily;
    }

    return (
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-default">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-lg">Sales Growth</h3>
                    <p className="text-sm text-slate-500">
                        {activeTab === 'Monthly'
                            ? 'Monthly overview of generated revenue'
                            : 'Daily overview of generated revenue'}
                    </p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    {['Daily', 'Monthly'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 text-xs font-medium rounded-md active:scale-95 transition-transform ${activeTab === tab
                                    ? 'bg-white dark:bg-slate-700 shadow-sm'
                                    : 'hover:bg-white dark:hover:bg-slate-700'
                                } transition-colors`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading overlay */}
            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Bar Chart */}
            {!isLoading && (
                <>
                    <div className="h-64 w-full relative flex items-end justify-between gap-2 px-2 overflow-visible">
                        {chartData.map((bar, index) => {
                            const isLast = index === chartData.length - 1;
                            return (
                                <div
                                    key={`${activeTab}-${bar.label}`}
                                    className="w-full bg-primary/10 rounded-t-lg relative group cursor-pointer hover:bg-primary/20 transition-all duration-500"
                                    style={{ height: bar.height, minHeight: '20px' }}
                                >
                                    <div
                                        className={`absolute inset-0 rounded-t-lg border-t-2 border-primary ${isLast ? 'shadow-[0_-4px_10px_rgba(17,82,212,0.3)]' : ''
                                            }`}
                                    ></div>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                        {bar.value}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Labels */}
                    <div className="flex justify-between mt-4 px-2">
                        {chartData.map((bar) => (
                            <span key={`${activeTab}-label-${bar.label}`} className="text-xs text-slate-400 font-medium">
                                {bar.label}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SalesChart;
