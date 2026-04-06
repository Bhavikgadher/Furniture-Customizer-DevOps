/**
 * Static/dummy data for the User Management page.
 * In production, this data would come from /api/users endpoints.
 */

// ===== Page Stats Cards =====
export const userStats = [
    {
        label: 'Total Users',
        value: '1,284',
        change: '+12%',
        changeColor: 'text-emerald-600',
        icon: 'groups',
        iconColor: 'text-primary',
    },
    {
        label: 'Active Users',
        value: '1,150',
        change: '+5%',
        changeColor: 'text-emerald-600',
        icon: 'check_circle',
        iconColor: 'text-emerald-500',
    },
    {
        label: 'Banned Users',
        value: '134',
        change: '-2%',
        changeColor: 'text-red-500',
        icon: 'block',
        iconColor: 'text-red-500',
    },
];

// ===== Role Badge Styles =====
export const roleBadgeStyles = {
    designer: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    vendor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    customer: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    admin: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
};

// ===== Role Filter Options =====
export const roleFilterOptions = [
    { value: '', label: 'Role: All' },
    { value: 'customer', label: 'Customer' },
    { value: 'vendor', label: 'Vendor' },
    { value: 'designer', label: 'Designer' },
    { value: 'admin', label: 'Admin' },
];

// ===== Status Filter Options =====
export const statusFilterOptions = [
    { value: '', label: 'Status: All' },
    { value: 'active', label: 'Active' },
    { value: 'banned', label: 'Banned' },
];

// ===== Users Table Data =====
export const usersData = [
    {
        id: 1,
        name: 'Marcus Chen',
        email: 'm.chen@designstudio.com',
        role: 'designer',
        status: 'active',
        joinedDate: 'Oct 12, 2023',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxTU0anHy2Lbgaf2tTswtbE7b6Aslm73oI3lEjHM0Xr2eUQ8lnudlk4E1lcbB6UkOzWJnIpvRK4fc8Y98Dwu_De_Na8jiOpUvF7OKD9QwR2eSY4w324zpX3yeJ9JCJduUHHp0GxJOOHp1iRengee33F-kh8XunpHztUTHwYafTPzmcMtJTjRmrRj847yN7r44rbB-gK36jt79xbFYqPKYJ0gcsFtJHZMQ8mssLZJwfMY7jX4Xt6CaB014uprRxbAYFiUeZ5Cq2wHHO',
        avatarType: 'image',
    },
    {
        id: 2,
        name: 'Sarah Jenkins',
        email: 'sarah.j@furnivendor.co',
        role: 'vendor',
        status: 'banned',
        joinedDate: 'Nov 05, 2023',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB3-_lsxUcXCgdpoc0fPpDp3bQvbjSo2suLGe2ILo5LH5hu0OF1QV1ptHfdfBtNAx8lJnykhZTIysA6ptKggMG_jCO48OwemHPqQrYbtnxwZqHeEs5_HURubrPzUDLFlA3tO4ehMIyAdhrRX-4mG6m_oL2wQ5K8n13g02R8-kvm6DcT5XuU5qp39huEAgj5yLZ8wcaKjpBZ6S0YlWCti1HoMCWMXjCpydymEukJMQDcL72iiPP36WxAieXzTTQBsR5Ju9GucV6ZP4X',
        avatarType: 'image',
    },
    {
        id: 3,
        name: 'Alex Thompson',
        email: 'alex.t@gmail.com',
        role: 'customer',
        status: 'active',
        joinedDate: 'Jan 22, 2024',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp4VzIItbAJUBXDn3n69CcPClHWM5OOJto0YKXelM-DROoGtUVXRf11s2cEtS-NgPXqh1nmu3k8c3YHSkO4q_s4l_b5T8O4LAMAqP1KYhIUrsOv15d3qqRnz9w8DoiBb9u_uXAbGbCU9zc7eEll9qoTw1mUfq7o3ZVw3BMf0OMzSoR6e1UHWFAL9V_RDRhipU4iK0HC4Cj3n5EKyn-ucZ3kwyGtlQu6bN-4Oh5ERQn_IlTqU25Vn6JscUVwjgopeKNkg_3tnnytrWD',
        avatarType: 'image',
    },
    {
        id: 4,
        name: 'Admin User',
        email: 'admin@furnitureplatform.com',
        role: 'admin',
        status: 'active',
        joinedDate: 'Sep 01, 2023',
        avatar: null,
        avatarType: 'icon',
    },
];
