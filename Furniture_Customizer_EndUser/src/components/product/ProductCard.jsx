import { Link } from 'react-router-dom';
import { useState } from 'react';

/**
 * ProductCard Component
 *
 * Reusable product card for furniture listings.
 * Shows product image with hover zoom, favorite toggle, badge,
 * "Customize & Buy" overlay on hover, and product details.
 *
 * Props:
 *   - name: Product name
 *   - description: Short description (style + material)
 *   - price: Display price string (e.g., "From $1,250")
 *   - rating: Numeric rating (e.g., 4.8)
 *   - image: Product image URL
 *   - alt: Image alt text
 *   - badge: Optional badge text (e.g., "New", "Best Seller")
 *   - badgeColor: Badge background color class (default: "bg-primary")
 *   - customizeLabel: Label for customize options (e.g., "12+ Finishes")
 *   - isFavorited: Whether the product is favorited
 */
const ProductCard = ({
    id,
    name,
    description,
    price,
    rating,
    image,
    alt,
    badge = null,
    badgeColor = 'bg-primary',
    customizeLabel = '',
    isFavorited = false,
}) => {
    const [liked, setLiked] = useState(isFavorited);

    return (
        <div className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <Link to={id ? `/product/${id}` : "/products"}>
                    <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={alt}
                        src={image}
                    />
                </Link>
                {/* Favorite Button */}
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
                    className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-full hover:bg-white transition-colors z-10"
                >
                    <span
                        className={`material-symbols-outlined !text-xl ${liked
                            ? 'text-primary filled-icon'
                            : 'text-slate-900 dark:text-white'
                            }`}
                    >
                        favorite
                    </span>
                </button>
                {/* Badge */}
                {badge && (
                    <div
                        className={`absolute top-3 left-3 px-2 py-1 ${badgeColor} text-white text-[10px] font-bold uppercase tracking-widest rounded`}
                    >
                        {badge}
                    </div>
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                    <Link to={id ? `/customizer/${id}` : "/customizer"} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm shadow-lg flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined !text-lg">palette</span>
                        Customize &amp; Buy
                    </Link>
                </div>
            </div>
            <Link to={id ? `/product/${id}` : "/products"} className="p-4 block">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined filled-icon !text-sm text-amber-400">
                            star
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{rating}</span>
                    </div>
                </div>
                <p className="text-xs text-slate-500 mb-3">{description}</p>
                <div className="flex items-center justify-between">
                    <p className="text-lg font-black text-slate-900 dark:text-white">{price}</p>
                    {customizeLabel && (
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">
                            {customizeLabel}
                        </span>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
