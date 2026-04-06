import { Link } from 'react-router-dom';

/**
 * AuthHeader Component
 *
 * Minimal top navigation bar used on standalone auth pages
 * (Forgot Password, Reset Password, Email Verification, etc.)
 * that don't use the split-screen layout.
 *
 * Displays the FurniCustom logo (SVG) on the left and a Support link on the right.
 */
const AuthHeader = () => {
    return (
        <header className="w-full px-6 py-5 lg:px-20 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
            <Link to="/" className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <div className="size-6 text-primary">
                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path
                            clipRule="evenodd"
                            d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                            fillRule="evenodd"
                        />
                    </svg>
                </div>
                <h1 className="text-xl font-bold tracking-tight">FurniCustom</h1>
            </Link>
            <a
                className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                href="#"
            >
                Support
            </a>
        </header>
    );
};

export default AuthHeader;
