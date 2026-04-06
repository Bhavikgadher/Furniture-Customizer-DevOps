/**
 * Logo Component
 * 
 * Renders the FurniCustom brand logo with icon and text.
 * Used in auth pages (mobile header and desktop showcase).
 * 
 * @param {string} variant - "light" for white text (on dark backgrounds), "default" for dark text
 */
const Logo = ({ variant = "default" }) => {
    const textColor = variant === "light"
        ? "text-white"
        : "text-slate-900 dark:text-slate-100";

    return (
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white">chair</span>
            </div>
            <span className={`text-2xl font-bold tracking-tight ${textColor}`}>
                FurniCustom
            </span>
        </div>
    );
};

export default Logo;
