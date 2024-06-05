import React from 'react';
import Carousel from './Carousel';
import Footer from '../../components/layout/Footer';

const AboutPage = () => {
    return (
        <div>
            <div class="max-w-6xl px-4 mx-auto mt-14">
                <div class="flex flex-wrap ">
                    <div class="relative w-full lg:w-2/5 mb-8 lg:mb-0 text-center lg:text-left ">
                        <div class="max-w-md mx-auto lg:max-w-base lg:ml-0 mb-6 lg:mb-0">
                            <h2 class="text-3xl md:text-4xl mb-4 font-bold font-heading">Our Story</h2>
                            <p class="text-xs md:text-base text-black leading-loose">TechTradeIn was started by three brothers from Iowa who thought it should be simpler to buy, sell, and repair your devices. Our family-owned business values honesty, excellent service, and fair pricing. This combination ensures our customers always get the best deal possible for all things mobile.</p>
                            <p class="text-xs md:text-base text-black leading-loose mt-8">TechTradeIn allows individuals and businesses to buy and sell electronics on our website. We also have retail locations in Cedar Rapids, IA and Coralville, IA.</p>
                            <p class="text-xs md:text-xl text-black leading-loose mt-6">We look forward to working with you and serving all of your mobile needs.</p>
                            <hr className="w-12 border-t border-gray-300 my-3" />
                            <p class="text-xs md:text-base text-gray-400 leading-loose ">Founders</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-3/5 flex flex-wrap mt-16">
                        <div className="max-w-xl mx-auto rounded-sm">
                            <Carousel />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-3/4 mx-auto border-t border-gray-300 my-8" />
            <div class="max-w-6xl mx-auto">
                <div class="text-center mt-10">
                    <h1 class="font-heading tracking-tight text-2xl sm:text-3xl font-bold text-black mb-4">Why choose us?</h1>
                    <p class="text-lg text-gray-400 mb-10">We are on a mission to make organizing assets a delightful experience.</p>
                </div>
                <div class="flex -mx-4 mb-16 items-center justify-center">
                    <div class="w-full md:w-1/2 px-4">
                        <img class="block w-full h-40 md:h-64 lg:h-96 rounded-xl" src="https://res.cloudinary.com/dwywbuukd/image/upload/v1716474073/new/b1_w8efjj_lzg2mp.png" alt="" />
                    </div>
                    <div class="w-full md:w-1/2 px-4">
                        <img class="block w-full h-40 md:h-64 lg:h-96 rounded-xl" src="https://res.cloudinary.com/dwywbuukd/image/upload/v1716474073/new/b2_gi7s2g_dnqnv3.png" alt="" />
                    </div>
                </div>
                <div class="mb-20 border-b border-white border-opacity-20">
                    <div class="text-center mb-12">
                        <h3 class="font-heading text-4xl font-bold text-black mb-4">Benefits</h3>
                        <p class="text-lg text-gray-800">We help our customers thrive</p>
                    </div>
                    <div class="flex flex-wrap -mx-4 -mb-8">
                        <div class="w-full lg:w-1/2 px-4 mb-8">
                            <div class="p-8 bg-green-900 bg-opacity-10 border-2 border-white border-opacity-20 rounded-xl">
                                <div class="sm:flex">
                                    <div class="flex-shrink-0 flex w-16 h-16 items-center justify-center rounded-full bg-teal-800">
                                        <svg className='p-2' width="64px" height="64px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" stroke-width="1.8719999999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path class="a" d="M22.2,4.86,6.69,11.25V27C6.69,35.44,24,43.5,24,43.5S41.31,35.44,41.31,27V11.25L25.8,4.86A4.68,4.68,0,0,0,22.2,4.86Z"></path><polygon class="a" points="30.45 20.7 24 20.7 24 11.78 17.69 25 24.14 25 24.14 33.92 30.45 20.7"></polygon></g></svg>
                                    </div>
                                    <div class="mt-5 sm:mt-0 sm:ml-8">
                                        <h5 class="text-2xl font-bold text-black mb-4">Security</h5>
                                        <p class="max-w-sm text-gray-900">Your data's security is our top priority. We employ cutting-edge encryption to keep your information safe from unauthorized access</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 px-4 mb-8">
                            <div class="p-8 bg-green-900 bg-opacity-10 border-2 border-white border-opacity-20 rounded-xl">                                <div class="sm:flex">
                                <div class="flex-shrink-0 flex w-16 h-16 items-center justify-center rounded-full bg-teal-800">
                                    <svg className='p-2' width="64px" height="64px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="12" d="M95.958 22C121.031 42.867 149.785 42 158 42c-1.797 118.676-15 95-62.042 128C49 137 35.798 160.676 34 42c8.13 0 36.883.867 61.958-20Z"></path></g></svg>
                                </div>
                                <div class="mt-5 sm:mt-0 sm:ml-8">
                                    <h5 class="text-2xl font-bold text-black mb-4">Trust</h5>
                                    <p class="max-w-sm text-gray-900">Count on us for transparent and reliable service. Our consistent delivery and honest practices have earned the trust of our customers.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 px-4 mb-8">
                            <div class="p-8 bg-green-900 bg-opacity-10 border-2 border-white border-opacity-20 rounded-xl">
                                <div class="sm:flex">
                                    <div class="flex-shrink-0 flex w-16 h-16 items-center justify-center rounded-full bg-teal-800">
                                        <svg className='p-2' width="64px" height="64px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>chart-upward</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M42,40H8V33.7l.4-.3L18,23.8l6.1,6.1L38,16.1v4.8A2.1,2.1,0,0,0,39.7,23,2,2,0,0,0,42,21V11a2,2,0,0,0-2-2H30a2,2,0,0,0-2,2.3A2.1,2.1,0,0,0,30.1,13h5.2l-11.4,11L18,18.2,8,28.2V6A2,2,0,0,0,4,6V44H42a2,2,0,0,0,0-4Z"></path> </g> </g> </g></svg>
                                    </div>
                                    <div class="mt-5 sm:mt-0 sm:ml-8">
                                        <h5 class="text-2xl font-bold text-black mb-4">Value</h5>
                                        <p class="max-w-sm text-gray-900">Get more for your money with us. From competitive pricing to superior quality, we're committed to providing exceptional value in every interaction.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 px-4 mb-8">
                            <div class="p-8 bg-green-900 bg-opacity-10 border-2 border-white border-opacity-20 rounded-xl">
                                <div class="sm:flex">
                                    <div class="flex-shrink-0 flex w-16 h-16 items-center justify-center rounded-full bg-teal-800">
                                        <svg className='p-2' fill="#000000" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"></path></g></svg>
                                    </div>
                                    <div class="mt-5 sm:mt-0 sm:ml-8">
                                        <h5 class="text-2xl font-bold text-black mb-4">Support</h5>
                                        <p class="max-w-sm text-gray-900">We're here for you 24/7. Our dedicated support team ensures you receive prompt and personalized assistance whenever you need it.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;