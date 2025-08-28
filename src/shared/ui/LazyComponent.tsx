"use client";
import React, { ReactNode, Suspense, lazy, ComponentType } from "react";

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: ReactNode;
  props?: Record<string, any>;
}

export const LazyComponent = ({
  component,
  fallback = <div>Загрузка...</div>,
  props = {},
}: LazyComponentProps) => {
  const LazyLoadedComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  );
};

interface LazyComponentWithErrorBoundaryProps extends LazyComponentProps {
  errorFallback?: ReactNode;
}

export const LazyComponentWithErrorBoundary = ({
  component,
  fallback,
  errorFallback = <div>Произошла ошибка при загрузке компонента</div>,
  props = {},
}: LazyComponentWithErrorBoundaryProps) => {
  const LazyLoadedComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary fallback={errorFallback}>
        <LazyLoadedComponent {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("LazyComponent error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
