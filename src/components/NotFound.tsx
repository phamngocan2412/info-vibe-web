import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 mb-4">
                    404
                </h1>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    Page Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 text-lg">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1"
                >
                    Go Home
                </button>
            </motion.div>
        </div>
    );
}
