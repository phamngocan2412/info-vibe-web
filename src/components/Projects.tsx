import { FaBookOpen, FaStar, FaCodeBranch, FaCircle, FaArrowRight } from 'react-icons/fa';
import type { GitHubRepo } from '../types';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

interface ProjectsProps {
    repos: GitHubRepo[];
    loading: boolean;
}

const getLangColor = (lang: string | null) => {
    // ... existing ...
    const colors: Record<string, string> = {
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'Python': '#3572A5',
        'Dart': '#00B4AB',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'C++': '#f34b7d',
        'Swift': '#ffac45'
    };
    return colors[lang || ''] || '#858585';
};

export default function Projects({ repos, loading }: ProjectsProps) {
    const { t } = useTranslation();
    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-transparent transition-colors duration-300">
            <motion.div
                variants={staggerContainer(0.1, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="container mx-auto px-6"
            >
                <div className="text-center mb-16">
                    <motion.h2 variants={fadeIn("up", "tween", 0.1, 1)} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('projects.title')}</motion.h2>
                    <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></motion.div>
                </div>

                <div id="projects-container" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        </div>
                    ) : !Array.isArray(repos) || repos.length === 0 ? (
                        <p className="text-center col-span-full text-gray-500">{t('projects.no_projects')}</p>
                    ) : (
                        repos.slice(0, 6).map((repo, index) => (
                            <motion.div
                                key={repo.id}
                                variants={fadeIn("up", "tween", index * 0.1, 0.5)}
                                className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-gray-100 dark:bg-dark-bg rounded-lg text-primary">
                                        <FaBookOpen className="text-xl" />
                                    </div>
                                    <div className="flex gap-3 text-gray-400 dark:text-gray-500">
                                        <span className="text-xs flex items-center gap-1"><FaStar className="text-yellow-500" /> {repo.stargazers_count}</span>
                                        <span className="text-xs flex items-center gap-1"><FaCodeBranch /> {repo.forks_count}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{repo.name}</a>
                                </h3>

                                <p className="text-gray-600 dark:text-dark-muted text-sm mb-4 line-clamp-3 flex-grow">
                                    {repo.description || t('projects.no_description')}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-dark-border">
                                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300 flex items-center">
                                        <FaCircle className="text-[10px] mr-1" style={{ color: getLangColor(repo.language) }} /> {repo.language || 'Code'}
                                    </span>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline flex items-center">
                                        {t('projects.view_repo')} <FaArrowRight className="ml-1" />
                                    </a>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>
        </section>
    );
}
