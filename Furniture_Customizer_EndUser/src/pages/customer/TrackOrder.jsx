import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { orderService } from '../../services/order.service';
import toast from 'react-hot-toast';

/**
 * Track Order Page
 *
 * Order tracking view with:
 * - Frosted glass navbar with SVG logo, nav links, notifications, avatar
 * - Breadcrumbs: Home > Orders > Order #FC-88291
 * - Header: "In Transit" badge, order title, est. delivery, carrier info
 * - Action buttons: Download Invoice, Live Map (primary)
 * - Visual progress bar (85%) with 4 labels
 * - Detailed vertical timeline (4 stages with timeline-line)
 * - Product preview card (Stockholm Lounge Chair)
 * - Logistics details (tracking number, carrier, service level)
 * - Help & Support card (Change Delivery, Report Damage, Contact)
 * - Crafting quote card
 * - Footer
 *
 * Route: /track-order
 */

const TIMELINE_EVENTS = [
    {
        icon: 'local_shipping',
        title: 'Out for Delivery',
        date: 'Oct 23, 08:45 AM',
        description:
            'Your item is with the local courier and will be delivered today. Please ensure someone is available to receive the package.',
        location: 'Seattle Hub, WA',
        active: true,
    },
    {
        icon: 'inventory_2',
        title: 'Handed to Logistics',
        date: 'Oct 21, 02:15 PM',
        description:
            'Order has been picked up from our regional workshop and is in transit to your local distribution center.',
        location: null,
        active: false,
    },
    {
        icon: 'verified',
        title: 'Quality Check Passed',
        date: 'Oct 20, 11:30 AM',
        description:
            "Our master artisans have completed a 24-point inspection of your custom piece. It's perfect.",
        location: null,
        active: false,
    },
    {
        icon: 'handyman',
        title: 'Crafting in Workshop',
        date: 'Oct 12, 09:00 AM',
        description:
            'Assembly of your custom furniture has begun. We are using sustainably sourced walnut for your frame.',
        location: null,
        active: false,
    },
];

const HELP_LINKS = [
    { label: 'Change Delivery Date', icon: 'event_repeat' },
    { label: 'Report Damage', icon: 'report_problem' },
];

const TrackOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dateInputRef = useRef(null);
    
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [progress, setProgress] = useState(85);
    const [expandedEvents, setExpandedEvents] = useState(new Set([0]));
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (!id) {
                    navigate('/orders');
                    return;
                }
                const response = await orderService.getOrderById(id);
                setOrder(response.data?.order);
                
                const status = response.data?.order?.status || 'pending';
                if (status === 'pending') setProgress(15);
                else if (status === 'processing') setProgress(45);
                else if (status === 'shipped') setProgress(85);
                else if (status === 'delivered') setProgress(100);
                else setProgress(0); // cancelled or unknown
                
            } catch (error) {
                console.error('Error fetching tracking info', error);
                toast.error('Failed to load tracking info');
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
    const orderItem = items.length > 0 ? items[0] : null;

    const orderItemDisplay = orderItem ? {
        name: orderItem.snapshot_data?.model?.name || orderItem.name || 'Custom Piece',
        detail: orderItem.snapshot_data?.material?.name 
                ? `${orderItem.snapshot_data.material.name} • ${orderItem.snapshot_data.color?.name || ''}`
                : 'Customized Details',
        price: orderItem.total_price || orderItem.unit_price || order.total_amount || order.total,
        image: orderItem.snapshot_data?.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
    } : {
        name: 'Custom Order',
        detail: 'Multiple items. View order detail for more.',
        price: order.total_amount || order.total,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800'
    };

    const orderNumber = order.orderNumber || `#${order.id}`;
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const toggleEvent = (index) => {
        setExpandedEvents(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    const handleCopyTracking = () => {
        navigator.clipboard.writeText("PF-99218820LX");
        alert("Copied!");
    };

    const handleHelpClick = (e, label) => {
        e.preventDefault();
        if (label === 'Change Delivery Date') {
            if (dateInputRef.current) {
                if (dateInputRef.current.showPicker) {
                    dateInputRef.current.showPicker();
                } else {
                    dateInputRef.current.focus();
                }
            }
        } else if (label === 'Report Damage') {
            navigate('/support', {
                state: {
                    orderId: orderNumber,
                    productName: orderItemDisplay.name,
                    category: 'Product'
                }
            });
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            {/* Removed hardcoded header to use MainLayout */}

            <main className="max-w-6xl mx-auto px-6 py-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500">
                    <Link className="hover:text-primary" to="/">
                        Home
                    </Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link className="hover:text-primary" to="/orders">
                        Orders
                    </Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-100 font-medium">{orderNumber}</span>
                </nav>

                {/* Main Tracking Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                    <div className="space-y-2">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            {order.status}
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tight">Track Order {orderNumber}</h2>
                        <div className="flex items-center gap-4 text-slate-500">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg">calendar_today</span>
                                <span>
                                    Est. Delivery: <strong>{orderDate}</strong>
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg">local_shipping</span>
                                <span>
                                    Carrier: <strong>Premium Freight</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowInvoiceModal(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 font-semibold text-sm transition-all text-slate-900 dark:text-slate-100">
                            <span className="material-symbols-outlined text-lg">receipt_long</span>
                            Download Invoice
                        </button>
                        <button onClick={() => window.open('https://maps.google.com/?q=Seattle+Hub', '_blank')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 font-semibold text-sm transition-all shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">map</span>
                            Live Map
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Tracking Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Visual Progress Bar */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest">
                                        Current Status
                                    </span>
                                    <span className="text-xl font-bold">{progress >= 100 ? 'Delivered' : progress >= 80 ? 'Out for Delivery' : progress >= 50 ? 'Shipping' : 'Crafting'}</span>
                                </div>
                                <span className="text-2xl font-black text-primary">{progress}%</span>
                            </div>
                            <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                            </div>
                            <div className="flex justify-between mt-4 text-xs font-medium text-slate-400">
                                <span>Confirmed</span>
                                <span>Crafting</span>
                                <span>Shipping</span>
                                <span className="text-primary">Delivering</span>
                            </div>
                        </div>

                        {/* Detailed Vertical Timeline */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-bold mb-8">Detailed Status Updates</h3>
                            <div className="relative space-y-10">
                                {/* Timeline line */}
                                <div
                                    className="absolute top-0 bottom-0 z-0"
                                    style={{
                                        width: '2px',
                                        backgroundColor: '#e2e8f0',
                                        left: '15px',
                                    }}
                                />
                                {TIMELINE_EVENTS.map((event, index) => (
                                    <div key={index} className="relative flex gap-6 cursor-pointer group" onClick={() => toggleEvent(index)}>
                                        <div
                                            className={`relative z-10 size-8 rounded-full flex items-center justify-center transition-all ${event.active
                                                    ? 'bg-primary text-white ring-4 ring-primary/20'
                                                    : 'bg-primary/20 text-primary group-hover:bg-primary/30'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-base">{event.icon}</span>
                                        </div>
                                        <div className={`flex-1 -mt-1 transition-all ${event.active ? '' : 'opacity-80'}`}>
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-slate-900 dark:text-white transition-colors group-hover:text-primary">{event.title}</h4>
                                                <span className="text-xs font-semibold text-slate-500">{event.date}</span>
                                            </div>
                                            {expandedEvents.has(index) && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{event.description}</p>
                                                    {event.location && (
                                                        <div className="mt-2 text-xs font-medium text-primary flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-xs">location_on</span>
                                                            {event.location}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info & Help */}
                    <div className="space-y-8">
                        {/* Product Preview Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="aspect-video bg-slate-100 relative">
                                <img
                                    className="w-full h-full object-cover"
                                    alt={orderItemDisplay.name}
                                    src={orderItemDisplay.image}
                                />
                            </div>
                            <div className="p-6">
                                <h4 className="font-bold text-lg mb-1">{orderItemDisplay.name}</h4>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                    {orderItemDisplay.detail}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <span className="text-xs font-bold uppercase tracking-tight text-slate-400">
                                        Total Price
                                    </span>
                                    <span className="text-lg font-bold">${parseFloat(orderItemDisplay.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>

                        {/* Courier Details */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h4 className="font-bold mb-4">Logistics Details</h4>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-medium text-slate-400 uppercase">
                                        Tracking Number
                                    </span>
                                    <div className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        <code className="font-mono text-primary font-bold">PF-99218820LX</code>
                                        <button onClick={handleCopyTracking} className="text-primary hover:text-primary/70 transition-colors cursor-pointer" title="Copy Tracking Number">
                                            <span className="material-symbols-outlined text-xl">content_copy</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm">Carrier</span>
                                    <span className="text-sm font-bold">Premium Freight Co.</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-sm">Service Level</span>
                                    <span className="text-sm font-bold">White Glove Delivery</span>
                                </div>
                            </div>
                        </div>

                        {/* Help & Support */}
                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                            <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined">help</span>
                                Need help?
                            </h4>
                            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                                Having issues with your delivery or need to reschedule? Our specialists are here to
                                help.
                            </p>
                            <div className="space-y-2">
                                {HELP_LINKS.map((link, index) => (
                                    <a
                                        key={index}
                                        onClick={(e) => handleHelpClick(e, link.label)}
                                        className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary dark:hover:border-primary transition-all group cursor-pointer"
                                        href="#"
                                    >
                                        <span className="text-sm font-semibold">{link.label}</span>
                                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">
                                            {link.icon}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Crafting Note */}
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 text-center">
                            <p className="text-xs text-slate-500 italic">
                                &ldquo;Good things take time. Your custom piece was hand-assembled over 8 days by
                                our master craftsmen in Seattle.&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Hidden Date Picker for Delivery Change */}
            <input 
                type="date" 
                ref={dateInputRef} 
                className="absolute opacity-0 pointer-events-none -z-10 w-0 h-0" 
                onChange={(e) => {
                    if (e.target.value) {
                        setToastMessage(`Delivery date practically changed to ${e.target.value}`);
                        setTimeout(() => setToastMessage(''), 4000);
                    }
                }}
            />

            {/* Support Ticket Toast */}
            {toastMessage && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-opacity">
                    <span className="material-symbols-outlined text-green-400">check_circle</span>
                    <p className="font-semibold text-sm md:text-base">{toastMessage}</p>
                </div>
            )}

            {/* Invoice Modal */}
            {showInvoiceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold">Order Invoice {orderNumber}</h3>
                            <button onClick={() => setShowInvoiceModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <div className="mb-6 flex justify-between">
                                <div>
                                    <p className="font-bold text-lg text-primary">Furniture Customizer</p>
                                    <p className="text-xs text-slate-500">123 Design Avenue, NY 10001</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">INVOICE</p>
                                    <p className="text-xs text-slate-500">Date: {orderDate}</p>
                                </div>
                            </div>
                            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden mb-6">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">Product</th>
                                            <th className="px-4 py-3 font-semibold text-center">Qty</th>
                                            <th className="px-4 py-3 font-semibold text-right">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lastOrder.items ? lastOrder.items.map((item, idx) => (
                                            <tr key={idx} className="border-b border-slate-100 dark:border-slate-800">
                                                <td className="px-4 py-3">
                                                    <p className="font-bold">{item.name}</p>
                                                    <p className="text-xs text-slate-500 line-clamp-1">{item.detail || item.config}</p>
                                                </td>
                                                <td className="px-4 py-3 text-center">{item.qty || 1}</td>
                                                <td className="px-4 py-3 text-right">{typeof item.price === 'number' ? `$${item.price.toLocaleString()}.00` : item.price}</td>
                                            </tr>
                                        )) : (
                                            <tr className="border-b border-slate-100 dark:border-slate-800">
                                                <td className="px-4 py-3">
                                                    <p className="font-bold">Stockholm Lounge Chair</p>
                                                    <p className="text-xs text-slate-500">Midnight Navy Fabric • Natural Oak Frame</p>
                                                </td>
                                                <td className="px-4 py-3 text-center">1</td>
                                                <td className="px-4 py-3 text-right">$1,249.00</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="px-4 py-3 font-bold text-right" colSpan="2">Total</td>
                                            <td className="px-4 py-3 font-black text-right text-primary">${Number(lastOrder.total || 1249.00).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 print:hidden">
                            <button onClick={() => setShowInvoiceModal(false)} className="px-5 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                Close
                            </button>
                            <button onClick={() => window.print()} className="px-5 py-2 rounded-lg font-bold bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">print</span> Print PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Removed hardcoded footer to use MainLayout */}
        </div>
    );
};

export default TrackOrder;