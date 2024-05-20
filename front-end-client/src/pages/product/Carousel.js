import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import quotingAPI from "../../api/quotingAPI";

export default function Carousel({
    autoSlide = true,
    autoSlideInterval = 4000,
}) {
    const [products, setProducts] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const containerRef = useRef(null);
    const slideWidth = 100 / 5; // Assuming 5 slides visible at a time

    const prev = () => {
        const newIndex = startIndex - 1 < 0 ? products.length - 5 : startIndex - 1;
        setStartIndex(newIndex);
    };

    const next = () => {
        const newIndex = startIndex + 1 > products.length - 5 ? 0 : startIndex + 1;
        setStartIndex(newIndex);
    };

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [startIndex]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await quotingAPI.getListProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    return (
        <div className="overflow-hidden relative">
            <div
                ref={containerRef}
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${startIndex * slideWidth}%)` }}
            >
                {products.slice(startIndex, startIndex + 5).map((product, index) => (
                    <div key={index} style={{ width: `${slideWidth}%` }}>
                        <div className="bg-white border-1 border border-gray-200 mb-4">
                            <img src={product.imageUrl} alt={`slide-${startIndex + index}`} className="h-50 p-5" />
                            <div className="p-4">
                                <h3 className="text-lg leading-6 font-bold text-gray-900">{product.name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <Link to={`/sell/product/${product.productId}`} state={{ product }} onClick={() => window.scrollTo(0, 0)} className="text-white flex items-center p-2 transition duration-300 bg-fuchsia-950 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        SELL
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronLeft size={30} />
                </button>
                <button
                    onClick={next}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronRight size={30} />
                </button>
            </div>
        </div>
    );
}
