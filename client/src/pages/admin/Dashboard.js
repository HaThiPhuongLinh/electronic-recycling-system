import React, { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import accountingAPI from "../../api/accountingAPI";
import quotingAPI from "../../api/quotingAPI";
import ReportModal from "../model/ReportModal";
import statusAPI from "../../api/statusAPI";
import StatusModal from "../model/StatusModal";

const Dashboard = () => {
  const [reportType, setReportType] = useState("revenue");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    series: "",
    startDate: "",
    endDate: "",
    filterBySeries: false,
    filterByDate: false,
    status: "",
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalStatusOpen, setModalStatusOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [highlightedOrder, setHighlightedOrder] = useState(null);
  const tableRef = useRef(null);

  const statusOptions = ["INITIAL", "EXTERNAL_EVALUATING", "INTERNAL_EVALUATING", "RECYCLING", "HAS_BEEN_PAID"];

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const openModalStatus = (order) => {
    setSelectedOrder(order);
    setModalStatusOpen(true);
  };

  const closeModalStatus = () => {
    setModalStatusOpen(false);
  };

  useEffect(() => {
    if (reportType === "orders") {
      fetchOrders();
    } else {
      fetchData();
    }
  }, [reportType]);

  const fetchOrders = async () => {
    try {
      const orderData = await quotingAPI.getAllOrders();
      const orders = orderData.data;
      const ordersWithStatus = await Promise.all(
        orders.map(async (order) => {
          const statusData = await statusAPI.getStatusById(order.quotingItemId);
          return { ...order, status: statusData.data.state[statusData.data.state.length - 1].status, data: statusData.data };
        })
      );

      console.log(ordersWithStatus)
      let filtered = [...ordersWithStatus];
      if (filter.status) {
        filtered = ordersWithStatus.filter((order) => order.status === filter.status);
      }

      setData(filtered);
      console.log(data)
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await accountingAPI.getAllTransactions();
      const transactions = response.data;

      const filteredTransactions = await Promise.all(
        transactions.map(async (transaction) => {
          const quotingItemId = transaction.item.receivedItem.quotingItemId;
          try {
            const itemResponse = await quotingAPI.getOrderById(quotingItemId);
            return {
              ...itemResponse.data,
              transactionTime: transaction.time,
              customer: itemResponse.data.customer,
            };
          } catch (error) {
            console.error(`Error fetching order for quotingItemId ${quotingItemId}:`, error);
            return null;
          }
        })
      );

      const validTransactions = filteredTransactions.filter(item => item !== null);

      let processedData;
      if (reportType === "revenue") {
        processedData = processRevenueData(validTransactions);
      } else if (reportType === "customer") {
        processedData = processCustomerData(validTransactions);
      }

      setData(processedData);
      if (reportType === "revenue") {
        setTotalRevenue(processedData.reduce((total, item) => total + item.totalPrice, 0));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processRevenueData = (transactions) => {
    const revenueData = transactions.reduce((acc, item) => {
      const existingItem = acc.find(i => i.product?.name === item.product?.name);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.price;
        existingItem.averagePrice = existingItem.totalPrice / existingItem.quantity;
      } else {
        acc.push({
          product: item.product,
          quantity: 1,
          totalPrice: item.price,
          averagePrice: item.price,
          series: item.product?.series,
          transactionTime: item.transactionTime,
          orders: transactions.filter(transaction => transaction.product?.name === item.product?.name)
        });
      }
      return acc;
    }, []);

    let filteredData = [...revenueData];

    if (filter.filterBySeries && filter.series !== "") {
      filteredData = revenueData.filter(item => item.series === filter.series);
    }

    if (filter.filterByDate) {
      filteredData = filteredData.filter(item =>
        new Date(item.transactionTime) >= new Date(filter.startDate) &&
        new Date(item.transactionTime) <= new Date(filter.endDate)
      );
    }

    return filteredData;
  };

  const processCustomerData = (transactions) => {
    const customerData = transactions.reduce((acc, item) => {
      const existingCustomer = acc.find(cust => cust.customer?.customerId === item.customer?.customerId);
      if (existingCustomer) {
        existingCustomer.totalValue += item.price;
        existingCustomer.orders.push(item);
      } else {
        acc.push({
          customer: item.customer,
          totalValue: item.price,
          orders: [item]
        });
      }
      return acc;
    }, []);
    console.log("Processed Customer Data:", customerData);
    return customerData;
  };

  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReportChange = (event) => {
    setReportType(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const orderId = event.target.value;
      const itemIndex = data.findIndex(item => item.quotingItemId === orderId);

      if (itemIndex !== -1) {
        setHighlightedOrder(orderId);

        setTimeout(() => {
          setHighlightedOrder(null);
        }, 4000);
        tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        alert("Order ID not found");
      }
    }
  };

  const renderChart = () => {
    if (reportType === "revenue") {
      return (
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product.name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalPrice" fill="#8884d8" />
        </BarChart>
      );
    } else if (reportType === "customer") {
      return (
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="customer.name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalValue" fill="#8884d8" />
        </BarChart>
      );
    } else if (reportType === "orders") {
      const statusCounts = {};
      data.forEach(order => {
        const status = order.status;
        if (statusCounts[status]) {
          statusCounts[status]++;
        } else {
          statusCounts[status] = 1;
        }
      });
      const statusData = Object.keys(statusCounts).map(status => ({ status, count: statusCounts[status] }));

      return (
        <BarChart width={600} height={300} data={statusData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      );
    }
    return null;
  };

  const renderTable = () => {
    if (reportType === "revenue") {
      return (
        <table className="min-w-full bg-white border border-gray-300 mt-6">
          <thead>
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Item</th>
              <th className="py-2 px-4 border">Series</th>
              <th className="py-2 px-4 border">Quantity Sold</th>
              <th className="py-2 px-4 border">Average Price</th>
              <th className="py-2 px-4 border ">Details</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="border">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{item.product?.name}</td>
                <td className="py-2 px-4 border">{item.series}</td>
                <td className="py-2 px-4 border">{item.quantity}</td>
                <td className="py-2 px-4 border">$ {item.averagePrice?.toFixed(2)}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-green-100 text-green-700 px-2 py-1 rounded"
                    onClick={() => openModal(item.orders)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (reportType === "customer") {
      return (
        <table className="min-w-full bg-white border border-gray-300 mt-6">
          <thead>
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Customer Name</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Value Sale</th>
              <th className="py-2 px-4 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="border">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{item.customer?.name || 'N/A'}</td>
                <td className="py-2 px-4 border">{item.customer?.address || 'N/A'}</td>
                <td className="py-2 px-4 border">{item.customer?.email || 'N/A'}</td>
                <td className="py-2 px-4 border">$ {item.totalValue?.toFixed(2)}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-green-100 text-green-700 px-2 py-1 rounded"
                    onClick={() => openModal(item.orders)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (reportType === "orders") {
      return (
        <table ref={tableRef} className="min-w-full bg-white border border-gray-300 mt-6">
          <thead>
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Item</th>
              <th className="py-2 px-4 border">Percent Status</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
               <tr key={item.quotingItemId} className={`border ${highlightedOrder === item.quotingItemId ? 'bg-green-200' : ''}`}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{item.quotingItemId}</td>
                <td className="py-2 px-4 border">{item.product?.name}</td>
                <td className="py-2 px-4 border">{item.percentStatus}%</td>
                <td className="py-2 px-4 border">{item.status}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-green-100 text-green-700 px-2 py-1 rounded"
                    onClick={() => openModalStatus(item.data)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return null;
  };

  return (
    <div className="container px-4 mx-auto mt-4">
      <h1 className="text-4xl text-center font-bold mb-4">Dashboard</h1>
      <div className="bg-green-500 shadow-md rounded-lg p-6 mb-6 w-[300px]">
        <h2 className="text-xl font-semibold">Total Revenue: ${totalRevenue.toFixed(2)}</h2>
      </div>
      <div className="mb-6">
        <label htmlFor="reportType" className="mr-4 font-medium">
          Select Report:
        </label>
        <select
          id="reportType"
          value={reportType}
          onChange={handleReportChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="revenue">Revenue</option>
          <option value="customer">Customers</option>
          <option value="orders">Orders</option>
          {/* <option value="transactions">Transactions</option>
          <option value="evaluation">Evaluation Analysis</option> */}
        </select>
      </div>
      {reportType === "revenue" && (
        <div className="mb-6 flex space-x-10">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="filterBySeries"
              name="filterBySeries"
              checked={filter.filterBySeries}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <label htmlFor="filterBySeries" className="mr-4 font-medium">
              Filter by Series:
            </label>
            <select
              id="series"
              name="series"
              value={filter.series}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded"
              disabled={!filter.filterBySeries}
            >
              <option value="">All</option>
              <option value="X">X</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="filterByDate"
              name="filterByDate"
              checked={filter.filterByDate}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <label htmlFor="filterByDate" className="mr-4 font-medium">
              Filter by Date:
            </label>
            <label htmlFor="startDate" className="mr-2">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded"
              disabled={!filter.filterByDate}
            />
            <label htmlFor="endDate" className="mx-4">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded"
              disabled={!filter.filterByDate}
            />
          </div>
          <button
            onClick={fetchData}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Filter
          </button>
        </div>
      )}
      {reportType === "orders" && (
        <div className="mb-6 flex space-x-10 items-center ">
          <div className="">
            <div className="flex items-center space-x-2">
              <label htmlFor="orderId" className="block text-gray-700 mr-4 font-medium">
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
          {/* Filter by Status */}
          <div className="flex items-center mb-4">
            <label htmlFor="statusFilter" className="mr-4 font-medium">
              Filter by Status:
            </label>
            <select
              id="statusFilter"
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={fetchOrders}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Filter
          </button>
        </div>
      )}

      <div className="mt-6">
        {renderChart()}
        {renderTable()}
      </div>
      {modalOpen && <ReportModal data={selectedOrder} onClose={closeModal} />}
      {isModalStatusOpen && <StatusModal statusData={selectedOrder} closeModal={closeModalStatus} />}
    </div>
  );
};

export default Dashboard;
