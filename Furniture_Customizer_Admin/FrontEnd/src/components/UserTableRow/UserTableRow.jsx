import { roleBadgeStyles } from '../../data/userManagementData';

/**
 * UserTableRow Component
 *
 * A single row in the user management table.
 * Renders user avatar, name, email, role badge, status indicator,
 * joined date, and contextual action buttons.
 *
 * Action buttons differ based on user status and role:
 * - Active users: View, Reset Password, Ban, More
 * - Banned users: View, Reset Password, Unban, Delete (always visible)
 * - Admin users: View, Reset Password, Settings
 *
 * Props:
 * @param {object} user - User data object from userManagementData
 */
const UserTableRow = ({ user }) => {
    const isBanned = user.status === 'banned';
    const isAdmin = user.role === 'admin';
    const badgeClass = roleBadgeStyles[user.role] || roleBadgeStyles.customer;

    // Determine action buttons visibility behavior:
    // Banned users always show actions; others show on hover via group-hover
    const actionsVisibilityClass = isBanned
        ? 'flex items-center justify-end gap-2'
        : 'flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity';

    return (
        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer">
            {/* User Info Cell */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    {/* Avatar: image-based or icon-based depending on avatarType */}
                    {user.avatarType === 'image' ? (
                        <div
                            className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-600"
                            style={{ backgroundImage: `url('${user.avatar}')` }}
                        ></div>
                    ) : (
                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                            <span className="material-symbols-outlined text-primary text-xl">
                                admin_panel_settings
                            </span>
                        </div>
                    )}
                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-900 dark:text-white truncate">
                            {user.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {user.email}
                        </span>
                    </div>
                </div>
            </td>

            {/* Role Badge Cell */}
            <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}
                >
                    {user.role}
                </span>
            </td>

            {/* Status Cell */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-1.5">
                    <div
                        className={`size-2 rounded-full ${isBanned ? 'bg-red-500' : 'bg-emerald-500'}`}
                    ></div>
                    <span
                        className={`text-sm font-medium ${isBanned
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}
                    >
                        {user.status}
                    </span>
                </div>
            </td>

            {/* Joined Date Cell */}
            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                {user.joinedDate}
            </td>

            {/* Actions Cell */}
            <td className="px-6 py-4 text-right">
                <div className={actionsVisibilityClass}>
                    {/* View Profile — always present */}
                    <button
                        className="p-1.5 text-slate-400 hover:text-primary transition-colors active:scale-95 transition-transform"
                        title="View Profile"
                    >
                        <span className="material-symbols-outlined hover:scale-110 transition-transform">
                            visibility
                        </span>
                    </button>

                    {/* Reset Password — always present */}
                    <button
                        className="p-1.5 text-slate-400 hover:text-primary transition-colors active:scale-95 transition-transform"
                        title="Reset Password"
                    >
                        <span className="material-symbols-outlined hover:scale-110 transition-transform">
                            lock_reset
                        </span>
                    </button>

                    {/* Contextual action based on status/role */}
                    {isBanned ? (
                        <>
                            {/* Unban button for banned users */}
                            <button
                                className="p-1.5 text-emerald-500 hover:text-emerald-600 transition-colors active:scale-95 transition-transform"
                                title="Unban User"
                            >
                                <span className="material-symbols-outlined hover:scale-110 transition-transform">
                                    check_circle
                                </span>
                            </button>
                            {/* Delete button for banned users */}
                            <button
                                className="p-1.5 text-red-400 hover:text-red-600 transition-colors active:scale-95 transition-transform"
                                title="Delete Account"
                            >
                                <span className="material-symbols-outlined hover:scale-110 transition-transform">
                                    delete
                                </span>
                            </button>
                        </>
                    ) : isAdmin ? (
                        /* Settings button for admin users */
                        <button
                            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95 transition-transform"
                            title="Settings"
                        >
                            <span className="material-symbols-outlined hover:scale-110 transition-transform">
                                settings
                            </span>
                        </button>
                    ) : (
                        <>
                            {/* Ban button for active non-admin users */}
                            <button
                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors active:scale-95 transition-transform"
                                title="Ban User"
                            >
                                <span className="material-symbols-outlined hover:scale-110 transition-transform">
                                    block
                                </span>
                            </button>
                            {/* More actions for active non-admin users */}
                            <button
                                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95 transition-transform"
                                title="More Actions"
                            >
                                <span className="material-symbols-outlined hover:scale-110 transition-transform">
                                    more_vert
                                </span>
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default UserTableRow;
