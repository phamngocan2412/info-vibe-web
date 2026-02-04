import { useAuth } from '@/context/AuthContext';
import Login from './Login';
import { FaSpinner } from 'react-icons/fa';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedEmail?: string;
}

export default function ProtectedRoute({ children, allowedEmail }: ProtectedRouteProps) {
    const { session, loading, user } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <FaSpinner className="animate-spin text-4xl text-primary" />
            </div>
        );
    }

    if (!session || !user) {
        return <Login />;
    }

    // Optional: Check for specific email
    if (allowedEmail && user.email !== allowedEmail) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-2">Access Denied</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Your account ({user.email}) is not authorized to access this page.
                </p>
                <button
                    onClick={() => import('@/lib/supabase').then(m => m.supabase.auth.signOut())}
                    className="mt-4 text-primary hover:underline"
                >
                    Sign out
                </button>
            </div>
        );
    }

    return <>{children}</>;
}
