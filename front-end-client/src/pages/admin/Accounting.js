import { useState } from "react";
import { useEffect } from "react";
import statusAPI from './../../api/statusAIP';
import receivedAPI from './../../api/receivedAPI';
import accountingAPI from "../../api/accountingAPI";

const Accounting = () => {
  // const [dataNew, setNewData] = useState(data);
  // const [selectedStatus, setSelectedStatus] = useState("All");

  // const handleStatusChange = (event) => {
  //   setSelectedStatus(event.target.value === "All" ? "All" : event.target.value);
  // };

  // const filteredData = selectedStatus === "All" ? data : data.filter(item => item.status === selectedStatus);

  // const handleCheckboxChange = (index) => {
  //   const dataNew = [...data];
  //   dataNew[index].status = "Paid";
  //   setNewData(dataNew);
  // };
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

  const fetchData = async () => {
    try {
      const response = await receivedAPI.getACCEPTEDItems("ACCEPTED");
      const items = response.data;
      console.log(items);

      const filteredItems = [];

      for (const item of items) {
        const transactionResponse = await accountingAPI.checkTransaction(item.receivedItem.quotingItemId);
        const transactions = transactionResponse.data;

        if (transactions.length === 0) {  // Check if there are no transactions
          const statusResponse = await statusAPI.getItemsById(item.receivedItem.quotingItemId);
          const statusData = statusResponse.data;
          console.log(statusData);

          const internalEvaluatingStatus = statusData.state.find(s => s.status === "INTERNAL_EVALUATING_ACCEPTED");

          filteredItems.push({
            ...statusData,
            internalEvaluatingStatus: internalEvaluatingStatus ? formatDate(internalEvaluatingStatus.time) : null,
          });
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
        fetchData(); // Reload data after successful post
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div class="container px-4 mx-auto mt-4">
      <div class="max-w-lg mx-auto text-center mt-5">
        <h1 class="text-4xl font-bold text-black mb-4">Payment</h1>
      </div>
      {/* <div className="flex ml-40 mt-6">
        <div className="flex items-center space-x-2">
          <label htmlFor="status" className="block text-gray-700 mr-4">
            Status:
          </label>
          <select
            id="status"
            className="px-6 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={selectedStatus !== "All" ? selectedStatus : ""}
            onChange={handleStatusChange}
          >
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Not Paid">Not Paid</option>
          </select>
        </div>
      </div> */}
      <div className="overflow-x-auto mt-6 max-h-96 ">
        <table className="min-w-full bg-white">
          <thead className="sticky top-0 bg-white shadow">
            <tr>
              <th className="py-2 text-left text-gray-500">Order ID</th>
              <th className="py-2 text-left text-gray-500">Product Name</th>
              <th className="py-2 text-left text-gray-500">Customer Name</th>
              <th className="py-2 text-left text-gray-500">Bank Name</th>
              <th className="py-2 text-left text-gray-500">Account Number</th>
              {/* <th className="py-2 text-left text-gray-500">Status</th> */}
              <th className="py-2 text-left text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.quotingItem.quotingItemId} className="border-t">
                <td className="py-2">{item.quotingItem.quotingItemId}</td>
                <td className="py-2">{item.quotingItem.product.name}</td>
                <td className="py-2"> {item.quotingItem.customer.name}</td>
                <td className="py-2">{item.quotingItem.customer.bankName}</td>
                <td className="py-2">{item.quotingItem.customer.accountNumber}</td>
                {/* <td className="py-2">
                  <button
                    className={`bg-green-100 text-green-700 px-2 py-1 rounded ${item.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {item.status}
                  </button>
                </td> */}
                {/* <td className="py-2">
                  <div className="hover:text-gray-800 transition">
                    <input type="checkbox" id={`ok-${index}`} name={`ok-${index}`} value="matches" />
                    <label htmlFor={`ok-${index}`}> Payment successful</label>
                  </div>
                </td> */}
                <td className="py-2">
                  <div className="hover:text-gray-800 transition">
                    <input
                      type="checkbox"
                      id={`ok-${index}`}
                      name={`ok-${index}`}
                      value="matches"
                      onChange={() => handleCheckboxChange(item.quotingItem.quotingItemId)}
                    // disabled={item.status === "Paid"}
                    // checked={item.status === "Paid"}
                    // onChange={() => handleCheckboxChange(index)}
                    />
                    {/* <label htmlFor={`ok-${index}`}> {item.status === "Paid" ? "Already Paid" : "Mark as paid"}</label> */}
                    <label htmlFor={`ok-${index}`}> Mark as paid</label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default Accounting;
