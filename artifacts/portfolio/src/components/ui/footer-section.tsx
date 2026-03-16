'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';

interface FooterLinkItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSectionType {
  label: string;
  links: FooterLinkItem[];
}

interface PortfolioFooterProps {
  name: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

export function PortfolioFooter({ name, github, linkedin, email }: PortfolioFooterProps) {
  const footerLinks: FooterSectionType[] = [
    {
      label: 'Navigation',
      links: [
        { title: 'Projects', href: '#projects' },
        { title: 'Skills', href: '#skills' },
        { title: 'Experience', href: '#experience' },
        { title: 'Writing', href: '#writing' },
      ],
    },
    {
      label: 'Social',
      links: [
        ...(github ? [{ title: 'GitHub', href: github, icon: Github }] : []),
        ...(linkedin ? [{ title: 'LinkedIn', href: linkedin, icon: Linkedin }] : []),
        ...(email ? [{ title: 'Email', href: `mailto:${email}`, icon: Mail }] : []),
      ],
    },
  ];

  return (
    <footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,hsl(var(--foreground)/0.05),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/10 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="size-7 text-foreground" />
            <span className="font-display font-semibold text-lg text-foreground">{name}</span>
          </div>
          <p className="text-muted-foreground text-sm mt-4 leading-relaxed max-w-xs">
            Full-Stack Developer passionate about building robust applications and exploring AI/ML.
          </p>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/60">{section.label}</h3>
                <ul className="text-muted-foreground mt-4 space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="hover:text-foreground inline-flex items-center gap-2 transition-colors duration-200 group"
                      >
                        {link.icon && <link.icon className="size-4 opacity-60 group-hover:opacity-100 transition-opacity" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
