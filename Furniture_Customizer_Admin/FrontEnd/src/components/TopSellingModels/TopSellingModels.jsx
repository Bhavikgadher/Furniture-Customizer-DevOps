import { useTopProducts } from '../../hooks/api';
import { topSellingModels as fallbackModels } from '../../data/dashboardData';

/**
 * TopSellingModels Component
 *
 * Grid of best-selling furniture models.
 * Fetches from /api/admin/dashboard/top-products, falls back to mock data.
 */
const TopSellingModels = () => {
    const { data, isLoading, error } = useTopProducts({ limit: 5 });

    const rawModels = data?.products || data || fallbackModels;
    const models = Array.isArray(rawModels) 
        ? rawModels.map(model => ({
            ...model,
            name: model.name || model.title || 'Unknown Product',
            orders: model.orders || model.totalOrders || model.sales || 0,
            price: model.price || model.revenue || '$0.00',
            image: model.image || model.imageUrl || model.thumbnail
        }))
        : [];

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-default">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Top-Selling Models</h3>
                <button className="text-primary text-sm font-medium hover:underline hover:text-primary/80 transition-colors">
                    Manage Products
                </button>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Error */}
            {error && !isLoading && (
                <div className="text-center py-8 text-sm text-red-500">
                    Failed to load top products
                </div>
            )}

            {/* Product Grid */}
            {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {models.map((model, index) => (
                        <div
                            key={model.id || index}
                            className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer active:scale-[0.98] duration-150"
                        >
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                <img
                                    className="w-full h-full object-cover"
                                    src={model.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(model.name)}&background=1152d4&color=fff&size=128`}
                                    alt={model.alt || model.name}
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-sm truncate">{model.name}</p>
                                <p className="text-xs text-slate-500">{model.orders || model.totalOrders || 0} Orders</p>
                                <p className="text-xs font-bold text-primary mt-1">{model.price}</p>
                            </div>
                        </div>
                    ))}
                    {models.length === 0 && (
                        <p className="col-span-2 text-center text-sm text-slate-400 py-6">No products found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TopSellingModels;
