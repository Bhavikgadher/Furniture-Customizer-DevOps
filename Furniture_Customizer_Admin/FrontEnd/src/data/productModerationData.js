/**
 * Static/dummy data for the Product Moderation page.
 * In production, this data would come from /api/products endpoints.
 */

// ===== KPI Stats Cards =====
export const productStats = [
    {
        label: 'Total Products',
        value: '1,240',
        icon: 'inventory_2',
        iconBg: 'bg-primary/10',
        iconColor: 'text-primary',
        badge: '+4%',
        badgeClass: 'text-green-600 bg-green-100',
    },
    {
        label: 'Pending Approval',
        value: '18',
        icon: 'pending_actions',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        badge: 'Priority',
        badgeClass: 'text-amber-600 bg-amber-50',
    },
    {
        label: 'Featured Products',
        value: '45',
        icon: 'star',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        badge: null,
        badgeClass: '',
    },
];

// ===== Pending Approvals =====
export const pendingApprovals = [
    {
        id: 1,
        name: 'Scandinavian Lounge Chair',
        sku: 'NORD-LC-01',
        icon: 'chair',
        gradientFrom: 'from-slate-200',
        gradientTo: 'to-slate-300',
        iconColor: 'text-slate-400',
        vendorInitials: 'NN',
        vendorInitialsBg: 'bg-primary/20',
        vendorInitialsColor: 'text-primary',
        vendorName: 'Nordic Nest',
        category: 'Living Room',
        price: '$450.00',
    },
    {
        id: 2,
        name: 'Marble Dining Table',
        sku: 'LUX-DT-99',
        icon: 'table_bar',
        gradientFrom: 'from-indigo-100',
        gradientTo: 'to-indigo-200',
        iconColor: 'text-indigo-400',
        vendorInitials: 'LL',
        vendorInitialsBg: 'bg-indigo-100',
        vendorInitialsColor: 'text-indigo-600',
        vendorName: 'Luxury Living',
        category: 'Dining',
        price: '$1,200.00',
    },
];

// ===== All Products Catalog =====
export const allProducts = [
    {
        id: 1,
        name: 'Modern Velvet Sofa',
        vendor: 'VelvetCo',
        category: 'Living Room',
        status: 'live',
        statusClass: 'bg-green-100 text-green-700',
        gradientFrom: 'from-slate-300',
        gradientTo: 'to-slate-400',
    },
    {
        id: 2,
        name: 'Minimalist Oak Desk',
        vendor: 'WoodWorks',
        category: 'Workspace',
        status: 'featured',
        statusClass: 'bg-primary/10 text-primary',
        gradientFrom: 'from-amber-200',
        gradientTo: 'to-amber-300',
    },
    {
        id: 3,
        name: 'Industrial Pendant Light',
        vendor: 'Urban Glow',
        category: 'Decor',
        status: 'disabled',
        statusClass: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
        gradientFrom: 'from-slate-400',
        gradientTo: 'to-slate-500',
    },
];
