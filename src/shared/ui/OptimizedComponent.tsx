"use client";
import { ReactNode, memo, useMemo, useCallback } from "react";

interface OptimizedComponentProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  dataTestId?: string;
}

export const OptimizedComponent = memo<OptimizedComponentProps>(({
  children,
  className = "",
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  dataTestId,
}) => {
  const memoizedStyle = useMemo(() => style, [style]);
  
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);
  
  const handleMouseEnter = useCallback(() => {
    onMouseEnter?.();
  }, [onMouseEnter]);
  
  const handleMouseLeave = useCallback(() => {
    onMouseLeave?.();
  }, [onMouseLeave]);

  return (
    <div
      className={className}
      style={memoizedStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
});

OptimizedComponent.displayName = "OptimizedComponent";
