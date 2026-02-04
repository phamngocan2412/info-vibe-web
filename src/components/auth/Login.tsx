import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { FaLock, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function Login() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const ADMIN_EMAIL = 'phamngocanh7679@gmail.com';

    const handleRequestAccess = async () => {
        setStatus('submitting');
        setErrorMessage('');

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: ADMIN_EMAIL,
                options: {
                    // Redirect back to the current page after login
                    emailRedirectTo: window.location.href,
                },
            });

            if (error) throw error;

            setStatus('success');
        } catch (error: any) {
            console.error('Error logging in:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Failed to send access key');
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6 text-green-600 dark:text-green-400">
                    <FaCheckCircle className="text-6xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Access Key Sent</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Please check your inbox ({ADMIN_EMAIL}) for the secure login link.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-primary hover:underline text-sm"
                >
                    Resend Key
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <div className="w-full max-w-md bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border p-8 text-center">
                <div className="mb-8">
                    <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaLock className="text-4xl text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Restricted Access</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        This area is protected. Click below to request an access key sent to the admin email.
                    </p>
                </div>

                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mb-6 text-left">
                        <FaExclamationCircle className="shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <button
                    onClick={handleRequestAccess}
                    disabled={status === 'submitting'}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-lg transition-all ${status === 'submitting'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-primary hover:bg-blue-600 shadow-lg hover:shadow-xl hover:-translate-y-1'
                        }`}
                >
                    {status === 'submitting' ? (
                        <>
                            <FaSpinner className="animate-spin" />
                            <span>Sending Key...</span>
                        </>
                    ) : (
                        <>
                            <span>Request Access Key</span>
                        </>
                    )}
                </button>

                <p className="mt-6 text-xs text-gray-400">
                    Only authorized IP addresses can complete verification.
                </p>
            </div>
        </div>
    );
}
