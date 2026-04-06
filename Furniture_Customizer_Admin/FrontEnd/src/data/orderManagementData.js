/**
 * Static/dummy data for the Order Management page.
 * In production, this data would come from /api/orders endpoints.
 */

// ===== KPI Stats Cards =====
export const orderKPIs = [
    {
        label: 'Total Orders',
        value: '1,284',
        icon: 'shopping_cart',
        iconWrapClass: 'size-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center',
        badge: '12.5%',
        badgeIcon: 'trending_up',
        badgeClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
    },
    {
        label: 'Pending Shipments',
        value: '43',
        icon: 'local_shipping',
        iconWrapClass: 'size-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center',
        badge: 'High',
        badgeIcon: 'warning',
        badgeClass: 'text-rose-600 bg-rose-50 dark:bg-rose-900/30',
    },
    {
        label: 'Total Refunds',
        value: '12',
        icon: 'assignment_return',
        iconWrapClass: 'size-12 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center',
        badge: '2.1%',
        badgeIcon: 'trending_down',
        badgeClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
    },
];

// ===== Filter Options =====
export const statusFilterOptions = [
    'All Statuses',
    'placed',
    'confirmed',
    'shipped',
    'delivered',
    'cancelled',
];

export const paymentFilterOptions = [
    'All Payments',
    'success',
    'failed',
    'pending',
];

// ===== Orders Table Data =====
export const ordersData = [
    {
        id: 1,
        orderId: '#ORD-7742',
        customerName: 'Jane Cooper',
        customerInitials: 'JC',
        date: 'Oct 24, 2023',
        total: '$240.00',
        paymentStatus: 'success',
        paymentDotClass: 'bg-emerald-500',
        paymentBadgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        orderStatus: 'shipped',
        orderStatusClass: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
        id: 2,
        orderId: '#ORD-7741',
        customerName: 'Wade Warren',
        customerInitials: 'WW',
        date: 'Oct 23, 2023',
        total: '$1,120.50',
        paymentStatus: 'failed',
        paymentDotClass: 'bg-rose-500',
        paymentBadgeClass: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
        orderStatus: 'cancelled',
        orderStatusClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
    },
    {
        id: 3,
        orderId: '#ORD-7740',
        customerName: 'Esther Howard',
        customerInitials: 'ES',
        date: 'Oct 23, 2023',
        total: '$84.00',
        paymentStatus: 'success',
        paymentDotClass: 'bg-emerald-500',
        paymentBadgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        orderStatus: 'delivered',
        orderStatusClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    {
        id: 4,
        orderId: '#ORD-7739',
        customerName: 'Cameron Williamson',
        customerInitials: 'CM',
        date: 'Oct 22, 2023',
        total: '$450.00',
        paymentStatus: 'pending',
        paymentDotClass: 'bg-amber-500',
        paymentBadgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        orderStatus: 'confirmed',
        orderStatusClass: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    },
];
