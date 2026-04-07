/**
 * Static/dummy data for the Admin Dashboard.
 * This file centralizes all mock data used across dashboard components.
 * In production, this data would come from API calls to the backend.
 */

// ===== Sidebar Navigation Items =====
// Routes with actual paths are navigable; '#' items are placeholders for future pages
export const sidebarNavItems = [
    { icon: 'dashboard', label: 'Dashboard', path: '/' },
    { icon: 'group', label: 'Users', path: '/users' },
    { icon: 'storefront', label: 'Vendors', path: '/vendors' },
    { icon: 'chair', label: 'Products', path: '/products' },
    { icon: 'analytics', label: 'Analytics', path: '/analytics' },
    { icon: 'confirmation_number', label: 'Coupons', path: '/coupons' },
    { icon: 'shopping_cart', label: 'Orders', path: '/orders' },
    { icon: 'shield', label: 'Security', path: '/security' },
];

// ===== KPI Stats Cards Data =====
export const statsData = [
    {
        icon: 'payments',
        iconBg: 'bg-blue-50 dark:bg-blue-900/20',
        iconColor: 'text-blue-600',
        label: 'Total Revenue',
        value: '$124,500',
        change: '+12.5%',
    },
    {
        icon: 'shopping_basket',
        iconBg: 'bg-orange-50 dark:bg-orange-900/20',
        iconColor: 'text-orange-600',
        label: 'Monthly Orders',
        value: '850',
        change: '+5.2%',
    },
    {
        icon: 'group',
        iconBg: 'bg-purple-50 dark:bg-purple-900/20',
        iconColor: 'text-purple-600',
        label: 'Active Users',
        value: '12,403',
        change: '+18%',
    },
    {
        icon: 'storefront',
        iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
        iconColor: 'text-emerald-600',
        label: 'Vendor Count',
        value: '48',
        change: '+2.1%',
    },
];

// ===== Sales Chart Data =====
export const salesChartData = [
    { month: 'Jan', height: '40%' },
    { month: 'Feb', height: '55%' },
    { month: 'Mar', height: '45%' },
    { month: 'Apr', height: '70%' },
    { month: 'May', height: '65%' },
    { month: 'Jun', height: '85%' },
    { month: 'Jul', height: '95%' },
];

// ===== Recent Activity Feed =====
export const recentActivities = [
    {
        iconBg: 'bg-slate-100 dark:bg-slate-800',
        iconColor: 'text-primary',
        icon: 'shopping_cart',
        message: (
            <>
                <span className="font-semibold">John Doe</span> placed an order for{' '}
                <span className="font-medium text-primary cursor-pointer">Custom Oak Desk</span>.
            </>
        ),
        time: '2 minutes ago',
    },
    {
        iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
        iconColor: 'text-emerald-600',
        icon: 'verified_user',
        message: (
            <>
                New Vendor <span className="font-semibold text-slate-900 dark:text-white">Urban Crafts</span> has been approved.
            </>
        ),
        time: '45 minutes ago',
    },
    {
        iconBg: 'bg-blue-50 dark:bg-blue-900/20',
        iconColor: 'text-blue-600',
        icon: 'person_add',
        message: (
            <>
                User <span className="font-semibold">Sarah Smith</span> registered a new account.
            </>
        ),
        time: '2 hours ago',
    },
    {
        iconBg: 'bg-slate-100 dark:bg-slate-800',
        iconColor: 'text-slate-500',
        icon: 'edit_note',
        message: (
            <>
                Inventory updated for <span className="font-semibold">Industrial Bookshelf</span>.
            </>
        ),
        time: '5 hours ago',
    },
];

// ===== Top Selling Models =====
export const topSellingModels = [
    {
        name: 'Modular Sofa',
        orders: 124,
        price: '$1,299',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCghrMoVYTkzybJjeXHEAWeJUL7-mEv6pV4S8PDu7fgjktSeBmT5JkkVbwG0BVS0oGkY-F4gUFTA6o2rutA5MagZC1vK92P2T1Fn803zSh-zoC-HSuEP78PkfRogtqjy9E3DWrl0_ChN-WqLFfC0vvOSjNynkqzwSZMadmMz385k-CFPR2n7_vjsRsx_cJhDMF1k17SVZ8ligskCp-1zw8toDcJ-YxT6TFXrQccxYSI3yJ6jsCpJYFYE1_1TOgvs1DWKwP4KPdS_vvU',
        alt: 'Modular Sofa in green velvet texture',
    },
    {
        name: 'Minimalist Coffee Table',
        orders: 98,
        price: '$450',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwT5XbLwp41ltO-xP4Q6QTvU2h78_YqPmIJPLtiL-vDmOyUK9PcIQOXoz8B6a-Mh5oP2PuzU5rHCRucHtQq40QLyQ3vxGqxQtDYOPN3y-9_NhluNoWl-2oR6gGovmyKus9UD0ptvU7bkfOzPDUl2MT-gpF-WImc9rXU1G0rTFR_23ZqbQYD1gpeXKxr-3gl207ynWR0iEKJvde80zbwG_zfXRjOg0VO72awyQ15uj-esaJt87x3pCQokAZv-6DksMwT9gp3Mm52_wo',
        alt: 'Minimalist coffee table with wooden finish',
    },
    {
        name: 'Nordic Armchair',
        orders: 86,
        price: '$320',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPqenTLoL8DcupYYlDqqn9OD19aCk4xQmEwZgy-L--3-vToYq7MQ1kUAqSMdH3GAMKQuuEN5AFZsx_ii7KO3wgywZwjxpaNd7GKqV4MJyBtXTPOmqsBAiB8aEQ-cLzx37BuA-J2AHXwXYD9Et2VaMafmhzkGiqf_QerrhvyJQ_3SLZ5DYNtTm8LTMQ6vkOJIACu0RpnUUiFn969vtWNdoOoWgqQet02t1dDRQLg04N23oI1wWcetlL5NUCUYmGKUENjZGrlBo5V9dr',
        alt: 'Scandinavian style chair with wooden legs',
    },
    {
        name: 'Oak Dining Table',
        orders: 72,
        price: '$1,850',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW1f7qODVUHt0XEeHTsG4RFlGtIUW8lZ7oFl1IROX-sJFnor183albdwV5VLCVq-Sd7uKRR5UPYosv_ZwzvFRa7Uj5J575rlFa2ihbBTTulfcEdPxmKiFrtnMCbt8T9oZ8N8a6FyHlA62xpUROx11C8qZQSPLzHkRt4qja5xHqgSx6N5FLK61iLxkLGm-Mr1bvzOtoiGzxiwdeMF8pixYG4asxkYYJnwLCvL2nRKNTxXYLgS-rpep87rD_s7ZoEqiei2cDJPA_E_67',
        alt: 'Large solid oak dining table',
    },
];

// ===== Notifications =====
export const notifications = [
    { message: 'New vendor application', time: '2 minutes ago', highlight: false },
    { message: 'Order #7742 delayed', time: '45 minutes ago', highlight: false },
    { message: 'System update scheduled', time: '5 hours ago', highlight: true, highlightColor: 'text-amber-600' },
];

// ===== User Dropdown Menu Items =====
export const userMenuItems = [
    { icon: 'person', label: 'My Profile', href: '/' },
    { icon: 'security', label: 'System Security', href: '/security' },
];

// ===== Conversion Rate Metrics =====
export const conversionMetrics = {
    rate: '3.5%',
    change: '+0.4% from last month',
    averageOrderValue: '$146.20',
    retentionRate: '68%',
};
