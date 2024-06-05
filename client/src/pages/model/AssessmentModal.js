import ImageUpload from "../../utils/ImageUpload";
import VideoUpload from "../../utils/VideoUpload";
import receivedAPI from "../../api/receivedAPI";
import { useState, useEffect } from "react";
import accountingAPI from "../../api/accountingAPI";

const ReceiptmentModal = ({ closeModal, data }) => {
  const overallCondition = data.quotingItem.conditions.find(cond => cond.type === "OVERALL");
  const screenCondition = data.quotingItem.conditions.find(cond => cond.type === "SCREEN");
  const batteryCondition = data.quotingItem.conditions.find(cond => cond.type === "BATTERY");
  const functionalConditions = data.quotingItem.conditions.filter(cond => cond.type === "FUNCTIONAL");
  const [note, setNote] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [imageFiles, setImageFiles] = useState([null, null, null]);
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [accessories, setAccessories] = useState([]);
  const [showAccessories, setShowAccessories] = useState(false);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await accountingAPI.getAccessories();
        setAccessories(response.data);
      } catch (error) {
        console.error('Error fetching accessories:', error);
      }
    };

    fetchAccessories();
  }, []);

  const handleCheckboxChange = (accessoryId) => {
    const updatedAccessories = accessories.map(accessory => {
      if (accessory.id === accessoryId) {
        return { ...accessory, selected: !accessory.selected };
      }
      return accessory;
    });
    setAccessories(updatedAccessories);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setShowAccessories(option === 'Recycle');
  };

  const handleSubmit = async () => {
    if (!imageFiles.every(file => file) || !videoFile || !note.trim()) {
      setError('Please upload all images and a video, and provide a note before updating.');
      return;
    }

    if (selectedOption === 'Recycle' && !accessories.some(accessory => accessory.selected)) {
      setError('Please select accessories for recycling.');
      return;
    }
  
    try {
      const payload = {
        quotingItemId: data.quotingItem.quotingItemId,
        note: note,
        accepted: accepted
      };

      const files = [...imageFiles, videoFile].filter(file => file !== null);
      const payloadString = JSON.stringify(payload);
      await receivedAPI.updateAssessedItem(payloadString, files);

      if (selectedOption === 'Recycle') {
        const claimedAccessoryIds = accessories.filter(accessory => accessory.selected).map(accessory => accessory.id);

        const recyclingPayload = {
          quotingItemId: data.quotingItem.quotingItemId,
          claimedAccessoryIds: claimedAccessoryIds,
          note: note
        };

        const response = await accountingAPI.newRecyclingItem(recyclingPayload);
        console.log(response.data);
      } else if (selectedOption === 'Resell') {
        const response = await accountingAPI.newResellItem(data.quotingItem.quotingItemId);
        console.log(response.data);
      }

      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="overflow-x-auto bg-white  w-[789px] h-[720px] ">
        {/* header */}
        <div className="sticky top-0 pt-4 px-7 flex justify-between items-center bg-green-800 bg-opacity-80">
          <h2 className="text-2xl font-bold mb-4 text-black ml-80">Details</h2>
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
        <div className="px-10">
          <div className="grid grid-cols-1 gap-4 mt-5 ">
            <div>
              <h1 className="text-xl font-bold text-blue-950 ">OrderID</h1>
              <label>{data.quotingItem.quotingItemId}</label>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-950 ">Product</h1>
              <label>{data.quotingItem.product.name}</label>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Overall cosmetic condition
              </label>
              <input
                type="text"
                value={overallCondition ? overallCondition.name : 'N/A'}
                readOnly
                className="w-[70%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Screen
              </label>
              <input
                type="text"
                value={screenCondition ? screenCondition.name : 'N/A'}
                readOnly
                className="w-[70%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Battery
              </label>
              <input
                type="text"
                value={batteryCondition ? batteryCondition.name : 'N/A'}
                readOnly
                className="w-[60%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Functional condition
              </label>
              {functionalConditions.map((condition, index) => (
                <input
                  key={index}
                  type="text"
                  value={condition.name}
                  readOnly
                  className="w-[90%] px-3 py-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              ))}
            </div>
          </div>
          {/* Received */}
          <div>
            <h1 className="text-xl font-bold text-blue-950">Received</h1>
            <div className="flex justify-between mt-4">
              <div className="w-32 h-32 flex justify-center items-center border-dashed border-2 relative">
                <ImageUpload onFileChange={(file) => setImageFiles(prev => [file, prev[1], prev[2]])} />
              </div>
              <div className="w-32 h-32 flex justify-center items-center border-dashed border-2 relative">
                <ImageUpload onFileChange={(file) => setImageFiles(prev => [prev[0], file, prev[2]])} />
              </div>
              <div className="w-32 h-32 flex justify-center items-center border-dashed border-2 relative">
                <ImageUpload onFileChange={(file) => setImageFiles(prev => [prev[0], prev[1], file])} />
              </div>
              <div className="w-32 h-32 flex justify-center items-center border-dashed border-2 relative">
                <VideoUpload onFileChange={(file) => setVideoFile(file)} />
              </div>
            </div>
          </div>
          <div class="hover:text-gray-800 transition duration-200 mt-5">
            <input type="checkbox" id="ok" name="ok" value="matches" onChange={(e) => setAccepted(e.target.checked)} />
            <label for="ok"> Product's condition matches the customer's description</label>
          </div>
          {/* Note */}
          <div className="mb-2 mt-3">
            <label htmlFor="note" className="block text-gray-700 font-bold mb-2">
              Note:
            </label>
            <div className="relative">
              <textarea
                id="note"
                rows="3"
                placeholder="Value"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-2">
            <h1 className="text-xl font-bold text-blue-950">Options</h1>
            <div className="flex items-center mt-3">
              <input
                type="radio"
                id="resell"
                name="option"
                value="Resell"
                checked={selectedOption === 'Resell'}
                onChange={() => handleOptionChange('Resell')}
              />
              <label htmlFor="resell" className="ml-2 mr-6">Resell</label>
              <input
                type="radio"
                id="recycle"
                name="option"
                value="Recycle"
                checked={selectedOption === 'Recycle'}
                onChange={() => handleOptionChange('Recycle')}
              />
              <label htmlFor="recycle" className="ml-2">Recycle</label>
            </div>
          </div>
          {/* Accessory checkboxes */}
          {showAccessories && (
            <div className="mt-5">
              <h1 className="text-lg font-bold text-blue-950">Accessory</h1>
              <div className="grid grid-cols-5 gap-2 mt-3">
                {accessories.map(accessory => (
                  <div key={accessory.id}>
                    <input
                      type="checkbox"
                      id={`accessory-${accessory.id}`}
                      name={`accessory-${accessory.id}`}
                      checked={accessory.selected}
                      onChange={() => handleCheckboxChange(accessory.id)}
                    />
                    <label className="ml-1" htmlFor={`accessory-${accessory.id}`}>{accessory.name} </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {error && <p className="text-red-600">{error}</p>}
        </div>
        <div className="px-10 pb-4 flex justify-center">
          <button onClick={handleSubmit} className="bg-green-700 hover:bg-green-500 text-white px-20 py-2 rounded mt-4">
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptmentModal;
