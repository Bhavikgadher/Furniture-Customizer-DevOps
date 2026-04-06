import { useState } from 'react';

import {
    securityStats as fallbackStats,
    securityTabs,
    rolesData as fallbackRoles,
    auditLogs as fallbackLogs,
} from '../../data/securityData';
import {
    useSecurityStats,
    useRoles,
    useAuditLogs,
    useCreateRole,
    useUpdateRole,
    useExportAuditLogs,
} from '../../hooks/api';

const SecurityControl = () => {
    const [activeTab, setActiveTab] = useState('Roles & Permissions');
    const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
    const [newRole, setNewRole] = useState({ name: '', description: '', accessLevel: 'read only' });
    const [editRole, setEditRole] = useState(null);

    // ─── API Hooks ────────────────────────────────────────
    const { data: statsData, isLoading: statsLoading } = useSecurityStats();
    const { data: rolesResponse, isLoading: rolesLoading } = useRoles();
    const { data: logsResponse, isLoading: logsLoading } = useAuditLogs();
    const createRoleMutation = useCreateRole();
    const updateRoleMutation = useUpdateRole();
    const exportLogsMutation = useExportAuditLogs();

    // ─── Derived ──────────────────────────────────────────
    const stats = statsData?.stats || statsData || fallbackStats;
    const roles = rolesResponse?.roles || rolesResponse?.data || rolesResponse || fallbackRoles;
    const logs = logsResponse?.logs || logsResponse?.data || logsResponse || fallbackLogs;

    // ─── Handlers ─────────────────────────────────────────
    const handleExportLogs = () => {
        exportLogsMutation.mutate({ format: 'csv' });
    };

    const handleCreateRole = (e) => {
        e.preventDefault();
        createRoleMutation.mutate(newRole, {
            onSuccess: () => {
                setIsCreateRoleModalOpen(false);
                setNewRole({ name: '', description: '', accessLevel: 'read only' });
            },
        });
    };

    const handleOpenEditRole = (role) => {
        setEditRole({
            id: role.id || role._id,
            name: role.name || '',
            description: role.description || '',
            accessLevel: role.accessLevel || 'read only',
        });
        setIsEditRoleModalOpen(true);
    };

    const handleEditRole = (e) => {
        e.preventDefault();
        updateRoleMutation.mutate(editRole, {
            onSuccess: () => {
                setIsEditRoleModalOpen(false);
                setEditRole(null);
            },
        });
    };

    const getAccessClass = (level) => {
        const map = {
            'full access': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            'write access': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            'read only': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        };
        return map[level] || 'bg-slate-100 text-slate-600';
    };

    return (
        <>
            {/* Page Header */}
            <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
                        Security &amp; Control
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base">
                        Manage system roles, permissions, and monitor security audit logs for the
                        furniture customizer platform.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExportLogs}
                        disabled={exportLogsMutation.isPending}
                        className="flex items-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 transition-colors active:scale-95 transition-transform disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-lg">download</span>
                        {exportLogsMutation.isPending ? 'Exporting...' : 'Export Logs'}
                    </button>
                    <button className="flex items-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-primary/20 active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-lg">refresh</span>
                        Refresh Data
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statsLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
                              <div className="w-24 h-4 bg-slate-200 rounded mb-3"></div>
                              <div className="w-16 h-7 bg-slate-200 rounded"></div>
                          </div>
                      ))
                    : (Array.isArray(stats) ? stats : fallbackStats).map((stat, index) => (
                          <div
                              key={index}
                              className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
                          >
                              <div className="flex justify-between items-start">
                                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                      {stat.label}
                                  </p>
                                  <span
                                      className={`material-symbols-outlined ${stat.iconClass} p-2 rounded-lg`}
                                  >
                                      {stat.icon}
                                  </span>
                              </div>
                              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">
                                  {stat.value}
                              </p>
                              <div
                                  className={`flex items-center gap-1 ${stat.trendClass} text-xs font-bold`}
                              >
                                  <span className="material-symbols-outlined text-xs">{stat.trendIcon}</span>
                                  <span>{stat.trendText}</span>
                              </div>
                          </div>
                      ))}
            </div>

            {/* Tabs & Main Content */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="border-b border-slate-200 dark:border-slate-800 px-6 overflow-x-auto">
                    <div className="flex gap-8">
                        {securityTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 text-sm font-bold whitespace-nowrap active:scale-95 transition-transform border-b-2 ${
                                    activeTab === tab
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 font-medium transition-colors'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Role Management Section */}
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold">
                            System Roles
                        </h2>
                        <button
                            onClick={() => setIsCreateRoleModalOpen(true)}
                            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-sm">add</span> Add Role
                        </button>
                    </div>

                    {/* Roles Table */}
                    <div className="overflow-x-auto">
                        {rolesLoading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Role Name
                                        </th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Users
                                        </th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            Access Level
                                        </th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {(Array.isArray(roles) ? roles : []).map((role) => (
                                        <tr
                                            key={role.id || role._id}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 dark:text-white">
                                                        {role.name}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {role.description}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {role.users || role.userCount || 0}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`px-2 py-1 ${role.accessClass || getAccessClass(role.accessLevel)} text-[10px] font-bold rounded uppercase`}
                                                >
                                                    {role.accessLevel}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <button
                                                    onClick={() => handleOpenEditRole(role)}
                                                    className="text-slate-400 hover:text-primary active:scale-95 transition-transform"
                                                >
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!Array.isArray(roles) || roles.length === 0) && !rolesLoading && (
                                        <tr>
                                            <td colSpan={4} className="text-center py-10 text-slate-400 text-sm">
                                                No roles found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Audit Logs Section */}
                    <div className="mt-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold">
                                Recent Audit Logs
                            </h2>
                            <a
                                className="text-primary text-sm font-bold hover:underline"
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                View All Logs
                            </a>
                        </div>
                        <div className="border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden">
                            {/* Audit Log Header */}
                            <div className="grid grid-cols-12 bg-slate-50 dark:bg-slate-800/50 py-3 px-4 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <div className="col-span-3">Timestamp</div>
                                <div className="col-span-3">User</div>
                                <div className="col-span-3">Action</div>
                                <div className="col-span-2">IP Address</div>
                                <div className="col-span-1 text-right">Status</div>
                            </div>

                            {/* Loading */}
                            {logsLoading && (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                </div>
                            )}

                            {/* Audit Log Rows */}
                            {!logsLoading && (
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {(Array.isArray(logs) ? logs : []).map((log) => {
                                        const initials = log.userInitials || (log.userName ? log.userName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : '??');
                                        return (
                                            <div
                                                key={log.id || log._id}
                                                className="grid grid-cols-12 py-4 px-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                                            >
                                                <div className="col-span-3 text-xs text-slate-500">
                                                    {log.timestamp || (log.createdAt ? new Date(log.createdAt).toLocaleString() : 'N/A')}
                                                </div>
                                                <div className="col-span-3 flex items-center gap-2">
                                                    <div
                                                        className={`size-6 ${log.userInitialsBg || 'bg-primary/10'} ${log.userInitialsColor || 'text-primary'} rounded-full flex items-center justify-center text-[10px] font-bold`}
                                                    >
                                                        {initials}
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                        {log.userName}
                                                    </span>
                                                </div>
                                                <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 italic">
                                                    {log.action}
                                                </div>
                                                <div className="col-span-2 text-xs font-mono text-slate-500">
                                                    {log.ip || log.ipAddress || 'N/A'}
                                                </div>
                                                <div className="col-span-1 text-right">
                                                    <span
                                                        className={`material-symbols-outlined ${log.statusIconClass || 'text-emerald-500'} text-lg`}
                                                    >
                                                        {log.statusIcon || 'check_circle'}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {(!Array.isArray(logs) || logs.length === 0) && !logsLoading && (
                                        <div className="text-center py-10 text-slate-400 text-sm">
                                            No audit logs found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 dark:text-slate-400 text-xs px-2">
                <p>© 2023 Furniture Admin Suite • System Security Module v4.2.0</p>
                <div className="flex gap-6">
                    <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>
                        Privacy Policy
                    </a>
                    <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>
                        Security Audit Report
                    </a>
                    <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>
                        Emergency Lockdown
                    </a>
                </div>
            </div>

            {/* Create Role Modal */}
            {isCreateRoleModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create New Role</h3>
                            <button onClick={() => setIsCreateRoleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateRole} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Role Name</label>
                                <input type="text" required value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" placeholder="e.g. Content Manager" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                                <textarea value={newRole.description} onChange={(e) => setNewRole({ ...newRole, description: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-20" placeholder="Describe the role responsibilities..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Access Level</label>
                                <select value={newRole.accessLevel} onChange={(e) => setNewRole({ ...newRole, accessLevel: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    <option value="read only">read only</option>
                                    <option value="write access">write access</option>
                                    <option value="full access">full access</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setIsCreateRoleModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800">Cancel</button>
                                <button type="submit" disabled={createRoleMutation.isPending} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm active:scale-95 duration-200 disabled:opacity-50">
                                    {createRoleMutation.isPending ? 'Creating...' : 'Create Role'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Role Modal */}
            {isEditRoleModalOpen && editRole && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Role</h3>
                            <button onClick={() => { setIsEditRoleModalOpen(false); setEditRole(null); }} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleEditRole} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Role Name</label>
                                <input type="text" required value={editRole.name} onChange={(e) => setEditRole({ ...editRole, name: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                                <textarea value={editRole.description} onChange={(e) => setEditRole({ ...editRole, description: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-20" placeholder="Describe the role responsibilities..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Access Level</label>
                                <select value={editRole.accessLevel} onChange={(e) => setEditRole({ ...editRole, accessLevel: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    <option value="read only">read only</option>
                                    <option value="write access">write access</option>
                                    <option value="full access">full access</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => { setIsEditRoleModalOpen(false); setEditRole(null); }} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800">Cancel</button>
                                <button type="submit" disabled={updateRoleMutation.isPending} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm active:scale-95 duration-200 disabled:opacity-50">
                                    {updateRoleMutation.isPending ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SecurityControl;
