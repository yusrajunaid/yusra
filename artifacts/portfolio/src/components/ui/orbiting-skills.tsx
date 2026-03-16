"use client"
import React, { useEffect, useState, memo } from 'react';

type IconType = 'html' | 'css' | 'javascript' | 'react' | 'node' | 'tailwind' | 'python' | 'typescript' | 'postgresql';
type GlowColor = 'cyan' | 'purple' | 'amber';

interface SkillIconProps { type: IconType; }
interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}
interface OrbitingSkillProps { config: SkillConfig; angle: number; }
interface GlowingOrbitPathProps { radius: number; glowColor?: GlowColor; animationDelay?: number; }

const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  typescript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" rx="2" fill="#3178C6"/>
        <path d="M13.57 15.847v1.85c.3.154.657.27 1.07.347.414.077.854.115 1.32.115.453 0 .883-.044 1.29-.131.406-.088.763-.232 1.072-.433.308-.2.553-.464.733-.79.18-.325.27-.722.27-1.19 0-.344-.05-.643-.15-.897a2.08 2.08 0 0 0-.437-.688 3.07 3.07 0 0 0-.7-.527 8.154 8.154 0 0 0-.937-.44 9.037 9.037 0 0 1-.617-.27 1.813 1.813 0 0 1-.407-.257.93.93 0 0 1-.23-.31.965.965 0 0 1-.073-.393c0-.138.027-.263.08-.376a.797.797 0 0 1 .227-.29c.098-.08.217-.14.357-.183a1.62 1.62 0 0 1 .473-.063c.126 0 .26.01.4.033.14.022.277.058.41.108.133.05.26.115.38.196.12.08.228.175.323.285v-1.7a3.81 3.81 0 0 0-.88-.232 6.42 6.42 0 0 0-1.1-.087c-.44 0-.858.05-1.253.15a3.08 3.08 0 0 0-1.037.463 2.22 2.22 0 0 0-.703.793c-.17.318-.256.694-.256 1.127 0 .56.158 1.04.474 1.437.316.396.8.72 1.45.97.24.096.463.19.667.283.205.092.382.19.53.293.148.103.263.22.347.35a.85.85 0 0 1 .126.47.97.97 0 0 1-.073.387.78.78 0 0 1-.224.3 1.06 1.06 0 0 1-.377.194 1.86 1.86 0 0 1-.527.07c-.342 0-.683-.063-1.023-.19a3.37 3.37 0 0 1-.923-.55zm-3.58-3.82H12V10.5H8v1.527h1.99V19h2V12.027z" fill="white"/>
      </svg>
    ),
    color: '#3178C6'
  },
  python: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.4 3.35-3.4h5.77s3.24.052 3.24-3.13V3.19S18.28 0 11.914 0zm-3.2 1.838a1.043 1.043 0 1 1 0 2.086 1.043 1.043 0 0 1 0-2.086z" fill="#366A96"/>
        <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.4-3.35 3.4h-5.77s-3.24-.052-3.24 3.13V20.81S5.72 24 12.086 24zm3.2-1.838a1.043 1.043 0 1 1 0-2.086 1.043 1.043 0 0 1 0 2.086z" fill="#FFC331"/>
      </svg>
    ),
    color: '#FFC331'
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247z" fill="#339933"/>
      </svg>
    ),
    color: '#339933'
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  postgresql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.212 0c-.796-.004-1.559.124-2.197.4-1.386.594-2.315 1.594-2.62 3.198-.268 1.406.046 2.93.828 4.296-.5.14-.986.32-1.435.548-1.24.624-2.046 1.588-2.35 2.96-.36 1.635.2 3.516 1.56 5.07-.296.24-.57.504-.814.8-.986 1.218-1.388 2.656-1.1 3.964.284 1.3 1.15 2.35 2.486 3.04 1.04.534 2.26.8 3.584.8.93 0 1.9-.132 2.84-.408 1.028-.3 1.95-.778 2.674-1.432.196.07.402.13.614.19 1.134.31 2.37.354 3.476.102 1.316-.303 2.3-1.04 2.82-2.11.534-1.098.596-2.51.14-3.97.27-.458.466-.98.546-1.554.1-.742-.042-1.49-.414-2.124-.372-.636-.936-1.116-1.65-1.37-.17-.062-.35-.11-.53-.148.134-.702.17-1.386.1-2.02-.12-1.068-.506-2.006-1.18-2.82-.602-.72-1.378-1.264-2.29-1.604-.834-.314-1.77-.444-2.69-.38-.032-.11-.066-.218-.102-.32A4.01 4.01 0 0 0 16.8.946 3.56 3.56 0 0 0 15.004.19a4.39 4.39 0 0 0-1.792-.19zm.04.81c.532-.006 1.078.062 1.588.2.756.198 1.352.588 1.734 1.13.318.46.482 1.024.52 1.652-.498.258-1.008.65-1.518 1.248a10.97 10.97 0 0 0-.884 1.288c-.26-.426-.544-.834-.85-1.2-.674-.8-1.448-1.354-2.29-1.662a6.38 6.38 0 0 0-.6-.18c.214-1.146.824-1.984 1.788-2.396.496-.208 1.032-.28 1.512-.28z" fill="#336791"/>
      </svg>
    ),
    color: '#336791'
  },
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  }
};

const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

const skillsConfig: SkillConfig[] = [
  { id: 'react', orbitRadius: 110, size: 44, speed: 0.7, iconType: 'react', phaseShift: 0, glowColor: 'cyan', label: 'React' },
  { id: 'typescript', orbitRadius: 110, size: 40, speed: 0.7, iconType: 'typescript', phaseShift: (2 * Math.PI) / 3, glowColor: 'cyan', label: 'TypeScript' },
  { id: 'python', orbitRadius: 110, size: 40, speed: 0.7, iconType: 'python', phaseShift: (4 * Math.PI) / 3, glowColor: 'cyan', label: 'Python' },
  { id: 'node', orbitRadius: 190, size: 44, speed: -0.5, iconType: 'node', phaseShift: 0, glowColor: 'purple', label: 'Node.js' },
  { id: 'tailwind', orbitRadius: 190, size: 40, speed: -0.5, iconType: 'tailwind', phaseShift: (2 * Math.PI) / 3, glowColor: 'purple', label: 'Tailwind CSS' },
  { id: 'postgresql', orbitRadius: 190, size: 40, speed: -0.5, iconType: 'postgresql', phaseShift: (4 * Math.PI) / 3, glowColor: 'purple', label: 'PostgreSQL' },
];

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;
  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-card border border-border
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer shadow-md
          ${isHovered ? 'scale-125 shadow-xl border-border/80' : ''}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 20px ${iconComponents[iconType]?.color}30, 0 8px 24px rgba(0,0,0,0.15)`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover border border-border rounded text-xs text-foreground whitespace-nowrap pointer-events-none shadow-lg">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: { border: 'rgba(6, 182, 212, 0.2)' },
    purple: { border: 'rgba(147, 51, 234, 0.2)' },
    amber: { border: 'rgba(245, 158, 11, 0.2)' },
  };
  const colors = glowColors[glowColor];

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        border: `1px solid ${colors.border}`,
        animationDelay: `${animationDelay}s`,
      }}
    />
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    let animationFrameId: number;
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 110, glowColor: 'cyan', delay: 0 },
    { radius: 190, glowColor: 'purple', delay: 1.5 }
  ];

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-8">
      <div
        className="relative w-[420px] h-[420px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Central Code Icon */}
        <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center z-10 relative shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>

        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill key={config.id} config={config} angle={angle} />
          );
        })}
      </div>
    </div>
  );
}
