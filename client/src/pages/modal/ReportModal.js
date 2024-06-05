import React, { useState } from 'react';

const ReportModal = ({ data, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentItem = data[currentIndex];
    const { product, conditions, customer, price } = currentItem;

    const handleNext = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">Order Information</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Product Information</h3>
                        <div className="flex items-center">
                            <img src={product.imageUrl} alt={product.name} className="w-28 h-28" />
                            <div className="ml-4">{product.name}</div>
                        </div>
                        <div className="mt-2">
                            <h4 className="text-lg font-medium">Conditions</h4>
                            {conditions.map((condition, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={condition.name}
                                    readOnly
                                    className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                                />
                            ))}
                        </div>
                        <div className="mt-2">
                            <h4 className="text-lg font-medium">Price</h4>
                            <input
                                type="text"
                                value={"$" + price}
                                readOnly
                                className="w-1/5 mb-2 p-2 border border-gray-400 rounded-md font-bold"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Contact Information</h3>
                        <div>Name</div>
                        <input
                            type="text"
                            value={customer.name}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                        <div>Email</div>
                        <input
                            type="text"
                            value={customer.email}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                        <div>Address</div>
                        <input
                            type="text"
                            value={customer.address}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                        <h3 className="text-lg font-semibold mt-2">Payment Information</h3>
                        <div>Bank Name</div>
                        <input
                            type="text"
                            value={customer.bankName}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                        <div>Account Number</div>
                        <input
                            type="text"
                            value={customer.accountNumber}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="bg-gray-300 px-4 py-2 rounded-md"
                    >
                        Previous
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === data.length - 1}
                        className="bg-gray-300 px-4 py-2 rounded-md"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
