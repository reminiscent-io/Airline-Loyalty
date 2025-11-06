import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TierCarouselProps {
  children: React.ReactNode[];
  className?: string;
}

export function TierCarousel({ children, className }: TierCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // On large screens, show all cards in a grid
  const gridLayout = (
    <div className={cn(
      "grid gap-6",
      children.length === 3 ? "grid-cols-3" :
      children.length === 4 ? "grid-cols-4" :
      children.length === 5 ? "grid-cols-5" :
      children.length === 6 ? "grid-cols-6" :
      "grid-cols-5",
      className
    )}>
      {children}
    </div>
  );

  // On smaller screens, show carousel
  const carouselLayout = (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {children.map((child, index) => (
            <div 
              key={index} 
              className={cn(
                "flex-[0_0_100%]",
                "sm:flex-[0_0_48%]",
                "md:flex-[0_0_31%]"
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10",
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
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10",
          "bg-background/80 backdrop-blur-sm",
          !canScrollNext && "hidden"
        )}
        onClick={scrollNext}
        disabled={!canScrollNext}
        data-testid="button-carousel-next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots/Indicators */}
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
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
    </div>
  );

  return (
    <>
      {/* Desktop: Show grid layout */}
      <div className="hidden lg:block">
        {gridLayout}
      </div>
      
      {/* Mobile/Tablet: Show carousel */}
      <div className="lg:hidden">
        {carouselLayout}
      </div>
    </>
  );
}