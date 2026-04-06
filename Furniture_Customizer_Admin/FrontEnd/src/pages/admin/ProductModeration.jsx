import { useState, useMemo } from 'react';

import {
    productStats as fallbackStats,
} from '../../data/productModerationData';
import {
    useProductStats,
    useProducts,
    usePendingProducts,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
    useApproveProduct,
    useRejectProduct,
    useCategories,
    useVendors,
} from '../../hooks/api';

const statusOptions = ['Any', 'live', 'featured', 'disabled', 'pending'];

const ProductModeration = () => {
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [statusFilter, setStatusFilter] = useState('Any');

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [actionMenuId, setActionMenuId] = useState(null);

    const [newProduct, setNewProduct] = useState({
        name: '',
        vendorId: '',
        categoryId: '',
        basePrice: '',
        status: 'active',
    });

    // ─── API Hooks ────────────────────────────────────────
    const { data: statsData, isLoading: statsLoading } = useProductStats();
    const { data: categoriesData } = useCategories();
    const { data: vendorsData } = useVendors({ limit: 100 });
    const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({
        category: categoryFilter !== 'All Categories' ? categoryFilter : undefined,
        status: statusFilter !== 'Any' ? statusFilter : undefined,
    });
    const { data: pendingData, isLoading: pendingLoading } = usePendingProducts();

    // Derive category options from API (with id for form selects)
    const categoriesList = useMemo(() => {
        const cats = categoriesData?.categories || categoriesData || [];
        return Array.isArray(cats) ? cats : [];
    }, [categoriesData]);

    const categoryOptions = useMemo(() => {
        return ['All Categories', ...categoriesList.map((c) => c.name)];
    }, [categoriesList]);

    // Derive vendor options from API
    const vendorsList = useMemo(() => {
        const v = vendorsData?.vendors || vendorsData?.data || vendorsData || [];
        return Array.isArray(v) ? v : [];
    }, [vendorsData]);

    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();
    const deleteMutation = useDeleteProduct();
    const approveMutation = useApproveProduct();
    const rejectMutation = useRejectProduct();

    // ─── Handlers & Derived ──────────────────────────────
    const getStatStyles = (label) => {
        const lower = label.toLowerCase();
        if (lower.includes('total')) 
            return { icon: 'inventory_2', iconBg: 'bg-primary/10', iconColor: 'text-primary' };
        if (lower.includes('pending')) 
            return { icon: 'pending_actions', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' };
        if (lower.includes('featured')) 
            return { icon: 'star', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' };
        return { icon: 'inventory', iconBg: 'bg-slate-100', iconColor: 'text-slate-600' };
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
                    iconBg: s.iconBg || styles.iconBg,
                    iconColor: s.iconColor || styles.iconColor
                };
            });
        }

        // Object format
        return [
            { label: 'Total Products', value: raw.totalProducts ?? raw.total ?? '0', ...getStatStyles('Total Products'), badge: raw.totalChange },
            { label: 'Pending Approval', value: raw.pendingApproval ?? raw.pending ?? '0', ...getStatStyles('Pending Approval'), badge: 'Action Required', badgeClass: 'text-amber-600 bg-amber-50' },
            { label: 'Featured Products', value: raw.featuredProducts ?? raw.featured ?? '0', ...getStatStyles('Featured Products') }
        ];
    }, [statsData]);

    const products = productsData?.products || productsData?.data || productsData || [];
    const pendingApprovals = pendingData?.products || pendingData?.data || pendingData || [];

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) return [];
        return products;
    }, [products]);

    // Status class mapping
    const getStatusClass = (status) => {
        const lower = (status || '').toLowerCase();
        const map = {
            live: 'bg-green-100 text-green-700',
            active: 'bg-green-100 text-green-700',
            featured: 'bg-primary/10 text-primary',
            disabled: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
            inactive: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
            pending: 'bg-amber-100 text-amber-700',
        };
        return map[lower] || map.live;
    };

    // ─── Handlers ─────────────────────────────────────────
    const handleAddProduct = (e) => {
        e.preventDefault();
        const payload = {
            ...newProduct,
            basePrice: Number(newProduct.basePrice),
        };
        createMutation.mutate(payload, {
            onSuccess: () => {
                setIsAddModalOpen(false);
                setNewProduct({ name: '', vendorId: '', categoryId: '', basePrice: '', status: 'active' });
            },
        });
    };

    const handleEditProduct = (e) => {
        e.preventDefault();
        const { id, _id, ...rest } = selectedProduct;
        const payload = {
            id: id || _id,
            ...rest,
            basePrice: Number(rest.basePrice),
        };
        updateMutation.mutate(payload, {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setSelectedProduct(null);
            },
        });
    };

    const handleDeleteProduct = (e, id, name) => {
        e?.stopPropagation();
        if (window.confirm(`Delete product "${name}"? This cannot be undone.`)) {
            deleteMutation.mutate(id, {
                onSuccess: () => {
                    setActionMenuId(null);
                }
            });
        }
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setIsViewModalOpen(true);
        setActionMenuId(null);
    };

    const handleOpenEdit = (product) => {
        setSelectedProduct({ ...product });
        setIsEditModalOpen(true);
        setActionMenuId(null);
    };

    const handleApprove = (id) => {
        approveMutation.mutate(id);
    };

    const handleReject = (id) => {
        rejectMutation.mutate(id);
    };

    return (
        <>
            {/* Breadcrumbs & Title */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <a className="hover:text-primary" href="#" onClick={(e) => e.preventDefault()}>
                        Admin
                    </a>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-300 font-medium">
                        Product Moderation
                    </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Product Moderation
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm">
                            Review, approve, and manage vendor product listings across all categories.
                        </p>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statsLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
                              <div className="w-24 h-4 bg-slate-200 rounded mb-3"></div>
                              <div className="w-16 h-7 bg-slate-200 rounded"></div>
                          </div>
                      ))
                    : (Array.isArray(stats) ? stats : fallbackStats).map((stat, index) => (
                          <div
                              key={index}
                              className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer"
                          >
                              <div className="flex items-center justify-between mb-4">
                                  <div className={`p-2 ${stat.iconBg} ${stat.iconColor} rounded-lg`}>
                                      <span className="material-symbols-outlined">{stat.icon}</span>
                                  </div>
                                  {stat.badge && (
                                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.badgeClass}`}>
                                          {stat.badge}
                                      </span>
                                  )}
                              </div>
                              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                  {stat.value}
                              </h3>
                          </div>
                      ))}
            </div>

            {/* Pending Approvals Section */}
            {(Array.isArray(pendingApprovals) && pendingApprovals.length > 0) && (
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            Pending Approvals
                            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-bold">
                                {pendingApprovals.length} Action Required
                            </span>
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        {pendingLoading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                        <th className="px-6 py-4">Product Details</th>
                                        <th className="px-6 py-4">Vendor</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4 text-right">Base Price</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {pendingApprovals.map((item) => (
                                        <tr key={item.id || item._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                                                        <div className={`w-full h-full bg-gradient-to-br ${item.gradientFrom || 'from-primary/30'} ${item.gradientTo || 'to-primary/50'} flex items-center justify-center`}>
                                                            <span className={`material-symbols-outlined ${item.iconColor || 'text-primary'}`}>
                                                                {item.icon || 'inventory_2'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            SKU: {item.sku || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                                    {item.vendorName || item.vendor}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                                                {item.price || item.basePrice || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleApprove(item.id || item._id)}
                                                        disabled={approveMutation.isPending}
                                                        className="bg-primary hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors active:scale-95 disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(item.id || item._id)}
                                                        disabled={rejectMutation.isPending}
                                                        className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors active:scale-95 disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>
            )}

            {/* All Products Section */}
            <section>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        All Products Catalog
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        >
                            {categoryOptions.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        >
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>Status: {s}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-xs font-bold shadow-md shadow-primary/20 active:scale-95 transition-all active:bg-blue-800"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                            Add Product
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    {productsLoading && (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    )}
                    {productsError && !productsLoading && (
                        <div className="text-center py-12 text-red-500 text-sm">
                            <span className="material-symbols-outlined text-3xl mb-2 block">error</span>
                            Failed to load products
                        </div>
                    )}
                    {!productsLoading && !productsError && (
                        <>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Vendor</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id || product._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden">
                                                        <div className={`w-full h-full bg-gradient-to-br ${product.gradientFrom || 'from-primary/30'} ${product.gradientTo || 'to-primary/50'}`}></div>
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                                        {product.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {product.vendor || product.vendorName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide ${product.statusClass || getStatusClass(product.status)}`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleViewProduct(product)}
                                                        className="p-1.5 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-90"
                                                        title="View Details"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">visibility</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenEdit(product)}
                                                        className="p-1.5 text-amber-500 hover:text-amber-600 transition-colors rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/10 active:scale-90"
                                                        title="Edit Product"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleDeleteProduct(e, product._id || product.id, product.name)}
                                                        disabled={deleteMutation.isPending}
                                                        className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 disabled:opacity-50 active:scale-90"
                                                        title="Delete Product"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredProducts.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-10 text-slate-400 text-sm">
                                                No products match the selected filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <p className="text-xs text-slate-500">
                                    Showing {filteredProducts.length} products
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6 pb-2 text-center">
                <p className="text-xs text-slate-500">
                    © 2024 Furniture Customizer Admin Portal. All rights reserved.
                </p>
            </footer>

            {/* ===== ADD PRODUCT MODAL ===== */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Add New Product</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Product Name</label>
                                <input type="text" required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" placeholder="e.g. Wooden Dining Table" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Vendor</label>
                                <select required value={newProduct.vendorId} onChange={(e) => setNewProduct({ ...newProduct, vendorId: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    <option value="">Select a vendor</option>
                                    {vendorsList.map((v) => (
                                        <option key={v.id || v._id} value={v.id || v._id}>{v.companyName || v.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                                <select required value={newProduct.categoryId} onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    <option value="">Select a category</option>
                                    {categoriesList.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Base Price (₹)</label>
                                <input type="number" required min="0" step="0.01" value={newProduct.basePrice} onChange={(e) => setNewProduct({ ...newProduct, basePrice: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" placeholder="e.g. 18000" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
                                <select value={newProduct.status} onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    {statusOptions.filter((s) => s !== 'Any').map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800">Cancel</button>
                                <button type="submit" disabled={createMutation.isPending} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm active:scale-95 duration-200 disabled:opacity-50">
                                    {createMutation.isPending ? 'Adding...' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== EDIT PRODUCT MODAL ===== */}
            {isEditModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Edit Product</h3>
                            <button onClick={() => { setIsEditModalOpen(false); setSelectedProduct(null); }} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleEditProduct} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Product Name</label>
                                <input type="text" required value={selectedProduct.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Vendor</label>
                                <select required value={selectedProduct.vendorId || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, vendorId: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    <option value="">Select a vendor</option>
                                    {vendorsList.map((v) => (
                                        <option key={v.id || v._id} value={v.id || v._id}>{v.companyName || v.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                                <select required value={selectedProduct.categoryId || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, categoryId: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    <option value="">Select a category</option>
                                    {categoriesList.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Base Price (₹)</label>
                                    <input type="number" required min="0" step="0.01" value={selectedProduct.basePrice || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, basePrice: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">SKU</label>
                                    <input type="text" value={selectedProduct.sku || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, sku: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
                                <select value={selectedProduct.status} onChange={(e) => setSelectedProduct({ ...selectedProduct, status: e.target.value })} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                    {statusOptions.filter((s) => s !== 'Any').map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => { setIsEditModalOpen(false); setSelectedProduct(null); }} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800">Cancel</button>
                                <button type="submit" disabled={updateMutation.isPending} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm active:scale-95 duration-200 disabled:opacity-50">
                                    {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== VIEW PRODUCT MODAL ===== */}
            {isViewModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Product Details</h3>
                            <button onClick={() => { setIsViewModalOpen(false); setSelectedProduct(null); }} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                                    <div className={`w-full h-full bg-gradient-to-br ${selectedProduct.gradientFrom || 'from-primary/30'} ${selectedProduct.gradientTo || 'to-primary/50'}`}></div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">{selectedProduct.name}</h4>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${selectedProduct.statusClass || getStatusClass(selectedProduct.status)}`}>
                                        {selectedProduct.status}
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Vendor</p>
                                    <p className="font-semibold">{selectedProduct.vendor || selectedProduct.vendorName}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Category</p>
                                    <p className="font-semibold">{selectedProduct.category}</p>
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button onClick={() => { setIsViewModalOpen(false); setSelectedProduct(null); }} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductModeration;
