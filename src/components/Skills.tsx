import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { fadeIn, staggerContainer, zoomIn } from '../utils/motion';
import type { GitHubRepo } from '../types';
import { SiJavascript, SiTypescript, SiDart, SiCplusplus, SiSwift, SiGo, SiRust, SiKotlin, SiPhp, SiRuby, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiDocker, SiNginx, SiLinux, SiGit, SiHtml5, SiCss3, SiReact } from 'react-icons/si';
import { FaJava, FaPython, FaNodeJs } from 'react-icons/fa';

interface SkillsProps {
    repos: GitHubRepo[];
    loading?: boolean;
}

const getSkillIcon = (lang: string) => {
    const iconProps = { className: "text-lg mr-2" };
    switch (lang.toLowerCase()) {
        case 'javascript': return <SiJavascript {...iconProps} className="text-lg mr-2 text-yellow-400" />;
        case 'typescript': return <SiTypescript {...iconProps} className="text-lg mr-2 text-blue-500" />;
        case 'python': return <FaPython {...iconProps} className="text-lg mr-2 text-blue-400" />;
        case 'dart': return <SiDart {...iconProps} className="text-lg mr-2 text-blue-400" />;
        case 'java': return <FaJava {...iconProps} className="text-lg mr-2 text-red-500" />;
        case 'html': return <SiHtml5 {...iconProps} className="text-lg mr-2 text-orange-500" />;
        case 'css': return <SiCss3 {...iconProps} className="text-lg mr-2 text-blue-500" />;
        case 'c++': return <SiCplusplus {...iconProps} className="text-lg mr-2 text-blue-600" />;
        case 'swift': return <SiSwift {...iconProps} className="text-lg mr-2 text-orange-500" />;
        case 'go': return <SiGo {...iconProps} className="text-lg mr-2 text-cyan-500" />;
        case 'rust': return <SiRust {...iconProps} className="text-lg mr-2 text-orange-600" />;
        case 'kotlin': return <SiKotlin {...iconProps} className="text-lg mr-2 text-purple-500" />;
        case 'php': return <SiPhp {...iconProps} className="text-lg mr-2 text-indigo-500" />;
        case 'ruby': return <SiRuby {...iconProps} className="text-lg mr-2 text-red-600" />;
        case 'mysql': return <SiMysql {...iconProps} className="text-lg mr-2 text-blue-500" />;
        case 'postgresql': return <SiPostgresql {...iconProps} className="text-lg mr-2 text-blue-400" />;
        case 'mongodb': return <SiMongodb {...iconProps} className="text-lg mr-2 text-green-500" />;
        case 'redis': return <SiRedis {...iconProps} className="text-lg mr-2 text-red-500" />;
        case 'docker': return <SiDocker {...iconProps} className="text-lg mr-2 text-blue-500" />;
        case 'nginx': return <SiNginx {...iconProps} className="text-lg mr-2 text-green-600" />;
        case 'linux': return <SiLinux {...iconProps} className="text-lg mr-2" />;
        case 'git': return <SiGit {...iconProps} className="text-lg mr-2 text-orange-500" />;
        case 'react': return <SiReact {...iconProps} className="text-lg mr-2 text-cyan-400" />;
        case 'nodejs': return <FaNodeJs {...iconProps} className="text-lg mr-2 text-green-500" />;
        default: return null;
    }
};

export default function Skills({ repos, loading }: SkillsProps) {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const getSkills = () => {
        const languages: Record<string, number> = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        return Object.keys(languages).sort((a, b) => languages[b] - languages[a]);
    };

    const skills = getSkills();

    return (
        <section ref={sectionRef} id="skills" className="py-20 bg-white dark:bg-transparent transition-colors duration-300">
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
                                        className="px-4 py-2 bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary/50 transition-colors cursor-default flex items-center"
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
