import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState<string>('');
    const observers = useRef<Map<string, number>>(new Map());

    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.target.id) {
                    if (entry.isIntersecting) {
                        observers.current.set(entry.target.id, entry.intersectionRatio);
                    } else {
                        observers.current.delete(entry.target.id);
                    }
                }
            });

            // Find the section with the highest intersection ratio
            let maxRatio = 0;
            let bestCandidate = '';

            observers.current.forEach((ratio, id) => {
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    bestCandidate = id;
                }
            });

            if (bestCandidate) {
                setActiveSection(bestCandidate);
            }
        };

        const observer = new IntersectionObserver(callback, {
            rootMargin: '-10% 0px -10% 0px', // check roughly the whole viewport with some buffer
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Multiple thresholds for granular updates
        });

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
            observers.current.clear();
        };
    }, [sectionIds]);

    useEffect(() => {
        if (activeSection) {
            window.history.replaceState(null, '', `#${activeSection}`);
        }
    }, [activeSection]);

    return activeSection;
}
