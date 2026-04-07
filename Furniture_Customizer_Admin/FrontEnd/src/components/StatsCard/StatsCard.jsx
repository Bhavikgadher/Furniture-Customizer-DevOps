/**
 * StatsCard Component
 * 
 * Reusable KPI card displaying a metric with:
 * - Colored icon
 * - Percentage change badge
 * - Metric label and value
 * 
 * Props:
 * @param {string} icon - Material Symbols icon name
 * @param {string} iconBg - Tailwind background class for icon container
 * @param {string} iconColor - Tailwind text color class for icon
 * @param {string} label - Metric description
 * @param {string} value - Metric value (formatted)
 * @param {string} change - Percentage change text (e.g., "+12.5%")
 */
const StatsCard = ({ icon, iconBg, iconColor, label, value, change }) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-default">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 ${iconBg} ${iconColor} rounded-lg`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <span className="text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                    {change}
                </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{label}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
    );
};

export default StatsCard;
