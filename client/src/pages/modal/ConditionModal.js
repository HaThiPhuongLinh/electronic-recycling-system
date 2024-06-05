import { useState } from "react";
import receivedAPI from "../../api/receivedAPI";
import quotingAPI from "../../api/quotingAPI";

const ConditionModal = ({ closeModal, data }) => {
  const [condition, setCondition] = useState(data);
  const isUpdate = data.conditionId;

  const handleUpdate = async () => {
    const res = await quotingAPI.updateCondition(condition);
    closeModal();
  };

  const handleAdd = async () => {
    if (!condition.name || !condition.type || !condition.percentDecrease) {
      alert("Input info");
    }
    const res = await quotingAPI.addCondition(condition);
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="overflow-x-auto bg-white  w-[520px] h-430px] ">
        {/* header */}
        <div className="sticky top-0 pt-4 px-7 flex justify-between items-center bg-green-800 bg-opacity-80">
          <h2 className="text-2xl font-bold mb-4 text-white  z-1">Condition</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="w-6 h-6 -mt-4 cursor-pointer fill-white"
            onClick={closeModal}
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
        {/* content */}
        <div className="px-10 items-center">
          <div className="grid grid-cols-1 gap-4 mt-5 ">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                value={condition.name}
                onChange={(e) =>
                  setCondition({ ...condition, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Type</label>
              <select
                onChange={(e) =>
                  setCondition({ ...condition, type: e.target.value })
                }
                value={condition.type}
                className="w-[70%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="OVERALL">OVERALL</option>
                <option value="SCREEN">SCREEN</option>
                <option value="BATTERY">BATTERY</option>
                <option value="FUNCTIONAL">FUNCTIONAL</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Percent
              </label>
              <input
                type="number"
                value={condition.percentDecrease}
                onChange={(e) =>
                  setCondition({
                    ...condition,
                    percentDecrease: e.target.value,
                  })
                }
                className="w-[20%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>
        </div>
        <div className="px-10 pb-4 ">
          {isUpdate ? (
            <button
              onClick={handleUpdate}
              className="bg-green-700 hover:bg-green-500 text-white px-8 py-2 rounded mt-4"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-green-700 hover:bg-green-500 text-white px-8 py-2 rounded mt-4"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConditionModal;