"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";

const Restaurant = () => {
    const [login, setLogin] = useState(true);

    return (
        <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
            <RestaurantHeader />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col items-center justify-center">
                {login ? <RestaurantLogin /> : <RestaurantSignUp />}
                
                <div className="mt-6">
                    <button
                        className="text-[#E23744] hover:text-[#c42d38] text-sm font-medium hover:underline transition-all cursor-pointer bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm"
                        onClick={() => setLogin(!login)}
                    >
                        {login ? "Don't have an account? Signup here" : "Already have an Account? Sign in here"}
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Restaurant;