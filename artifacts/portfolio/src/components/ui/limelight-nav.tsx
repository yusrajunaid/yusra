import React, { useState, useRef, useLayoutEffect } from 'react';

type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items = [],
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];

    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-xl bg-card text-foreground border shadow-lg px-2 ${className ?? ''}`}>
      {items.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          ref={el => { navItemRefs.current[index] = el; }}
          className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-5 select-none ${iconContainerClassName ?? ''}`}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
          title={label}
        >
          <span className={`w-5 h-5 flex items-center justify-center transition-opacity duration-100 ease-in-out ${
            activeIndex === index ? 'opacity-100' : 'opacity-40'
          } ${iconClassName || ''}`}>
            {icon}
          </span>
        </a>

      ))}

      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[4px] rounded-full bg-foreground ${
          isReady ? 'transition-[left] duration-300 ease-in-out' : ''
        } ${limelightClassName ?? ''}`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-30%] top-[4px] w-[160%] h-12 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-foreground/20 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};

export type { NavItem, LimelightNavProps };
