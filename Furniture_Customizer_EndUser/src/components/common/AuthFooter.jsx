/**
 * AuthFooter Component
 *
 * Minimal page footer for standalone auth pages.
 * Displays copyright notice centered at the bottom.
 */
const AuthFooter = () => {
    return (
        <footer className="py-8 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500">
                © 2024 FurniCustom Inc. All rights reserved.
            </p>
        </footer>
    );
};

export default AuthFooter;
