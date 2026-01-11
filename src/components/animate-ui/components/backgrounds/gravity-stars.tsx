import { useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GravityStarsBackgroundProps {
    className?: string;
    children?: ReactNode;
}

interface Star {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
}

export const GravityStarsBackground = ({
    className,
    children,
}: GravityStarsBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const starsRef = useRef<Star[]>([]);
    const isRunningRef = useRef(false);

    const initStars = useCallback((width: number, height: number) => {
        const isMobile = window.innerWidth < 768;
        const starCount = isMobile ? 50 : 100;
        
        starsRef.current = [];
        for (let i = 0; i < starCount; i++) {
            starsRef.current.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: Math.random() * 0.5 + 0.1,
                radius: Math.random() * 1.5,
                alpha: Math.random(),
            });
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // Prevent double animation in StrictMode
        if (isRunningRef.current) return;
        isRunningRef.current = true;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars(canvas.width, canvas.height);
        };

        const drawStars = () => {
            if (!isRunningRef.current) return;
            
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "white";

            starsRef.current.forEach((star) => {
                ctx.globalAlpha = star.alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                star.x += star.vx;
                star.y += star.vy;

                // Reset if out of bounds
                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                }
                if (star.x > width) {
                    star.x = 0;
                } else if (star.x < 0) {
                    star.x = width;
                }
            });
            
            ctx.globalAlpha = 1.0;
            animationRef.current = requestAnimationFrame(drawStars);
        };

        // Initialize with a small delay to ensure DOM is ready
        const initTimer = setTimeout(() => {
            resizeCanvas();
            drawStars();
        }, 50);

        window.addEventListener("resize", resizeCanvas);

        return () => {
            isRunningRef.current = false;
            clearTimeout(initTimer);
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initStars]);

    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ willChange: 'transform' }}
            />
            {children}
        </div>
    );
};
