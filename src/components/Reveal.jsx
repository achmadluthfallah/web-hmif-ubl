import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initialTransform =
    direction === 'left'
      ? '-translate-x-7'
      : direction === 'right'
      ? 'translate-x-7'
      : direction === 'zoom'
      ? 'scale-95'
      : 'translate-y-7';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : `opacity-0 ${initialTransform}`
      } ${className}`}
    >
      {children}
    </div>
  );
}