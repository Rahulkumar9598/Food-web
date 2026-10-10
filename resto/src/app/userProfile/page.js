"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import Footer from '../_components/Footer';
import { Package, MapPin, Mail, Phone, Building, Utensils, User, Pencil, X, Save, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';


const Page = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    address: "",
  });
    
  const user = useSelector((state) => state.user.user)
  const userId = user?._id
  console.log(user, " this is user profile ")


  const getData = async () => {
    console.log(userId , " this is user id..........from user profile")
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/order?id=${userId}`);
      console.log(response, " user profile result");
      if (response.data.success) {
        console.log(response.data ,"this is user from userprofile page"  )
        setUserOrders(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        city: user?.city || "",
        address: user?.address || "",
      });
    }
  }, [user]);


  useEffect(() => {
    getData();
  }, [userId]);


  const handleEdit = async () => {
  try {
    console.log(formData, "this is formData");

    const response = await axios.put(
      `http://localhost:3000/api/user/edit/${userId}`,
      formData
    );

    console.log(response, "this is response of edit");

    if (response?.data?.success) {
      const updatedUser = response.data.result;

      dispatch(setUser(updatedUser));

      setIsEditing(false);

      console.log(updatedUser, "updated user");
    }
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");

    window.location.href = "/user-auth";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
      <CustomerHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* User Profile */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm mb-8">

          {/* Profile Header */}
          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center">
                <User className="w-6 h-6 text-[#E23744]" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  My Profile
                </h2>

                <p className="text-xs text-gray-400">
                  Manage your personal information
                </p>
              </div>

            </div>

            {/* Edit Button */}

            {!isEditing && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#E23744] text-white text-sm font-semibold hover:bg-[#c92f3b] transition whitespace-nowrap"
                >
                  <Pencil className="w-4 h-4 flex-shrink-0" />
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-[#E23744] bg-red-50 text-sm font-semibold hover:bg-[#E23744] hover:text-white transition whitespace-nowrap"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  Logout
                </button>

              </div>
            )}



          </div>

          {isEditing ? (

            /* Edit Form */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E23744]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email
                </label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E23744]"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  City
                </label>

                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city: e.target.value
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E23744]"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Address
                </label>

                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E23744]"
                />
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex justify-end gap-3 pt-3">

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>

                <button onClick={(e) => handleEdit(e)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E23744] text-white text-sm font-semibold hover:bg-[#c92f3b]"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>

              </div>

            </div>

          ) : (

            /* Profile View */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#E23744]" />

                <div>
                  <p className="text-xs text-gray-400">
                    Full Name
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    {user?.name || "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#E23744]" />

                <div>
                  <p className="text-xs text-gray-400">
                    Email
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-[#E23744]" />

                <div>
                  <p className="text-xs text-gray-400">
                    City
                  </p>

                  <p className="text-sm font-semibold text-gray-800 capitalize">
                    {user?.city || "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E23744]" />

                <div>
                  <p className="text-xs text-gray-400">
                    Address
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    {user?.address || "Not available"}
                  </p>
                </div>
              </div>

            </div>

          )}

        </div>
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744]">
            <Package className="w-5 h-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">Your Order History</h1>
            <p className="text-gray-500 text-xs">Track your past restaurant orders</p>
          </div>
        </div>

        {userOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userOrders.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all space-y-4"
              >
                {/* Food Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">

                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item?.food?.image}
                      alt={item?.food?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-black">
                      {item.food?.name}
                      
                    </h2>

                    <p className="text-sm font-semibold text-[#E23744]">
                      ₹{item.food?.price}
                    </p>

                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-semibold">
                      Confirmed
                    </span>
                  </div>

                </div>

                {/* Restaurant Details */}
                {/* Restaurant Details */}
                <div className="mt-5 rounded-2xl bg-gray-50 border border-gray-100 p-4">

                  {/* Restaurant Details Heading */}
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                    <div className="w-9 h-9 rounded-lg bg-[#E23744]/10 flex items-center justify-center">
                      <Utensils className="w-4 h-4 text-[#E23744]" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        Restaurant Details
                      </h3>
                      <p className="text-[11px] text-gray-400">
                        Your order is from this restaurant
                      </p>
                    </div>
                  </div>

                  {/* Restaurant Name */}
                  <div className="mb-4">
                    <p className="text-[11px] text-gray-400 mb-1">
                      Restaurant
                    </p>

                    <p className="text-base font-bold text-gray-900">
                  {item?.restaurant?.name || "Restaurant unavailable"}
                    </p>
                  </div>

                  {/* Contact & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-[#E23744] mt-0.5" />

                      <div>
                        <p className="text-[11px] text-gray-400">
                          Contact Number
                        </p>

                        <p className="text-xs font-medium text-gray-700">
                          {item.restaurant.contact  || "Not available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Building className="w-4 h-4 text-[#E23744] mt-0.5" />

                      <div>
                        <p className="text-[11px] text-gray-400">
                          City
                        </p>

                        <p className="text-xs font-medium text-gray-700 capitalize">
                      {item?.restaurant?.city || "Not available"}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 mt-4 pt-3 border-t border-gray-200">
                    <MapPin className="w-4 h-4 text-[#E23744] flex-shrink-0 mt-0.5" />

                    <div>
                      <p className="text-[11px] text-gray-400 mb-1">
                        Restaurant Address
                      </p>

                      <p className="text-xs font-medium text-gray-700 leading-relaxed">
                        {item.restaurant.address  || "Not available"}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
            <Package className="w-14 h-14 text-gray-300 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-800">No Orders Found</h2>
            <p className="text-gray-500 text-sm mt-1">You haven't placed any food orders yet.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Page;