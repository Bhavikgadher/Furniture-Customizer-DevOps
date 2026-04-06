/**
 * Static/dummy data for the Coupon & Offer Management page.
 * In production, this data would come from /api/coupons endpoints.
 */

// ===== KPI Stats Cards =====
export const couponKPIs = [
    {
        label: 'Total Active Coupons',
        value: '12',
        icon: 'verified',
        badge: '+5.2%',
        badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
        label: 'Total Discount Given',
        value: '$4,250.00',
        icon: 'payments',
        badge: '-2.4%',
        badgeClass: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30',
    },
    {
        label: 'Most Used Coupon',
        value: 'SAVE20',
        valueSuffix: '(842)',
        icon: 'trending_up',
        badge: '+18.7%',
        badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
    },
];

// ===== Coupons Table Data =====
export const couponsData = [
    {
        id: 1,
        code: 'SAVE20',
        codeClass: 'bg-primary/5 text-primary',
        tag: 'Flash Sale',
        discount: '20% Off',
        expiryDate: 'Dec 31, 2024',
        expiryClass: 'text-slate-600 dark:text-slate-400',
        usageCurrent: 842,
        usageMax: 1000,
        usagePercent: 84,
        barClass: 'bg-primary',
        status: 'active',
        statusDotClass: 'bg-emerald-500',
        statusBadgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
        visibilityIcon: 'visibility_off',
    },
    {
        id: 2,
        code: 'WELCOME50',
        codeClass: 'bg-primary/5 text-primary',
        tag: 'New Users',
        discount: '$50.00 Off',
        expiryDate: 'Aug 15, 2024',
        expiryClass: 'text-slate-600 dark:text-slate-400',
        usageCurrent: 45,
        usageMax: 500,
        usagePercent: 9,
        barClass: 'bg-primary',
        status: 'active',
        statusDotClass: 'bg-emerald-500',
        statusBadgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
        visibilityIcon: 'visibility_off',
    },
    {
        id: 3,
        code: 'SPRING10',
        codeClass: 'bg-slate-100 text-slate-500',
        tag: 'Seasonal',
        discount: '10% Off',
        expiryDate: 'May 20, 2024',
        expiryClass: 'text-slate-400 line-through',
        usageCurrent: 1000,
        usageMax: 1000,
        usagePercent: 100,
        barClass: 'bg-slate-400',
        status: 'expired',
        statusDotClass: 'bg-slate-400',
        statusBadgeClass: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
        visibilityIcon: 'visibility',
    },
];

// ===== Tab Options =====
export const couponTabs = ['All Coupons', 'active', 'expired'];
