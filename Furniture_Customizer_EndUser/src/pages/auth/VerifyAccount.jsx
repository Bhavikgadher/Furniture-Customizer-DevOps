import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const OTP_LENGTH = 6;
const RESEND_TIMER_SECONDS = 59;

/**
 * VerifyAccount Page
 *
 * OTP verification page with:
 * - Centered card layout with logo above
 * - 6-digit OTP input with auto-advance and backspace navigation
 * - Countdown timer for resend code
 * - Back to login link
 *
 * Route: /verify-account
 */
const VerifyAccount = () => {
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [timer, setTimer] = useState(RESEND_TIMER_SECONDS);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    // Countdown timer
    useEffect(() => {
        if (timer <= 0) {
            setCanResend(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formatTimer = (seconds) => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const handleChange = useCallback((index, value) => {
        // Only allow single digit
        const digit = value.slice(-1);
        if (digit && !/^\d$/.test(digit)) return;

        setOtp((prev) => {
            const next = [...prev];
            next[index] = digit;
            return next;
        });

        // Auto-advance to next input
        if (digit && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }, []);

    const handleKeyDown = useCallback((index, e) => {
        // On backspace, if current field is empty, focus previous
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }, [otp]);

    const handlePaste = useCallback((e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (!/^\d+$/.test(pastedData)) return;

        const digits = pastedData.slice(0, OTP_LENGTH).split('');
        setOtp((prev) => {
            const next = [...prev];
            digits.forEach((d, i) => {
                next[i] = d;
            });
            return next;
        });

        // Focus the input after the last pasted digit
        const focusIndex = Math.min(digits.length, OTP_LENGTH - 1);
        inputRefs.current[focusIndex]?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = otp.join('');
        // TODO: Integrate with verification API
        console.log('Verification submitted:', code);
    };

    const handleResend = () => {
        if (!canResend) return;
        // TODO: Integrate with resend API
        console.log('Resend code requested');
        setTimer(RESEND_TIMER_SECONDS);
        setCanResend(false);
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
            {/* Main Container */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
                {/* Logo Header */}
                <div className="mb-10 flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
                        <svg
                            className="size-6 text-white"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-black tracking-tight">
                        FurniCustom
                    </h2>
                </div>

                {/* Verification Card */}
                <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-10">
                    {/* Content Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-extrabold mb-3 tracking-tight">
                            Check your email
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            We&apos;ve sent a 6-digit verification code to{' '}
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                user@example.com
                            </span>
                            . Enter the code below to continue.
                        </p>
                    </div>

                    {/* OTP Input Group */}
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="flex justify-between gap-2 sm:gap-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    className="w-full h-14 sm:h-16 text-center text-2xl font-bold rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                    type="number"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98]"
                            type="submit"
                        >
                            Verify Account
                        </button>
                    </form>

                    {/* Resend & Support */}
                    <div className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8 space-y-4">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Didn&apos;t receive the email?
                            </p>
                            <div className="flex items-center gap-4">
                                <button
                                    className={`text-primary font-bold text-sm hover:underline ${!canResend ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    onClick={handleResend}
                                    disabled={!canResend}
                                    type="button"
                                >
                                    Resend Code
                                </button>
                                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
                                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    <span>{formatTimer(timer)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium"
                            >
                                <span className="material-symbols-outlined text-base">arrow_back</span>
                                Back to login
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Help Link */}
                <button
                    className="mt-8 flex items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors text-xs uppercase tracking-widest font-bold"
                    type="button"
                >
                    <span className="material-symbols-outlined text-lg">help_outline</span>
                    Need help?
                </button>
            </div>

            {/* Footer */}
            <footer className="p-6 text-center">
                <p className="text-slate-400 text-xs font-medium">
                    © 2024 FurniCustom. Secure Verification.
                </p>
            </footer>
        </div>
    );
};

export default VerifyAccount;
