"use client";
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import RestaurantHeader from '@/app/_components/RestaurantHeader';
import Footer from '@/app/_components/Footer';
import { Edit3, Utensils, DollarSign, Image as ImageIcon, FileText, ArrowLeft, AlertCircle } from 'lucide-react';

const EditFoodItem = () => {
    const params = useParams();
    console.log(params.id, " Food id mmmmmmmmmmmm");
    const foodId = params.id;
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [path, setPath] = useState();
    const [description, setDescritpion] = useState();
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        LoadfoodItem();
    }, []);

    const LoadfoodItem = async () => {
        const response = await axios.get("http://localhost:3000/api/restaurant/foods/edit/" + foodId);
        console.log(response, " this is my response");
        if (response?.data?.success) {
            setName(response.data.result.name);
            setPrice(response.data.result.price);
            setPath(response.data.result.image);
            setDescritpion(response.data.result.description);
        }
    };

    const handleEditFoodItem = async () => {
        if (!name || !price || !path || !description || !foodId) {
            setError(true);
            return false;
        } else {
            setError(false);
        }
        const res = await axios.put("http://localhost:3000/api/restaurant/foods/edit/" + foodId, { name, price, path, description });

        console.log(res, " this is response from the backend mmmmmmmmmmmmmmmmmmmmmmm");
        if (res.data.success) {
            LoadfoodItem();
            alert("Food Item Update Successfully");
            router.push("../dashboard");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
            <RestaurantHeader />

            <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744]">
                                <Edit3 className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-black tracking-tight">Update Food Item</h1>
                                <p className="text-gray-500 text-xs">Modify menu details and pricing</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => router.push("../dashboard")}
                            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-200 transition-all cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                                Food Name
                            </label>
                            <div className="relative">
                                <Utensils className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#E23744] transition-all text-sm"
                                    type="text"
                                    placeholder="Enter Food Name"
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            {error && !name && (
                                <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                                    <AlertCircle className="w-3.5 h-3.5" /> Please Enter valid name
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                                Price (₹)
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#E23744] transition-all text-sm"
                                    type="Number"
                                    placeholder="Enter Price"
                                    value={price || ""}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            {error && !price && (
                                <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                                    <AlertCircle className="w-3.5 h-3.5" /> Please Enter valid price
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                                Image URL / Path
                            </label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#E23744] transition-all text-sm"
                                    type="text"
                                    placeholder="Enter Path Name"
                                    value={path || ""}
                                    onChange={(e) => setPath(e.target.value)}
                                />
                            </div>
                            {error && !path && (
                                <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                                    <AlertCircle className="w-3.5 h-3.5" /> Please Enter valid path
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                                Description
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#E23744] transition-all text-sm"
                                    type="text"
                                    placeholder="Enter Description Name"
                                    value={description || ""}
                                    onChange={(e) => setDescritpion(e.target.value)}
                                />
                            </div>
                            {error && !description && (
                                <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                                    <AlertCircle className="w-3.5 h-3.5" /> Please Enter valid description
                                </p>
                            )}
                        </div>

                        <div className="pt-2 space-y-3">
                            <button
                                type="button"
                                onClick={(e) => handleEditFoodItem(e)}
                                className="w-full py-3.5 px-4 bg-[#E23744] hover:bg-[#c42d38] text-white font-semibold rounded-xl shadow-md shadow-[#E23744]/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Edit3 className="w-4 h-4" />
                                <span>Update Food Item</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EditFoodItem;