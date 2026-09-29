
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = () => {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Get all foods
    const getFoods = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/category");

            if (response.data.success) {
                const data = response.data.result;

                setFoods(data);

                // Get unique categories
                const uniqueCategories = [
                    ...new Set(data.map((item) => item.category)),
                ].filter(Boolean);

                setCategories(uniqueCategories);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFoods();
    }, []);

    // Filter foods according to category
    const filteredFoods =
        selectedCategory === "All"
            ? foods
            : foods.filter((item) => item.category === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Heading */}
            <h2 className="text-3xl font-bold text-black mb-6">
                Explore Our Menu
            </h2>

            {/* Categories */}
            <div className="flex gap-3 flex-wrap mb-8">

                {/* All Category */}
                <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-5 py-2 rounded-full font-semibold ${selectedCategory === "All"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    All
                </button>

                {/* Other Categories */}
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

                {filteredFoods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden"
                    >
                        {/* Image */}
                        <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-48 object-cover"
                        />

                        {/* Details */}
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

                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* No Food */}
            {filteredFoods.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                    No food found in this category.
                </p>
            )}
        </div>
    );
};

export default Category;