import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { orderService } from '../../services/order.service';
import toast from 'react-hot-toast';

/**
 * Order Detail Page
 *
 * Single order detail view with:
 * - Navbar with active "Orders" link, search, notifications, avatar
 * - Breadcrumbs: Home > My Orders > Order #FC-9921
 * - Header: Order ID, Paid + Shipped badges, date, delivery estimate
 * - Action buttons: Invoice, Track Shipment, Contact Support
 * - 5-step order timeline (Order Placed → Processing → Manufacturing → Shipped → Delivered)
 * - Customized items (2) with specs (material, dimensions, finish)
 * - Shipping address + Payment method cards
 * - Sticky Order Summary sidebar with discount, total, Track/Return CTAs
 * - Eco-conscious badge + Support card
 * - Footer
 *
 * Route: /order-detail
 */

const TIMELINE_STEPS = [
    { label: 'Order Placed', time: 'Oct 24, 10:00 AM', icon: 'check', completed: true },
    { label: 'Processing', time: 'Oct 24, 2:30 PM', icon: 'check', completed: true },
    { label: 'Manufacturing', time: 'Oct 26, 9:00 AM', icon: 'check', completed: true },
    { label: 'Shipped', time: 'Oct 29, 4:15 PM', icon: 'local_shipping', completed: true },
    { label: 'Delivered', time: 'In Transit', icon: 'home_pin', completed: false },
];

const ORDER_ITEMS = [
    {
        name: 'Velvet Modular Sofa',
        sku: 'FC-SFA-001',
        price: '$1,249.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCPYfKA0-a0w3X11r2lrLsbxc9FwWel9RKSo2AOV0eRP2lKdgM31WKGU_zWjI8dxptYuv5D0gOxv0hyckyPhuV7BoxnBExqbouVyxRkFs8SXQOrTNjpsrb0v1G9hhyZHpn_a7_YsHTU0sRTw31iKf3SV0Rz0f0PqqDkqiynEL1fkmD1AHE7B6HBMCfqySC_-Ix5rnQwHPCT8R0Gcq_EDZMLRJot-CwV2Lw0FIpcWS6aefdIuJy9_s-CL0lL_TOExnKtwlMFrduKj0Pg',
        alt: 'Modern royal blue velvet modular sofa',
        specs: [
            { label: 'Material', value: 'Royal Blue Velvet', dot: 'bg-blue-800' },
            { label: 'Dimensions', value: '240cm x 90cm x 85cm' },
            { label: 'Leg Finish', value: 'Natural Oak' },
        ],
    },
    {
        name: "The 'Aura' Accent Chair",
        sku: 'FC-CHR-442',
        price: '$450.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCGWRkMplk-8U5KESlU8NevvjmsWI0ybrHd5Lv6tZ1OiosStTgvbmwrrnlPVTHyqbL9h2qBb7mWw1XsOM1iOxPtsYV6QK0ed0rWfzoXM5Xe1zGBw5spiQOC1eHhkaxe6Hq_Kul9etniFzyT_cXJ6oRoOZ9JrlxDJJh58ZcU1fgDlFYvRJ5UsbmlwJfdCGIcT66N2BWuGdgcnekobg3N1JFD6ivTdgKqC2RvuC85XECZAH6mr7GPWZo5Z6Q86-0ut1E4RIhxIBl6Y0I_',
        alt: 'Scandinavian style mustard yellow armchair',
        specs: [
            { label: 'Material', value: 'Mustard Linen', dot: 'bg-yellow-500' },
            { label: 'Cushioning', value: 'Extra Firm Support' },
            { label: 'Frame', value: 'Matte Black Steel' },
        ],
    },
];

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // If id is missing, maybe we just came from order confirmation without ID in URL
                if (!id) {
                    navigate('/orders');
                    return;
                }
                const response = await orderService.getOrderById(id);
                setOrder(response.data?.order);
            } catch (error) {
                console.error('Error fetching order detail', error);
                toast.error('Failed to load order detail');
                navigate('/orders');
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrder();
    }, [id, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
                <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
            </div>
        );
    }

    if (!order) return null;

    const items = order.OrderItems || [];
    const isCancelled = order.status === 'cancelled';
    const isPaid = order.payment_status === 'completed' || order.Payment?.status === 'completed';
    // Simplified timeline calculation
    const currentStatusIndex = ['pending', 'processing', 'shipped', 'delivered'].indexOf(order.status);
    
    // Recalculate timeline steps
    const dynamicTimeline = [
        { label: 'Order Placed', time: new Date(order.createdAt || Date.now()).toLocaleDateString(), icon: 'check', completed: true },
        { label: 'Processing', time: '...', icon: 'check', completed: currentStatusIndex >= 1 },
        { label: 'Manufacturing', time: '...', icon: 'check', completed: currentStatusIndex >= 1 },
        { label: 'Shipped', time: '...', icon: 'local_shipping', completed: currentStatusIndex >= 2 },
        { label: 'Delivered', time: '...', icon: 'home_pin', completed: currentStatusIndex >= 3 },
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                    <Link className="hover:text-primary" to="/">Home</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link className="hover:text-primary" to="/orders">My Orders</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">Order {order.orderNumber || `#${order.id}`}</span>
                </nav>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-extrabold tracking-tight">Order {order.orderNumber || `#${order.id}`}</h1>
                            <span className={`px-3 py-1 ${isPaid ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 text-red-700'} text-xs font-bold rounded-full uppercase tracking-wider`}>
                                {isPaid ? 'Paid' : 'Unpaid'}
                            </span>
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                {order.status}
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400">
                            Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-700">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Invoice
                        </button>
                        <button onClick={() => navigate(`/track-order/${order.id}`)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-700">
                            <span className="material-symbols-outlined text-lg">local_shipping</span>
                            Track Shipment
                        </button>
                        <button onClick={() => navigate('/support')} className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary/90 active:scale-95 text-white transition-all text-sm font-semibold rounded-lg shadow-lg shadow-primary/20">
                            Contact Support
                        </button>
                    </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 mb-8 overflow-x-auto">
                    <div className="min-w-[700px]">
                        <div className="flex items-center justify-between relative">
                            {/* Progress Line Background */}
                            <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />
                            {/* Active Progress Line */}
                            <div className="absolute top-5 left-0 w-[75%] h-0.5 bg-primary -z-0" />
                            {/* Steps */}
                            {dynamicTimeline.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-3 relative z-10 bg-white dark:bg-slate-900 px-4"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-900 ${step.completed
                                                ? 'bg-primary text-white'
                                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">{step.icon}</span>
                                    </div>
                                    <div className="text-center">
                                        <p
                                            className={`text-sm font-bold ${step.completed ? '' : 'text-slate-400'
                                                }`}
                                        >
                                            {step.label}
                                        </p>
                                        <p
                                            className={`text-xs ${step.completed ? 'text-slate-500' : 'text-slate-400 italic'
                                                }`}
                                        >
                                            {step.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Items and Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Customized Items */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">inventory_2</span>
                                Customized Items ({items.length})
                            </h2>
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex gap-6"
                                    >
                                        <div className="w-32 h-32 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                                            <img
                                                alt={item.name || 'Custom item'}
                                                className="w-full h-full object-cover"
                                                src={item.snapshot_data?.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold">{item.snapshot_data?.model?.name || item.name || 'Custom Piece'}</h3>
                                                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-lg font-bold">${parseFloat(item.total_price || item.unit_price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                                                {item.snapshot_data?.material?.name && (
                                                    <div>
                                                        <p className="text-slate-500 uppercase font-semibold mb-1">Material</p>
                                                        <p className="font-medium text-slate-900 dark:text-slate-100">{item.snapshot_data.material.name}</p>
                                                    </div>
                                                )}
                                                {item.snapshot_data?.color?.name && (
                                                    <div>
                                                        <p className="text-slate-500 uppercase font-semibold mb-1">Color</p>
                                                        <div className="flex items-center gap-1.5 font-medium">
                                                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.snapshot_data.color.hex_code }} />
                                                                {item.snapshot_data.color.name}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Information Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Shipping Address */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                                    Shipping Address
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {order.address?.address_line1} {order.address?.address_line2}
                                    <br />
                                    {order.address?.city}, {order.address?.state} {order.address?.pincode}
                                    <br />
                                    {order.address?.country}
                                </p>
                            </div>
                            {/* Payment Method */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                                        Payment Method
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="font-bold">{order.payment_status === 'completed' || order.Payment?.status === 'completed' ? 'Paid Online' : 'Pending Payment'}</p>
                                            <p className="text-sm text-slate-500 capitalize">{order.Payment?.payment_method || 'Standard'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Order Summary */}
                    <aside className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-slate-900 dark:text-white">${parseFloat(order.total_amount || order.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                {parseFloat(order.discount_amount || 0) > 0 && (
                                    <div className="flex justify-between text-green-600 dark:text-green-400">
                                        <span>Discount</span>
                                        <span className="font-medium">-${parseFloat(order.discount_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                )}
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                                    <div>
                                        <p className="text-lg font-bold">Total</p>
                                    </div>
                                    <span className="text-3xl font-black text-primary">${parseFloat(order.final_amount || order.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <button onClick={() => navigate(`/track-order/${order.id}`)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md">
                                    <span className="material-symbols-outlined">map</span>
                                    Track My Package
                                </button>
                                {/* Initiate Return Button (Disabled) */}
                                <div className="group relative">
                                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 font-bold rounded-lg cursor-not-allowed opacity-60">
                                        <span className="material-symbols-outlined">assignment_return</span>
                                        Initiate Return
                                    </button>
                                    {/* Tooltip for disabled state */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        Available once order is delivered
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
                                <span className="material-symbols-outlined text-primary">eco</span>
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase mb-1">
                                        Eco-Conscious Choice
                                    </p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        This order used 100% recycled packaging and offset 24kg of CO2.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Support Card */}
                        <div className="bg-slate-900 text-white rounded-xl p-6 overflow-hidden relative">
                            <div className="relative z-10">
                                <h4 className="font-bold mb-2">Need help with this order?</h4>
                                <p className="text-sm text-slate-400 mb-4">
                                    Our furniture experts are available 24/7 to assist with customization or assembly
                                    questions.
                                </p>
                                <a
                                    className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
                                    href="#"
                                >
                                    Visit Help Center
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/5 text-8xl rotate-12">
                                support_agent
                            </span>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Footer */}
            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default OrderDetail;
