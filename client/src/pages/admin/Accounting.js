import { useState } from "react";
import { useEffect } from "react";
import statusAPI from './../../api/statusAPI';
import receivedAPI from './../../api/receivedAPI';
import accountingAPI from "../../api/accountingAPI";

const ITEMS_PER_PAGE = 10;

const Accounting = () => {
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

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [highlightedOrder, setHighlightedOrder] = useState(null);

  const fetchData = async () => {
    try {
      const response = await receivedAPI.getACCEPTEDItems("ACCEPTED");
      const items = response.data;
      console.log(items);

      const filteredItems = [];

      for (const item of items) {
        try {
          const transactionResponse = await accountingAPI.checkTransaction(item.receivedItem.quotingItemId);
          const transaction = transactionResponse.data;

          if (transaction.length === 0) {
            const statusResponse = await statusAPI.getStatusById(item.receivedItem.quotingItemId);
            const statusData = statusResponse.data;
            console.log(statusData);

            const internalEvaluatingStatus = statusData.state.find(s => s.status === "INTERNAL_EVALUATING_ACCEPTED");

            filteredItems.push({
              ...statusData,
              internalEvaluatingStatus: internalEvaluatingStatus ? formatDate(internalEvaluatingStatus.time) : null,
            });
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            const statusResponse = await statusAPI.getStatusById(item.receivedItem.quotingItemId);
            const statusData = statusResponse.data;
            console.log(statusData);

            const internalEvaluatingStatus = statusData.state.find(s => s.status === "INTERNAL_EVALUATING_ACCEPTED");

            filteredItems.push({
              ...statusData,
              internalEvaluatingStatus: internalEvaluatingStatus ? formatDate(internalEvaluatingStatus.time) : null,
            });
          } else {
            console.error("Error fetching transaction:", error);
          }
        }
      }

      setData(filteredItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = async (quotingItemId) => {
    try {
      console.log(quotingItemId)
      const response = await accountingAPI.newTransacton(quotingItemId);
      console.log(response.data)
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  return (
    <div class="container px-4 mx-auto mt-4">
      <div class="max-w-lg mx-auto text-center mt-5">
        <h1 class="text-4xl font-bold text-black mb-4">Payment</h1>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border">
          <thead className="sticky top-0 bg-white shadow">
            <tr>
              <th className="py-2 px-4 text-left text-gray-500 border">#</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Order ID</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Product Name</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Customer Name</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Bank Name</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Account Number</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.quotingItemId} className={`border ${highlightedOrder === item.quotingItemId ? 'bg-green-200' : ''}`}>
                <td className="py-2 px-4 border">{startIndex + index + 1}</td>
                <td className="py-2 px-4 border">{item.quotingItem.quotingItemId}</td>
                <td className="py-2 px-4 border">{item.quotingItem.product.name}</td>
                <td className="py-2 px-4 border"> {item.quotingItem.customer.name}</td>
                <td className="py-2 px-4 border">{item.quotingItem.customer.bankName}</td>
                <td className="py-2 px-4 border">{item.quotingItem.customer.accountNumber}</td>
                <td className="py-2 px-4 border">
                  <div className="hover:text-gray-800 transition">
                    <input
                      type="checkbox"
                      id={`ok-${index}`}
                      name={`ok-${index}`}
                      value="matches"
                      onChange={() => handleCheckboxChange(item.quotingItem.quotingItemId)}
                    />
                    <label htmlFor={`ok-${index}`}> Mark as paid</label>
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
    </div >
  );
};

export default Accounting;
