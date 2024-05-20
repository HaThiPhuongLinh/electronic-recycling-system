import React, { useState } from "react";
import ReceiptmentModel from "../model/ReceiptmentModel";
import { useEffect } from "react";
import receivedAPI from "../../api/receivedAPI";
import statusAPI from "../../api/statusAIP";

const Receiptment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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
        const statusResponse = await statusAPI.getItemsById(item.quotingItemId);
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


  // const [selectedStatus, setSelectedStatus] = useState("All");

  // const handleStatusChange = (event) => {
  //      setSelectedStatus(event.target.value === "All" ? "All" : event.target.value);
  // };

  // const filteredData = selectedStatus === "All" 
  //   ? data 
  //   : selectedStatus === "Not Checked"
  //       ? data.filter(item => item.action !== "Checked")
  //       : data.filter(item => item.action === selectedStatus);


  return (
    <div class="container px-4 mx-auto mt-4">
      <div class="max-w-lg mx-auto text-center mt-5">
        <h1 class="text-4xl font-bold text-black mb-4">Received Items</h1>
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
            <option value="Checked">Checked</option>
            <option value="Not Checked">Not Checked</option>
          </select>
        </div> */}
      </div>
      <div className="overflow-x-auto mt-6 max-h-96 ">
        <table className="min-w-full bg-white">
          <thead className="sticky top-0 bg-white shadow">
            <tr>
              <th className="py-2 text-left text-gray-500">Order ID</th>
              <th className="py-2 text-left text-gray-500">Product Name</th>
              <th className="py-2 text-left text-gray-500">Initial Date</th>
              <th className="py-2 text-left text-gray-500">Received Date</th>
              <th className="py-2 text-left text-gray-500">Action</th>
              {/* <th className="py-2 text-left text-gray-500">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">{item.quotingItem.quotingItemId}</td>
                <td className="py-2">{item.quotingItem.product.name}</td>
                <td className="py-2">{item.initialTime}</td>
                <td className="py-2">{item.receivedTime}</td>
                <td className="py-2">
                  <button
                    className="bg-green-100 text-green-700 px-2 py-1 rounded"
                    onClick={() => openModal(item)}
                  >
                    Details
                  </button>
                </td>
                {/* <td className="py-2">
                  <button
                    className={`px-2 py-1 rounded ${item.action === "Checked"
                      ? "bg-gray-200 text-gray-600"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {item.action}
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <ReceiptmentModel data={selectedItem} closeModal={closeModal} />}
    </div>
  );
};

export default Receiptment;
