import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState<string>('');
    const observers = useRef<Map<string, number>>(new Map());
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const currentObservers = observers.current;
        // Clean up old observers when dependency changes
        currentObservers.clear();

        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.target.id) {
                    if (entry.isIntersecting) {
                        // Use visible height (intersectionRect.height) to determine the "most visible" section
                        // This fixes the issue where small sections (high ratio) override large sections (low ratio)
                        const visibleHeight = entry.intersectionRect.height;
                        currentObservers.set(entry.target.id, visibleHeight);
                    } else {
                        currentObservers.delete(entry.target.id);
                    }
                }
            });

            // Find the section with the highest visible height
            let maxHeight = 0;
            let bestCandidate = '';

            currentObservers.forEach((height, id) => {
                if (height > maxHeight) {
                    maxHeight = height;
                    bestCandidate = id;
                }
            });

            if (bestCandidate) {
                setActiveSection(bestCandidate);
            }
        };

        const observer = new IntersectionObserver(callback, {
            rootMargin: '-80px 0px -70% 0px', // check roughly the whole viewport with some buffer
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
            currentObservers.clear();
        };
    }, [sectionIds]);


    useEffect(() => {
        if (activeSection) {
            // Debounce URL updates to avoid performance issues
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                const path = activeSection === 'home' ? '/' : `/${activeSection}`;
                window.history.replaceState(null, '', path);
            }, 300);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [activeSection]);

    return activeSection;
}
