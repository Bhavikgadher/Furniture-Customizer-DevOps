/**
 * Static/dummy data for the Vendor Management page.
 * In production, this data would come from /api/vendors endpoints.
 */

// ===== Page Stats Cards =====
export const vendorStats = [
    {
        label: 'Total Vendors',
        value: '1,248',
        change: '+12%',
        icon: 'groups',
        iconColor: 'text-primary',
    },
    {
        label: 'Pending Applications',
        value: '42',
        change: '+5%',
        icon: 'pending_actions',
        iconColor: 'text-amber-500',
    },
    {
        label: 'Total Vendor Sales',
        value: '$4.2M',
        change: '+18%',
        icon: 'payments',
        iconColor: 'text-emerald-500',
    },
];

// ===== Vendor Applications =====
export const vendorApplications = [
    {
        id: 1,
        name: 'Global Logistics Co.',
        initial: 'G',
        applyDate: 'Oct 12, 2023',
        status: 'pending',
    },
    {
        id: 2,
        name: 'EcoFriendly Goods',
        initial: 'E',
        applyDate: 'Oct 10, 2023',
        status: 'approved',
    },
    {
        id: 3,
        name: 'Swift Delivery',
        initial: 'S',
        applyDate: 'Oct 08, 2023',
        status: 'rejected',
    },
];

// ===== Status Badge Styles =====
export const applicationStatusStyles = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

// ===== Active Vendors =====
export const activeVendors = [
    {
        id: 1,
        companyName: 'Zenith Solutions',
        category: 'Hardware & Parts',
        contactPerson: 'Robert Fox',
        contactEmail: 'robert@zenith.com',
        totalSales: '$842,000',
        rating: 4.8,
        reviews: 240,
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQgJh2_Yx18SRcZeEWL73BbE2ZlOCUEandBkMPhNzJYf7lKoo9zc88DcokufU8j8DYKf1P8_JPly8W_gEvWlhFcN3jCUV-2h6g9miNwSu-CkjizLB6m9K4jFdi9sMeFa775byxvI-W9hC6nl1-BRAjRO80d6KEkF5b_S0Q-uA8MJFPfzQ08bD0yrnDX02QR4OxkDxbab9HBaueZ1XEJQ62GaBZOwwxb4ThM9QcxHG0p92uFcGXbVbPDVuH9JNMGJUQVU6o1l9kxf6T',
    },
    {
        id: 2,
        companyName: 'Nova Retail Group',
        category: 'Clothing & Textiles',
        contactPerson: 'Cody Fisher',
        contactEmail: 'cody@nova.com',
        totalSales: '$612,400',
        rating: 4.2,
        reviews: 182,
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWXAVYGrYqxNbhbPHb6u8P40yFzefJvQlMrU7A3JBk2TUG5TzH6vLE4q1o_EHbcPPDXaLRtFRgFCixCIqp0v4vPtfKc3I8ZErTJmi5mYZ2jXenzPLb3FrjU6Ynz2EHhgv45yWMWmveAVwnoD3Y4bSUC-Q6oSNhTUJgACuZvjD6Brx0OeSQavuNEnd0yP8bgzZfJ8fqVBucE1-FN2kE7sYwhYS-JMVcwjxm56E4YSNj163BXANs0RcYa2lwE9AxsIQFgGch8-yg3lQb',
    },
    {
        id: 3,
        companyName: 'Pinnacle Tech',
        category: 'Software Services',
        contactPerson: 'Esther Howard',
        contactEmail: 'esther@pinnacle.io',
        totalSales: '$345,100',
        rating: 4.9,
        reviews: 92,
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt-yrFSnDCVicSIDg1CTxZF8uilq7NUsuiVXr22ijS7IvnkWmk9H1u8XLiB3e6UR-7sIH22KeIj7n8iotUjRnhvcgBnqNybCDMR-xp5U53Cpcv1wKVeLd9BYsPwrZ3yKrbV_Q9RMpw0Cn5sPD7vwq2eGQoPiIGHQi1oun3XKwVEL8EaVVpflAtEdbfMPJG8lPzwm1WKMz0s6EOK6dcUN2oKMJM5ZV8BanXxIpQzmIdmWXUOfYcvCvcVG9K_dtVZ0r5En9HmcbSwwMk',
    },
];
