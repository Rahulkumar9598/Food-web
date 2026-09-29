import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Trash2, Edit3, Utensils, Image as ImageIcon } from 'lucide-react';

const FoodItemList = () => {
    const [fooditems, setFooditem] = useState();
    const router = useRouter();

    useEffect(() => {
        fooditem();
    }, []);

    const fooditem = async () => {
        const restaurant = JSON.parse(localStorage.getItem("restaurantUser"));
        console.log(restaurant, " this is restaurant");

        const restaurantId = restaurant?.result._id;
        const response = await axios.get(`http://localhost:3000/api/restaurant/foods/${restaurantId}`);
        console.log(response, " this is response form the backend for get foods");
        if (response?.data?.success) {
            setFooditem(response.data.result);
        }
    };

    const handleDelete = async (index) => {
        const response = await axios.delete(`http://localhost:3000/api/restaurant/foods/${index}`);
        console.log(response, "gggggggggggggggg");

        if (response.data.success) {
            fooditem();
            alert("Food item deleted successfully");
        } else {
            alert("Food item is not delete");
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744]">
                        <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-black tracking-tight">Food Items Menu</h1>
                        <p className="text-gray-500 text-xs">Total items listed: {fooditems?.length || 0}</p>
                    </div>
                </div>
            </div>

            {(!fooditems || fooditems.length === 0) ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                    <Utensils className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 font-medium">No food items added yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3.5 text-center">S.No</th>
                                <th className="px-4 py-3.5">Image</th>
                                <th className="px-4 py-3.5">Name</th>
                                <th className="px-4 py-3.5">Price</th>
                                <th className="px-4 py-3.5">Description</th>
                                <th className="px-4 py-3.5 text-center">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {fooditems?.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 text-center font-medium text-gray-500">{index + 1}</td>
                                    <td className="px-4 py-4">
                                        {item?.image ? (
                                            <img
                                                src={item?.image}
                                                alt={item.name}
                                                className="w-14 h-14 object-cover rounded-xl border border-gray-200 shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-200">
                                                <ImageIcon className="w-6 h-6" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-black">{item.name}</td>
                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                            ₹{item.price}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 max-w-xs text-gray-500 truncate">{item.description}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => router.push(`dashboard/${item._id}`)}
                                                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl border border-blue-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                                                title="Edit"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="p-2 bg-rose-50 hover:bg-rose-100 text-[#E23744] rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FoodItemList;