'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function Carousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    // Placeholder images.
    const slides = [
        '/placeholder1.jpg',
        '/placeholder2.jpg',
        '/placeholder3.jpg',
        '/placeholder4.jpg',
        '/placeholder5.jpg',
    ];

    return (
        <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex">
                    {slides.map((src, index) => (
                        <div className="flex-grow-0 flex-shrink-0 w-full" key={index}>
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-auto object-cover"
                                style={{ height: '500px' }} // Set a fixed height for consistency
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Clickable Area for Previous Slide */}
            <div
                className="group absolute top-0 left-0 h-full w-1/4 flex items-center justify-start cursor-pointer"
                onClick={scrollPrev}
            >
                <div className="p-2 rounded-full bg-white/50 group-hover:bg-white/80 transition-colors ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
            </div>

            {/* Clickable Area for Next Slide */}
            <div
                className="group absolute top-0 right-0 h-full w-1/4 flex items-center justify-end cursor-pointer"
                onClick={scrollNext}
            >
                <div className="p-2 rounded-full bg-white/50 group-hover:bg-white/80 transition-colors mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}