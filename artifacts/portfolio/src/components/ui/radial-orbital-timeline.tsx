"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => { newPulseEffect[relId] = true; });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (rotationTimer) clearInterval(rotationTimer); };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 160;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusColor = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "bg-foreground text-background border-foreground";
      case "in-progress": return "bg-primary/20 text-primary border-primary";
      case "pending": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div
      className="w-full h-[520px] flex flex-col items-center justify-center overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center node */}
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-foreground/80 to-foreground/40 flex items-center justify-center z-10 border border-border shadow-lg">
            <div className="w-6 h-6 rounded-full bg-background/80" />
          </div>

          {/* Orbit ring */}
          <div className="absolute w-80 h-80 rounded-full border border-border/30" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    border-2 transition-all duration-300 transform shadow-md
                    ${isExpanded
                      ? "bg-foreground text-background border-foreground scale-150"
                      : isRelated
                      ? "bg-muted text-foreground border-primary animate-pulse"
                      : "bg-card text-foreground border-border hover:border-foreground/50"
                    }
                    ${isPulsing ? "animate-pulse" : ""}
                  `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                    absolute top-12 whitespace-nowrap text-xs font-medium tracking-wide
                    transition-all duration-300 -translate-x-1/2 left-1/2
                    ${isExpanded ? "text-foreground scale-110" : "text-muted-foreground"}
                  `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-card/95 backdrop-blur-lg border border-border shadow-xl rounded-xl overflow-hidden z-50">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-border" />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full border font-medium ${getStatusColor(item.status)}`}>
                          {item.status === "completed" ? "Complete" : item.status === "in-progress" ? "In Progress" : "Pending"}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
                      </div>
                      <h4 className="text-sm font-semibold mt-2 mb-1 text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.content}</p>

                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-xs mb-1 text-muted-foreground">
                          <span className="flex items-center gap-1"><Zap size={10} />Energy</span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-foreground rounded-full transition-all duration-500"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center gap-1 mb-2">
                            <Link size={10} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Connected</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <button
                                  key={relatedId}
                                  className="flex items-center gap-1 h-6 px-2 text-xs rounded border border-border bg-muted/50 hover:bg-muted text-foreground/80 hover:text-foreground transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="text-muted-foreground" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
