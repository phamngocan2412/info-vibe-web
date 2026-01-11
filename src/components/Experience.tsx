import { experiences } from '../data/experience';
import { FaBriefcase } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

export default function Experience() {
    const { t } = useTranslation();
    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-transparent transition-colors duration-300">
            <motion.div
                variants={staggerContainer(0.1, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="container mx-auto px-6"
            >
                <div className="text-center mb-16">
                    <motion.h2 variants={fadeIn("up", "tween", 0.1, 1)} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('experience.title')}</motion.h2>
                    <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></motion.div>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line - only visible on desktop */}
                    <motion.div variants={fadeIn("up", "tween", 0.3, 1)} className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-dark-border hidden md:block"></motion.div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                variants={fadeIn(index % 2 === 0 ? "right" : "left", "tween", 0.2, 1)}
                                className={`flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >

                                {/* Content Side */}
                                <div className="w-full md:w-5/12">
                                    <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-dark-border hover:border-primary/50 transition-colors relative">
                                        {/* Mobile Icon - positioned inside card */}
                                        <div className="md:hidden absolute -top-5 left-6 w-10 h-10 rounded-full bg-white dark:bg-dark-bg border-4 border-primary flex items-center justify-center z-10">
                                            <FaBriefcase className="text-primary text-sm" />
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t(exp.role)}</h3>
                                            <p className="text-primary font-medium mb-1">{t(exp.company)}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">{t(exp.period)}</p>
                                            <div className="text-gray-600 dark:text-dark-muted text-sm leading-relaxed space-y-1">
                                                {(() => {
                                                    const descriptions = t(exp.description, { returnObjects: true });
                                                    if (Array.isArray(descriptions)) {
                                                        return (descriptions as string[]).map((desc, i) => (
                                                            <p key={i} className="flex items-start">
                                                                <span className="mr-2">•</span>
                                                                <span>{desc}</span>
                                                            </p>
                                                        ));
                                                    }
                                                    return <p>{descriptions as unknown as string}</p>;
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Dot - only visible on desktop, centered on timeline */}
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-dark-bg border-4 border-primary items-center justify-center z-10">
                                    <FaBriefcase className="text-primary text-sm" />
                                </div>

                                {/* Empty Space for formatting */}
                                <div className="w-full md:w-5/12 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
