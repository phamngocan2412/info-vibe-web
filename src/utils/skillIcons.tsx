import { SiJavascript, SiTypescript, SiDart, SiCplusplus, SiSwift, SiGo, SiRust, SiKotlin, SiPhp, SiRuby, SiMysql, SiPostgresql, SiMongodb, SiRedis, SiDocker, SiNginx, SiLinux, SiGit, SiHtml5, SiCss3, SiReact } from 'react-icons/si';
import { FaJava, FaPython, FaNodeJs } from 'react-icons/fa';
import type { JSX } from 'react/jsx-runtime';

interface IconProps {
    className?: string;
}

const defaultIconProps: IconProps = { className: "text-lg mr-2" };

const iconMap: Record<string, JSX.Element> = {
    'javascript': <SiJavascript {...defaultIconProps} className="text-lg mr-2 text-yellow-400" />,
    'typescript': <SiTypescript {...defaultIconProps} className="text-lg mr-2 text-blue-500" />,
    'python': <FaPython {...defaultIconProps} className="text-lg mr-2 text-blue-400" />,
    'dart': <SiDart {...defaultIconProps} className="text-lg mr-2 text-blue-400" />,
    'java': <FaJava {...defaultIconProps} className="text-lg mr-2 text-red-500" />,
    'html': <SiHtml5 {...defaultIconProps} className="text-lg mr-2 text-orange-500" />,
    'css': <SiCss3 {...defaultIconProps} className="text-lg mr-2 text-blue-500" />,
    'c++': <SiCplusplus {...defaultIconProps} className="text-lg mr-2 text-blue-600" />,
    'swift': <SiSwift {...defaultIconProps} className="text-lg mr-2 text-orange-500" />,
    'go': <SiGo {...defaultIconProps} className="text-lg mr-2 text-cyan-500" />,
    'rust': <SiRust {...defaultIconProps} className="text-lg mr-2 text-orange-600" />,
    'kotlin': <SiKotlin {...defaultIconProps} className="text-lg mr-2 text-purple-500" />,
    'php': <SiPhp {...defaultIconProps} className="text-lg mr-2 text-indigo-500" />,
    'ruby': <SiRuby {...defaultIconProps} className="text-lg mr-2 text-red-600" />,
    'mysql': <SiMysql {...defaultIconProps} className="text-lg mr-2 text-blue-500" />,
    'postgresql': <SiPostgresql {...defaultIconProps} className="text-lg mr-2 text-blue-400" />,
    'mongodb': <SiMongodb {...defaultIconProps} className="text-lg mr-2 text-green-500" />,
    'redis': <SiRedis {...defaultIconProps} className="text-lg mr-2 text-red-500" />,
    'docker': <SiDocker {...defaultIconProps} className="text-lg mr-2 text-blue-500" />,
    'nginx': <SiNginx {...defaultIconProps} className="text-lg mr-2 text-green-600" />,
    'linux': <SiLinux {...defaultIconProps} className="text-lg mr-2" />,
    'git': <SiGit {...defaultIconProps} className="text-lg mr-2 text-orange-500" />,
    'react': <SiReact {...defaultIconProps} className="text-lg mr-2 text-cyan-400" />,
    'nodejs': <FaNodeJs {...defaultIconProps} className="text-lg mr-2 text-green-500" />,
};

export const getSkillIcon = (lang: string): JSX.Element | null => {
    if (!lang) return null;
    return iconMap[lang.toLowerCase()] || null;
};
