import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderPDF from '../modal/OrderPDF';

const Shipment = () => {
    const location = useLocation();
    const orderData = location.state.orderData;

    // Generate the filename using the last 4 digits of the order ID
    const orderID = orderData.quotingItemId.toString();
    const filename = `${orderID.slice(-4)}.pdf`;

    return (
        <div>
            <div className="mt-10">
                <div className="relative pb-3 text-center">
                    <h2 className="text-9xl xl:text-7xl leading-normal font-heading font-medium text-center">Thanks for your order</h2>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-screen border-opacity-5"></div>
                </div>
                <div className="sm:flex sm:justify-center sm:items-center p-8 xl:p-10 border-opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30"
                        height="30"
                        viewBox="0 0 48 48">
                        <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                        <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                    </svg>
                    <h3 className="sm:ml-2 text-lg md:text-xl font-heading font-medium text-center md:text-left">Order completed successfully!</h3>
                </div>
            </div>

            <div className="container mx-auto p-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="p-8 md:p-10">
                            <div className="mb-6">
                                <span className="text-gray-700">Order ID (use this ID to check status):</span>
                                <span className="text-gray-700 font-medium ml-2">{orderData.quotingItemId}</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-gray-700">Customer Name:</span>
                                <span className="text-gray-700 font-medium ml-2">{orderData.customer.name}</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-gray-700">Product Name:</span>
                                <span className="text-gray-700 font-medium ml-2">{orderData.product.name}</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-gray-700">Series:</span>
                                <span className="text-gray-700 font-medium ml-2">{orderData.product.series}</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-gray-700">Offer Price:</span>
                                <span className="text-gray-700 font-medium ml-2">${orderData.product.price}</span>
                            </div>
                            <div>
                                <span className="text-gray-700">Date:</span>
                                <span className="text-gray-700 font-medium ml-2">{orderData.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <PDFDownloadLink
                    document={<OrderPDF orderData={orderData} />}
                    fileName={filename}
                    className="mt-3 flex justify-center text-base font-bold text-red-600 hover:red-blue-700 underline"
                >
                    {({ blob, url, loading, error }) =>
                        loading ? 'Generating PDF...' : 'Download your order summary here please!'  
                    }
                </PDFDownloadLink>
                {/* <Link to="/"
                    className="mt-3 flex justify-center text-base font-bold text-blue-600 hover:text-blue-700 underline"
                >
                    Go back to Homepage
                </Link> */}
            </div>
        </div>
    );
};

export default Shipment;
