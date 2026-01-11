import { useEffect, useRef } from "react";
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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        const numStars = 100;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: Math.random() * 0.5 + 0.1, // Gravity effect
                    radius: Math.random() * 1.5,
                    alpha: Math.random(),
                });
            }
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";

            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();

                // Update position
                star.x += star.vx;
                star.y += star.vy;

                // Reset if out of bounds
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
                if (star.x > canvas.width) {
                    star.x = 0;
                } else if (star.x < 0) {
                    star.x = canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(drawStars);
        };

        resizeCanvas();
        drawStars();

        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            {children}
        </div>
    );
};
