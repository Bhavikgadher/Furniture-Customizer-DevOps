import { useState, useMemo } from 'react';

import {
    vendorStats as fallbackStats,
    applicationStatusStyles,
} from '../../data/vendorManagementData';
import {
    useVendorStats,
    useVendors,
    useVendorApplications,
    useInviteVendor,
    useApproveVendor,
    useRejectVendor,
    useExportVendors,
    useCreateVendor,
} from '../../hooks/api';
import toast from 'react-hot-toast';

const VendorManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    const [newVendor, setNewVendor] = useState({ name: '', email: '', phone: '' });
    const [vendorInput, setVendorInput] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        company_name: '',
        gst_number: '',
    });

    // ─── API Hooks ────────────────────────────────────────
    const { data: statsData, isLoading: statsLoading } = useVendorStats();
    const { data: vendorsData, isLoading: vendorsLoading, error: vendorsError } = useVendors();
    const { data: applicationsData, isLoading: appsLoading } = useVendorApplications();

    const inviteMutation = useInviteVendor();
    const createVendorMutation = useCreateVendor();
    const approveMutation = useApproveVendor();
    const rejectMutation = useRejectVendor();
    const exportMutation = useExportVendors();

    // ─── Handlers ─────────────────────────────────────────
    const handleAddVendor = (e) => {
        e.preventDefault();
        createVendorMutation.mutate(vendorInput, {
            onSuccess: () => {
                setIsAddModalOpen(false);
                setVendorInput({
                    full_name: '',
                    email: '',
                    password: '',
                    phone: '',
                    company_name: '',
                    gst_number: '',
                });
                toast.success('Vendor registered successfully');
            },
        });
    };
    const getStatStyles = (label) => {
        const lower = label.toLowerCase();
        if (lower.includes('total') && lower.includes('vendor')) 
            return { icon: 'groups', iconColor: 'text-primary' };
        if (lower.includes('pending') || lower.includes('application')) 
            return { icon: 'pending_actions', iconColor: 'text-amber-500' };
        if (lower.includes('sales') || lower.includes('revenue')) 
            return { icon: 'payments', iconColor: 'text-emerald-500' };
        return { icon: 'storefront', iconColor: 'text-slate-500' };
    };

    const stats = useMemo(() => {
        const raw = statsData?.stats || statsData;
        if (!raw) return fallbackStats;

        if (Array.isArray(raw)) {
            return raw.map(s => {
                const styles = getStatStyles(s.label || '');
                return {
                    ...s,
                    icon: s.icon || styles.icon,
                    iconColor: s.iconColor || styles.iconColor
                };
            });
        }

        // Object format
        return [
            { label: 'Total Vendors', value: raw.totalVendors ?? raw.total ?? '0', change: raw.totalChange ?? '+0%', ...getStatStyles('Total Vendors') },
            { label: 'Pending Applications', value: raw.pendingApplications ?? raw.pending ?? '0', change: raw.pendingChange ?? '+0%', ...getStatStyles('Pending Applications') },
            { label: 'Total Vendor Sales', value: raw.totalVendorSales ?? raw.totalSales ?? '$0', change: raw.salesChange ?? '+0%', ...getStatStyles('Total Vendor Sales') }
        ];
    }, [statsData]);

    const vendors = vendorsData?.vendors || vendorsData?.data || vendorsData || [];
    const applications = applicationsData?.applications || applicationsData?.data || applicationsData || [];

    const filteredVendors = useMemo(() => {
        if (!Array.isArray(vendors)) return [];
        if (!searchQuery.trim()) return vendors;
        const q = searchQuery.toLowerCase();
        return vendors.filter((v) => {
            const name = (v.companyName || v.name || '').toLowerCase();
            const contact = (v.contactPerson || v.contactName || '').toLowerCase();
            const email = (v.contactEmail || v.email || '').toLowerCase();
            return name.includes(q) || contact.includes(q) || email.includes(q);
        });
    }, [vendors, searchQuery]);

    // ─── Handlers ─────────────────────────────────────────
    const handleInviteVendor = (e) => {
        e.preventDefault();
        inviteMutation.mutate(newVendor, {
            onSuccess: () => {
                setIsInviteModalOpen(false);
                setNewVendor({ name: '', email: '', phone: '' });
            },
        });
    };

    const handleApprove = (vendorId) => {
        approveMutation.mutate(vendorId);
    };

    const handleReject = (vendorId) => {
        rejectMutation.mutate(vendorId);
    };

    const handleExportCSV = () => {
        exportMutation.mutate({ format: 'csv' });
    };

    return (
        <>
            {/* Header */}
            <header className="flex flex-wrap justify-between items-end gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Vendor Management
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Oversee vendor applications and manage active partnerships.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExportCSV}
                        disabled={exportMutation.isPending}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95 hover:border-primary/50 hover:text-primary disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-lg">file_download</span>
                        {exportMutation.isPending ? 'Exporting...' : 'Export Data'}
                    </button>
                    <button
                        onClick={() => setIsInviteModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95"
                    >
                        <span className="material-symbols-outlined text-lg">mail</span>
                        Invite Vendor
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all shadow-md active:scale-95 hover:bg-primary/90"
                    >
                        <span className="material-symbols-outlined text-lg">person_add</span>
                        Add Vendor
                    </button>
                </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statsLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm animate-pulse">
                              <div className="w-24 h-4 bg-slate-200 rounded mb-3"></div>
                              <div className="w-16 h-7 bg-slate-200 rounded"></div>
                          </div>
                      ))
                    : (Array.isArray(stats) ? stats : fallbackStats).map((stat, index) => (
                          <div
                              key={index}
                              className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-default"
                          >
                              <div className="flex items-center justify-between mb-2">
                                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                      {stat.label}
                                  </p>
                                  <span className={`material-symbols-outlined ${stat.iconColor}`}>
                                      {stat.icon}
                                  </span>
                              </div>
                              <div className="flex items-baseline gap-2">
                                  <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                                      {stat.value}
                                  </p>
                                  <span className="text-emerald-500 text-xs font-bold">{stat.change}</span>
                              </div>
                          </div>
                      ))}
            </div>

            {/* Vendor Applications Section */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">new_releases</span>
                        Vendor Applications
                    </h3>
                    <a
                        className="text-primary text-sm font-semibold hover:underline"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                    >
                        View All Applications
                    </a>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    {appsLoading && (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                    )}
                    {!appsLoading && (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-bottom border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Applicant Name
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Apply Date
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {(Array.isArray(applications) ? applications : []).map((app) => (
                                    <tr
                                        key={app.id || app._id}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500">
                                                    {app.initial || (app.name ? app.name[0] : '?')}
                                                </div>
                                                <p className="font-semibold text-sm">{app.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 tracking-tight">
                                            {app.applyDate || (app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    applicationStatusStyles[app.status] || 'bg-slate-100 text-slate-600'
                                                }`}
                                            >
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {app.status === 'pending' && (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleApprove(app.id || app._id)}
                                                        disabled={approveMutation.isPending}
                                                        className="px-3 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded text-xs font-bold hover:bg-emerald-200 transition-colors active:scale-95 disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(app.id || app._id)}
                                                        disabled={rejectMutation.isPending}
                                                        className="px-3 py-1.5 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded text-xs font-bold hover:bg-rose-200 transition-colors active:scale-95 disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                            {app.status === 'approved' && (
                                                <span className="text-sm text-slate-400 italic">No actions needed</span>
                                            )}
                                            {app.status === 'rejected' && (
                                                <button className="px-3 py-1.5 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-xs font-bold underline active:scale-95">
                                                    Re-evaluate
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {(!Array.isArray(applications) || applications.length === 0) && !appsLoading && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm">
                                            No vendor applications found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Active Vendors Directory Section */}
            <div className="mb-10">
                <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">verified</span>
                        Active Vendors
                    </h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                search
                            </span>
                            <input
                                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[280px] transition-all"
                                placeholder="Search vendors..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/50 hover:text-primary active:scale-95 transition-all">
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    {vendorsLoading && (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    )}

                    {vendorsError && !vendorsLoading && (
                        <div className="text-center py-12 text-red-500 text-sm">
                            <span className="material-symbols-outlined text-3xl mb-2 block">error</span>
                            Failed to load vendors
                        </div>
                    )}

                    {!vendorsLoading && !vendorsError && (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-bottom border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Company Name
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Contact Person
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Total Sales
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Performance
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {filteredVendors.map((vendor) => (
                                    <tr
                                        key={vendor.id || vendor._id}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                                                    <img
                                                        className="w-full h-full object-cover"
                                                        src={vendor.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.companyName || vendor.name)}&background=1152d4&color=fff&size=80`}
                                                        alt={`${vendor.companyName || vendor.name} logo`}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{vendor.companyName || vendor.name}</p>
                                                    <p className="text-[10px] text-slate-400">{vendor.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium">{vendor.contactPerson || vendor.contactName}</p>
                                            <p className="text-[10px] text-slate-400">{vendor.contactEmail || vendor.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                {vendor.totalSales}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <span
                                                    className="material-symbols-outlined text-amber-400 text-sm"
                                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                                >
                                                    star
                                                </span>
                                                <span className="text-sm font-bold">{vendor.rating || 0}</span>
                                                <span className="text-[10px] text-slate-400">
                                                    ({vendor.reviews || 0} reviews)
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="px-3 py-1.5 border border-primary text-primary rounded text-xs font-bold transition-all duration-200 active:scale-95 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20 hover:scale-105">
                                                    View Profile
                                                </button>
                                                <button className="px-3 py-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded hover:bg-rose-50 dark:hover:bg-rose-900/20 active:scale-90 transition-all">
                                                    <span className="material-symbols-outlined text-lg">block</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredVendors.length === 0 && !vendorsLoading && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-slate-400 text-sm"
                                        >
                                            No vendors found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Invite Vendor Modal */}
            {isInviteModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Invite New Vendor
                            </h3>
                            <button
                                onClick={() => setIsInviteModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleInviteVendor} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide text-[10px]">
                                    Company / Vendor Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newVendor.name}
                                    onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                                    placeholder="e.g. WoodWorks Studio"
                                    className="w-full px-4 py-2 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide text-[10px]">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={newVendor.email}
                                    onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                                    placeholder="vendor@company.com"
                                    className="w-full px-4 py-2 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide text-[10px]">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={newVendor.phone}
                                    onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full px-4 py-2 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsInviteModalOpen(false)}
                                    className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={inviteMutation.isPending}
                                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/10 active:scale-95 duration-200 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {inviteMutation.isPending ? (
                                        <>
                                            <span className="animate-spin h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Invitation'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Direct Add Vendor Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200 dark:border-slate-800">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person_add</span>
                                Add Direct Vendor
                            </h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                            >
                                <span className="material-symbols-outlined text-slate-400">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddVendor} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide text-[10px]">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={vendorInput.full_name}
                                    onChange={(e) => setVendorInput((prev) => ({ ...prev, full_name: e.target.value }))}
                                    placeholder="e.g. John Doe"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide text-[10px]">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={vendorInput.company_name}
                                    onChange={(e) => setVendorInput((prev) => ({ ...prev, company_name: e.target.value }))}
                                    placeholder="e.g. Doe Furniture Co."
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide text-[10px]">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={vendorInput.email}
                                        onChange={(e) => setVendorInput((prev) => ({ ...prev, email: e.target.value }))}
                                        placeholder="vendor@example.com"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide text-[10px]">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={vendorInput.phone}
                                        onChange={(e) => setVendorInput((prev) => ({ ...prev, phone: e.target.value }))}
                                        placeholder="Mobile or Landline"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide text-[10px]">
                                        Temporary Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={vendorInput.password}
                                        onChange={(e) => setVendorInput((prev) => ({ ...prev, password: e.target.value }))}
                                        placeholder="At least 8 characters"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide text-[10px]">
                                        GST Number
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={vendorInput.gst_number}
                                        onChange={(e) => setVendorInput((prev) => ({ ...prev, gst_number: e.target.value }))}
                                        placeholder="e.g. 22AAAAA0000A1Z5"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createVendorMutation.isPending}
                                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {createVendorMutation.isPending ? (
                                        <>
                                            <span className="animate-spin h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full"></span>
                                            Creating...
                                        </>
                                    ) : (
                                        'Register Vendor'
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

export default VendorManagement;
