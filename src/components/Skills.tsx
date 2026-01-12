import { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { fadeIn, staggerContainer, zoomIn } from '../utils/motion';
import { getSkillIcon } from '../utils/skillIcons';
import type { GitHubRepo } from '../types';

interface SkillsProps {
    repos: GitHubRepo[];
    loading?: boolean;
}

export default function Skills({ repos, loading }: SkillsProps) {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const skills = useMemo(() => {
        if (!repos) return [];
        const languages: Record<string, number> = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        return Object.keys(languages).sort((a, b) => languages[b] - languages[a]);
    }, [repos]);

    return (
        <section ref={sectionRef} id="skills" className="py-20 bg-light-card dark:bg-transparent transition-colors duration-300">
            <motion.div
                variants={staggerContainer(0.1, 0.1)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="container mx-auto px-6"
            >
                <div className="text-center mb-16">
                    <motion.h2 variants={fadeIn("up", "tween", 0.1, 1)} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('skills.title')}</motion.h2>
                    <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></motion.div>
                </div>
                <div className="text-center text-gray-500 dark:text-dark-muted">
                    <p>{t('skills.subtitle')}</p>
                    <div id="dynamic-skills" className="flex flex-wrap justify-center gap-3 mt-6">
                        {loading ? (
                            <p className="animate-pulse">Loading skills...</p>
                        ) : (
                            <>
                                {skills.map((lang, index) => (
                                    <motion.span
                                        key={lang}
                                        variants={zoomIn(index * 0.05, 0.5)}
                                        className="px-4 py-2 bg-light-bg dark:bg-dark-card border border-light-border dark:border-dark-border rounded-full text-sm font-medium text-light-text dark:text-gray-300 hover:border-primary/50 transition-colors cursor-default flex items-center"
                                    >
                                        {getSkillIcon(lang)}
                                        {lang}
                                    </motion.span>
                                ))}
                                {skills.length === 0 && <p className="italic">{t('skills.no_skills_data')}</p>}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
