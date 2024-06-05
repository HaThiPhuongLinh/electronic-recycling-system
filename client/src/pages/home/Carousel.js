import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({
    autoSlide = true,
    autoSlideInterval = 4000,
}) {

    let slides = [
        "https://res.cloudinary.com/dwywbuukd/image/upload/v1715005085/new/5_xh6szc.jpg",
        "https://res.cloudinary.com/dwywbuukd/image/upload/v1715005085/new/5_xh6szc.jpg",
        "https://res.cloudinary.com/dwywbuukd/image/upload/v1715005081/new/4_u2jvse.jpg",
        "https://res.cloudinary.com/dwywbuukd/image/upload/v1715005077/new/3_t1puxh.jpg",
        "https://res.cloudinary.com/dwywbuukd/image/upload/v1715005074/new/2_e8lv3m.jpg",
        "https://res.cloudinary.com/dwywbuukd/image/upload/v1715005072/new/1_ngdwnr.jpg"
    ];
    const [startIndex, setStartIndex] = useState(0);
    const containerRef = useRef(null);
    const slideWidth = 100 / 3; // Assuming 3 slides visible at a time

    const prev = () => {
        const newIndex = startIndex - 1 < 0 ? slides.length - 3 : startIndex - 1;
        setStartIndex(newIndex);
    };

    const next = () => {
        const newIndex = startIndex + 1 > slides.length - 3 ? 0 : startIndex + 1;
        setStartIndex(newIndex);
    };

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setTimeout(next, autoSlideInterval);
            return () => clearTimeout(slideInterval);
        }
    }, [startIndex]);

    return (
        <div className="overflow-hidden relative">
            <div
                ref={containerRef}
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${startIndex * slideWidth}%)` }}
            >
                {slides.map((s, index) => (
                    <img key={index} src={s} alt={`slide-${index}`} style={{ width: `${slideWidth}%` }} />
                ))}

            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronLeft size={40} />
                </button>
                <button
                    onClick={next}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronRight size={40} />
                </button>
            </div>
        </div>
    );
}