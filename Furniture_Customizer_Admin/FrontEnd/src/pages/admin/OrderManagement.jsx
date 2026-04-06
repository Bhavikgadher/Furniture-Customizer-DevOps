import { useState, useMemo } from 'react';

import {
    orderKPIs as fallbackKPIs,
    statusFilterOptions,
    paymentFilterOptions,
} from '../../data/orderManagementData';
import {
    useOrderStats,
    useOrders,
    useCreateOrder,
    useUpdateOrderStatus,
    useDownloadInvoice,
    useDeleteOrder,
    useExportOrders,
    useUsers,
} from '../../hooks/api';

const OrderManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('All Statuses');
    const [paymentFilter, setPaymentFilter] = useState('All Payments');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [page, setPage] = useState(1);
    const [overrideOrderId, setOverrideOrderId] = useState(null);
    const [overrideStatus, setOverrideStatus] = useState('placed');
    const [overrideReason, setOverrideReason] = useState('');

    const [newOrder, setNewOrder] = useState({
        customerId: '',
        total: '',
        paymentStatus: 'pending',
        orderStatus: 'confirmed',
    });

    // ─── API Hooks ────────────────────────────────────────
    const { data: statsData, isLoading: statsLoading } = useOrderStats();
    const { data: ordersData, isLoading: ordersLoading, error: ordersError } = useOrders({
        page,
        status: statusFilter !== 'All Statuses' ? statusFilter : undefined,
        payment: paymentFilter !== 'All Payments' ? paymentFilter : undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
    });

    const { data: usersData } = useUsers({ limit: 100 });

    const createMutation = useCreateOrder();
    const updateStatusMutation = useUpdateOrderStatus();
    const downloadInvoiceMutation = useDownloadInvoice();
    const deleteOrderMutation = useDeleteOrder();
    const exportMutation = useExportOrders();

    const getStatStyles = (label) => {
        const lower = label.toLowerCase();
        if (lower.includes('total order') || lower.includes('orders'))
            return {
                icon: 'shopping_cart',
                iconWrapClass: 'size-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center',
                badgeIcon: 'trending_up',
                badgeClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30'
            };
        if (lower.includes('pending') || lower.includes('shipment'))
            return {
                icon: 'local_shipping',
                iconWrapClass: 'size-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center',
                badgeIcon: 'warning',
                badgeClass: 'text-rose-600 bg-rose-50 dark:bg-rose-900/30'
            };
        if (lower.includes('revenue') || lower.includes('refund') || lower.includes('sale'))
            return {
                icon: 'payments',
                iconWrapClass: 'size-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center',
                badgeIcon: 'trending_up',
                badgeClass: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30'
            };
        return {
            icon: 'analytics',
            iconWrapClass: 'size-12 bg-slate-50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400 rounded-xl flex items-center justify-center',
            badgeIcon: 'info',
            badgeClass: 'text-slate-600 bg-slate-50 dark:bg-slate-900/30'
        };
    };

    const kpis = useMemo(() => {
        const raw = statsData?.stats || statsData;
        if (!raw) return fallbackKPIs;

        if (Array.isArray(raw)) {
            return raw.map(s => ({
                ...s,
                ...getStatStyles(s.label || '')
            }));
        }

        // Object format from API
        return [
            { label: 'Total Orders', value: raw.totalOrders ?? raw.total ?? '0', ...getStatStyles('total orders'), badge: raw.totalChange ?? '+0%' },
            { label: 'Pending Shipments', value: raw.pendingShipments ?? raw.pending ?? '0', ...getStatStyles('pending'), badge: raw.pendingStatus ?? 'Attention' },
            { label: 'Total Revenue', value: raw.totalRevenue ?? raw.revenue ?? '₹0', ...getStatStyles('revenue'), badge: raw.revenueChange ?? '0%' }
        ];
    }, [statsData]);

    const orders = ordersData?.orders || ordersData?.data || ordersData || [];
    const totalPages = ordersData?.totalPages || 1;
    const totalOrders = ordersData?.total || orders.length;

    const usersList = useMemo(() => {
        const u = usersData?.users || usersData?.data || usersData || [];
        return Array.isArray(u) ? u : [];
    }, [usersData]);

    const filteredOrders = useMemo(() => {
        if (!Array.isArray(orders)) return [];
        return orders;
    }, [orders]);

    // Helper classes
    const getPaymentClasses = (status) => {
        const map = {
            success: { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
            failed: { dot: 'bg-rose-500', badge: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' },
            pending: { dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
        };
        return map[status] || map.pending;
    };

    const getOrderStatusClass = (status) => {
        const map = {
            placed: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
            confirmed: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            shipped: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            delivered: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
            cancelled: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
        };
        return map[status] || map.placed;
    };

    // ─── Handlers ─────────────────────────────────────────
    const handleCreateOrder = (e) => {
        e.preventDefault();
        const payload = {
            customerId: newOrder.customerId,
            total: Number(newOrder.total),
            paymentStatus: newOrder.paymentStatus,
            orderStatus: newOrder.orderStatus,
        };
        createMutation.mutate(payload, {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                setNewOrder({ customerId: '', total: '', paymentStatus: 'pending', orderStatus: 'confirmed' });
            },
        });
    };

    const handleExportCSV = () => {
        exportMutation.mutate({ format: 'csv' });
    };

    const handleStatusOverride = (orderId) => {
        setOverrideOrderId(orderId);
        setOverrideStatus('placed');
        setOverrideReason('');
        setIsModalOpen(true);
    };

    const handleConfirmOverride = () => {
        try {
            if (!overrideReason.trim()) {
                toast.error('Please provide a reason for the override.');
                return;
            }

            if (!overrideOrderId) {
                toast.error('Order ID missing. Please try again.');
                return;
            }

            updateStatusMutation.mutate(
                { id: overrideOrderId, status: overrideStatus, reason: overrideReason },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        setOverrideOrderId(null);
                        setOverrideReason('');
                    },
                }
            );
        } catch (err) {
            console.error('Status update failed:', err);
            toast.error('Failed to initiate update.');
        }
    };

    const handleDownloadInvoice = (order) => {
        try {
            const id = order.id || order._id;
            if (!id) throw new Error('No valid ID found');
            downloadInvoiceMutation.mutate(id);
        } catch (err) {
            toast.error('Unable to download invoice');
        }
    };

    const handleDeleteOrder = (id) => {
        try {
            if (!id) {
                toast.error('Unable to identify order for deletion');
                return;
            }

            if (window.confirm('Delete this order permanently? This cannot be undone.')) {
                deleteOrderMutation.mutate(id);
            }
        } catch (err) {
            console.error('Delete call failed:', err);
            toast.error('Failed to initiate deletion.');
        }
    };

    return (
        <>
            {/* Breadcrumbs & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                        <a className="hover:text-primary" href="#" onClick={(e) => e.preventDefault()}>
                            Home
                        </a>
                        <span className="material-symbols-outlined !text-xs">chevron_right</span>
                        <span className="text-slate-900 dark:text-slate-300">Order Management</span>
                    </nav>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Order Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Manage, track and fulfill customer orders globally.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportCSV}
                        disabled={exportMutation.isPending}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors active:scale-95 duration-150 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined">download</span>
                        {exportMutation.isPending ? 'Exporting...' : 'Export CSV'}
                    </button>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 duration-150"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Create Order
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statsLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
                              <div className="w-24 h-4 bg-slate-200 rounded mb-3"></div>
                              <div className="w-16 h-7 bg-slate-200 rounded"></div>
                          </div>
                      ))
                    : (Array.isArray(kpis) ? kpis : fallbackKPIs).map((kpi, index) => (
                          <div
                              key={index}
                              className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer duration-300"
                          >
                              <div className="flex justify-between items-start mb-4">
                                  <div className={kpi.iconWrapClass}>
                                      <span className="material-symbols-outlined !text-2xl">{kpi.icon}</span>
                                  </div>
                                  <span
                                      className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${kpi.badgeClass}`}
                                  >
                                      <span className="material-symbols-outlined !text-xs">{kpi.badgeIcon}</span>{' '}
                                      {kpi.badge}
                                  </span>
                              </div>
                              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                  {kpi.label}
                              </p>
                              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                                  {kpi.value}
                              </h3>
                          </div>
                      ))}
            </div>

            {/* Filters Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1 ml-1">
                        Order Status
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                    >
                        {statusFilterOptions.map((opt) => (
                            <option key={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1 ml-1">
                        Date From
                    </label>
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                    />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1 ml-1">
                        Date To
                    </label>
                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                    />
                </div>
                <div className="flex-1 min-w-[150px]">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1 ml-1">
                        Payment
                    </label>
                    <select
                        value={paymentFilter}
                        onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                    >
                        {paymentFilterOptions.map((opt) => (
                            <option key={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-end h-full pt-5">
                    <button
                        onClick={() => {
                            setStatusFilter('All Statuses');
                            setPaymentFilter('All Payments');
                            setDateFrom('');
                            setDateTo('');
                            setPage(1);
                        }}
                        className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors"
                        title="Reset Filters"
                    >
                        <span className="material-symbols-outlined">filter_list_off</span>
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Loading */}
                {ordersLoading && (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                )}

                {/* Error */}
                {ordersError && !ordersLoading && (
                    <div className="text-center py-12 text-red-500 text-sm">
                        <span className="material-symbols-outlined text-3xl mb-2 block">error</span>
                        Failed to load orders
                    </div>
                )}

                {/* Table */}
                {!ordersLoading && !ordersError && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredOrders.map((order) => {
                                    const payClasses = order.paymentBadgeClass ? null : getPaymentClasses(order.paymentStatus);
                                    const initials = order.customerInitials || (order.customerName ? order.customerName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : '??');
                                    return (
                                        <tr
                                            key={order.id || order._id}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="text-primary font-bold text-sm">{order.orderId || `#${order._id?.slice(-6)}`}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                                                        {initials}
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                                                        {order.customerName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                {order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A')}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                                                {typeof order.total === 'number' ? `₹${order.total.toLocaleString()}` : order.total}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold ${order.paymentBadgeClass || payClasses?.badge || ''}`}>
                                                    <span className={`size-1.5 rounded-full ${order.paymentDotClass || payClasses?.dot || ''}`}></span>{' '}
                                                    {order.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex py-1 px-2.5 rounded-lg text-xs font-bold ${order.orderStatusClass || getOrderStatusClass(order.orderStatus || order.status)}`}>
                                                    {order.orderStatus || order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDownloadInvoice(order);
                                                        }}
                                                        disabled={downloadInvoiceMutation.isPending}
                                                        className="p-1.5 text-slate-400 hover:text-primary transition-colors disabled:opacity-50"
                                                        title="Download Invoice"
                                                    >
                                                        <span className="material-symbols-outlined hover:scale-110 transition-transform text-lg">
                                                            {downloadInvoiceMutation.isPending && downloadInvoiceMutation.variables === (order.id || order._id) ? 'pending' : 'receipt_long'}
                                                        </span>
                                                    </button>
                                                    <button
                                                        className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors"
                                                        title="Change Status"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleStatusOverride(order.id || order._id);
                                                        }}
                                                    >
                                                        <span className="material-symbols-outlined hover:scale-110 transition-transform text-lg">published_with_changes</span>
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteOrder(order._id || order.id);
                                                        }}
                                                        disabled={deleteOrderMutation.isPending}
                                                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors disabled:opacity-50"
                                                        title="Delete Order"
                                                    >
                                                        <span className="material-symbols-outlined hover:scale-110 transition-transform text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center py-10 text-slate-400 text-sm">
                                            No orders match the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!ordersLoading && !ordersError && (
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Showing {filteredOrders.length} of {totalOrders} orders — Page {page} of {totalPages}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page <= 1}
                                className="p-2 border border-slate-200 dark:border-slate-700 rounded text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="size-8 flex items-center justify-center bg-primary text-white rounded font-bold text-xs">{page}</button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                                className="p-2 border border-slate-200 dark:border-slate-700 rounded text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Override Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Manual Status Override
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/50 flex gap-3">
                                <span className="material-symbols-outlined text-amber-600">warning</span>
                                <p className="text-sm text-amber-800 dark:text-amber-400">
                                    Overriding order status manually bypasses automated validation checks. Use with caution.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New Status</label>
                                    <select
                                        value={overrideStatus}
                                        onChange={(e) => setOverrideStatus(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary"
                                    >
                                        <option value="placed">placed</option>
                                        <option value="confirmed">confirmed</option>
                                        <option value="shipped">shipped</option>
                                        <option value="delivered">delivered</option>
                                        <option value="cancelled">cancelled</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Reason for Override</label>
                                    <textarea
                                        value={overrideReason}
                                        onChange={(e) => setOverrideReason(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary h-24 placeholder:text-slate-400"
                                        placeholder="Describe why you are manually changing this status..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900">
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmOverride}
                                disabled={updateStatusMutation.isPending}
                                className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50"
                            >
                                {updateStatusMutation.isPending ? 'Updating...' : 'Confirm Update'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Order Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create New Order</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateOrder} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Customer</label>
                                <select required value={newOrder.customerId} onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    <option value="">Select a customer</option>
                                    {usersList.map((u) => (
                                        <option key={u.id || u._id} value={u.id || u._id}>{u.name || u.firstName + ' ' + u.lastName || u.email}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Order Total (₹)</label>
                                <input type="number" step="1" min="0" required value={newOrder.total} onChange={(e) => setNewOrder({ ...newOrder, total: e.target.value })} placeholder="e.g. 54564" className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Payment Status</label>
                                <select value={newOrder.paymentStatus} onChange={(e) => setNewOrder({ ...newOrder, paymentStatus: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    <option value="success">success</option>
                                    <option value="pending">pending</option>
                                    <option value="failed">failed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Order Status</label>
                                <select value={newOrder.orderStatus} onChange={(e) => setNewOrder({ ...newOrder, orderStatus: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    <option value="placed">placed</option>
                                    <option value="confirmed">confirmed</option>
                                    <option value="shipped">shipped</option>
                                    <option value="delivered">delivered</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800">Cancel</button>
                                <button type="submit" disabled={createMutation.isPending} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm active:scale-95 duration-200 disabled:opacity-50">
                                    {createMutation.isPending ? 'Creating...' : 'Create Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderManagement;
