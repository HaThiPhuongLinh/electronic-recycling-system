import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import quotingAPI from '../../api/quotingAPI';

const Checkout = () => {
    const params = useParams();
    const location = useLocation();
    const quotedPrice = location.state.quotedPrice;
    const selectedConditions = location.state.selectedConditions;
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        address: '',
        bankName: '',
        accountNumber: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        const requestData = {
            customerName: formData.customerName,
            email: formData.email,
            address: formData.address,
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            productId: params.productId,
            conditionIds: selectedConditions,
        };

        console.log('Request data:', requestData);

        try {
            const response = await quotingAPI.createOrder(requestData);
            console.log('Order placed successfully:', response.data);
            navigate(`/sell/product/${product.id}/checkout/shipment`, {
                state: {
                    orderData: response.data
                }
            });
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await quotingAPI.getProductById(params.productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [params.productId]);

    return (
        <div className="py-16 px-4">
            <div className="max-w-xl lg:max-w-7xl mx-auto">
                <form onSubmit={handleCheckout}>
                    <h3 className="text-5xl font-bold mb-6 text-center">CHECK OUT</h3>
                    <h3 className="text-3xl font-bold mb-6">Contact</h3>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-2/3 px-4 mb-12 lg:mb-0">
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2" htmlFor="customerName">Name</label>
                                <input
                                    required
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    className="w-full h-12 py-3 px-4 text-sm placeholder-gray-500 border-2 border-gray-500 rounded-md focus:outline-indigo"
                                    type="text"
                                />
                                {!formData.customerName.match(/^[A-Za-z]+\s[A-Za-z]+$/) && (
                                    <p className="text-red-500 text-sm">Please enter a valid name (Format: Firstname Lastname).</p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2" htmlFor="address">Address</label>
                                <input
                                    required
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full h-12 py-3 px-4 text-sm placeholder-gray-500 border-2 border-gray-500 rounded-md focus:outline-indigo"
                                    type="text"
                                />
                                {!formData.address.match(/[0-9]+\s[A-Za-z0-9\s]+/) && (
                                    <p className="text-red-500 text-sm">Please enter a valid address.</p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2" htmlFor="email">Contact Email Address</label>
                                <input
                                    required
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full h-12 py-3 px-4 text-sm placeholder-gray-500 border-2 border-gray-500 rounded-md focus:outline-indigo"
                                    type="text"
                                />
                                {!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) && (
                                    <p className="text-red-500 text-sm">Please enter a valid email address.</p>
                                )}
                            </div>
                            <div className="mb-6">
                                <h3 className="text-3xl font-bold mb-6">Payment</h3>
                                <div className="mb-4 font-bold text-lg">Bank Name</div>
                                <div className="w-2/3">
                                    <div className="group relative h-12 w-full border-2 border-gray-500 rounded-md overflow-hidden">
                                        <select
                                            required
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleInputChange}
                                            className="w-full h-full px-4 text-sm font-bold appearance-none outline-none"
                                        >
                                            <option value="Asia Commercial Bank">Asia Commercial Bank</option>
                                            <option value="Bank for Foreign Trade of Vietnam">Bank for Foreign Trade of Vietnam</option>
                                            <option value="Vietnam Bank for Industry and Trade">Vietnam Bank for Industry and Trade</option>
                                            <option value="Vietnam Technological And Commercial Joint Stock Bank">Vietnam Technological And Commercial Joint Stock Bank</option>
                                            <option value="Bank for Investment & Development of Vietnam">Bank for Investment & Development of Vietnam</option>
                                        </select>
                                        <span className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 text-black group-hover:text-indigo-500">
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.94667 0.453308H4.79333H1.05333C0.413333 0.453308 0.0933335 1.22664 0.546667 1.67997L4 5.13331C4.55333 5.68664 5.45333 5.68664 6.00667 5.13331L7.32 3.81997L9.46 1.67997C9.90667 1.22664 9.58667 0.453308 8.94667 0.453308Z" fill="currentColor"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-4 mb-6">
                                <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
                                    <label className="block text-sm font-bold mb-2" htmlFor="accountNumber">Account Number</label>
                                    <input
                                        required
                                        name="accountNumber"
                                        value={formData.accountNumber}
                                        onChange={handleInputChange}
                                        className="w-full h-12 py-3 px-4 mb-2 text-sm placeholder-gray-500 border-2 border-gray-500 rounded-md focus:outline-indigo"
                                        type="text"
                                    />
                                    {!formData.accountNumber.match(/^[0-9]{10}$/) && (
                                        <p className="text-red-500 text-sm">Please enter a 10-digit account number.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 px-2">
                            <div className="border-2 border-gray-300 rounded-md shadow">
                                <div className="pt-8 pb-6 px-6 border-b-2 border-gray-300">
                                    <h4 className="font-bold text-2xl mb-3">YOUR ORDER</h4>
                                    <div className="border-2 border-gray-500 bg-white rounded-md">
                                        <div className="relative flex px-5 pt-5 pb-6 items-center justify-between">
                                            <span className="text-lg font-bold">Product</span>
                                            <span className="text-lg font-bold">Subtotal</span>
                                            <hr className="-ml-5 absolute bottom-0 w-full border-t border-gray-300 my-2 mx-auto" />
                                        </div>
                                        <div className="relative flex px-5 pt-5 pb-6 items-center justify-between">
                                            <img className="-ml-2 w-14 h-14 " src={product.imageUrl} alt="" />
                                            <span className="text-sm -ml-28">{product.name}</span>
                                            <span className="text-sm font-black">{quotedPrice}</span>
                                        </div>
                                        <hr className="w-10/12 border-t border-gray-300 my-2 mx-auto" />
                                        <div className="flex px-5 py-5 items-center justify-between">
                                            <span className="text-lg font-bold">Total</span>
                                            <span className="text-lg font-black text-green-600">${quotedPrice}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!formData.customerName || !formData.email || !formData.address || !formData.bankName || !formData.accountNumber}
                                    className="p-3 flex h-full w-full items-center justify-center bg-green-600 bg-opacity-40 hover:bg-green-500 border-2 border-black rounded-md text-sm font-black text-black"
                                >
                                    Place order
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkout;