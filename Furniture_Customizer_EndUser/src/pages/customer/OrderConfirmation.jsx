import { Link, useNavigate } from 'react-router-dom';

/**
 * Order Confirmation Page
 *
 * Post-checkout success screen with:
 * - Minimal navbar with notification + avatar
 * - Success hero card (checkmark, "Payment Successful!", order number, delivery estimate)
 * - "Track Order" primary CTA + "Return to Home" secondary
 * - Trust badge (Secure Transaction & Guaranteed Quality)
 * - "Complete your space" product recommendations grid (3 cards)
 * - Footer with email confirmation note
 *
 * Route: /order-confirmation
 */

const RECOMMENDATIONS = [
    {
        id: 1,
        name: 'Velvet Occasional Chair',
        detail: 'Midnight Blue Velvet',
        price: '$249.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDNT9HK6_zvE2KmntjRsC9I83JUdC4xgKScCq9azNu6HNBzB0CTBQiy3i6L9odmDMPICV5hf--9lqJdqT1_qxjzoujuUIAmEvTZ9NpYqv7RNuNvMnnxtijm2rU87Xv4rQL59XOe89Em3unMWB_pwJo6jpQa20kr-XzTzzsHZZpA5yXP9T5VxoC59MPcU5vsIFbFNGny46A2MvTrzturZagLz8-v8Ql5k7VZU3LG8LysEl2IvnZXJkeCc3VZ22pIyFNMxXmt9YvB4zj_',
        alt: 'Modern blue velvet armchair aesthetic',
    },
    {
        id: 2,
        name: 'Scandi Oak Coffee Table',
        detail: 'Natural Oak Finish',
        price: '$185.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDJsAyAgmxxd-UOw0ZyhkTZZXznRJYniEzGBVBtJ984Tqo8GUx9YzkAAydOu9AQT8FwQqBLERsbpZo_uZtBKCp5z2IGFXLZaPysxCcTeZUtTDNnzwICQ9iev_rc9VoQSRDrMk3hPzcX2mJ9RQAqSzoV_KEEahuyWkkSpWl3lIjvUuXjOmxvx6vxswTk-X93B0qTcPFTlfzEXVOSyZtJZyPKLqbZElTwf1Qm0OKIs4JJ6McysIsgRhJ-VaSNMSEm5eiElTKWyTLZSGdw',
        alt: 'Minimalist oak wood coffee table',
    },
    {
        id: 3,
        name: 'Arc Floor Lamp',
        detail: 'Brushed Brass Metal',
        price: '$120.00',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDHHQLyWGG4_GRI5xw_tXusuyRDvH5F-i4H-63UPvdGr5enN1OvFh-__eGzkbHGW-StRBcBLGKm7POv4jIEgreOBtfXXHd4Ju0wyHZDXws-PhHNe348n1l8-hDafhLeVr865vpZBJXySu3S9fGWd_BmxoVJ8jxS75KqjVaklWY3NrjTYzBvIFoEJbCFPCif4Xct5jdy-Q0yEZNrUhsHelSmoAjj0VNCc3H1EYOsYMTffhDzzuGzFUoQPOw7xFs_qne0coHShpplvExn',
        alt: 'Modern arched floor lamp brass',
    },
];

const OrderConfirmation = () => {
    const navigate = useNavigate();
    
    // Read order data
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder') || '{"orderNumber":"#FC-98234", "date":"Oct 24, 2023", "total": 0}');

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Navigation */}
                {/* Removed hardcoded header to use MainLayout */}

                <main className="flex flex-1 flex-col items-center py-10 px-4 md:px-0">
                    {/* Success Hero Card */}
                    <div className="w-full max-w-[640px] bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                        <div className="bg-primary/5 py-12 flex flex-col items-center justify-center text-center px-6">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                                <span
                                    className="material-symbols-outlined text-4xl"
                                    style={{ fontVariationSettings: "'wght' 700" }}
                                >
                                    check
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                                Payment Successful!
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                                Thank you for your order, Alex! Your furniture is being prepared for shipment.
                            </p>
                        </div>
                        <div className="p-8">
                            <div className="rounded-lg border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6 mb-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                                            Order Number
                                        </p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{lastOrder.orderNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                                            Date / Total
                                        </p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">{lastOrder.date} - ${Number(lastOrder.total).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => navigate(lastOrder.id ? `/track-order/${lastOrder.id}` : '/orders')} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined">local_shipping</span>
                                    Track Order
                                </button>
                                <button
                                    onClick={() => navigate('/home')}
                                    className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-4 rounded-lg transition-colors"
                                >
                                    Return to Home
                                </button>
                            </div>
                            <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-sm">
                                <span className="material-symbols-outlined text-base">verified_user</span>
                                <span>Secure Transaction &amp; Guaranteed Quality</span>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations Section */}
                    <div className="w-full max-w-[960px] mt-16 px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                Complete your space
                            </h3>
                            <Link
                                className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
                                to="/products"
                            >
                                View All
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {RECOMMENDATIONS.map((product) => (
                                <div
                                    key={product.id}
                                    className="group flex flex-col bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden"
                                >
                                    <div className="aspect-[4/3] bg-slate-200 overflow-hidden">
                                        <img
                                            alt={product.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            src={product.image}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                                            {product.name}
                                        </h4>
                                        <p className="text-sm text-slate-500 mb-3">{product.detail}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary font-black text-lg">{product.price}</span>
                                            <button className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-lg">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                {/* Removed hardcoded footer to use MainLayout */}
            </div>
        </div>
    );
};

export default OrderConfirmation;
