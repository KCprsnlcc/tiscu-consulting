// Utility functions for page transition management

export interface TransitionOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  reducedMotion?: boolean;
}

export const DEFAULT_TRANSITION_CONFIG: TransitionOptions = {
  duration: 0.9,
  delay: 0.5,
  easing: "cubic-bezier(0.76, 0, 0.24, 1)",
  reducedMotion: false,
};

// Check if user prefers reduced motion
export function checkReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Disable page interactions during transition
export function disablePageInteractions(): void {
  document.body.style.pointerEvents = "none";
  document.body.style.cursor = "wait";
  document.body.classList.add("disable-hover");
}

// Re-enable page interactions after transition
export function enablePageInteractions(): void {
  document.body.style.pointerEvents = "";
  document.body.style.cursor = "";
  document.body.classList.remove("disable-hover");
}

// Get transition CSS properties
export function getTransitionStyles(options: TransitionOptions = {}): React.CSSProperties {
  const config = { ...DEFAULT_TRANSITION_CONFIG, ...options };
  
  return {
    transition: config.reducedMotion 
      ? "none" 
      : `transform ${(config.duration || 0)}s ${(config.easing || "ease")} ${(config.delay || 0)}s`,
    willChange: "transform",
    backfaceVisibility: "hidden" as const,
    perspective: "1000px",
  };
}

// Trigger page transition animation
export function triggerPageTransition(
  element: HTMLElement,
  direction: "in" | "out" = "out",
  options: TransitionOptions = {}
): Promise<void> {
  return new Promise((resolve) => {
    const config = { ...DEFAULT_TRANSITION_CONFIG, ...options };
    
    if (config.reducedMotion) {
      resolve();
      return;
    }

    const translateX = direction === "out" ? "100%" : "0%";
    
    // Apply initial transform
    element.style.transform = `translateX(${direction === "out" ? "0%" : "100%"})`;
    
    // Force reflow
    element.offsetHeight;
    
    // Apply transition and final transform
    Object.assign(element.style, getTransitionStyles(config));
    element.style.transform = `translateX(${translateX})`;
    
    // Listen for transition completion
    const handleTransitionEnd = () => {
      element.removeEventListener("transitionend", handleTransitionEnd);
      resolve();
    };
    
    element.addEventListener("transitionend", handleTransitionEnd);
    
    // Fallback timeout in case transition event doesn't fire
    setTimeout(() => {
      element.removeEventListener("transitionend", handleTransitionEnd);
      resolve();
    }, ((config.duration || 0) + (config.delay || 0) + 0.1) * 1000);
  });
}

// Add keyboard navigation support for transitions
export function handleTransitionKeyboard(event: KeyboardEvent): void {
  // Allow ESC key to cancel transitions
  if (event.key === "Escape") {
    enablePageInteractions();
  }
}

// Initialize keyboard listeners for transitions
export function initTransitionKeyboardListeners(): void {
  if (typeof window === "undefined") return;
  
  window.addEventListener("keydown", handleTransitionKeyboard);
}

// Cleanup keyboard listeners
export function cleanupTransitionKeyboardListeners(): void {
  if (typeof window === "undefined") return;
  
  window.removeEventListener("keydown", handleTransitionKeyboard);
}
