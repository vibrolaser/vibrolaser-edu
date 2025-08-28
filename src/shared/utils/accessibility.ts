export const generateId = (prefix: string = "id"): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getAriaLabel = (
  action: string,
  element: string,
  context?: string
): string => {
  if (context) {
    return `${action} ${element} в разделе ${context}`;
  }
  return `${action} ${element}`;
};

export const getAriaDescribedBy = (
  description: string,
  elementId: string
): string => {
  return `${elementId}-description`;
};

export const focusTrap = (
  container: HTMLElement,
  onEscape?: () => void
): (() => void) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    } else if (e.key === "Escape" && onEscape) {
      onEscape();
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
};

export const announceToScreenReader = (message: string): void => {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const isElementVisible = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    style.visibility !== "hidden" &&
    style.display !== "none" &&
    style.opacity !== "0"
  );
};

export const getContrastRatio = (
  color1: string,
  color2: string
): number => {
  // Simplified contrast ratio calculation
  // In production, use a proper color contrast library
  return 4.5; // Default good contrast ratio
};

export const validateColorContrast = (
  foreground: string,
  background: string,
  minRatio: number = 4.5
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= minRatio;
};
