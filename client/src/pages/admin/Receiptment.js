import React, { useState } from "react";
import ReceiptmentModal from "../modal/ReceiptmentModal";
import { useEffect } from "react";
import receivedAPI from "../../api/receivedAPI";
import statusAPI from "../../api/statusAPI";

const ITEMS_PER_PAGE = 10;

const Receiptment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [highlightedOrder, setHighlightedOrder] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    fetchData();
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const fetchData = async () => {
    try {
      const response = await receivedAPI.getPENDINGItems("PENDING")
      const items = response.data;

      console.log(items)

      const filteredItems = [];
      for (const item of items) {
        const statusResponse = await statusAPI.getStatusById(item.quotingItemId);
        const statusData = statusResponse.data;
        const initialStatus = statusData.state.find(s => s.status === "INITIAL");
        const receivedStatus = statusData.state.find(s => s.status === "RECEIVED");
        const externalEvaluatingStatus = statusData.state.find(s => s.status === "EXTERNAL_EVALUATING");

        filteredItems.push({
          ...statusData,
          initialTime: initialStatus ? formatDate(initialStatus.time) : null,
          receivedTime: receivedStatus ? formatDate(receivedStatus.time) : null,
          externalEvaluatingTime: externalEvaluatingStatus ? formatDate(externalEvaluatingStatus.time) : null,
        });
      }

      setData(filteredItems);
      setFilteredData(filteredItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

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
    <div class="container px-4 mx-auto mt-4">
      <div className="max-w-lg mx-auto text-center mt-5">
        <h1 className="text-4xl font-bold text-black mb-4">External Assessment</h1>
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
              <th className="py-2 px-4 text-left text-gray-500 border">Initial Date</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Received Date</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.quotingItemId} className={`border ${highlightedOrder === item.quotingItemId ? 'bg-green-200' : ''}`}>
                <td className="py-2 px-4 border">{startIndex + index + 1}</td>
                <td className="py-2 px-4 border">{item.quotingItem.quotingItemId}</td>
                <td className="py-2 px-4 border">{item.quotingItem.product.name}</td>
                <td className="py-2 px-4 border">{item.initialTime}</td>
                <td className="py-2 px-4 border">{item.receivedTime}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-green-100 text-green-700 px-2 py-1 rounded"
                    onClick={() => openModal(item)}
                  >
                    Details
                  </button>
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
      {isModalOpen && <ReceiptmentModal data={selectedItem} closeModal={closeModal} />}
    </div>
  );
};

export default Receiptment;
