import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import type { GitHubUser } from '../types';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface AboutProps {
    user: GitHubUser | null;
}

import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

function About({ user }: AboutProps) {
    const { t } = useTranslation();

    return (
        <section id="about" className="py-20 bg-light-card dark:bg-transparent transition-colors duration-300">
            <motion.div
                variants={staggerContainer(0.2, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="container mx-auto px-6"
            >
                <div className="text-center mb-16">
                    <motion.h2 variants={fadeIn("up", "tween", 0.1, 1)} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('about.title')}</motion.h2>
                    <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        variants={fadeIn("right", "tween", 0.2, 1)}
                        className="bg-light-bg dark:bg-dark-card p-8 rounded-3xl shadow-xl dark:shadow-none border border-light-border dark:border-dark-border relative overflow-hidden group h-full"
                    >
                        {/* Decorative bg */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 dark:bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">{t('about.contact_info')}</h3>

                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-light-card dark:bg-dark-bg border border-light-border dark:border-dark-border flex items-center justify-center text-primary text-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-dark-muted uppercase tracking-wider">{t('contact.phone')}</p>
                                    <p className="text-gray-900 dark:text-white font-semibold">+84896467610</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-light-card dark:bg-dark-bg border border-light-border dark:border-dark-border flex items-center justify-center text-primary text-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-dark-muted uppercase tracking-wider">{t('contact.email')}</p>
                                    <p className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base">itisfuture2412@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-light-card dark:bg-dark-bg border border-light-border dark:border-dark-border flex items-center justify-center text-primary text-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-dark-muted uppercase tracking-wider">{t('contact.address')}</p>
                                    <p className="text-gray-900 dark:text-white font-semibold">Quận 10, TP HCM</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeIn("left", "tween", 0.2, 1)}
                        className="bg-light-bg dark:bg-dark-card p-8 rounded-3xl shadow-xl dark:shadow-none border border-light-border dark:border-dark-border relative overflow-hidden group h-full"
                    >
                        {/* Decorative bg */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 dark:bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">{t('about.stats.title')}</h3>
                        <ul className="space-y-4 relative z-10">
                            <li className="flex justify-between border-b border-gray-200 dark:border-dark-border pb-3">
                                <span className="text-gray-500 dark:text-dark-muted">{t('about.stats.repos')}</span>
                                <span className="text-gray-900 dark:text-white font-medium">{user?.public_repos || 0}</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 dark:border-dark-border pb-3">
                                <span className="text-gray-500 dark:text-dark-muted">{t('about.stats.followers')}</span>
                                <span className="text-gray-900 dark:text-white font-medium">{user?.followers || 0}</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-200 dark:border-dark-border pb-3">
                                <span className="text-gray-500 dark:text-dark-muted">{t('about.stats.following')}</span>
                                <span className="text-gray-900 dark:text-white font-medium">{user?.following || 0}</span>
                            </li>
                            <li className="flex justify-between pt-2">
                                <span className="text-gray-500 dark:text-dark-muted">{t('about.stats.status')}</span>
                                <span className="text-secondary font-bold">{t('about.stats.open_for_work')}</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default memo(About, (prevProps, nextProps) => {
    // Only re-render if user stats changed
    return prevProps.user?.public_repos === nextProps.user?.public_repos &&
           prevProps.user?.followers === nextProps.user?.followers &&
           prevProps.user?.following === nextProps.user?.following;
});
