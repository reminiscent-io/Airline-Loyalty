import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, GripHorizontal } from "lucide-react";

interface TierCarouselProps {
  children: React.ReactNode[];
  className?: string;
}

export function TierCarousel({ children, className }: TierCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
    dragFree: true,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("pointerDown", () => setIsDragging(true));
    emblaApi.on("pointerUp", () => setIsDragging(false));

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("pointerDown", () => setIsDragging(true));
      emblaApi.off("pointerUp", () => setIsDragging(false));
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Drag indicator for desktop */}
      <div className={cn(
        "hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
        "items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-primary/90 text-primary-foreground text-xs font-medium",
        "pointer-events-none transition-opacity duration-300",
        isDragging ? "opacity-0" : "opacity-100"
      )}>
        <GripHorizontal className="w-4 h-4" />
        <span>Drag to scroll</span>
      </div>

      {/* Carousel Container */}
      <div 
        className={cn(
          "overflow-hidden rounded-lg",
          "lg:overflow-x-auto lg:scrollbar-thin lg:scrollbar-track-gray-100 lg:scrollbar-thumb-gray-300",
          className
        )} 
        ref={emblaRef}
      >
        <div className="flex gap-4">
          {children.map((child, index) => (
            <div 
              key={index} 
              className={cn(
                "flex-[0_0_100%]",
                "sm:flex-[0_0_48%]",
                "md:flex-[0_0_31%]",
                "lg:flex-[0_0_280px]", // Fixed width on desktop for consistent card sizes
                isDragging && "cursor-grabbing"
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Mobile/Tablet only */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "lg:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10",
          "bg-background/80 backdrop-blur-sm",
          !canScrollPrev && "hidden"
        )}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "lg:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10",
          "bg-background/80 backdrop-blur-sm",
          !canScrollNext && "hidden"
        )}
        onClick={scrollNext}
        disabled={!canScrollNext}
        data-testid="button-carousel-next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots/Indicators - Mobile/Tablet only */}
      {scrollSnaps.length > 1 && (
        <div className="lg:hidden flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === selectedIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              data-testid={`button-carousel-dot-${index}`}
            />
          ))}
        </div>
      )}

      {/* Desktop Scroll Indicators */}
      <div className="hidden lg:flex justify-center gap-2 mt-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <ChevronLeft className="w-4 h-4" />
          <span>Scroll or drag to see more tiers</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}