import React, { useState, useEffect } from "react";
import quotingAPI from "../../api/quotingAPI";
import statusAPI from "../../api/statusAPI";
import receivedAPI from '../../api/receivedAPI';

const ITEMS_PER_PAGE = 10;

const Reception = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [highlightedOrder, setHighlightedOrder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await quotingAPI.getAllOrders();
                const items = response.data;

                const filteredItems = [];
                for (const item of items) {
                    const statusResponse = await statusAPI.getStatusById(item.quotingItemId);
                    const statusData = statusResponse.data.state;

                    if (statusData.length === 1 && statusData[0].status === "INITIAL") {
                        filteredItems.push(item);
                    }
                }

                setData(filteredItems);
                setFilteredData(filteredItems);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = async (quotingItemId) => {
        try {
            const response = await receivedAPI.receivedItem(quotingItemId);
            console.log("Update status response:", response.data);

            const newData = data.filter(item => item.quotingItemId !== quotingItemId);
            setData(newData);
            setFilteredData(newData);
        } catch (error) {
            console.error("Error updating item status:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            const orderId = event.target.value;
            const itemIndex = data.findIndex(item => item.quotingItemId === orderId);

            if (itemIndex !== -1) {
                const pageNumber = Math.floor(itemIndex / ITEMS_PER_PAGE) + 1;
                setCurrentPage(pageNumber);
                setHighlightedOrder(orderId);

                setTimeout(() => {
                    setHighlightedOrder(null);
                }, 4000);
            } else {
                alert("Order ID not found");
            }
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    return (
        <div className="container px-4 mx-auto mt-4">
            <div className="max-w-lg mx-auto text-center mt-5">
                <h1 className="text-4xl font-bold text-black mb-4">Order Reception</h1>
            </div>
            <div className="flex mt-6">
                <div className="flex items-center space-x-2">
                    <label htmlFor="orderId" className="block text-gray-700 mr-4">
                        Order ID:
                    </label>
                    <input
                        type="text"
                        id="orderId"
                        className="mt-1 block w-[320px] border-gray-500 shadow-sm "
                        onKeyPress={handleSearch}
                    />
                </div>
            </div>
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border">
                    <thead className="sticky top-0 bg-white shadow">
                        <tr>
                            <th className="py-2 px-4 text-left text-gray-500 border">#</th>
                            <th className="py-2 px-4 text-left text-gray-500 border">Order ID</th>
                            <th className="py-2 px-4 text-left text-gray-500 border">Product Name</th>
                            <th className="py-2 px-4 text-left text-gray-500 border">Series</th>
                            <th className="py-2 px-4 text-center text-gray-500 border">Percent Status</th>
                            <th className="py-2 px-4 text-left text-gray-500 border">Initial Date</th>
                            <th className="py-2 px-4 text-left text-gray-500 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={item.quotingItemId} className={`border ${highlightedOrder === item.quotingItemId ? 'bg-green-200' : ''}`}>
                                <td className="py-2 px-4 border">{startIndex + index + 1}</td>
                                <td className="py-2 px-4 border">{item.quotingItemId}</td>
                                <td className="py-2 px-4 border">{item.product.name}</td>
                                <td className="py-2 px-4 text-center border">{item.product.series}</td>
                                <td className="py-2 px-4 text-center border">{item.percentStatus}%</td>
                                <td className="py-2 px-4 border">{item.date.split(' ')[0]}</td>
                                <td className="py-2 px-4 border">
                                    <div className="hover:text-gray-800 transition">
                                        {item.status === "Received" ? (
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={`ok-${item.quotingItemId}`}
                                                    name={`ok-${item.quotingItemId}`}
                                                    value="matches"
                                                    checked
                                                    disabled
                                                />
                                                <label htmlFor={`ok-${item.quotingItemId}`}> Received</label>
                                            </div>
                                        ) : (
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={`ok-${item.quotingItemId}`}
                                                    name={`ok-${item.quotingItemId}`}
                                                    value="matches"
                                                    onChange={() => handleCheckboxChange(item.quotingItemId)}
                                                />
                                                <label htmlFor={`ok-${item.quotingItemId}`}> Received</label>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-8 bg-gray-100 py-2">
                <nav aria-label="Page navigation">
                    <ul className="flex list-style-none">
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`relative block py-2 px-3 leading-tight rounded-md text-gray-800 hover:bg-gray-200 mr-1 ${currentPage === 1 && 'cursor-not-allowed'}`}
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages).keys()].map((page) => (
                            <li key={page}>
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    className={`rounded-full relative block py-2 px-3 leading-tight ${currentPage === page + 1 ? 'bg-green-500 text-white' : 'bg-white text-gray-600'} hover:bg-gray-200 mr-1`}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`relative block py-2 px-3 leading-tight rounded-md text-gray-800 hover:bg-gray-200 ${currentPage === totalPages && 'cursor-not-allowed'}`}
                            >
                                Next page
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Reception;
