
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = ({ sendAddedItem }) => {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [addedItem, setAddedItem] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setAddedItem(Array.isArray(cart) ? cart : []);
    }, []);

    useEffect(() => {
        getFoods();
    }, []);

    // Get all foods
    const getFoods = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/category"
            );

            if (response.data.success) {
                const data = response.data.result;

                setFoods(data);

                const uniqueCategories = [
                    ...new Set(data.map((item) => item.category)),
                ].filter(Boolean);

                setCategories(uniqueCategories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Update cart in localStorage, state and parent
    const updateCart = (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
        setAddedItem(newCart);
        sendAddedItem?.(newCart);
           window.dispatchEvent(new Event("cartUpdated"));
    };

    // Add food to cart
    const handleCart = (food) => {
        const oldCart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        // If another restaurant's food is in cart, replace it
        if (oldCart.length > 0 && String(oldCart[0].restaurantId) !== String(food.restaurantId)) {
            updateCart([{ ...food, quantity: 1 }]);
            return;
        }

        const existingItem = oldCart.find((item) => item._id === food._id);

        let newCart;
        if (existingItem) {
            newCart = oldCart.map((item) => item._id === food._id ? { ...item, quantity: (item.quantity || 1) + 1, } : item);
        } else {
            newCart = [...oldCart, { ...food, quantity: 1 },];
        }

        updateCart(newCart);
    };
   
    const handleIncreaseQuantity = (food) => {
        const cart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const updatedCart = cart.map((item) =>item._id === food._id ? { ...item, quantity: (item.quantity || 1) + 1, } : item);
        updateCart(updatedCart);
    };

    // Decrease quantity
    const handleDecreaseQuantity = (food) => {
        const cart = JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

        const updatedCart = cart.map((item) =>item._id === food._id? { ...item, quantity: (item.quantity || 1) - 1,}: item)
            .filter((item) => item.quantity > 0);

        updateCart(updatedCart);
    };

    // Filter foods by category
    const filteredFoods =
        selectedCategory === "All"
            ? foods
            : foods.filter(
                (item) => item.category === selectedCategory
            );

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-black mb-6">
                Explore Our Menu
            </h2>

            {/* Categories */}
            <div className="flex gap-3 flex-wrap mb-8">
                <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-5 py-2 rounded-full font-semibold ${selectedCategory === "All"
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                >
                    All
                </button>

                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2 rounded-full font-semibold ${selectedCategory === category
                                ? "bg-red-500 text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Food Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFoods.map((food) => {
                    const cartItem = addedItem.find(
                        (item) => item._id === food._id
                    );

                    const isAdded = Boolean(cartItem);
                    const quantity = cartItem?.quantity ?? 1;

                    return (
                        <div
                            key={food._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <img
                                src={food.image}
                                alt={food.name}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {food.name}
                                </h3>

                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                    {food.description}
                                </p>

                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-bold text-red-500">
                                        ₹{food.price}
                                    </span>

                                    {isAdded ? (
                                        <div className="flex items-center gap-3 bg-red-500 text-white px-3 py-2 rounded-lg">
                                            <button
                                                onClick={() =>
                                                    handleDecreaseQuantity(food)
                                                }
                                                aria-label={`Decrease ${food.name} quantity`}
                                                className="font-bold text-lg px-1"
                                            >
                                                −
                                            </button>

                                            <span className="font-semibold">
                                                {quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    handleIncreaseQuantity(food)
                                                }
                                                aria-label={`Increase ${food.name} quantity`}
                                                className="font-bold text-lg px-1"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleCart(food)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredFoods.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                    No food found in this category.
                </p>
            )}
        </div>
    );
};

export default Category;

