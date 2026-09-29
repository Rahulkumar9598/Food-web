"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import AddFoodItem from "@/app/_components/AddFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/FoodItemList";
import Footer from "@/app/_components/Footer";
import { PlusCircle, LayoutDashboard } from "lucide-react";

const Dashboard = () => {
    const [addItem, setItem] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
            <RestaurantHeader />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Bar / Mode Toggle */}
                <div className="flex items-center justify-center gap-3 mb-8 bg-white p-1.5 rounded-2xl border border-gray-200 w-fit mx-auto shadow-sm">
                    <button
                        onClick={() => setItem(false)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            !addItem
                                ? "bg-[#E23744] text-white shadow-md shadow-[#E23744]/20"
                                : "text-gray-500 hover:text-black hover:bg-gray-50"
                        }`}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                    </button>

                    <button
                        onClick={() => setItem(true)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            addItem
                                ? "bg-[#E23744] text-white shadow-md shadow-[#E23744]/20"
                                : "text-gray-500 hover:text-black hover:bg-gray-50"
                        }`}
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Add Food Item</span>
                    </button>
                </div>

                {/* Dynamic Component Content */}
                <div>
                    {addItem ? <AddFoodItem setItem={setItem} /> : <FoodItemList />}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;