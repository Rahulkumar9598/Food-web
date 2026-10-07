"use client";
import React, { useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader.js';
import Footer from '../_components/Footer';
import { Delivery_Charges, TAX } from '../lib/constant/DelieveryChargers.js';
import { useRouter } from 'next/navigation.js';
import { ShoppingBag, Trash2, ArrowRight, Utensils, Receipt } from 'lucide-react';
import { useSelector } from 'react-redux';

const Page = () => {
    const router = useRouter();
    const user = useSelector((state)=>state.user.user)
    console.log(user, " this is user from the cart");

    const [foodItems, setFoodItems] = useState(() => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem("cart")) || [];
        }
        return [];
    });

    const [total] = useState(() =>
        foodItems.length === 1
            ? foodItems[0].price
            : foodItems.reduce((total, item) => total + item.price, 0)
    );
    console.log(total, "total price");

    const handleRemoveFromCart = (item) => {
        const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");

        const newCart = oldCart.filter((cartItem) => cartItem._id !== item._id);

        localStorage.setItem("cart", JSON.stringify(newCart));
        setFoodItems(newCart);
    };

    const orderNow = () => {
        if (user) {
            router.push("/order");
        } else {
            router.push("/user-auth?order=true");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
            {/* Header */}
            <CustomerHeader />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744]">
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-black tracking-tight">Your Shopping Cart</h1>
                        <p className="text-gray-500 text-xs">Review items before placing your order</p>
                    </div>
                </div>

                {foodItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Food Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {foodItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white border border-gray-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
                                >
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                                        {item?.path || item?.image ? (
                                            <img
                                                src={item.path || item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <Utensils className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-black mb-1">{item?.name}</h3>
                                        <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed">
                                            {item?.description}
                                        </p>
                                        <button
                                            onClick={() => handleRemoveFromCart(item)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#E23744] text-xs font-semibold rounded-xl transition-all cursor-pointer"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            <span>Remove Item</span>
                                        </button>
                                    </div>

                                    <div className="text-right sm:self-start">
                                        <span className="text-lg font-bold text-[#E23744] bg-[#E23744]/5 border border-[#E23744]/10 px-3 py-1 rounded-xl">
                                            ₹{item?.price}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm h-fit">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                <Receipt className="w-5 h-5 text-[#E23744]" />
                                <h2 className="text-lg font-bold text-black">Order Summary</h2>
                            </div>

                            <div className="space-y-3.5 text-sm text-gray-600">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Food Charges</span>
                                    <span className="font-semibold text-gray-800">₹{total}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Tax ({TAX}%)</span>
                                    <span className="font-semibold text-gray-800">₹{(total * TAX) / 100}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Delivery Charges</span>
                                    <span className="font-semibold text-gray-800">₹{Delivery_Charges}</span>
                                </div>

                                <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-base font-bold text-black">
                                    <span>Total Amount</span>
                                    <span className="text-xl text-[#E23744]">
                                        ₹{total + (total * TAX) / 100 + Delivery_Charges}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={orderNow}
                                className="w-full mt-6 py-3.5 px-4 bg-[#E23744] hover:bg-[#c42d38] text-white font-bold rounded-xl shadow-md shadow-[#E23744]/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <span>Proceed to Order</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
                        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">No Food Item Added for Now</h2>
                        <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto mb-6">
                            Explore restaurants and add delicious dishes to your cart!
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="px-6 py-2.5 bg-[#E23744] hover:bg-[#c42d38] text-white text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-sm shadow-[#E23744]/20"
                        >
                            Browse Restaurants
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Page;