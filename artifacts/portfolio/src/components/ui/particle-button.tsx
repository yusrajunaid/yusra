"use client"

import * as React from "react"
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";

interface ParticleButtonProps extends ButtonProps {
    onSuccess?: () => void;
    successDuration?: number;
}

function SuccessParticles({
    buttonRef,
}: {
    buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return (
        <AnimatePresence>
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="fixed w-1.5 h-1.5 bg-foreground rounded-full pointer-events-none"
                    style={{ left: centerX, top: centerY, zIndex: 9999 }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                        scale: [0, 1, 0],
                        x: [0, (Math.cos((i / 8) * Math.PI * 2)) * (40 + Math.random() * 30)],
                        y: [0, (Math.sin((i / 8) * Math.PI * 2)) * (40 + Math.random() * 30)],
                    }}
                    transition={{
                        duration: 0.7,
                        delay: i * 0.05,
                        ease: "easeOut",
                    }}
                />
            ))}
        </AnimatePresence>
    );
}

function ParticleButton({
    children,
    onClick,
    onSuccess,
    successDuration = 800,
    className,
    ...props
}: ParticleButtonProps) {
    const [showParticles, setShowParticles] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowParticles(true);
        onClick?.(e);
        setTimeout(() => {
            setShowParticles(false);
            onSuccess?.();
        }, successDuration);
    };

    return (
        <>
            {showParticles && <SuccessParticles buttonRef={buttonRef} />}
            <Button
                ref={buttonRef}
                onClick={handleClick}
                className={cn(
                    "relative transition-transform duration-100",
                    showParticles && "scale-95",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        </>
    );
}

export { ParticleButton }
