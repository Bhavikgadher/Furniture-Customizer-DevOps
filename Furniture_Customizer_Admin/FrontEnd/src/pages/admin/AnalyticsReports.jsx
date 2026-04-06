import { useState, useMemo } from 'react';

import {
    salesByCategory,
    donutStrokeClasses,
    vendorPerformance,
    revenueMonthLabels,
    userGrowthDayLabels,
} from '../../data/analyticsData';
import {
    useAnalyticsKPIs,
    useRevenueChart,
    useSalesByCategory,
    useVendorPerformance,
    useUserGrowth,
    useExportAnalytics,
} from '../../hooks/api';

const dateRangeOptions = [
    { value: 'oct', label: 'Oct 1 – Oct 31, 2023' },
    { value: 'q3', label: 'Q3 (Jul – Sep 2023)' },
    { value: 'h1', label: 'H1 (Jan – Jun 2023)' },
    { value: 'ytd', label: 'Year to Date 2023' },
];

// Fallback KPI data
const fallbackKPIs = [
    { label: 'Total Revenue', value: '$128,430', icon: 'payments', iconBg: 'bg-primary/10', iconColor: 'text-primary', trendValue: '12%', trendColor: 'text-emerald-500', trendIcon: 'trending_up' },
    { label: 'Avg. Order Value', value: '$450', icon: 'shopping_cart', iconBg: 'bg-orange-100 dark:bg-orange-900/20', iconColor: 'text-orange-600', trendValue: '2%', trendColor: 'text-rose-500', trendIcon: 'trending_down' },
    { label: 'Conversion Rate', value: '3.2%', icon: 'ads_click', iconBg: 'bg-purple-100 dark:bg-purple-900/20', iconColor: 'text-purple-600', trendValue: '0.5%', trendColor: 'text-emerald-500', trendIcon: 'trending_up' },
    { label: 'Net Profit', value: '$42,100', icon: 'savings', iconBg: 'bg-emerald-100 dark:bg-emerald-900/20', iconColor: 'text-emerald-600', trendValue: '8%', trendColor: 'text-emerald-500', trendIcon: 'trending_up' },
];

const AnalyticsReports = () => {
    const [selectedRange, setSelectedRange] = useState('oct');
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);

    // ─── API Hooks ────────────────────────────────────────
    const { data: kpisData, isLoading: kpisLoading } = useAnalyticsKPIs({ period: selectedRange });
    const { data: revenueData } = useRevenueChart({ period: selectedRange });
    const { data: categoryData } = useSalesByCategory({ period: selectedRange });
    const { data: vendorPerfData } = useVendorPerformance({ period: selectedRange });
    const { data: userGrowthData } = useUserGrowth({ period: selectedRange });
    const exportMutation = useExportAnalytics();

    // ─── Derived ──────────────────────────────────────────
    const kpis = kpisData?.kpis || kpisData || fallbackKPIs;
    const currentLabel = dateRangeOptions.find((o) => o.value === selectedRange)?.label || '';

    const handleRangeChange = (range) => {
        setSelectedRange(range);
        setIsDatePickerOpen(false);
    };

    const handleExport = (format) => {
        exportMutation.mutate({ format, period: selectedRange });
        setIsExportOpen(false);
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 -mx-8 -mt-8 px-8 py-6 sticky top-0 z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                            Analytics &amp; Reports
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Real-time business performance overview
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Date Range Picker */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-400 text-sm">calendar_month</span>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{currentLabel}</span>
                                <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
                            </button>
                            {isDatePickerOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-20">
                                    {dateRangeOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleRangeChange(opt.value)}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${selectedRange === opt.value
                                                ? 'bg-primary/10 text-primary font-bold'
                                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            {selectedRange === opt.value && (
                                                <span className="material-symbols-outlined text-sm">check</span>
                                            )}
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-full cursor-pointer transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsExportOpen(!isExportOpen)}
                                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm transition-opacity hover:opacity-90 active:scale-95 transition-transform"
                            >
                                <span className="material-symbols-outlined text-sm">download</span>
                                <span>Export Data</span>
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                            {isExportOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-20">
                                    <button onClick={() => handleExport('csv')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">Export as CSV</button>
                                    <button onClick={() => handleExport('excel')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">Export as Excel</button>
                                    <button onClick={() => handleExport('pdf')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">Export as PDF</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="pt-8 space-y-8">
                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpisLoading
                        ? Array.from({ length: 4 }).map((_, i) => (
                              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
                                  <div className="w-24 h-4 bg-slate-200 rounded mb-3"></div>
                                  <div className="w-16 h-7 bg-slate-200 rounded"></div>
                              </div>
                          ))
                        : (Array.isArray(kpis) ? kpis : fallbackKPIs).map((kpi, index) => (
                              <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
                                  <div className="flex justify-between items-start mb-4">
                                      <div className={`p-2 ${kpi.iconBg} rounded-lg`}>
                                          <span className={`material-symbols-outlined ${kpi.iconColor}`}>{kpi.icon}</span>
                                      </div>
                                      <span className={`${kpi.trendColor} text-sm font-bold flex items-center gap-1`}>
                                          <span className="material-symbols-outlined text-sm">{kpi.trendIcon}</span>{' '}
                                          {kpi.trendValue}
                                      </span>
                                  </div>
                                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{kpi.label}</p>
                                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{kpi.value}</h3>
                              </div>
                          ))}
                </div>

                {/* Primary Line Chart: Revenue Analytics */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Analytics</h4>
                            <p className="text-sm text-slate-500">Monthly revenue trends for 2023</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="size-3 rounded-full bg-primary"></div>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Current Year</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Previous Year</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <svg className="w-full h-full" viewBox="0 0 800 300">
                            <line className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" x1="0" x2="800" y1="50" y2="50" />
                            <line className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" x1="0" x2="800" y1="150" y2="150" />
                            <line className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1" x1="0" x2="800" y1="250" y2="250" />
                            <path className="fill-primary/5" d="M0,250 L50,180 L150,210 L250,120 L350,150 L450,80 L550,100 L650,40 L750,60 L800,20 L800,250 Z" />
                            <path className="stroke-primary fill-none" d="M0,250 L50,180 L150,210 L250,120 L350,150 L450,80 L550,100 L650,40 L750,60 L800,20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                            <path className="stroke-slate-300 dark:stroke-slate-600 fill-none" d="M0,240 L100,230 L200,245 L300,200 L400,220 L500,180 L600,190 L700,150 L800,160" strokeDasharray="8,4" strokeLinecap="round" strokeWidth="2" />
                            <circle className="fill-primary stroke-white dark:stroke-slate-900" cx="250" cy="120" r="6" strokeWidth="2" />
                            <circle className="fill-primary stroke-white dark:stroke-slate-900" cx="650" cy="40" r="6" strokeWidth="2" />
                        </svg>
                        <div className="flex justify-between mt-4 px-2">
                            {revenueMonthLabels.map((label) => (
                                <span key={label} className="text-xs font-bold text-slate-400">{label}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sales by Category (Doughnut) */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Sales by Category</h4>
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative size-48">
                                <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
                                    <circle className="stroke-slate-100 dark:stroke-slate-800" cx="18" cy="18" fill="transparent" r="15.9" strokeWidth="4" />
                                    {salesByCategory.map((cat, i) => (
                                        <circle key={cat.name} className={`${donutStrokeClasses[i]} hover:stroke-[6] transition-all cursor-pointer`} cx="18" cy="18" fill="transparent" r="15.9" strokeDasharray={cat.dasharray} strokeDashoffset={cat.dashoffset} strokeLinecap="round" strokeWidth="4" />
                                    ))}
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-black">$84k</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Sales</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                                {salesByCategory.map((cat) => (
                                    <div key={cat.name} className="flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 p-1 -mx-1 rounded transition-colors cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <div className={`size-3 rounded-full ${cat.color}`}></div>
                                            <span className="text-sm font-medium">{cat.name}</span>
                                        </div>
                                        <span className="text-sm font-bold">{cat.percentage}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Vendor Performance (Bar Chart) */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Vendor Performance</h4>
                        <div className="space-y-6">
                            {vendorPerformance.map((vendor) => (
                                <div key={vendor.name} className="space-y-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 -mx-2 rounded-lg transition-all cursor-pointer group">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-slate-700 dark:text-slate-200">{vendor.name}</span>
                                        <span className="font-medium">{vendor.sales}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                                        <div className={`${vendor.barClass} h-full rounded-full group-hover:brightness-110 transition-all`} style={{ width: vendor.width }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* User Growth Metrics */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">User Growth Metrics</h4>
                            <p className="text-sm text-slate-500">New signups vs daily active users</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="size-3 rounded-full bg-indigo-500"></div>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">New Signups</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-3 rounded-full bg-teal-500"></div>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Active Users</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <svg className="w-full h-full" viewBox="0 0 800 200">
                            <line className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="2" x1="0" x2="800" y1="190" y2="190" />
                            <path className="stroke-indigo-500 fill-none hover:stroke-[4] transition-all cursor-pointer" d="M0,180 L80,160 L160,175 L240,130 L320,150 L400,100 L480,120 L560,70 L640,90 L720,40 L800,50" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            <path className="stroke-teal-500 fill-none hover:stroke-[4] transition-all cursor-pointer" d="M0,150 L80,140 L160,145 L240,120 L320,125 L400,110 L480,115 L560,90 L640,95 L720,80 L800,85" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                        </svg>
                        <div className="flex justify-between mt-4 px-2">
                            {userGrowthDayLabels.map((label) => (
                                <span key={label} className="text-xs font-bold text-slate-400">{label}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6 pb-2 text-center">
                <p className="text-xs text-slate-400">
                    © 2023 Admin Panel Analytics System. All rights reserved.
                </p>
            </footer>
        </>
    );
};

export default AnalyticsReports;
