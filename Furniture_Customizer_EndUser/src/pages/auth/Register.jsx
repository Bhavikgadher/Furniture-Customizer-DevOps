import { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '../../components/icons/GoogleIcon';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/**
 * Register Page
 *
 * Full-screen registration page with:
 * - Left: Visual showcase panel with hero image, branding, and social proof (hidden on mobile)
 * - Right: Registration form with full name, email, phone, password,
 *          terms checkbox, social signup (Google, Apple), and login link
 *
 * Route: /signup
 */
const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!fullName || !email || !password || !phone) {
            toast.error('Please fill in all required fields.');
            return;
        }

        if (!agreeTerms) {
            toast.error('Please agree to the Terms & Conditions.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await register({
                full_name: fullName,
                email,
                phone,
                password
            });
            
            if (res.success) {
                toast.success('Registration successful! Please login.');
                navigate('/login');
            } else {
                toast.error(res.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Register error:', error);
            toast.error(error.response?.data?.message || 'Server error during registration.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side: Hero Image Section (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/10">
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        role="img"
                        aria-label="High-end minimalist emerald green velvet sofa in a modern sunlit living room"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXH00EGmr8rXmbQFr_K0YC4BSYEo61t00x31LhJqbAfQEmiFZEZ8_bPb8tKZoOVxBYeF0Q8UMVEDwmfUFqHAn6eAdmte27xGc_0LnIrGq1Vdgy0UDITAzjns1OSNdhbl0ceKv2_mjLV21n72n0MJDt5sxH1uAtTxqhRG26qB82xqC_PteuC2WEC6t0D5ZWpw7bW2NN3rMHNUc_VCEISFt5BSqc1knTAHSGW8VUR0L63xripI4QaUeJohUFEogyAGkspJ_zxPJFzTy6')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent" />
                </div>

                {/* Branding/Overlay Content */}
                <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
                    {/* Top: Logo */}
                    <div className="flex items-center gap-2 text-white">
                        <span className="material-symbols-outlined text-4xl">chair</span>
                        <h1 className="text-2xl font-bold tracking-tight">FurniCustom</h1>
                    </div>

                    {/* Bottom: Headline + Social Proof */}
                    <div className="max-w-md">
                        <h2 className="text-white text-5xl font-black leading-tight mb-6">
                            Elevate Your Living Space.
                        </h2>
                        <p className="text-slate-200 text-lg leading-relaxed">
                            Join over 10,000 design enthusiasts who have transformed their homes with our
                            bespoke, handcrafted furniture collections.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <div className="flex -space-x-3 overflow-hidden">
                                <div
                                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-400"
                                    aria-label="User avatar 1"
                                />
                                <div
                                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-500"
                                    aria-label="User avatar 2"
                                />
                                <div
                                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-600"
                                    aria-label="User avatar 3"
                                />
                            </div>
                            <div className="text-white text-sm font-medium self-center">
                                Trusted by designers worldwide
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Registration Form Container */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-24 bg-white dark:bg-background-dark">
                <div className="w-full max-w-md">
                    {/* Mobile Branding */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-10 text-primary">
                        <span className="material-symbols-outlined text-4xl">chair</span>
                        <h2 className="text-2xl font-bold tracking-tight">FurniCustom</h2>
                    </div>

                    {/* Header */}
                    <div className="mb-10 text-center lg:text-left">
                        <h3 className="text-[#0d121b] dark:text-slate-100 text-3xl font-black leading-tight tracking-tight mb-3">
                            Join the World of Custom Craftsmanship
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-base">
                            Create an account to start designing your dream space.
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label
                                className="text-[#0d121b] dark:text-slate-200 text-sm font-semibold"
                                htmlFor="full-name"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                    person
                                </span>
                                <input
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                    id="full-name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label
                                className="text-[#0d121b] dark:text-slate-200 text-sm font-semibold"
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                    mail
                                </span>
                                <input
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                            <label
                                className="text-[#0d121b] dark:text-slate-200 text-sm font-semibold"
                                htmlFor="phone"
                            >
                                Phone Number
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                    call
                                </span>
                                <input
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label
                                className="text-[#0d121b] dark:text-slate-200 text-sm font-semibold"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                                    lock
                                </span>
                                <input
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1">
                                Must be at least 8 characters with one special symbol.
                            </p>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start gap-3 py-2">
                            <div className="flex h-5 items-center">
                                <input
                                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                            </div>
                            <div className="text-sm leading-5">
                                <label className="text-slate-600 dark:text-slate-400" htmlFor="terms">
                                    I agree to the{' '}
                                    <a className="font-semibold text-primary hover:underline" href="#">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a className="font-semibold text-primary hover:underline" href="#">
                                        Privacy Policy
                                    </a>
                                    .
                                </label>
                            </div>
                        </div>

                        {/* Create Account Button */}
                        <button
                            className={`w-full py-4 px-6 ${isLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-white rounded-lg font-bold text-base transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20`}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Social Sign-up Divider */}
                    <div className="relative my-8">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white dark:bg-background-dark px-4 text-slate-500 font-medium">
                                Or register with
                            </span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            type="button"
                        >
                            <GoogleIcon />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Google
                            </span>
                        </button>
                        <button
                            className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            type="button"
                        >
                            <AppleIcon />
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Apple
                            </span>
                        </button>
                    </div>

                    {/* Footer Link */}
                    <div className="mt-10 text-center">
                        <p className="text-slate-500 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-primary font-bold hover:underline transition-all"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
