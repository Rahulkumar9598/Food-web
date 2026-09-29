import axios from 'axios';
import React, { useState } from 'react';
import { PlusCircle, Utensils, DollarSign, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';

const AddFoodItem = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [path, setPath] = useState('');
    const [description, setDescritpion] = useState('');
    const [category , setCategory] = useState('')
    const [error, setError] = useState(false);

    const handleFoodItem = async (e) => {
        let restaurantId;
        const resto = JSON.parse(localStorage.getItem("restaurantUser"));
        restaurantId = resto?.result?._id;

        if (!name || !price || !path || !description || !restaurantId || !category) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("restaurantId", restaurantId);
        formData.append("category" , category)
        formData.append("image", path);

        const response = await axios.post("http://localhost:3000/api/restaurant/foods", formData);

        if (response.data.success) {
            alert("Food Add Successfully");
            props.setItem(false);
        } else {
            alert("Food Item Not added");
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744]">
                    <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-black tracking-tight">Add New Food Item</h1>
                    <p className="text-gray-500 text-xs">Expand your restaurant's delicious menu</p>
                </div>
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
                            value={name}
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
                            Food Category
                        </label>

                        <div className="relative">
                            <Utensils className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#E23744] transition-all text-sm"
                                type="text"
                                placeholder="Enter Food Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                         {error && !category && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Please Enter valid category
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
                            value={price}
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
                        Food Image File
                    </label>
                    <div className="relative">
                        <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        <input
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#E23744] file:text-white hover:file:bg-[#c42d38] transition-all text-sm"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPath(e.target.files[0])}
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
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescritpion(e.target.value)}
                        />
                    </div>
                    {error && !description && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Please Enter valid description
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={(e) => handleFoodItem(e)}
                    className="w-full py-3 px-4 bg-[#E23744] hover:bg-[#c42d38] text-white font-semibold rounded-xl shadow-md shadow-[#E23744]/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Food Item</span>
                </button>
            </div>
        </div>
    );
};

export default AddFoodItem;