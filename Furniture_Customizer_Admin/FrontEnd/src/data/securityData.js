/**
 * Static/dummy data for the Security & Control page.
 * In production, this data would come from /api/security endpoints.
 */

// ===== Stats Cards =====
export const securityStats = [
    {
        label: 'Total Admins',
        value: '24',
        icon: 'shield_person',
        iconClass: 'text-primary bg-primary/10',
        trendIcon: 'trending_up',
        trendText: '+2% from last month',
        trendClass: 'text-emerald-600',
    },
    {
        label: 'Active Sessions',
        value: '128',
        icon: 'devices',
        iconClass: 'text-primary bg-primary/10',
        trendIcon: 'trending_down',
        trendText: '-5% active now',
        trendClass: 'text-rose-600',
    },
    {
        label: 'Security Alerts',
        value: '0',
        icon: 'warning',
        iconClass: 'text-amber-500 bg-amber-500/10',
        trendIcon: 'check_circle',
        trendText: 'No threats detected (24h)',
        trendClass: 'text-slate-500',
    },
];

// ===== Tab Options =====
export const securityTabs = ['Roles & Permissions', 'User Assignment', 'Security Logs'];

// ===== Roles Table Data =====
export const rolesData = [
    {
        id: 1,
        name: 'Super Admin',
        description: 'Full platform control',
        users: '4 Users',
        accessLevel: 'Unrestricted',
        accessClass: 'bg-primary/10 text-primary',
    },
    {
        id: 2,
        name: 'Editor',
        description: 'Content & catalog management',
        users: '12 Users',
        accessLevel: 'Restricted',
        accessClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
    },
    {
        id: 3,
        name: 'Moderator',
        description: 'User reviews & comments',
        users: '5 Users',
        accessLevel: 'Restricted',
        accessClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
    },
    {
        id: 4,
        name: 'Support',
        description: 'Order tracking & tickets',
        users: '3 Users',
        accessLevel: 'Minimal Access',
        accessClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
    },
];

// ===== Audit Logs Data =====
export const auditLogs = [
    {
        id: 1,
        timestamp: 'Oct 24, 2023 • 14:22:01',
        userInitials: 'AK',
        userInitialsBg: 'bg-slate-200 dark:bg-slate-700',
        userInitialsColor: '',
        userName: 'Alex Kim',
        action: 'User banned',
        ip: '192.168.1.45',
        statusIcon: 'info',
        statusIconClass: 'text-amber-500',
    },
    {
        id: 2,
        timestamp: 'Oct 24, 2023 • 13:45:12',
        userInitials: 'JD',
        userInitialsBg: 'bg-primary/20',
        userInitialsColor: 'text-primary',
        userName: 'Jane Doe',
        action: 'Role changed (Moderator → Admin)',
        ip: '204.12.56.128',
        statusIcon: 'verified_user',
        statusIconClass: 'text-rose-500',
    },
    {
        id: 3,
        timestamp: 'Oct 24, 2023 • 12:10:44',
        userInitials: 'MS',
        userInitialsBg: 'bg-slate-200 dark:bg-slate-700',
        userInitialsColor: '',
        userName: 'Mark Smith',
        action: 'Admin login',
        ip: '45.22.112.9',
        statusIcon: 'login',
        statusIconClass: 'text-emerald-500',
    },
];
