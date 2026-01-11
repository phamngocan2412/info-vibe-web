import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import type { GitHubUser } from '../types';

import { motion } from 'framer-motion';
import { fadeIn, zoomIn } from '../utils/motion';

import loadingGif from '../assets/load-profile.gif';

interface HeroProps {
    user: GitHubUser | null;
    loading: boolean;
}
export default function Hero({ user, loading }: HeroProps) {
    const { t } = useTranslation();
    const ROLES = t('hero.roles', { returnObjects: true }) as string[];

    const [text, setText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    // Typewriter effect (same as before)
    useEffect(() => {
        const handleType = () => {
            const currentRole = ROLES[roleIndex % ROLES.length];
            if (isDeleting) {
                setText(currentRole.substring(0, text.length - 1));
            } else {
                setText(currentRole.substring(0, text.length + 1));
            }
            if (!isDeleting && text === currentRole) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % ROLES.length);
            }
        };
        const timer = setTimeout(handleType, isDeleting ? 50 : 100);
        return () => clearTimeout(timer);
    }, [text, isDeleting, roleIndex, ROLES]);

    return (
        <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500/30 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500/30 dark:bg-emerald-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center relative z-10">
                <motion.div
                    variants={fadeIn("right", "tween", 0.2, 1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="md:w-1/2 mt-10 md:mt-0 text-center md:text-left"
                >
                    <p className="text-primary font-bold mb-2 tracking-wide uppercase">{t('hero.greeting')}</p>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                        <span className="text-gradient">
                            {loading ? 'Loading...' : (user?.name || user?.login || 'Developer')}
                        </span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-dark-muted mb-6 font-light h-10 flex items-center justify-center md:justify-start gap-1">
                        <span>{text}</span>
                        <span className="animate-pulse text-primary">|</span>
                    </h2>
                    <p className="text-gray-600 dark:text-dark-muted mb-8 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                        {loading ? '...' : (user?.bio || t('hero.default_bio'))}
                    </p>
                    <motion.div
                        variants={fadeIn("up", "tween", 0.4, 1)}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <a href="#contact" className="px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1">
                            {t('hero.contact_me')}
                        </a>
                        {user && (
                            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-white bg-transparent hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all flex items-center justify-center gap-2 hover:-translate-y-1 rounded-full font-bold">
                                <FaGithub /> <span>{t('hero.github_profile')}</span>
                            </a>
                        )}
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={zoomIn(0.2, 1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="md:w-1/2 flex justify-center relative"
                >
                    <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-white dark:border-dark-border shadow-2xl dark:shadow-blue-900/20 overflow-hidden relative z-10 bg-gray-200 dark:bg-dark-card flex items-center justify-center animate-float">
                        {(!imgLoaded || loading) && (
                            <img src={loadingGif} alt="Loading..." className="absolute inset-0 w-full h-full object-cover z-20" />
                        )}
                        {!loading && (
                            <img
                                src={user?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                                alt="Avatar"
                                className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => setImgLoaded(true)}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
