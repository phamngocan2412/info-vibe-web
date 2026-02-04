import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FloatingShapesBackgroundProps {
    className?: string;
    children?: ReactNode;
}

export const FloatingShapesBackground = ({
    className,
    children,
}: FloatingShapesBackgroundProps) => {
    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            {/* Floating gradient blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top right blob - blue */}
                <div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30 animate-blob will-change-transform"
                    style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
                        transform: 'translate3d(0,0,0)',
                    }}
                />

                {/* Bottom left blob - emerald */}
                <div
                    className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-25 animate-blob will-change-transform"
                    style={{
                        background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%)',
                        animationDelay: '2s',
                        transform: 'translate3d(0,0,0)',
                    }}
                />

                {/* Center blob - purple */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 animate-blob will-change-transform"
                    style={{
                        background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
                        animationDelay: '4s',
                        transform: 'translate3d(0,0,0)',
                    }}
                />

                {/* Small floating circles */}
                <div className="absolute top-20 left-1/4 w-4 h-4 bg-primary/20 rounded-full animate-float" />
                <div className="absolute top-40 right-1/3 w-3 h-3 bg-secondary/25 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/3 right-20 w-2 h-2 bg-violet-400/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
                <div className="absolute bottom-40 right-1/4 w-4 h-4 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />

                {/* Grid pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>
            {children}
        </div>
    );
};
