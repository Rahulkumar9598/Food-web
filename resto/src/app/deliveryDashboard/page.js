"use client";
import React, { useEffect, useState } from 'react';
import DeliveryHeader from '../deliveryHeader';
import Footer from '../_components/Footer';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Bike, Store, MapPin, Building, DollarSign, Clock } from 'lucide-react';

const Page = () => {
    const router = useRouter();
    const [restaurants, setRestaurants] = useState();

    useEffect(() => {
        let delivery = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("DeliveryPartner")) : null;
        console.log(delivery);
        let id = delivery?._id;

        if (!delivery) {
            router.push("/deliveryPartner");
        }
        if (id) {
            getRestaurant(id);
        }
    }, []);

    const getRestaurant = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/deliveryPartner/orders/${id}`);
            console.log(response, " this is response of delivery ");

            if (response.data.success) {
                setRestaurants(response.data.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
            <DeliveryHeader />

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744]">
                        <Bike className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-black tracking-tight">Delivery Order List</h1>
                        <p className="text-gray-500 text-xs">Manage active and assigned orders</p>
                    </div>
                </div>

                {restaurants && restaurants.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {restaurants.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md hover:border-gray-300 transition-all"
                            >
                                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                                    <div className="flex items-center gap-2.5">
                                        <Store className="w-5 h-5 text-[#E23744]" />
                                        <h2 className="font-bold text-black text-base">{item.restaurant?.name}</h2>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-bold">
                                        ₹{item.amount}
                                    </span>
                                </div>

                                <div className="space-y-2 text-xs text-gray-600">
                                    <p className="flex items-center gap-2 text-gray-500">
                                        <Building className="w-4 h-4 text-gray-400" />
                                        <span>City: {item.restaurant?.city}</span>
                                    </p>
                                    <p className="flex items-start gap-2 text-gray-500">
                                        <MapPin className="w-4 h-4 text-[#E23744] flex-shrink-0 mt-0.5" />
                                        <span>Address: {item.restaurant?.address}</span>
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                                    <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                                        Update Status:
                                    </span>
                                    <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 text-xs font-semibold focus:outline-none focus:border-[#E23744] cursor-pointer">
                                        <option>confirm</option>
                                        <option>On The Way</option>
                                        <option>Delivered</option>
                                        <option>Failed Delivery</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
                        <Bike className="w-14 h-14 text-gray-300 mx-auto mb-3" />
                        <h2 className="text-xl font-bold text-gray-800">No Delivery Orders Assigned</h2>
                        <p className="text-gray-500 text-sm mt-1">Check back soon for new order assignments.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Page;