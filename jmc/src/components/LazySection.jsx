import { useState, useEffect, useRef } from "react";

/**
 * LazySection is a performance-focused component wrapper that uses IntersectionObserver
 * to defer loading of its children until they are close to entering the viewport.
 * 
 * @param {React.ReactNode} children - The lazy-loaded component(s) to render
 * @param {string} height - Minimum height to allocate to prevent layout shifts (CLS) before loading
 * @param {string} rootMargin - Proximity threshold to start loading the component (default: 300px)
 */
export default function LazySection({ children, height = "200px", rootMargin = "300px 0px" }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If the browser doesn't support IntersectionObserver, fallback to immediate render
    if (!window.IntersectionObserver) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [rootMargin]);

  return (
    <div 
      ref={containerRef} 
      style={{ minHeight: isIntersecting ? "auto" : height }}
      className="lazy-section-wrapper"
    >
      {isIntersecting ? children : null}
    </div>
  );
}
