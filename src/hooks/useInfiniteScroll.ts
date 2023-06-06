import { useCallback, useEffect, useRef, RefObject } from 'react';

function useInfiniteScroll(
  onIntersect: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  const handleIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        onIntersect(entry, observer);
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (ref.current) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.6 });
      observer.observe(ref.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref, handleIntersect]);

  return ref;
}

export default useInfiniteScroll;
