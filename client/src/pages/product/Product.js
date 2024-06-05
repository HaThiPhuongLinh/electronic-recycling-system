import React, { useEffect, useState } from 'react';
import Footer from '../../components/layout/Footer';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import quotingAPI from '../../api/quotingAPI';

const Product = () => {
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [quotedPrice, setQuotedPrice] = useState(null);
    const [typesFromSelectedConditions, setTypesFromSelectedConditions] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            try {
                const response = await quotingAPI.getProductById(params.productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchConditions = async () => {
            try {
                const response = await quotingAPI.getListConditions();
                setConditions(response.data);
            } catch (error) {
                console.error('Error fetching conditions:', error);
            }
        };

        fetchProduct();
        fetchConditions();
    }, [params.productId]);

    useEffect(() => {
        setTypesFromSelectedConditions(getTypesFromConditions(selectedConditions));
    }, [selectedConditions]);

    const renderConditions = (type) => {
        const isSealedSelected = selectedConditions.some(id => {
            const condition = conditions.find(c => c.conditionId === id);
            return condition.type === 'SEALED';
        });

        return conditions
            .filter(condition => condition.type === type)
            .map(condition => {
                return (
                    <div className="hover:text-gray-800 transition duration-200" key={condition.conditionId}>
                        <input
                            type={type === 'SEALED' ? 'checkbox' : (type === 'FUNCTIONAL' ? 'checkbox' : 'radio')}
                            id={`condition-${condition.conditionId}`}
                            name={type}
                            value={condition.conditionId}
                            disabled={(type !== 'SEALED' && isSealedSelected) || (type !== 'FUNCTIONAL' && selectedConditions.includes(type))}
                            checked={selectedConditions.includes(condition.conditionId)}
                            onChange={(e) => handleConditionChange(condition.conditionId, e.target.checked, type)}
                        />
                        <label htmlFor={`condition-${condition.conditionId}`}> {condition.name} (-{condition.percentDecrease}%)</label>
                    </div>
                );
            });
    };

    const handleConditionChange = async (conditionId, checked, type) => {
        let updatedConditions;
        if (type === 'FUNCTIONAL') {
            if (checked) {
                updatedConditions = [...selectedConditions, conditionId];
            } else {
                updatedConditions = selectedConditions.filter(id => id !== conditionId);
            }
        } else if (type === 'SEALED') {
            updatedConditions = checked ? [conditionId] : [];
        } else {
            if (checked) {
                updatedConditions = selectedConditions.filter(id => {
                    const condition = conditions.find(c => c.conditionId === id);
                    return condition.type !== type;
                });
                updatedConditions = [...updatedConditions, conditionId];
            } else {
                updatedConditions = selectedConditions.filter(id => id !== conditionId);
            }
        }
        setSelectedConditions(updatedConditions);
        console.log(updatedConditions);

        const typesFromSelectedConditions = getTypesFromConditions(updatedConditions);

        console.log(typesFromSelectedConditions)

        if (type === 'SEALED' || (type !== 'SEALED' && updatedConditions.length >= 3 && getTypesFromConditions(updatedConditions).includes('OVERALL') && getTypesFromConditions(updatedConditions).includes('SCREEN') && getTypesFromConditions(updatedConditions).includes('BATTERY'))) {
            try {
                const response = await quotingAPI.getPrice(params.productId, updatedConditions);
                const data = response.data;
                console.log(data);
                setQuotedPrice(data.price);
            } catch (error) {
                console.error('Error fetching quoted price:', error);
            }
        } else {
            console.log('Not enough conditions selected')
        }
    };


    const getTypesFromConditions = (conditionIds) => {
        return conditionIds.map(id => conditions.find(c => c.conditionId === id).type);
    };

    return (
        <div>
            <div class="px-2 mt-10 mb-10">
                <div class="max-w-xl lg:max-w-7xl mx-auto">
                    <div class="flex flex-wrap -mx-2 mb-5">
                        <div class="w-full lg:w-1/4 px-4 mb-12 lg:mb-0">
                            <div class="lg:w-100">
                                <div class="relative group block mb-6 h-112 w-full bg-blueGray-900 rounded-md ">
                                    <div class="flex flex-col justify-between h-full">
                                        <div class="mt-5">
                                            <img class="img-fluid p-3 object-cover rounded-md border-2 hover:opacity-80 cursor-pointer border-gray-300" src={product.imageUrl} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-3/4 mt-3 flex">
                            <div class="max-w-lg ml-4">
                                <h2 class="text-4xl font-black mb-1">{product.name}</h2>
                                <span class="block text-sm font-bold mb-5">Apple</span>
                                <div class="mb-2">
                                    <h4 class="mb-2 font-heading font-medium">Qty:</h4>
                                    <input class="w-20 px-2 py-1 text-center border-2 border-gray-300 hover:border-gray-200 border-opacity-80 rounded-xl" type="number" min="1" max="99" placeholder="1" />
                                </div>
                                <div class="mb-2 mt-2">
                                    {renderConditions('SEALED')}
                                </div>
                                <span className="mt-10 text-3xl font-black text-red-500">
                                    {(selectedConditions.some(id => {
                                        const condition = conditions.find(c => c.conditionId === id);
                                        return condition.type === 'SEALED';
                                    }) || (typesFromSelectedConditions.includes('OVERALL') && typesFromSelectedConditions.includes('SCREEN') && typesFromSelectedConditions.includes('BATTERY'))) ? "$" : "Up to $"}
                                    {quotedPrice !== null ? quotedPrice : product.price}
                                </span>
                                <div class="flex flex-wrap sm:flex-nowrap items-center -mx-2 mb-6 mt-5">
                                    <div className="flex-grow-1 w-2/3 px-2 -mb-3">
                                        {(selectedConditions.some(id => {
                                            const condition = conditions.find(c => c.conditionId === id);
                                            return condition.type === 'SEALED';
                                        }) || (typesFromSelectedConditions.length >= 3 && typesFromSelectedConditions.includes('OVERALL') && typesFromSelectedConditions.includes('SCREEN') && typesFromSelectedConditions.includes('BATTERY'))) && (
                                                <Link to={`/sell/product/${product.productId}/checkout`} state={{ quotedPrice, selectedConditions }}>
                                                    <div className="group relative inline-block h-12 w-full -mb-2 rounded-md">
                                                        <div className="absolute top-0 left-0 transform -translate-y-1 -translate-x-1 w-full h-full group-hover:translate-y-0 group-hover:translate-x-0 transition duration-300">
                                                            <div className="flex h-full w-full items-center justify-center bg-green-600 border-2 border-black rounded-md">
                                                                <span className="text-base font-black text-black">Sell</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        {(!selectedConditions.some(id => {
                                            const condition = conditions.find(c => c.conditionId === id);
                                            return condition.type === 'SEALED';
                                        }) && !(typesFromSelectedConditions.length >= 3 && typesFromSelectedConditions.includes('OVERALL') && typesFromSelectedConditions.includes('SCREEN') && typesFromSelectedConditions.includes('BATTERY'))) && (
                                                <div className="group relative inline-block h-12 w-full -mb-2 rounded-md pointer-events-none opacity-50">
                                                    <div className="absolute top-0 left-0 transform -translate-y-1 -translate-x-1 w-full h-full group-hover:translate-y-0 group-hover:translate-x-0 transition duration-300">
                                                        <div className="flex h-full w-full items-center justify-center bg-green-600 border-2 border-black rounded-md">
                                                            <span className="text-base font-black text-black">Sell</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>
                                <div className='text-red-500 font-medium -ml-6'>** Please select some product options before selling</div>
                            </div>
                            <div class="max-w-xl ml-16">
                                <div class="mb-6">
                                    <div className="mb-4">
                                        <h3 className="font-medium mb-2">1. Overall cosmetic condition</h3>
                                        <div className="ml-2">
                                            {renderConditions('OVERALL')}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="font-medium mb-2">2. Screen</h3>
                                        <div className="ml-2">
                                            {renderConditions('SCREEN')}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="font-medium mb-2">3. Battery</h3>
                                        <div className="ml-2">
                                            {renderConditions('BATTERY')}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="font-medium mb-2">4. Functional condition</h3>
                                        <div className="ml-2">
                                            {renderConditions('FUNCTIONAL')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='font-bold text-3xl text-center mb-12'>How to Sell Your iPhone 15 Plus Using TechTradeIn</div>
                    <div class="flex flex-wrap -mx-4">
                        <div class="w-full lg:w-1/3 px-4 mb-10 lg:mb-0">
                            <div class="mb-6">
                                <img class="h-60 w-full object-cover rounded-3xl" src="https://res.cloudinary.com/dwywbuukd/image/upload/v1715181652/new/wallhaven-nkd1zm_jlkop0.jpg" alt="" />
                            </div>
                            <div class="relative w-4/5 sm:w-1/2 lg:w-3/4">
                                <div class="relative p-10 md:px-8 xl:px-10 bg-green-500 bg-opacity-40 rounded-3xl">
                                    <svg fill="#238657" className='mb-2' width="54px" height="54px" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" stroke="#238657"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M830 850H170q-8 0-14-6t-6-14V170q0-8 6-14t14-6h660q8 0 14 6t6 14v660q0 8-6 14t-14 6zM70 90v820q0 8 6 14t14 6h820q8 0 14-6t6-14V90q0-8-6-14t-14-6H90q-8 0-14 6t-6 14zm200 160h61q8 0 13.5 6t5.5 14v61q0 8-5.5 13.5T331 350h-61q-8 0-14-5.5t-6-13.5v-61q0-8 6-14t14-6zm200 0h260q8 0 14 6t6 14v61q0 8-6 13.5t-14 5.5H470q-9 0-14.5-5.5T450 331v-61q0-8 5.5-14t14.5-6zM270 450h61q8 0 13.5 5.5T350 470v60q0 9-5.5 14.5T331 550h-61q-8 0-14-5.5t-6-14.5v-60q0-9 6-14.5t14-5.5zm200 0h260q8 0 14 5.5t6 14.5v60q0 9-6 14.5t-14 5.5H470q-9 0-14.5-5.5T450 530v-60q0-9 5.5-14.5T470 450zM270 650h61q8 0 13.5 5.5T350 669v61q0 8-5.5 14t-13.5 6h-61q-8 0-14-6t-6-14v-61q0-8 6-13.5t14-5.5zm200 0h260q8 0 14 5.5t6 13.5v61q0 8-6 14t-14 6H470q-9 0-14.5-6t-5.5-14v-61q0-8 5.5-13.5T470 650z"></path></g></svg>
                                    <p class="text-gray-700">Select the details that match your device to get an instant quote.</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/3 px-4 mb-10 lg:mb-0 lg:mt-24">
                            <div class="mb-6">
                                <img class="h-60 w-full object-cover rounded-3xl" src="https://res.cloudinary.com/dwywbuukd/image/upload/v1715181652/new/wallhaven-833xlk_bqcxvr.jpg" alt="" />
                            </div>
                            <div class="relative w-4/5 sm:w-1/2 lg:w-3/4 ml-auto">
                                <div class="relative p-10 md:px-8 xl:px-10 bg-green-500 bg-opacity-40 rounded-3xl">
                                    <svg width="54px" height="54px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4fb04a" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 6C1 4.89543 1.89543 4 3 4H14C15.1046 4 16 4.89543 16 6V7H19C21.2091 7 23 8.79086 23 11V12V15V17C23.5523 17 24 17.4477 24 18C24 18.5523 23.5523 19 23 19H22H18.95C18.9828 19.1616 19 19.3288 19 19.5C19 20.8807 17.8807 22 16.5 22C15.1193 22 14 20.8807 14 19.5C14 19.3288 14.0172 19.1616 14.05 19H7.94999C7.98278 19.1616 8 19.3288 8 19.5C8 20.8807 6.88071 22 5.5 22C4.11929 22 3 20.8807 3 19.5C3 19.3288 3.01722 19.1616 3.05001 19H2H1C0.447715 19 0 18.5523 0 18C0 17.4477 0.447715 17 1 17V6ZM16.5 19C16.2239 19 16 19.2239 16 19.5C16 19.7761 16.2239 20 16.5 20C16.7761 20 17 19.7761 17 19.5C17 19.2239 16.7761 19 16.5 19ZM16.5 17H21V15V13H19C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11H21C21 9.89543 20.1046 9 19 9H16V17H16.5ZM14 17H5.5H3V6H14V8V17ZM5 19.5C5 19.2239 5.22386 19 5.5 19C5.77614 19 6 19.2239 6 19.5C6 19.7761 5.77614 20 5.5 20C5.22386 20 5 19.7761 5 19.5Z" fill="#238657"></path> </g></svg>
                                    <p class="text-gray-700">Once your order is placed you will receive a free prepaid shipping label.</p>
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/3 px-4">
                            <div class="mb-6">
                                <img class="h-60 w-full object-cover rounded-3xl" src="https://res.cloudinary.com/dwywbuukd/image/upload/v1715181652/new/wallhaven-nmwqw8_ntyw6f.jpg" alt="" />
                            </div>
                            <div class="relative w-4/5 sm:w-1/2 lg:w-3/4 ml-auto">
                                <div class="relative p-10 md:px-8 xl:px-10 bg-green-500 bg-opacity-40 rounded-3xl">
                                    <svg width="54px" height="54px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="6" width="18" height="13" rx="2" stroke="#238657" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect> <path d="M3 10H20.5" stroke="#238657" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 15H9" stroke="#238657" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <p class="text-gray-700">Payment will be sent via PayPal, Venmo, or Check within 24 hours of your device being inspected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='font-bold text-3xl text-center mb-11'>Other Electronics Sold Online Recently</div>
            <div className='mx-28'> <Carousel /></div>
            <Footer />
        </div>
    );
}

export default Product;