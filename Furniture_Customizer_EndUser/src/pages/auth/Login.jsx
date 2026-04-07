import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthShowcase from '../../components/common/AuthShowcase';
import Logo from '../../components/common/Logo';
import GoogleIcon from '../../components/icons/GoogleIcon';
import FacebookIcon from '../../components/icons/FacebookIcon';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

/**
 * Login Page
 * 
 * Full-screen login page with:
 * - Left: Visual showcase panel (hidden on mobile)
 * - Right: Login form with email/phone + password, remember me,
 *          social login (Google, Facebook), and signup link
 * 
 * Route: /login
 */
const Login = () => {
    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!identity || !password) {
            toast.error('Please enter your email and password.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await login(identity, password);
            if (res.success) {
                toast.success('Login successful!');
                console.log('Login successful, redirecting to home...');
                const from = location.state?.from?.pathname || '/home';
                navigate(from, { replace: true });
            } else {
                toast.error(res.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Invalid credentials or server error.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex w-full min-h-screen">
            {/* Left Side: Visual Showcase (Hidden on small screens) */}
            <AuthShowcase />

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 bg-white dark:bg-background-dark">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-12">
                        <Logo />
                    </div>

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Please enter your details to sign in to your account.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email/Phone Field */}
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                htmlFor="identity"
                            >
                                Email or Phone Number
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full px-4 py-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    id="identity"
                                    type="text"
                                    placeholder="Enter your email or phone"
                                    value={identity}
                                    onChange={(e) => setIdentity(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label
                                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    className="w-full px-4 py-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="absolute right-4 text-slate-400 hover:text-primary transition-colors"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    className="custom-checkbox h-5 w-5 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm font-semibold text-primary hover:underline underline-offset-4"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Sign In Button */}
                        <button
                            className={`w-full ${isLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] focus:ring-4 focus:ring-primary/30`}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>

                        {/* Social Login Separator */}
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                            <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-widest font-semibold">
                                Or continue with
                            </span>
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                                type="button"
                            >
                                <GoogleIcon />
                                Google
                            </button>
                            <button
                                className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                                type="button"
                            >
                                <FacebookIcon />
                                Facebook
                            </button>
                        </div>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-12 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            Don&apos;t have an account?
                            <Link
                                to="/signup"
                                className="text-primary font-bold hover:underline underline-offset-4 ml-1"
                            >
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
