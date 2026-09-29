"use client";

import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Store, Phone, MapPin, Building, Mail, Utensils, Plus, Trash2, CheckCircle2 } from "lucide-react";

const Page = (props) => {
    const [foodItems, setFoodItems] = useState([]);
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [addedtItem, setAddedItem] = useState([]);

    const params = use(props.params);
    const searchParams = use(props.searchParams);

    const name = params?.name;
    const id = searchParams?.id;

    // Get cart from localStorage
    useEffect(() => {
        const cart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        setAddedItem(Array.isArray(cart) ? cart : []);
    }, []);

    // Get restaurant details and food items
    useEffect(() => {
        if (!id) return;

        const loadRestaurantsDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/customer/${id}`
                );

                console.log(
                    "loadRestaurantsDetails",
                    response
                );

                if (response.data.success) {
                    setRestaurantDetails(
                        response?.data?.restaurantDetails
                    );

                    setFoodItems(
                        response.data.foodItems
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        loadRestaurantsDetails();
    }, [id]);

    // Add item to cart
    const handleAddToCart = (item) => {
        const oldCart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        if (oldCart[0]?.restaurantId !== item?.restaurantId) {
            localStorage.removeItem("cart");

            const newCart = [item];

            localStorage.setItem(
                "cart",
                JSON.stringify(newCart)
            );

            setAddedItem(newCart);
        } else {
            console.log(item?.restaurantId, "this is item from the details page");
            console.log(oldCart[0]?.restaurantId, "oldcart from the details page");

            // Check if item already exists
            const alreadyAdded = oldCart?.some(
                (cartItem) => cartItem?._id === item?._id
            );

            if (alreadyAdded) {
                return;
            }

            const newCart = [...oldCart, item];

            // Update localStorage
            localStorage.setItem(
                "cart",
                JSON.stringify(newCart)
            );

            // Update React state
            setAddedItem(Array.isArray(newCart) ? newCart : []);

            console.log(
                newCart,
                "updated cart"
            );
        }
    };

    // Remove item from cart
    const handleRemoveFromCart = (item) => {
        const oldCart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const newCart = oldCart?.filter(
            (cartItem) => cartItem?._id !== item?._id
        );

        // Update localStorage
        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );

        // Update React state
        setAddedItem(Array.isArray(newCart) ? newCart : []);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
            {/* Header */}
            <CustomerHeader cartData={addedtItem} />

            {/* Restaurant Banner */}
            <div className="relative overflow-hidden bg-white py-12 md:py-16 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-3xl bg-[#E23744] flex items-center justify-center text-white shadow-md shadow-[#E23744]/20">
                                <Store className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight">
                                    {name ? decodeURIComponent(name) : "Restaurant"}
                                </h1>
                                <p className="text-[#E23744] text-sm font-medium mt-1">Authentic & Fresh Meals</p>
                            </div>
                        </div>

                        {/* Quick Info Badges */}
                        <div className="flex flex-wrap items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs sm:text-sm text-gray-700">
                            {restaurantDetails?.contact && (
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm">
                                    <Phone className="w-3.5 h-3.5 text-[#E23744]" />
                                    {restaurantDetails.contact}
                                </span>
                            )}
                            {restaurantDetails?.city && (
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm">
                                    <Building className="w-3.5 h-3.5 text-[#E23744]" />
                                    {restaurantDetails.city}
                                </span>
                            )}
                            {restaurantDetails?.email && (
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm">
                                    <Mail className="w-3.5 h-3.5 text-[#E23744]" />
                                    {restaurantDetails.email}
                                </span>
                            )}
                        </div>
                    </div>

                    {restaurantDetails?.address && (
                        <p className="flex items-center gap-2 text-sm text-gray-600 mt-4 max-w-2xl">
                            <MapPin className="w-4 h-4 text-[#E23744] flex-shrink-0" />
                            <span>{restaurantDetails.address}</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Food Items Menu */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Utensils className="w-6 h-6 text-[#E23744]" />
                    <h2 className="text-2xl font-bold text-black tracking-tight">Food Menu Items</h2>
                </div>

                <div>
                    {foodItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {foodItems?.map((item) => {
                                const isAdded = addedtItem?.some(
                                    (cartItem) => cartItem?._id === item?._id
                                );

                                return (
                                    <div
                                        key={item._id}
                                        className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="relative h-48 w-full bg-gray-50 overflow-hidden border-b border-gray-100">
                                                {item?.image ? (
                                                    <img
                                                        src={item?.image}
                                                        alt={item?.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <Utensils className="w-12 h-12" />
                                                    </div>
                                                )}
                                                {item?.price && (
                                                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white border border-gray-200 text-[#E23744] font-bold text-sm shadow-sm">
                                                        ₹{item.price}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-5">
                                                <h3 className="text-lg font-bold text-black mb-2">{item?.name}</h3>
                                                <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">
                                                    {item?.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-5 pt-0">
                                            {isAdded ? (
                                                <button
                                                    onClick={() => handleRemoveFromCart(item)}
                                                    className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#E23744] font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>Remove Item</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="w-full py-2.5 px-4 bg-[#E23744] hover:bg-[#c42d38] text-white font-semibold text-xs rounded-xl shadow-sm shadow-[#E23744]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    <span>Add to Cart</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm">
                            <Utensils className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h2 className="text-xl font-bold text-gray-800">No Food Item Added for Now</h2>
                            <p className="text-gray-500 text-sm mt-1">Please check back later for menu updates.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Page;
