import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({ id, title, children, className, containerClassName }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn("py-20 md:py-32 relative overflow-hidden", className)}
    >
      <div className={cn("max-w-6xl mx-auto px-6 sm:px-8 md:px-12", containerClassName)}>
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium text-foreground mb-12 flex items-center gap-4">
              {title}
              <div className="h-px bg-border flex-1 ml-4 hidden sm:block opacity-50" />
            </h2>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
