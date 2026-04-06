import { useState, useMemo } from "react";

import {
    userStats as fallbackStats,
    roleFilterOptions,
    statusFilterOptions,
} from "../../data/userManagementData";
import {
    useUserStats,
    useUsers,
    useCreateUser,
    useUpdateUser,
    useToggleUserStatus,
    useDeleteUser,
} from "../../hooks/api";
import toast from "react-hot-toast";

const UserManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [page, setPage] = useState(1);

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        role: "customer",
        password: "",
        id: null
    });

    // ─── API Hooks ────────────────────────────────────────
    const { data: statsData, isLoading: statsLoading } = useUserStats();
    const {
        data: usersResponse,
        isLoading: usersLoading,
        error: usersError,
    } = useUsers({ page, search: searchQuery, role: roleFilter, status: statusFilter });

    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();
    const toggleStatusMutation = useToggleUserStatus();
    const deleteUserMutation = useDeleteUser();

    // ─── Derived data ─────────────────────────────────────
    const getStatStyles = (label) => {
        const lower = label.toLowerCase();
        if (lower.includes('total')) return { icon: 'groups', iconColor: 'text-primary', changeColor: 'text-emerald-600' };
        if (lower.includes('active')) return { icon: 'check_circle', iconColor: 'text-emerald-500', changeColor: 'text-emerald-600' };
        if (lower.includes('banned') || lower.includes('inactive')) return { icon: 'block', iconColor: 'text-red-500', changeColor: 'text-red-500' };
        return { icon: 'person', iconColor: 'text-slate-500', changeColor: 'text-slate-500' };
    };

    const stats = useMemo(() => {
        const raw = statsData?.stats || statsData;
        if (!raw) return fallbackStats.filter(s => s.label !== 'Banned Users');

        // If it's an array, map it and filter out Banned
        if (Array.isArray(raw)) {
            return raw
                .filter(s => s.label !== 'Banned Users')
                .map(s => {
                    const styles = getStatStyles(s.label || '');
                    return {
                        ...s,
                        icon: s.icon || styles.icon,
                        iconColor: s.iconColor || styles.iconColor,
                        changeColor: s.changeColor || styles.changeColor
                    };
                });
        }

        // If it's an object with keys like totalUsers, activeUsers, etc.
        return [
            { label: 'Total Users', value: raw.totalUsers ?? raw.total ?? '0', change: raw.totalChange ?? '+0%', ...getStatStyles('Total') },
            { label: 'Active Users', value: raw.activeUsers ?? raw.active ?? '0', change: raw.activeChange ?? '+0%', ...getStatStyles('Active') }
        ];
    }, [statsData]);

    const users = usersResponse?.users || usersResponse?.data || usersResponse || [];
    const totalPages = usersResponse?.totalPages || 1;

    // Client‑side filtering fallback (if the API doesn't support query params)
    const filteredUsers = useMemo(() => {
        if (!Array.isArray(users)) return [];
        return users;
    }, [users]);

    // ─── Handlers ─────────────────────────────────────────
    const handleOpenCreateModal = () => {
        setIsEditMode(false);
        setUserInput({ name: "", email: "", role: "customer", password: "", id: null });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (user) => {
        setIsEditMode(true);
        setUserInput({
            id: user.id || user._id,
            name: user.name || "",
            email: user.email || "",
            role: user.role || "customer",
            password: "", // Handled on backend if provided
        });
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const mutationParams = {
            onSuccess: () => {
                setIsModalOpen(false);
                setUserInput({ name: "", email: "", role: "customer", password: "", id: null });
            },
        };

        if (isEditMode) {
            updateUserMutation.mutate(userInput, mutationParams);
        } else {
            createUserMutation.mutate(userInput, mutationParams);
        }
    };

    const handleToggleStatus = (userId, currentStatus) => {
        const isCurrentlyActive = currentStatus === "active" || currentStatus === "Active";
        const newStatus = isCurrentlyActive ? "inactive" : "active";
        toggleStatusMutation.mutate({ id: userId, status: newStatus });
    };

    const handleDeleteUser = (userId, userName) => {
        if (window.confirm(`Delete user "${userName}"? This cannot be undone.`)) {
            deleteUserMutation.mutate(userId);
        }
    };

    // Role Badge Colors
    const getRoleBadge = (role) => {
        const styles = {
            designer:
                "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
            vendor:
                "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
            customer:
                "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            admin:
                "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
        };
        return styles[role] || styles.customer;
    };

    const isLoading = usersLoading;

    return (
        <>
            {/* HEADER */}
            <header className="p-8 pb-4">
                <div className="flex justify-between items-end flex-wrap gap-4">
                    <div>
                        <h2 className="text-3xl font-black">User Management</h2>
                        <p className="text-slate-500">
                            Manage and monitor platform participants.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-primary/90"
                    >
                        <span className="material-symbols-outlined">person_add</span>
                        Create New User
                    </button>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {statsLoading
                        ? Array.from({ length: 2 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm animate-pulse"
                              >
                                  <div className="w-24 h-4 bg-slate-200 rounded mb-3"></div>
                                  <div className="w-16 h-7 bg-slate-200 rounded"></div>
                              </div>
                          ))
                        : (Array.isArray(stats) ? stats : fallbackStats).map(
                              (stat, index) => (
                                  <div
                                      key={index}
                                      className="bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm"
                                  >
                                      <div className="flex justify-between mb-2">
                                          <span className="text-sm text-slate-500">
                                              {stat.label}
                                          </span>
                                          <span
                                              className={`material-symbols-outlined ${stat.iconColor}`}
                                          >
                                              {stat.icon}
                                          </span>
                                      </div>
                                      <div className="flex gap-2 items-baseline">
                                          <span className="text-2xl font-bold">
                                              {stat.value}
                                          </span>
                                          <span
                                              className={`${stat.changeColor} text-sm font-bold`}
                                          >
                                              {stat.change}
                                          </span>
                                      </div>
                                  </div>
                              )
                          )}
                </div>
            </header>

            {/* TABLE */}
            <section className="px-8 pb-8">
                <div className="bg-white dark:bg-slate-900 rounded-xl border shadow-sm overflow-hidden">
                    {/* Filters */}
                    <div className="p-4 flex flex-wrap gap-4 justify-between bg-slate-50 dark:bg-slate-800">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="px-4 py-2 border rounded-lg w-full max-w-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <div className="flex gap-3">
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                {roleFilterOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                {statusFilterOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Loading */}
                    {isLoading && (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    )}

                    {/* Error */}
                    {usersError && !isLoading && (
                        <div className="text-center py-12 text-red-500 text-sm">
                            <span className="material-symbols-outlined text-3xl mb-2 block">
                                error
                            </span>
                            Failed to load users. Please try again.
                        </div>
                    )}

                    {/* Table */}
                    {!isLoading && !usersError && (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead className="bg-slate-100 dark:bg-slate-800 text-left">
                                    <tr>
                                        <th className="px-6 py-4 text-xs">User</th>
                                        <th className="px-6 py-4 text-xs">Role</th>
                                        <th className="px-6 py-4 text-xs">Status</th>
                                        <th className="px-6 py-4 text-xs text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr
                                            key={user.id || user._id}
                                            className="border-t hover:bg-slate-50 dark:hover:bg-slate-800"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold">
                                                        {user.name}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(
                                                        user.role
                                                    )}`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`text-sm font-medium ${
                                                        user.status === "active" || user.status === "Active" || user.isActive
                                                            ? "text-emerald-600"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    {user.status || (user.isActive ? "active" : "inactive")}
                                                </span>
                                            </td>

                                            {/* Status Toggle + Delete */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            const isActive = user.status === "active" || user.status === "Active" || user.isActive === true;
                                                            handleToggleStatus(user.id || user._id, isActive ? "active" : "inactive");
                                                        }}
                                                        disabled={toggleStatusMutation.isPending}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 duration-150 ${
                                                            user.status === "Active" || user.status === "active" || user.isActive
                                                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                                : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                                                        }`}
                                                    >
                                                        <span className="material-symbols-outlined text-sm">
                                                            {user.status === "Active" || user.status === "active" || user.isActive
                                                                ? "toggle_on"
                                                                : "toggle_off"}
                                                        </span>
                                                        {user.status === "Active" || user.status === "active" || user.isActive
                                                            ? "active"
                                                            : "inactive"}
                                                    </button>
                                                    
                                                    {/* Edit Button */}
                                                    <button
                                                        onClick={() => handleOpenEditModal(user)}
                                                        className="p-1.5 text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-lg transition-all active:scale-90"
                                                        title="Edit user"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">
                                                            edit
                                                        </span>
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                user.id || user._id,
                                                                user.name
                                                            )
                                                        }
                                                        disabled={deleteUserMutation.isPending}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                                        title="Delete user"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">
                                                            delete
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="text-center py-10 text-slate-400"
                                            >
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && !usersError && totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-xs text-slate-500">
                                Page {page} of {totalPages}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page <= 1}
                                    className="p-2 border rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined">
                                        chevron_left
                                    </span>
                                </button>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages}
                                    className="p-2 border rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined">
                                        chevron_right
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-full max-w-md shadow-2xl scale-in-center">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">
                                {isEditMode ? "Edit User Properties" : "Register New User"}
                            </h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    required
                                    value={userInput.name}
                                    onChange={(e) =>
                                        setUserInput({ ...userInput, name: e.target.value })
                                    }
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    value={userInput.email}
                                    onChange={(e) =>
                                        setUserInput({ ...userInput, email: e.target.value })
                                    }
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Access Role</label>
                                <select
                                    value={userInput.role}
                                    onChange={(e) =>
                                        setUserInput({ ...userInput, role: e.target.value })
                                    }
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                >
                                    <option value="customer">Customer</option>
                                    <option value="vendor">Vendor</option>
                                    <option value="designer">Designer</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
                                    {isEditMode ? "New Password (Optional)" : "Security Password"}
                                </label>
                                <input
                                    type="password"
                                    placeholder={isEditMode ? "Leave blank to keep current" : "Min. 8 characters"}
                                    required={!isEditMode}
                                    value={userInput.password}
                                    onChange={(e) =>
                                        setUserInput({ ...userInput, password: e.target.value })
                                    }
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>

                            <div className="flex gap-3 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-colors active:scale-95"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={createUserMutation.isPending || updateUserMutation.isPending}
                                    className="flex-1 bg-primary text-white py-2 rounded-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {(createUserMutation.isPending || updateUserMutation.isPending) ? (
                                        <>
                                            <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
                                            {isEditMode ? "Updating..." : "Creating..."}
                                        </>
                                    ) : (
                                        isEditMode ? "Save Changes" : "Register User"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserManagement;