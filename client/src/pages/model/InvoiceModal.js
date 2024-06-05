const InvoiceModal = ({ data, onClose, onConfirm }) => {
    const { formData, product, quotedPrice, conditionNames } = data;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">Confirm Your Order</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Product Information</h3>
                        <div className="flex items-center">
                            <img src={product.imageUrl} alt={product.name} className="w-28 h-28" />
                            <div>{product.name}</div>
                        </div>
                        <div className="mt-2">
                            <h4 className="text-lg font-medium">Conditions</h4>
                            {conditionNames.map((name, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={name}
                                    readOnly
                                    className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                                />
                            ))}
                        </div>
                        <div className="mt-2">
                            <h4 className="text-lg font-medium">Price</h4>
                            <input
                                type="text"
                                value={"$" +quotedPrice}
                                readOnly
                                className="w-1/5 mb-2 p-2 border border-gray-400 rounded-md font-bold"></input>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Contact Information</h3>
                        <div>Name</div>
                        <input
                            type="text"
                            value={formData.customerName}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                        <div>Email</div>
                        <input
                            type="text"
                            value={formData.email}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                        <div>Address</div>
                        <input
                            type="text"
                            value={formData.address}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                        <h3 className="text-lg font-semibold mt-2">Payment Information</h3>
                        <div>Bank Name</div>
                        <input
                            type="text"
                            value={formData.bankName}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                        <div>Account Number</div>
                        <input
                            type="text"
                            value={formData.accountNumber}
                            readOnly
                            className="w-full mb-2 p-2 border border-gray-400 rounded-md"
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;