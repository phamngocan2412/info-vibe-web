import type { Variants } from 'framer-motion';

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', type: string, delay: number, duration: number): Variants => ({
    hidden: {
        x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
        y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
        opacity: 0,
    },
    show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: type as any,
            delay,
            duration,
            ease: 'easeOut',
        },
    },
});

export const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => ({
    hidden: {},
    show: {
        transition: {
            staggerChildren: staggerChildren || 0.1,
            delayChildren: delayChildren || 0,
        },
    },
});

export const zoomIn = (delay: number, duration: number): Variants => ({
    hidden: {
        scale: 0,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'tween',
            delay,
            duration,
            ease: 'easeOut',
        },
    },
});

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', type: string, delay: number, duration: number): Variants => ({
    hidden: {
        x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
        y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
    },
    show: {
        x: 0,
        y: 0,
        transition: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: type as any,
            delay,
            duration,
            ease: 'easeOut',
        },
    },
});
