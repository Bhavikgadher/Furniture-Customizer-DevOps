/**
 * Static/dummy data for the Analytics & Reports page.
 * In production, this data would come from /api/analytics endpoints.
 */

// ===== KPI Stats Cards =====
export const analyticsKPIs = [
    {
        label: 'Total Revenue',
        value: '$128,430',
        icon: 'payments',
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
        trend: 'up',
        trendValue: '12%',
        trendColor: 'text-emerald-500',
        trendIcon: 'trending_up',
    },
    {
        label: 'Avg. Order Value',
        value: '$450',
        icon: 'shopping_cart',
        iconBg: 'bg-orange-100 dark:bg-orange-900/20',
        iconColor: 'text-orange-600',
        trend: 'down',
        trendValue: '2%',
        trendColor: 'text-rose-500',
        trendIcon: 'trending_down',
    },
    {
        label: 'Conversion Rate',
        value: '3.2%',
        icon: 'ads_click',
        iconBg: 'bg-purple-100 dark:bg-purple-900/20',
        iconColor: 'text-purple-600',
        trend: 'up',
        trendValue: '0.5%',
        trendColor: 'text-emerald-500',
        trendIcon: 'trending_up',
    },
    {
        label: 'Net Profit',
        value: '$42,100',
        icon: 'savings',
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/20',
        iconColor: 'text-emerald-600',
        trend: 'up',
        trendValue: '8%',
        trendColor: 'text-emerald-500',
        trendIcon: 'trending_up',
    },
];

// ===== Sales by Category (Donut Chart) =====
export const salesByCategory = [
    { name: 'Living Room', percentage: '40%', color: 'bg-primary', dasharray: '40 100', dashoffset: '0' },
    { name: 'Bedroom', percentage: '25%', color: 'bg-purple-500', dasharray: '25 100', dashoffset: '-40' },
    { name: 'Dining', percentage: '20%', color: 'bg-emerald-500', dasharray: '20 100', dashoffset: '-65' },
    { name: 'Office', percentage: '15%', color: 'bg-orange-500', dasharray: '15 100', dashoffset: '-85' },
];

// ===== Donut Chart Ring Stroke Classes =====
export const donutStrokeClasses = [
    'stroke-primary',
    'stroke-purple-500',
    'stroke-emerald-500',
    'stroke-orange-500',
];

// ===== Vendor Performance =====
export const vendorPerformance = [
    { name: 'Global Furnishings', sales: '$42,800', width: '85%', barClass: 'bg-primary' },
    { name: 'Elite Decor', sales: '$31,500', width: '65%', barClass: 'bg-primary/70' },
    { name: 'Modern Living Co.', sales: '$28,900', width: '58%', barClass: 'bg-primary/60' },
    { name: 'Oak & Iron', sales: '$19,200', width: '40%', barClass: 'bg-primary/40' },
];

// ===== Month Labels (Revenue Chart) =====
export const revenueMonthLabels = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];

// ===== Day Labels (User Growth Chart) =====
export const userGrowthDayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
