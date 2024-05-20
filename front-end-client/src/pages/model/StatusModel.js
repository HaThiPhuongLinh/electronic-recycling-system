const StatusModal = ({ closeModal, statusData }) => {

    const overallCondition = statusData.quotingItem.conditions.find(cond => cond.type === "OVERALL");
    const screenCondition = statusData.quotingItem.conditions.find(cond => cond.type === "SCREEN");
    const batteryCondition = statusData.quotingItem.conditions.find(cond => cond.type === "BATTERY");
    const functionalConditions = statusData.quotingItem.conditions.filter(cond => cond.type === "FUNCTIONAL");

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="overflow-x-auto bg-white  w-[900px] h-[700px]">
                {/* header */}
                <div className="sticky top-0 pt-4 px-7 flex justify-between items-center bg-green-800 bg-opacity-80">
                    <h2 className="text-2xl font-bold mb-4 text-black ml-80">Status Of Product</h2>
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
                <div className="px-10 mb-10">
                    <div className="grid grid-cols-2 gap-4 mt-5">
                        <div className="space-y-3">
                            <div>
                                <h1 className="text-xl font-bold text-blue-950 ">OrderID</h1>
                                <label>{statusData.quotingItem.quotingItemId}</label>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-blue-950 ">Product</h1>
                                <label>{statusData.quotingItem.product.name}</label>
                            </div>
                            <div className="flex">
                                <div className="text-xl font-bold text-blue-950 ">Offer price: </div>
                                <h1 className="text-lg font-medium text-blue-950 ml-3">${statusData.quotingItem.product.price}</h1>
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
                        <div className="ml-14">
                            <h1 className="text-xl font-bold text-blue-950">Status</h1>
                            {statusData.state.map((statusEntry, index) => (
                                <div key={index}>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                            <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                                            <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                                        </svg>
                                        <div className="ml-2">
                                            <div>{statusEntry.status}</div>
                                            <div className="text-gray-600 text-sm">{new Date(statusEntry.time).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col ml-[14px] -mt-1">
                                        <div className="w-px h-6 bg-gray-900"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Add other content here */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatusModal;
