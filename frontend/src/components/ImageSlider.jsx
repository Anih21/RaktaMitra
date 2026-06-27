import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/image-slider.css';

export default function ImageSlider({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const autoplayIntervalRef = useRef(null);

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        if (isAutoplay) {
            autoplayIntervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
        }
        return () => {
            if (autoplayIntervalRef.current) {
                clearInterval(autoplayIntervalRef.current);
            }
        };
    }, [isAutoplay, slides.length]);

    // Navigation functions
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoplay(false);
        setTimeout(() => setIsAutoplay(true), 10000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoplay(false);
        setTimeout(() => setIsAutoplay(true), 10000);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoplay(false);
        setTimeout(() => setIsAutoplay(true), 10000);
    };

    const handleMouseEnter = () => {
        setIsAutoplay(false);
    };

    const handleMouseLeave = () => {
        setIsAutoplay(true);
    };

    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <div
            className="slider-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Horizontal Slider Container */}
            <div className="slider-container">
                <div
                    className="slider-track"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="slider-item">
                            <img
                                src={slide.image}
                                alt={slide.title || `Slide ${index + 1}`}
                                className="slider-image"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    className="slider-nav slider-prev"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    <FaChevronLeft />
                </button>
                <button
                    className="slider-nav slider-next"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Navigation Dots */}
            <div className="slider-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
}
