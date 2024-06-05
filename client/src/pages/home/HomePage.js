import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import Carousel from './Carousel';
import { useState } from "react";
import StatusModal from '../modal/StatusModal';
import statusAPI from '../../api/statusAPI';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [statusData, setStatusData] = useState({});

    console.log(orderNumber);

    const openModal = async () => {
        if (orderNumber.trim() === '') {
            alert('Please enter an order number.');
        } else {
            try {
                const response = await statusAPI.getStatusById(orderNumber);
                setStatusData(response.data);
                setIsModalOpen(true);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching order status:', error);
                alert('Order not found. Please check the order number and try again.');
            }
        }
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (event) => {
        setOrderNumber(event.target.value);
    };

    return (
        <div>
            <div class=" px-6 py-8 bg-gray-100 mt-8">
                <div class="max-w-xs md:max-w-xl xl:max-w-7xl mx-auto">
                    <div class="flex flex-wrap items-center justify-between -mx-2 -mb-12">
                        <div class="w-full md:w-1/2 xl:w-auto px-2 mb-12">
                            <div class="flex items-center">
                                <span class="inline-flex w-12 h-12 items-center justify-center rounded-full bg-green-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                        <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
                                    </svg>
                                </span>
                                <div class="ml-4">
                                    <h4 class="text-xl font-black mb-1">Certified Refurbished</h4>
                                    <span class="text-base font-sans">Rigorous diagnostic testing <br />on every device we sell.</span>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 xl:w-auto px-2 mb-12">
                            <div class="flex items-center">
                                <span class="inline-flex w-12 h-12 p-2 items-center justify-center rounded-full bg-green-500">
                                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.25 7.84748C10.3141 8.10339 9.75 8.82154 9.75 9.5C9.75 10.1785 10.3141 10.8966 11.25 11.1525V7.84748Z" fill="#9cf7b3"></path> <path d="M12.75 12.8475V16.1525C13.6859 15.8966 14.25 15.1785 14.25 14.5C14.25 13.8215 13.6859 13.1034 12.75 12.8475Z" fill="#9cf7b3"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V6.31673C14.3804 6.60867 15.75 7.83361 15.75 9.5C15.75 9.91421 15.4142 10.25 15 10.25C14.5858 10.25 14.25 9.91421 14.25 9.5C14.25 8.82154 13.6859 8.10339 12.75 7.84748V11.3167C14.3804 11.6087 15.75 12.8336 15.75 14.5C15.75 16.1664 14.3804 17.3913 12.75 17.6833V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.6833C9.61957 17.3913 8.25 16.1664 8.25 14.5C8.25 14.0858 8.58579 13.75 9 13.75C9.41421 13.75 9.75 14.0858 9.75 14.5C9.75 15.1785 10.3141 15.8966 11.25 16.1525V12.6833C9.61957 12.3913 8.25 11.1664 8.25 9.5C8.25 7.83361 9.61957 6.60867 11.25 6.31673V6C11.25 5.58579 11.5858 5.25 12 5.25Z" fill="#9cf7b3"></path> </g></svg>
                                </span>
                                <div class="ml-4">
                                    <h4 class="text-xl font-black mb-1">Higher Offers</h4>
                                    <span class="text-base font-sans">Get more for your device <br /> than other trade in services.</span>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 xl:w-auto px-2 mb-12">
                            <div class="flex items-center">
                                <span class="inline-flex w-12 h-12 items-center justify-center rounded-full bg-green-500">
                                    <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.38989 18.49V8.32998C8.38989 7.92998 8.50989 7.53998 8.72989 7.20998L11.4599 3.14998C11.8899 2.49998 12.9599 2.03998 13.8699 2.37998C14.8499 2.70998 15.4999 3.80997 15.2899 4.78997L14.7699 8.05998C14.7299 8.35998 14.8099 8.62998 14.9799 8.83998C15.1499 9.02998 15.3999 9.14997 15.6699 9.14997H19.7799C20.5699 9.14997 21.2499 9.46997 21.6499 10.03C22.0299 10.57 22.0999 11.27 21.8499 11.98L19.3899 19.47C19.0799 20.71 17.7299 21.72 16.3899 21.72H12.4899C11.8199 21.72 10.8799 21.49 10.4499 21.06L9.16989 20.07C8.67989 19.7 8.38989 19.11 8.38989 18.49Z" fill="#474BC5"></path>
                                        <path d="M5.21 6.37988H4.18C2.63 6.37988 2 6.97988 2 8.45988V18.5199C2 19.9999 2.63 20.5999 4.18 20.5999H5.21C6.76 20.5999 7.39 19.9999 7.39 18.5199V8.45988C7.39 6.97988 6.76 6.37988 5.21 6.37988Z" fill="#474BC5"></path>
                                    </svg>
                                </span>
                                <div class="ml-4">
                                    <h4 class="text-xl font-black mb-1">Customer Satisfaction</h4>
                                    <span class="text-base font-sans">Rigorous diagnostic testing <br />on every device we sell.</span>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 xl:w-auto px-2 mb-12">
                            <div class="flex items-center">
                                <span class="inline-flex w-12 h-12 items-center justify-center rounded-full bg-green-500">
                                    <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6.75C21.5188 6.75 22.75 5.51878 22.75 4C22.75 2.48122 21.5188 1.25 20 1.25C18.4812 1.25 17.25 2.48122 17.25 4C17.25 5.51878 18.4812 6.75 20 6.75Z" fill="#474BC5"></path>
                                        <path d="M19.04 8.15C17.47 7.81 16.19 6.53 15.85 4.96C15.72 4.35 15.71 3.76 15.82 3.2C15.95 2.58 15.49 2 14.85 2H7C4.24 2 2 4.24 2 7V13.95C2 16.71 4.24 18.95 7 18.95H8.5C8.78 18.95 9.14 19.13 9.3 19.35L10.8 21.34C11.46 22.22 12.54 22.22 13.2 21.34L14.7 19.35C14.89 19.1 15.18 18.95 15.5 18.95H17.01C19.77 18.95 22 16.72 22 13.96V9.15C22 8.52 21.42 8.06 20.8 8.18C20.24 8.28 19.65 8.28 19.04 8.15ZM8 12C7.44 12 7 11.55 7 11C7 10.45 7.44 10 8 10C8.55 10 9 10.45 9 11C9 11.55 8.56 12 8 12ZM12 12C11.44 12 11 11.55 11 11C11 10.45 11.44 10 12 10C12.55 10 13 10.45 13 11C13 11.55 12.56 12 12 12ZM16 12C15.44 12 15 11.55 15 11C15 10.45 15.44 10 16 10C16.55 10 17 10.45 17 11C17 11.55 16.56 12 16 12Z" fill="#474BC5"></path>
                                    </svg>
                                </span>
                                <div class="ml-4">
                                    <h4 class="text-xl font-black mb-1">Support</h4>
                                    <span class="text-base font-sans">Rigorous diagnostic testing <br />on every device we sell.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-full border-t border-gray-300 my-8" />
            <div className='text-xl text-center mt-5 font-bold text-blue-950'>Enter your order number below to check the status of your item at any time</div>
            <div class="flex items-center max-w-2xl mx-auto mt-8">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full" >
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                        </svg>
                    </div>
                    <input onChange={handleInputChange} type="text" id="simple-search" class="bg-gray-100 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  g-blue-500 " placeholder="Search order number..." required />
                </div>
                <button onClick={openModal} class="p-2.5 ms-2 text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                </button>
            </div>
            <hr className="w-full border-t border-gray-300 my-8" />
            <div className='text-4xl text-center mt-5 font-bold text-blue-950'>Selling Phones Has Never Been So Easy</div>
            <div className='flex flex-wrap mt-2 rounded-md mx-4 p-10'>
                <div className='mx-auto mt-28 text-center mr-2'>
                    <div className='mb-9 mt-2 text-xl'>Trade your iphones for cash today!</div>
                    <div>
                        <Link to="/sell" class="py-3 px-5 sm:ms-4 text-base font-medium text-white focus:outline-none bg-green-700 rounded-md border border-2 border-green-700 hover:bg-green-800 focus:z-10 focus:ring-4 focus:ring-gray-100">
                            START SELLING
                        </Link>
                    </div>
                </div>
                <div className='mt-5 w-3/5 ml-0'>
                    <img src="https://res.cloudinary.com/dwywbuukd/image/upload/v1715052480/new/iPhone/bg_vxmfwy.png" alt="" /></div>
            </div>
            <div className='text-4xl text-center mt-5 font-bold text-blue-950 mb-5'>What Others Say</div>
            <Carousel />
            <Footer />
            {isModalOpen && <StatusModal closeModal={closeModal} statusData={statusData} />}
        </div >
    );
};

export default HomePage;
