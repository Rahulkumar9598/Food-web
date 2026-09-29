"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import Footer from '../_components/Footer';
import { Package, MapPin, Mail, Phone, Building, Utensils } from 'lucide-react';

const Page = () => {
  const [userOrders, setUserOrders] = useState([]);
  const userId = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user"))?.data?.result?._id : null;

  const getData = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:3000/api/order?id=${userId}`);
      console.log(response, " user profile result");
      if (response.data.success) {
        setUserOrders(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
      <CustomerHeader />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
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
                key={item.id || idx}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all space-y-4"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744]">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-black">{item.name}</h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-semibold">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  {item.email && (
                    <p className="flex items-center gap-2 text-gray-500">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{item.email}</span>
                    </p>
                  )}
                  {item.contact && (
                    <p className="flex items-center gap-2 text-gray-500">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{item.contact}</span>
                    </p>
                  )}
                  {item.city && (
                    <p className="flex items-center gap-2 text-gray-500">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span>{item.city}</span>
                    </p>
                  )}
                  {item.address && (
                    <p className="flex items-start gap-2 text-gray-500">
                      <MapPin className="w-4 h-4 text-[#E23744] flex-shrink-0 mt-0.5" />
                      <span>{item.address}</span>
                    </p>
                  )}
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