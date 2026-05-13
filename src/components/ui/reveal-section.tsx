import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/cn";

type RevealSectionProps = ComponentPropsWithoutRef<"section">;

function shouldRenderVisible() {
  if (typeof window === "undefined") {
    return true;
  }

  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    typeof window.IntersectionObserver === "undefined"
  );
}

export function RevealSection({
  className,
  children,
  ...props
}: RevealSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(shouldRenderVisible);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "reveal-section scroll-mt-24 sm:scroll-mt-28",
        isVisible && "is-visible",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
