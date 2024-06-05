import React, { useState, useEffect } from "react";
import quotingAPI from "../../api/quotingAPI";
import ConditionModal from "../modal/ConditionModal";

const Condition = () => {
  const [conditions, setConditions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await quotingAPI.getListConditions();
        setConditions(response.data);
      } catch (error) {
        console.error("Error fetching conditions:", error);
      }
    };

    fetchConditions();
  }, []);

  return (
    <div className="container px-4 mx-auto mt-4">
      <div className="max-w-lg mx-auto text-center mt-5">
        <h1 className="text-4xl font-bold text-black">Conditions</h1>
      </div>
      <div className="flex justify-end">
      <button
        className="bg-green-400 rounded-md px-6 py-2 mt-10"
        onClick={() => openModal({})}
      >
        Add
      </button>
      </div>
      <div className="overflow-x-auto mt-6 max-h-96">
        <table className="min-w-full bg-white">
          <thead className="sticky top-0 bg-white shadow">
            <tr>
              <th className="py-2 px-4 text-left text-gray-500 border">Name</th>
              <th className="py-2 px-4 text-left text-gray-500 border">Type</th>
              <th className="py-2 px-4 text-left text-gray-500 border">
                Percent
              </th>
              <th className="py-2 px-4 pl-20 text-left text-gray-500 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {conditions.map((condition) => (
              <tr key={condition.id} className="border-t">
                <td className="py-2 px-4 border">{condition.name}</td>
                <td className="py-2 px-4 border">{condition.type}</td>
                <td className="py-2 px-4 text-center border">
                  {condition.percentDecrease}%
                </td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-evenly">
                    <button
                      className="bg-yellow-400 rounded-md px-3 py-2"
                      onClick={() => openModal(condition)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
      {isModalOpen && (
        <ConditionModal data={selectedItem} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Condition;