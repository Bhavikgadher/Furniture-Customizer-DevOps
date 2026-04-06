import { useState, useMemo } from 'react';

import {
    couponKPIs as fallbackKPIs,
    couponsData as fallbackCoupons,
    couponTabs,
} from '../../data/couponManagementData';
import {
    useCouponStats,
    useCoupons,
    useCreateCoupon,
    useUpdateCoupon,
    useToggleCouponVisibility,
    useDeleteCoupon,
} from '../../hooks/api';

const CouponManagement = () => {
    const [activeTab, setActiveTab] = useState('All Coupons');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    const [newCoupon, setNewCoupon] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        expiryDate: '',
        usageLimit: '',
    });

    // ─── API Hooks ────────────────────────────────────────
    const { data: statsData, isLoading: statsLoading } = useCouponStats();
    const { data: couponsResponse, isLoading: couponsLoading, error: couponsError } = useCoupons({
        page,
        status: activeTab !== 'All Coupons' ? activeTab.toLowerCase() : undefined,
        search: searchQuery || undefined,
    });

    const createMutation = useCreateCoupon();
    const updateMutation = useUpdateCoupon();
    const toggleVisibilityMutation = useToggleCouponVisibility();
    const deleteMutation = useDeleteCoupon();

    // ─── Handlers & Derived ──────────────────────────────
    const getStatStyles = (label) => {
        const lower = label.toLowerCase();
        if (lower.includes('active')) 
            return { icon: 'verified', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', badgeClass: 'text-emerald-600 bg-emerald-50' };
        if (lower.includes('discount')) 
            return { icon: 'payments', iconBg: 'bg-rose-100', iconColor: 'text-rose-600', badgeClass: 'text-rose-600 bg-rose-50' };
        if (lower.includes('most used') || lower.includes('top') || lower.includes('featured')) 
            return { icon: 'trending_up', iconBg: 'bg-primary/10', iconColor: 'text-primary', badgeClass: 'text-primary bg-primary/5' };
        return { icon: 'confirmation_number', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', badgeClass: 'bg-slate-100 text-slate-500' };
    };

    const kpis = useMemo(() => {
        const raw = statsData?.stats || statsData;
        if (!raw) return fallbackKPIs;

        if (Array.isArray(raw)) {
            return raw.map(s => {
                const styles = getStatStyles(s.label || '');
                return {
                    ...s,
                    icon: s.icon || styles.icon,
                    badgeClass: s.badgeClass || styles.badgeClass
                };
            });
        }

        // Object format from API
        return [
            { label: 'Total Active Coupons', value: raw.activeCoupons ?? raw.active ?? '0', ...getStatStyles('active'), badge: raw.activeChange ?? '+0%' },
            { label: 'Total Discount Given', value: raw.totalDiscount ?? raw.discountGiven ?? '$0.00', ...getStatStyles('discount'), badge: raw.discountChange ?? '0%' },
            { label: 'Most Used Coupon', value: raw.mostUsedCoupon?.code ?? raw.mostUsed ?? 'N/A', valueSuffix: raw.mostUsedCoupon?.usage ? `(${raw.mostUsedCoupon.usage})` : '', ...getStatStyles('most used'), badge: 'Popular' }
        ];
    }, [statsData]);

    const coupons = couponsResponse?.coupons || couponsResponse?.data || couponsResponse || [];
    const totalPages = couponsResponse?.totalPages || 1;

    // ─── Handlers ─────────────────────────────────────────
    const handleSaveCoupon = (e) => {
        e.preventDefault();
        const payload = {
            code: newCoupon.code,
            discountType: newCoupon.discountType,
            discountValue: Number(newCoupon.discountValue),
            expiryDate: newCoupon.expiryDate ? new Date(newCoupon.expiryDate + 'T23:59:59.000Z').toISOString() : undefined,
            usageLimit: newCoupon.usageLimit ? Number(newCoupon.usageLimit) : undefined,
        };

        const mutation = newCoupon.id ? updateMutation : createMutation;
        const variables = newCoupon.id ? { id: newCoupon.id, ...payload } : payload;

        mutation.mutate(variables, {
            onSuccess: () => {
                setIsModalOpen(false);
                setNewCoupon({ code: '', discountType: 'percentage', discountValue: '', expiryDate: '', usageLimit: '' });
            },
        });
    };

    const handleToggleVisibility = (coupon) => {
        const id = coupon.id || coupon._id;
        const isVisible = !coupon.isVisible;
        toggleVisibilityMutation.mutate({ id, isVisible });
    };

    const handleDeleteCoupon = (couponId) => {
        if (window.confirm('Delete this coupon? This cannot be undone.')) {
            deleteMutation.mutate(couponId);
        }
    };

    const handleOpenEdit = (coupon) => {
        setNewCoupon({
            id: coupon.id || coupon._id,
            code: coupon.code,
            discountType: coupon.discountType || (coupon.discount?.includes('%') ? 'percentage' : 'fixed'),
            discountValue: coupon.discountValue || parseFloat(coupon.discount?.replace(/[^0-9.]/g, '') || 0),
            expiryDate: coupon.expiryDate || (coupon.expiry ? new Date(coupon.expiry).toISOString().split('T')[0] : ''),
            usageLimit: coupon.usageMax || coupon.usageLimit || '',
        });
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
                        Coupon &amp; Offer Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Configure and track promotional campaigns across all channels.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setNewCoupon({ code: '', discountType: 'percentage', discountValue: '', expiryDate: '', usageLimit: '' });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-sm shadow-primary/20 active:scale-95 duration-200"
                >
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    <span>Create New Coupon</span>
                </button>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statsLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
                              <div className="w-24 h-4 bg-slate-200 rounded mb-3"></div>
                              <div className="w-16 h-7 bg-slate-200 rounded"></div>
                          </div>
                      ))
                    : (Array.isArray(kpis) ? kpis : fallbackKPIs).map((kpi, index) => (
                          <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-primary/50 hover:shadow-md cursor-default">
                              <div className="flex justify-between items-start mb-4">
                                  <div className={`p-2 ${kpi.iconBg || 'bg-primary/10'} rounded-lg`}>
                                      <span className={`material-symbols-outlined ${kpi.iconColor || 'text-primary'}`}>{kpi.icon}</span>
                                  </div>
                                  <span className={`text-xs font-bold px-2 py-1 rounded ${kpi.badgeClass}`}>{kpi.badge}</span>
                              </div>
                              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{kpi.label}</p>
                              {kpi.valueSuffix ? (
                                  <div className="flex items-baseline gap-2 mt-1">
                                      <span className="text-3xl font-black text-slate-900 dark:text-white">{kpi.value}</span>
                                      <span className="text-slate-400 font-medium text-lg">{kpi.valueSuffix}</span>
                                  </div>
                              ) : (
                                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{kpi.value}</p>
                              )}
                          </div>
                      ))}
            </div>

            {/* Management Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Filters/Tabs */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-6">
                        {couponTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setPage(1); }}
                                className={`relative py-2 text-sm font-bold transition-all active:scale-95 ${activeTab === tab
                                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <label className="flex-1 sm:w-64">
                            <div className="flex w-full items-stretch rounded-lg h-10 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                                <div className="text-slate-500 flex items-center justify-center pl-3">
                                    <span className="material-symbols-outlined text-[18px]">search</span>
                                </div>
                                <input
                                    className="w-full border-none bg-transparent focus:ring-0 text-sm placeholder:text-slate-400 px-3"
                                    placeholder="Filter by code..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </label>
                        <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {couponsLoading && (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                )}

                {/* Error */}
                {couponsError && !couponsLoading && (
                    <div className="text-center py-12 text-red-500 text-sm">
                        <span className="material-symbols-outlined text-3xl mb-2 block">error</span>
                        Failed to load coupons
                    </div>
                )}

                {/* Data Table */}
                {!couponsLoading && !couponsError && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Coupon Code</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Discount</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Expiry Date</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Usage</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {(Array.isArray(coupons) ? coupons : []).map((coupon) => (
                                    <tr key={coupon.id || coupon._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-default">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-mono font-bold px-2 py-1 rounded text-sm tracking-wide ${coupon.codeClass || 'bg-primary/10 text-primary'}`}>
                                                    {coupon.code}
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium">{coupon.tag}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                            {coupon.discount || (coupon.discountType === 'percentage' ? `${coupon.discountValue}% Off` : `₹${coupon.discountValue} Off`)}
                                        </td>
                                        <td className={`px-6 py-4 text-sm ${coupon.expiryClass || 'text-slate-500'}`}>
                                            {coupon.expiryDate || (coupon.expiry ? new Date(coupon.expiry).toLocaleDateString() : 'N/A')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5 min-w-[120px]">
                                                {(() => {
                                                    const current = coupon.usageCurrent || 0;
                                                    const max = coupon.usageMax || coupon.usageLimit;
                                                    const percent = max ? Math.min(Math.round((current / max) * 100), 100) : 0;
                                                    return (
                                                        <>
                                                            <div className="flex justify-between text-[11px] font-bold text-slate-500">
                                                                <span>{current}/{max || '∞'}</span>
                                                                <span>{percent}%</span>
                                                            </div>
                                                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                                                <div className={`${coupon.barClass || 'bg-primary'} h-full rounded-full`} style={{ width: `${percent}%` }}></div>
                                                            </div>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold ${coupon.statusBadgeClass || 'bg-slate-100 text-slate-600'}`}>
                                                <span className={`size-1.5 rounded-full ${coupon.statusDotClass || 'bg-slate-400'}`}></span>{' '}
                                                {coupon.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button
                                                    onClick={() => handleOpenEdit(coupon)}
                                                    className="p-1.5 text-slate-400 hover:text-primary transition-colors hover:scale-110 active:scale-90 transition-transform"
                                                >
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleToggleVisibility(coupon)}
                                                    disabled={toggleVisibilityMutation.isPending}
                                                    className="p-1.5 text-slate-400 hover:text-primary transition-colors hover:scale-110 active:scale-90 transition-transform"
                                                >
                                                    <span className="material-symbols-outlined text-lg">
                                                        {coupon.visibilityIcon || (coupon.isVisible ? 'visibility' : 'visibility_off')}
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCoupon(coupon.id || coupon._id)}
                                                    disabled={deleteMutation.isPending}
                                                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors hover:scale-110 active:scale-90 transition-transform"
                                                >
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!Array.isArray(coupons) || coupons.length === 0) && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10 text-slate-400 text-sm">No coupons found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!couponsLoading && !couponsError && (
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            Page {page} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-lg leading-none">chevron_left</span>
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">{page}</button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-lg leading-none">chevron_right</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Creation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create New Coupon</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSaveCoupon} className="p-6 space-y-5">
                            <div className="grid grid-cols-1 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Coupon Code</label>
                                    <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary uppercase font-mono" placeholder="e.g. SUMMER2024" type="text" required value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Discount Type</label>
                                        <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary" value={newCoupon.discountType} onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}>
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed Amount ($)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Value</label>
                                        <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary" placeholder="20" type="number" required value={newCoupon.discountValue} onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Expiry Date</label>
                                        <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm" type="date" required value={newCoupon.expiryDate} onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Usage Limit</label>
                                        <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary" placeholder="1000" type="number" value={newCoupon.usageLimit} onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })} />
                                    </div>
                                </div>
                                </div>
                                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 -mx-6 -mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createMutation.isPending || updateMutation.isPending}
                                        className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold shadow-sm shadow-primary/20 active:scale-95 duration-200 disabled:opacity-50"
                                    >
                                        {(createMutation.isPending || updateMutation.isPending)
                                            ? 'Saving...'
                                            : newCoupon.id ? 'Update Coupon' : 'Save Coupon'}
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6 pb-2">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <p>© 2024 Admin Panel. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Documentation</a>
                        <a className="hover:text-primary transition-colors" href="#" onClick={(e) => e.preventDefault()}>Support</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default CouponManagement;
