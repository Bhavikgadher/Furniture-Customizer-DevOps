import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { orderService } from '../../services/order.service';
import toast from 'react-hot-toast';

/**
 * My Orders Page
 *
 * Order history dashboard with:
 * - Navbar with active "My Orders" link, search, notifications, avatar
 * - Page header with order count + "Download Order History (PDF)"
 * - Filter toolbar: search + status tabs (All/Active/Completed/Cancelled)
 * - Order cards (4) with various statuses:
 *   - In Production (orange badge, View Details + Invoice)
 *   - Shipped (blue badge, Track Shipment + Details)
 *   - Delivered (emerald badge, Reorder Items + Write Review)
 *   - Cancelled (grey, grayscale image, View Cancellation Reason)
 * - "Load More Orders" pagination
 * - Hidden empty state
 * - Simple footer
 *
 * Route: /orders
 */

const STATUS_FILTERS = ['All Orders', 'Active', 'Completed', 'Cancelled'];

const ORDERS = [
    {
        id: 'FC-9921',
        status: 'In Production',
        statusColor: 'orange',
        ordered: 'Oct 12, 2023',
        items: '1x Custom Velvet Sofa, 2x Accent Pillows',
        total: '$1,240.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDD2dvOpCyxwaaEhQ2T_KEMOfBrWG2Mt9Akq62rwaT1Td__B344sGdiXB5kAal8k8Z4-4Ucb8Kp4GgXn-1tz-70srFlKOxIizFwCpNavgaSrVcvfTS4PYRCU_KJ1GZf0pd5DUYQohc75MgLyW6ZqH0xdcmwDISaeDR1R1PkJj4q48QDZuSJm-15SOdBiI1_HcbA5Nt8s_6lrV6JXP3vYhAC4w5rsqYMtMMQbu0AamH_twsFNSZT0QO1iJQRCLlx5-ae7Pi0CvVseaQa',
        alt: 'Modern forest green velvet sofa with gold legs',
        primaryAction: { label: 'View Details', icon: 'arrow_forward' },
        secondaryAction: 'Invoice',
        footer: { icon: 'schedule', text: 'Estimated Delivery: Nov 05' },
        cancelled: false,
    },
    {
        id: 'FC-9845',
        status: 'Shipped',
        statusColor: 'blue',
        ordered: 'Sept 28, 2023',
        items: '1x Nordic Oak Table',
        total: '$890.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBVhZtiCuRCjSd9U946iqg88GI8Zjbt7xMgC--U5e8j3KSEbGWs1GfQijDituwPPKGEWdV66f4oXOimcWAVFDT_2kHN21mwTxOiCXgn63sNoAE2IJD0WZQfP0M6axabxkIA6nDsXYAHOmTRh5wUrBVW47dNMByerfhZ_nhvIZW2RCjMGcZa0FS_1DUjWmfQ7gzyv8xptNYKtc2NiM93aQE2IqhYyHynil6Dhab3kZQ-USokej2SqVJH_-kKqsDwX-L4oiWjfRpLhp2R',
        alt: 'Minimalist solid oak wood dining table',
        primaryAction: { label: 'Track Shipment', icon: 'local_shipping' },
        secondaryAction: 'Details',
        footer: { icon: null, text: 'Via FedEx Express: 44021...' },
        cancelled: false,
    },
    {
        id: 'FC-8812',
        status: 'Delivered',
        statusColor: 'emerald',
        ordered: 'Sept 01, 2023',
        items: '1x Ergo-Pro Custom Chair',
        total: '$450.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlc_OtssT9tbB1jwZAlsZqy4HRSodzWyDsljjG2Pw3UbZtw8dMmGLZtfp36lU_P86EwwbkicdimKAZQORpv5x83a1CMChWBKZ5DHS89qZ7WyHEInMXstJpAKBpUdyzyvH2zTUUx2uQeuZLKDJ4oHFEf53LHt_b74CKmC_EhzoWmHSbmrrcngz6yfe0yeKML8mHFvOak6DrNhulHRjeajevTg_oJKSB5PBTnuMNe8THzEMF0des13zWOHWHb0v2jqbMfeo0HoAcn99',
        alt: 'Ergonomic custom mesh office chair in grey',
        primaryAction: { label: 'Reorder Items', icon: 'refresh' },
        secondaryAction: 'Write Review',
        footer: { icon: null, text: 'Delivered on Sept 14, 2023' },
        cancelled: false,
    },
    {
        id: 'FC-7720',
        status: 'Cancelled',
        statusColor: 'slate',
        ordered: 'Aug 15, 2023',
        items: '2x Marble Accent Lamps',
        total: '$180.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDgtbrsUixmL21EfWBqddK3DZtVVvTT3Y3KyMTP-NcCjwh_r_9TEQB24yrwrB88irzmcxnX9lIWfwVommo13ogbAQWFjteqlD-KsJ9ck2ZpUTDWKMUOpFIZJHrxss6dkOdOOt9H8FRXjjCPDrRydj6Uurrrj2j9S3HvWvImHb_M0ZXJb5Yrs0oqovqg6rZ5DQ-DdXaabf0Ep8wcnaq0uu0OJeydEkWW2BRpgT5eR2KZZdfWVvBehmWk7lxtN2eVMQI6pxfErsAi-5C9',
        alt: 'Elegant marble and brass table lamp',
        primaryAction: null,
        secondaryAction: null,
        footer: null,
        cancelled: true,
    },
];

const statusBadgeClasses = {
    orange:
        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    blue:
        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    emerald:
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    slate:
        'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

const statusDotClasses = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    emerald: '',
    slate: '',
};

const Orders = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState(0);
    const [ordersList, setOrdersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [totalOrders, setTotalOrders] = useState(0);

    const fetchOrders = async (pageNum, filterIndex, append = false) => {
        try {
            setIsLoading(true);
            const statusMap = {
                0: undefined, 
                1: 'active', // active meaning not delivered/cancelled
                2: 'delivered',
                3: 'cancelled'
            };
            
            const params = { page: pageNum, limit: 10 };
            if (filterIndex > 0) {
                 // For now, API only accepts valid statuses like pending, confirmed, processing, shipped, delivered, cancelled
                 // Handling active filter client-side if API doesn't support 'active' directly, but we will pass it anyway and see, or we'll fetch all and filter.
                 // The documented statuses are: pending, confirmed, processing, shipped, delivered, cancelled
            }
            // For simplicity and since we have useMemo client-side filtering, let's fetch all orders and filter client side unless pagination is huge.
            const response = await orderService.getOrders({ page: pageNum, limit: 100 });
            const dataOrders = response.data?.orders || [];
            
            const mappedOrders = dataOrders.map(o => {
                const isCancelled = o.status === 'cancelled';
                let statusColor = 'orange';
                if (['shipped'].includes(o.status)) statusColor = 'blue';
                if (['delivered'].includes(o.status)) statusColor = 'emerald';
                if (isCancelled) statusColor = 'slate';
                
                return {
                    id: o.orderNumber || o.id,
                    dbId: o.id,
                    status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
                    statusColor,
                    ordered: new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    items: `${o.total_items_count || 'Multiple'} Item(s)`, // Backend might not send item info in list list
                    total: `$${Number(o.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    image: o.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
                    alt: 'Order Item',
                    primaryAction: { label: isCancelled ? 'View Details' : 'Track Order', icon: isCancelled ? 'visibility' : 'local_shipping' },
                    secondaryAction: 'Invoice',
                    footer: { icon: isCancelled ? null : 'schedule', text: isCancelled ? 'Order Cancelled' : 'Updated recently' },
                    cancelled: isCancelled,
                };
            });

            if (append) {
                setOrdersList(prev => [...prev, ...mappedOrders]);
            } else {
                setOrdersList(mappedOrders);
            }
            setTotalOrders(response.data?.pagination?.total || mappedOrders.length);
            setHasMore(response.data?.pagination?.page < response.data?.pagination?.totalPages);
        } catch (error) {
            console.error('Error fetching orders', error);
            // toast.error('Failed to load orders');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(1, activeFilter, false);
    }, [activeFilter]);

    // Filter logic
    const displayedOrders = useMemo(() => {
        if (activeFilter === 0) return ordersList;
        if (activeFilter === 1) return ordersList.filter(o => !o.cancelled && o.status !== 'Delivered');
        if (activeFilter === 2) return ordersList.filter(o => o.status === 'Delivered');
        if (activeFilter === 3) return ordersList.filter(o => o.cancelled);
        return ordersList;
    }, [activeFilter, ordersList]);

    if (isLoading && ordersList.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex flex-col min-h-screen">
                {/* Top Navigation Bar */}
                {/* Removed hardcoded header to use MainLayout */}

                {/* Page Content */}
                <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                                My Orders
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                {totalOrders} orders placed in total
                            </p>
                        </div>
                        <div 
                            onClick={() => window.print()}
                            className="flex items-center gap-2 text-sm font-medium text-primary cursor-pointer hover:underline"
                            title="Print this page to PDF"
                        >
                            <span className="material-symbols-outlined text-lg">download</span>
                            Download Order History (PDF)
                        </div>
                    </div>

                    {/* Filters & Search Toolbar */}
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    search
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Search by Order ID or items..."
                                    type="text"
                                />
                            </div>
                            <div className="flex overflow-x-auto pb-1 lg:pb-0 gap-2 items-center no-scrollbar">
                                {STATUS_FILTERS.map((filter, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveFilter(index)}
                                        className={`whitespace-nowrap px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${activeFilter === index
                                                ? 'bg-primary text-white font-semibold shadow-md shadow-primary/20'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {displayedOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
                                    <span className="material-symbols-outlined text-5xl">shopping_cart_off</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                    No orders found
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6 max-w-xs">
                                    We couldn&apos;t find any orders matching your criteria.
                                </p>
                                <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all">
                                    Start Shopping
                                </button>
                            </div>
                        ) : displayedOrders.map((order) => (
                            <div
                                key={order.id}
                                className={`group p-5 rounded-xl border shadow-sm transition-all ${order.cancelled
                                        ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-80'
                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-primary/30'
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div
                                        className={`w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700 ${order.cancelled
                                                ? 'bg-slate-200 dark:bg-slate-800 grayscale'
                                                : 'bg-slate-100 dark:bg-slate-800'
                                            }`}
                                    >
                                        <img
                                            alt={order.alt}
                                            className="w-full h-full object-cover"
                                            src={order.image}
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="flex flex-wrap items-start justify-between gap-2">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3
                                                        className={`font-bold text-lg ${order.cancelled
                                                                ? 'text-slate-400 dark:text-slate-500'
                                                                : 'text-slate-900 dark:text-slate-100'
                                                            }`}
                                                    >
                                                        Order #{order.id}
                                                    </h3>
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadgeClasses[order.statusColor]
                                                            }`}
                                                    >
                                                        {order.statusColor === 'emerald' && (
                                                            <span className="material-symbols-outlined text-xs mr-1">
                                                                check_circle
                                                            </span>
                                                        )}
                                                        {statusDotClasses[order.statusColor] && (
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${statusDotClasses[order.statusColor]
                                                                    } mr-1.5`}
                                                            />
                                                        )}
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p
                                                    className={`text-sm ${order.cancelled
                                                            ? 'text-slate-400'
                                                            : 'text-slate-500 dark:text-slate-400'
                                                        }`}
                                                >
                                                    Ordered:{' '}
                                                    <span
                                                        className={
                                                            order.cancelled
                                                                ? 'font-medium'
                                                                : 'text-slate-700 dark:text-slate-200 font-medium'
                                                        }
                                                    >
                                                        {order.ordered}
                                                    </span>
                                                </p>
                                                <p
                                                    className={`text-sm ${order.cancelled
                                                            ? 'text-slate-400'
                                                            : 'text-slate-500 dark:text-slate-400'
                                                        }`}
                                                >
                                                    Items:{' '}
                                                    <span
                                                        className={
                                                            order.cancelled
                                                                ? 'font-medium'
                                                                : 'text-slate-700 dark:text-slate-200 font-medium'
                                                        }
                                                    >
                                                        {order.items}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p
                                                    className={`text-sm ${order.cancelled ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'
                                                        }`}
                                                >
                                                    {order.cancelled ? 'Refunded' : 'Total Amount'}
                                                </p>
                                                <p
                                                    className={`text-xl font-black ${order.cancelled
                                                            ? 'text-slate-400'
                                                            : 'text-slate-900 dark:text-slate-100'
                                                        }`}
                                                >
                                                    {order.total}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-4">
                                                {order.cancelled ? (
                                                    <button className="text-primary hover:underline font-bold text-sm transition-colors">
                                                        View Cancellation Reason
                                                    </button>
                                                ) : (
                                                    <>
                                                        {order.primaryAction && (
                                                            <button 
                                                                onClick={() => {
                                                                    if (order.primaryAction.label === 'Track Order') {
                                                                        navigate(`/track-order/${order.dbId}`);
                                                                    } else {
                                                                        navigate(`/orders/${order.dbId}`);
                                                                    }
                                                                }}
                                                                className="flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-sm transition-colors px-4 py-2 bg-primary/10 rounded-lg">
                                                                {order.primaryAction.label}
                                                                <span className="material-symbols-outlined text-sm">
                                                                    {order.primaryAction.icon}
                                                                </span>
                                                            </button>
                                                        )}
                                                        {order.secondaryAction && (
                                                            <button 
                                                                onClick={() => navigate(`/orders/${order.dbId}`)}
                                                                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-sm transition-colors">
                                                                {order.secondaryAction}
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            {order.footer && (
                                                <div className="hidden sm:flex items-center gap-1 text-slate-400 text-xs mt-2">
                                                    {order.footer.icon && (
                                                        <span className="material-symbols-outlined text-sm">
                                                            {order.footer.icon}
                                                        </span>
                                                    )}
                                                    {order.footer.text}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination / Load More */}
                    {hasMore && (
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <button 
                                onClick={() => {
                                    const nextPage = page + 1;
                                    setPage(nextPage);
                                    fetchOrders(nextPage, activeFilter, true);
                                }}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
                            >
                                {isLoading ? 'Loading...' : 'Load More Orders'}
                                <span className="material-symbols-outlined">expand_more</span>
                            </button>
                            <p className="text-slate-500 text-xs">Showing {displayedOrders.length} orders total</p>
                        </div>
                    )}
                </main>

                {/* Footer */}
                {/* Removed hardcoded footer to use MainLayout */}
            </div>
        </div>
    );
};

export default Orders;
