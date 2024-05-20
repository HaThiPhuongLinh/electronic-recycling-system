import Footer from '../components/layout/Footer';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import quotingAPI from '../api/quotingAPI';

const SellPage = () => {
    const [originalProducts, setOriginalProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProducts = async () => {
            try {
                const response = await quotingAPI.getListProducts();
                setOriginalProducts(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSeriesChange = (e) => {
        const series = e.target.value;
        if (series === 'all') {
            setSelectedSeries([]);
            if (e.target.checked) {
                setProducts(originalProducts);
            }
        } else {
            if (e.target.checked) {
                setSelectedSeries([...selectedSeries, series]);
            } else {
                setSelectedSeries(selectedSeries.filter(item => item !== series));
            }
        }
    };

    const filteredProducts = products.filter((product) => {
        if (selectedSeries.length === 0) return true;
        return selectedSeries.some((series) => product.name.includes(series));
    });

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchButtonClick = () => {
        const searchTerm = searchInput.toLowerCase();
        const filteredProducts = originalProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        setProducts(filteredProducts);
    };

    return (
        <div>
            <div className='max-w-full md:max-w-full xl:max-w-full mt-3'>
                <img src="https://res.cloudinary.com/dwywbuukd/image/upload/v1715009294/new/bg-sell.png" alt="" />
            </div>
            <div class="pt-12 bg-white">
                <div class="container px-4 mx-auto">
                    <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between flex-wrap mb-6">
                        <div>
                            <h1 class="font-heading text-rhino-700 text-2xl font-semibold">Found 420 results for</h1>
                            <p class="text-rhino-300">Summer iPhones</p>
                        </div>
                    </div>
                    <div class="flex -mx-4">
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" class="bg-gray-100 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 w-72 g-blue-500 " placeholder="Search iPhone..." required onChange={handleSearchInputChange} />
                        </div>
                        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick={handleSearchButtonClick}>
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                    <div class="flex flex-wrap -mx-4">
                        <div class="border-t border-gray-200 py-6 w-full md:w-1/3 lg:w-1/4 px-4 mt-5">
                            <div class="flex justify-between items-center flex-wrap gap-4 mb-4">
                                <p class="text-rhino-700 font-semibold">Category</p>
                            </div>
                            <ul class="text-gray-700 flex flex-col gap-2 pb-6 border-b border-gray-200">
                                <li class="hover:text-gray-800 transition duration-200">
                                    <input type="checkbox" id="all" name="all" value="all" onChange={handleSeriesChange} />
                                    <label for="all"> All</label>
                                </li>
                                <li class="hover:text-gray-800 transition duration-200">
                                    <input type="checkbox" id="iphone15" name="iphone15" value="15" onChange={handleSeriesChange} />
                                    <label for="iphone15"> iPhone 15 Series</label>
                                </li>
                                <li class="hover:text-gray-800 transition duration-200">
                                    <input type="checkbox" id="iphone14" name="iphone14" value="14" onChange={handleSeriesChange} />
                                    <label for="iphone14"> iPhone 14 Series</label>
                                </li>
                                <li class="hover:text-gray-800 transition duration-200">
                                    <input type="checkbox" id="iphone13" name="iphone13" value="13" onChange={handleSeriesChange} />
                                    <label for="iphone13"> iPhone 13 Series</label>
                                </li>
                                <li class="hover:text-gray-800 transition duration-200">
                                    <input type="checkbox" id="iphone12" name="iphone12" value="12" onChange={handleSeriesChange} />
                                    <label for="iphone12"> iPhone 12 Series</label>
                                </li>
                                <li class="hover:text-gray-800 transition duration-200">
                                    <input type="checkbox" id="iphone11" name="iphone11" value="11" onChange={handleSeriesChange} />
                                    <label for="iphone11"> iPhone 11 Series</label>
                                </li>
                                <li class="hover:text-gray-800 transition duration-200">
                                    <input type="checkbox" id="iphoneX" name="iphoneX" value="X" onChange={handleSeriesChange} />
                                    <label for="iphoneX"> iPhone X Series</label>
                                </li>
                            </ul>
                        </div>
                        <div className="pb-8 w-full md:w-2/3 lg:w-3/4 px-4">
                            <div className="flex flex-wrap -mx-4">
                                {filteredProducts.map((product) => (
                                    <div key={product.productId} className="w-full xs:w-1/2 lg:w-1/3 px-4">
                                        <Link to={`/sell/product/${product.productId}`}>
                                            <div className="block mb-10 group" >
                                                <div className="w-full h-64 bg-coolGray-100 rounded-xl mb-3 flex items-center justify-center relative flex-1 p-6 border-2 border-transparent group-hover:border-purple-500 transition duration-150">
                                                    <img src={product.imageUrl} className="p-3" alt={product.name} />
                                                </div>
                                                <p className="text-rhino-700">{product.name}</p>
                                                <p className="text-rhino-300">Up to ${product.price}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SellPage;