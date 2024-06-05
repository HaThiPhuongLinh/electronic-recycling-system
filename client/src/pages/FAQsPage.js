import React from "react";
import { useState } from "react";
import Footer from "../components/layout/Footer";

const FAQsPage = () => {
  const [isDropdownVisible, setDropdownVisible] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
    faq4: false,
    faq5: false,
    faq6: false,
    faq7: false,
    faq8: false,
  })

  const toggleDropdown = (faqId) => {
    setDropdownVisible({
      ...isDropdownVisible,
      [faqId]: !isDropdownVisible[faqId],
    });
  };

  return (
    <div>
      <div class="relative pt-10 bg-blueGray-50 overflow-">
        <img class="absolute bottom-0 left-1/2 transform -translate-x-1/2" src="flaro-assets/images/faqs/gradient.svg" alt="" />
        <div class="relative z-10 container px-4 mx-auto">
          <div class="md:max-w-4xl mx-auto">
            <p class="mb-7 text-sm text-indigo-600 text-center font-semibold uppercase tracking-px">Have any questions?</p>
            <h2 class="mb-16 text-6xl md:text-6xl xl:text-10xl text-center font-bold font-heading tracking-px-n leading-none">Frequently Asked Questions</h2>
            <div class="mb-11 flex flex-wrap -m-1">
              <div class="w-full p-1">
                <div class="py-3 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl">
                  <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white ">
                    <h2 id="accordion-flush-heading-1">
                      <button onClick={() => toggleDropdown("faq1")} type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right border-b border-gray-200 " data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                        <h3 class="text-lg font-semibold leading-normal text-black">How does the selling process work?</h3>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                      </button>
                      {isDropdownVisible.faq1 && (
                        <div>
                          <div class="py-5">
                            <p class="mb-2 text-gray-700 ">We’ve made our selling process straightforward and simple:</p>
                            <ol className="space-y-3">
                              <li>1. Click Start Selling on our homepage or click on “Sell” on the top menu from any page then select the device you’d like to sell.</li>
                              <li>2. Once you have found your device you will be prompted to answer a few questions and will be given an instant quote.</li>
                              <li>3. Tell us how you want to be paid (Venmo, PayPal, or check) and if you need packaging materials.</li>
                              <li>4. Click place order and you will receive an Order # and confirmation email.</li>
                              <li>5. Once your order is placed you will receive a prepaid shipping label and instructions via email explaining how to prepare & ship your device. With SmartphonesPLUS shipping is always free!</li>
                              <li>6. Once we receive the device we’ll inspect it to be sure it is the correct model, condition, etc. that was quoted. If it is not, we will send a revised offer which you can accept or decline. If you decline a revised offer we ship it back for free!</li>
                              <li>7. If everything checks out, we’ll send your cash the same day the order is processed!</li>
                              <li>If you are selling your device in-store we will inspect your device on the spot and pay out cash or store credit.</li>
                            </ol>
                          </div>
                        </div>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div class="w-full p-1">
                <div class="py-3 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl">
                  <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white ">
                    <h2 id="accordion-flush-heading-1">
                      <button onClick={() => toggleDropdown("faq2")} type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right border-b border-gray-200 " data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                        <h3 class="text-lg font-semibold leading-normal text-black">What condition is my device in?</h3>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                      </button>
                      {isDropdownVisible.faq2 && (
                        <div >
                          <div class="space-y-3 text-gray-700 ">
                            <p>If your phone is in 'Unopened retail packaging (factory sealed)', we purchase it at 90% of its original price. </p>
                            <p>Otherwise, deductions are made based on:</p>
                            <ul class="space-y-2 ">
                              <li><strong>1. Overall cosmetic condition:</strong> Major damage (-40%), scratches/scuffs (-25%), light wear (-15%), flawless (no deduction).</li>
                              <li><strong>2. Screen:</strong> Flawless (no deduction), flaws/flicker/dim (-20%).</li>
                              <li><strong>3. Functional condition:</strong> Deductions for various features not working properly, such as Face ID (-15%), battery life (-5% to -7%), peripheral buttons (-5%), cameras (-8%), speaker/microphone (-4%), and connectivity (-6%).</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div class="w-full p-1">
                <div class="py-3 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl">
                  <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white ">
                    <h2 id="accordion-flush-heading-1">
                      <button onClick={() => toggleDropdown("faq3")} type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right border-b border-gray-200 " data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                        <h3 class="text-lg font-semibold leading-normal text-black">Can I sell a device that has been reported lost or stolen?</h3>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                      </button>
                      {isDropdownVisible.faq3 && (
                        <div>
                          <div class="py-5">
                            <p class="mb-2 text-gray-700 ">No. We cannot accept devices that have been reported as lost or stolen. The device you sell must be yours to sell and must not have been reported.</p>
                          </div>
                        </div>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div class="w-full p-1">
                <div class="py-3 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl">
                  <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white ">
                    <h2 id="accordion-flush-heading-1">
                      <button onClick={() => toggleDropdown("faq4")} type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right border-b border-gray-200 " data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                        <h3 class="text-lg font-semibold leading-normal text-black">How do I prepare and ship my device?</h3>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                      </button>
                      {isDropdownVisible.faq4 && (
                        <div>
                          <div class="space-y-3 text-gray-700 ">
                            <p><strong>Prepare your device for shipment:</strong></p>
                            <ol class="mb-2 space-y-2">
                              <li>1. Remove iCloud, Google/Samsung account, and all passwords. We don't accept locked or reported lost/stolen devices.</li>
                              <li>2. Deactivate carrier service and pay off any remaining balance.</li>
                              <li>3. Backup files if needed, then factory reset your device.</li>
                              <li>4. Remove SD or SIM cards.</li>
                              <li>5. Use a durable box and enough packing materials.</li>
                              <li>6. Print and tape your shipping label to the box.</li>
                              <li>7. Drop off your box at your local USPS location.</li>
                            </ol>
                          </div>
                        </div>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div class="w-full p-1">
                <div class="py-3 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl">
                  <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white ">
                    <h2 id="accordion-flush-heading-1">
                      <button onClick={() => toggleDropdown("faq5")} type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right border-b border-gray-200 " data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                        <h3 class="text-lg font-semibold leading-normal text-black">Can I send a device to be recycled?</h3>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                      </button>
                      {isDropdownVisible.faq5 && (
                        <div>
                          <div class="py-5">
                            <p class="mb-2 text-gray-700 ">Yes! It is a collective effort to take care of our environment. We will accept devices you wish to recycle and will dispose of them properly.</p>
                          </div>
                        </div>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div class="w-full p-1">
                <div class="py-3 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl">
                  <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white ">
                    <h2 id="accordion-flush-heading-1">
                      <button onClick={() => toggleDropdown("faq6")} type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right border-b border-gray-200 " data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                        <h3 class="text-lg font-semibold leading-normal text-black">Can I sell broken cell phones?</h3>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                      </button>
                      {isDropdownVisible.faq6 && (
                        <div>
                          <div class="py-5">
                            <p class="mb-2 text-gray-700 ">Yes, we pay much more than you’d think for damaged or cracked cell phones, tablets, and more!</p>
                          </div>
                        </div>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              <div class="w-full p-1">
                <div class="py-3 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl">
                  <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white ">
                    <h2 id="accordion-flush-heading-1">
                      <button onClick={() => toggleDropdown("faq7")} type="button" class="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right border-b border-gray-200 " data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                        <h3 class="text-lg font-semibold leading-normal text-black">Can I get a higher offer if I include accessories?</h3>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                        </svg>
                      </button>
                      {isDropdownVisible.faq7 && (
                        <div>
                          <div class="py-5">
                            <p class="mb-2 text-gray-700 ">We do not offer more for phone accessories. Although, if you are selling a MacBook, Microsoft Surface, smartwatch, gaming console, etc. your offer will be reduced if you do not include the AC adapter, charger, and keyboard, if applicable.</p>
                          </div>
                        </div>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="text-gray-600 text-center font-medium">
            <span>Still have any questions?</span>
            <a class="font-semibold text-indigo-600 hover:text-indigo-700" href="#"></a>
          </p>
          <div class="max-w-6xl mx-auto mb-10 mt-10">
                <div class="flex flex-wrap -mx-3">
                    <div class="w-full lg:w-1/2 px-3">
                        <div class="max-w-sm">
                            <h2 class="mt-2 text-4xl font-bold font-heading">We will be glad to hear from you!</h2>
                        </div>
                        <div class="mt-6 lg:mt-10">
                            <div class="mb-10 leading-relaxed">
                                <h3 class="text-sm text-gray-400">Phone</h3>
                                <p>+ 48 654-430-309</p>
                            </div>
                            <div class="mb-10 leading-relaxed">
                                <h4 class="text-sm text-gray-400">E-mail</h4>
                                <p>info@metis.com</p>
                            </div>
                            <div class="mb-10 leading-relaxed">
                                <h4 class="text-sm text-gray-400">Address</h4>
                                <p>11567 E Broadview Dr</p>
                                <p>Kiowa, Colorado(CO), 80117</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2 px-3">
                        <form>
                            <div class="mb-4">
                                <input class="w-full p-4 text-xs font-semibold leading-none bg-gray-100 rounded outline-none" type="text" placeholder="Subject" />
                            </div>
                            <div class="mb-4">
                                <input class="w-full p-4 text-xs font-semibold leading-none bg-gray-100 rounded outline-none" type="text" placeholder="Name" />
                            </div>
                            <div class="mb-4">
                                <input class="w-full p-4 text-xs font-semibold leading-none bg-gray-100 rounded outline-none" type="email" placeholder="name@example.com" />
                            </div>
                            <div class="mb-4"><textarea class="w-full h-24 p-4 text-xs font-semibold leading-none resize-none bg-gray-100 rounded outline-none" type="text" placeholder="Message..."></textarea></div>
                            <div class="mb-4">
                                <label class="flex px-2 bg-gray-100 rounded">
                                    <input class="hidden" type="file" placeholder="Choose file.." name="Choose file" />
                                    <div class="my-1 ml-auto px-4 py-3 text-xs text-white font-semibold leading-none bg-gray-700 hover:bg-blueGray-600 rounded cursor-pointer">Browse</div>
                                </label>
                            </div>
                            <div class="flex justify-between items-center">
                                <label>
                                    <input class="mr-1" type="checkbox" name="terms" value="1" />
                                    <span class="text-sm font-semibold">I agree to terms and conditions.</span>
                                </label>
                                <button class="py-4 px-8 text-sm text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
      </div >
    </div >
  );
};

export default FAQsPage;
