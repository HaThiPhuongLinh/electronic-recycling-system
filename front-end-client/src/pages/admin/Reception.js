import React, { useState, useEffect } from "react";
import quotingAPI from "../../api/quotingAPI";
import statusAPI from "../../api/statusAIP";
import receivedAPI from '../../api/receivedAPI';

const Reception = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    // const [selectedStatus, setSelectedStatus] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all quote items
                const response = await quotingAPI.getAllOrders();
                const items = response.data;

                // Filter items by status "INITIAL"
                const filteredItems = [];
                for (const item of items) {
                    const statusResponse = await statusAPI.getItemsById(item.quotingItemId);
                    const statusData = statusResponse.data.state;

                    // Check if the state array contains only one element and that element's status is "INITIAL"
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

    // const handleStatusChange = (event) => {
    //     const status = event.target.value;
    //     setSelectedStatus(status);
    //     if (status === "All") {
    //         setFilteredData(data);
    //     } else {
    //         setFilteredData(data.filter(item => item.status === status));
    //     }
    // };

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

    return (
        <div className="container px-4 mx-auto mt-4">
            <div className="max-w-lg mx-auto text-center mt-5">
                <h1 className="text-4xl font-bold text-black mb-4">Order Reception</h1>
            </div>
            <div className="flex justify-around mt-6">
                <div className="flex items-center space-x-2">
                    <label htmlFor="date" className="block text-gray-700 mr-4">
                        Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                {/* <div className="flex items-center space-x-2">
                    <label htmlFor="status" className="block text-gray-700 mr-4">
                        Status:
                    </label>
                    <select
                        id="status"
                        value={selectedStatus !== "All" ? selectedStatus : ""}
                        onChange={handleStatusChange}
                        className="px-6 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="All">All</option>
                        <option value="Sending">Initial</option>
                        <option value="Received">Received</option>
                    </select>
                </div> */}
            </div>
            <div className="overflow-x-auto mt-6 max-h-96 ">
                <table className="min-w-full bg-white">
                    <thead className="sticky top-0 bg-white shadow">
                        <tr>
                            <th className="py-2 text-left text-gray-500">Order ID</th>
                            <th className="py-2 text-left text-gray-500">Product Name</th>
                            <th className="py-2 text-left text-gray-500">Series</th>
                            <th className="py-2 text-left text-gray-500 text-center">Percent Status</th>
                            <th className="py-2 text-left text-gray-500">Initial Date</th>
                            <th className="py-2 text-left text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={item.quotingItemId} className="border-t">
                                <td className="py-2">{item.quotingItemId}</td>
                                <td className="py-2">{item.product.name}</td>
                                <td className="py-2 text-center">{item.product.series}</td>
                                <td className="py-2 text-center">{item.percentStatus}%</td>
                                <td className="py-2">{item.date.split(' ')[0]}</td>
                                <td className="py-2">
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
        </div>
    );
}

export default Reception;
