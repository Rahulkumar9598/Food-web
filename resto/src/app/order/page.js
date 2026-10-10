// "use client";
// import React, { useEffect, useState } from 'react';
// import CustomerHeader from '../_components/CustomerHeader.js';
// import Footer from '../_components/Footer';
// import { Delivery_Charges, TAX } from '../lib/constant/DelieveryChargers.js';
// import axios from 'axios';
// import { useRouter } from 'next/navigation.js';
// import {
//   CheckCircle2, User, CreditCard, Receipt,
//   Phone, Mail, MapPin, ShoppingBag, ArrowRight, Utensils
// } from 'lucide-react';
// import { useSelector } from "react-redux";

// const Page = () => {
//   const [user, setUser] = useState();
//   const [removeCart, setRemoveCart] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//   let user = useSelector((state)=>state.user.user)
//     console.log(user , " user ...............")
//     // user = user?.data?.result;
//     setUser(user);
//   }, []);

//   const [foodItems, setFoodItems] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return JSON.parse(localStorage.getItem("cart")) || [];
//     }
//     return [];
//   });

//   console.log(foodItems, "cart food items");
//   const [total] = useState(() =>
//     foodItems?.length === 1
//       ? foodItems[0].price
//       : foodItems?.reduce((total, item) => total + item.price, 0)
//   );
//   console.log(total, "total price");

//   useEffect(() => {
//     if (!total) {
//       router.push("/");
//     }
//   }, [total]);

//   const handleRemoveFromCart = (item) => {
//     const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const newCart = oldCart.filter((cartItem) => cartItem._id !== item._id);
//     localStorage.setItem("cart", JSON.stringify(newCart));
//   };

//   const orderNow = async () => {
//     let user_id = useSelector((state)=>state.user.user);
//     user_id?._id
//     let user_city = JSON.parse(localStorage.getItem("user"))?.data?.result?.city;
//     let address = JSON.parse(localStorage.getItem("user"))?.data?.result?.address;

//     let cart = JSON.parse(localStorage.getItem("cart"));
//     let restaurantId = cart[0].restaurantId;
//     let foodsItemsIds = cart?.map((item) => item._id);

//     const DeliveryBoyResponse = await axios.get("http://localhost:3000/api/deliveryPartner/" + user_city);
//     let deliveryBoy_ids = DeliveryBoyResponse?.data?.result?.map((item) => item._id);
//     let deliveryBoy_id = deliveryBoy_ids[Math.floor(Math.random() * deliveryBoy_ids.length)];

//     if (!deliveryBoy_id) {
//       alert("Delivery Partner is Not Available");
//       return false;
//     }

//     let collection = {
//       user_id,
//       restaurantId,
//       foodsItemsIds,
//       deliveryBoy_id: deliveryBoy_id,
//       status: "confrim",
//       amount: total + (total * TAX) / 100 + Delivery_Charges,
//       address
//     };
//     console.log(collection, " this is collection");

//     const response = await axios.post("http://localhost:3000/api/order", { collection });

//     if (response.data.success) {
//       alert("Order Confirmed Successfully");
//       setRemoveCart(true);
//       router.push("/userProfile");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
//       {/* Header */}
//       <CustomerHeader removeCart={removeCart} />

//       <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">

//         {/* Page Heading */}
//         <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
//           <div className="w-10 h-10 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744]">
//             <ShoppingBag className="w-5 h-5" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-black tracking-tight">Checkout Order</h1>
//             <p className="text-gray-500 text-xs">Review delivery address and confirm your order</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* Left Column: Cart Items + Details */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Cart Items */}
//             <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
//               <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
//                 <Utensils className="w-5 h-5 text-[#E23744]" />
//                 <h2 className="text-base font-bold text-black">Order Items</h2>
//                 <span className="ml-auto px-2.5 py-0.5 rounded-full bg-[#E23744]/10 text-[#E23744] text-xs font-bold">
//                   {foodItems.length} item{foodItems.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
//               <div className="space-y-4">
//                 {foodItems.map((item) => (
//                   <div
//                     key={item._id}
//                     className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100"
//                   >
//                     <div className="w-14 h-14 bg-white rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
//                       {item?.path || item?.image ? (
//                         <img
//                           src={item.path || item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-gray-300">
//                           <Utensils className="w-6 h-6" />
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-bold text-black truncate">{item?.name}</p>
//                       <p className="text-xs text-gray-400 line-clamp-1">{item?.description}</p>
//                     </div>
//                     <span className="text-sm font-bold text-[#E23744] bg-[#E23744]/5 border border-[#E23744]/10 px-2.5 py-1 rounded-xl flex-shrink-0">
//                       ₹{item?.price}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* User Delivery Details */}
//             <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
//               <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
//                 <div className="w-8 h-8 rounded-lg bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center">
//                   <User className="w-4 h-4 text-[#E23744]" />
//                 </div>
//                 <h2 className="text-base font-bold text-black">Delivery Details</h2>
//               </div>
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100">
//                   <span className="text-gray-500 flex items-center gap-2">
//                     <User className="w-4 h-4 text-gray-400" /> Name
//                   </span>
//                   <span className="font-semibold text-black">{user?.name} </span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100">
//                   <span className="text-gray-500 flex items-center gap-2">
//                     <Mail className="w-4 h-4 text-gray-400" /> Email
//                   </span>
//                   <span className="font-semibold text-black truncate max-w-[200px]">{user?.email}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100">
//                   <span className="text-gray-500 flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-gray-400" /> Phone
//                   </span>
//                   <span className="font-semibold text-black">{user?.phone || 9098979695}</span>
//                 </div>
//                 <div className="flex items-start justify-between py-2">
//                   <span className="text-gray-500 flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-[#E23744]" /> Address
//                   </span>
//                   <span className="font-semibold text-black text-right max-w-[200px]">
//                     {user?.address || "—"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Order Summary + Payment */}
//           <div className="space-y-5">

//             {/* Order Summary */}
//             <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
//               <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
//                 <Receipt className="w-5 h-5 text-[#E23744]" />
//                 <h2 className="text-base font-bold text-black">Order Summary</h2>
//               </div>
//               <div className="space-y-3 text-sm text-gray-600">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500">Food Charges</span>
//                   <span className="font-semibold text-gray-800">₹{total}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500">Tax ({TAX}%)</span>
//                   <span className="font-semibold text-gray-800">₹{(total * TAX) / 100}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500">Delivery Charges</span>
//                   <span className="font-semibold text-gray-800">₹{Delivery_Charges}</span>
//                 </div>
//                 <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-base font-bold text-black">
//                   <span>Total Amount</span>
//                   <span className="text-xl text-[#E23744]">
//                     ₹{total + (total * TAX) / 100 + Delivery_Charges}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
//               <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
//                 <CreditCard className="w-5 h-5 text-[#E23744]" />
//                 <h2 className="text-base font-bold text-black">Payment Method</h2>
//               </div>
//               <div className="flex items-center justify-between bg-[#F6F4EB] p-4 rounded-xl border border-gray-200">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-green-500" />
//                   <span className="text-sm font-semibold text-black">Cash on Delivery</span>
//                 </div>
//                 <span className="text-sm font-bold text-[#E23744]">
//                   ₹{total + (total * TAX) / 100 + Delivery_Charges}
//                 </span>
//               </div>
//             </div>

//             {/* Place Order Button */}
//             <button
//               onClick={orderNow}
//               className="w-full py-4 px-6 bg-[#E23744] hover:bg-[#c42d38] text-white font-bold text-base rounded-2xl shadow-md shadow-[#E23744]/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
//             >
//               <CheckCircle2 className="w-5 h-5" />
//               <span>Place Your Order Now</span>
//               <ArrowRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Page;
"use client";

import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader.js";
import Footer from "../_components/Footer";
import {
  Delivery_Charges,
  TAX,
} from "../lib/constant/DelieveryChargers.js";
import axios from "axios";
import { useRouter } from "next/navigation.js";
import { useSelector } from "react-redux";

import {
  CheckCircle2,
  User,
  CreditCard,
  Receipt,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  ArrowRight,
  Utensils,
} from "lucide-react";

const Page = () => {
  const router = useRouter();

  // =========================
  // USER FROM REDUX
  // =========================

  const user = useSelector((state) => state.user.user);

  const isLoading = useSelector(
    (state) => state.user.isLoading
  );

  console.log(user, "user from redux");
  console.log(isLoading, "auth loading");

  // =========================
  // STATES
  // =========================

  const [removeCart, setRemoveCart] = useState(false);

  const [foodItems, setFoodItems] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
    }

    return [];
  });

  // =========================
  // TOTAL
  // =========================

  const total = foodItems.reduce(
    (total, item) => total + Number(item?.price*(item.quantity) || 0),
    0
  );

  const taxAmount = (total * TAX) / 100;

  const grandTotal =
    total + taxAmount + Delivery_Charges;

  console.log(foodItems, "cart food items");
  console.log(total, "food total");
  console.log(grandTotal, "grand total");

  // =========================
  // CHECK CART
  // =========================

  useEffect(() => {
    if (foodItems.length === 0) {
      router.push("/");
    }
  }, [foodItems.length, router]);

  // PLACE ORDER

  const orderNow = async () => {
    try {
      // User check
      if (!user?._id) {
        alert("Please login first");
        router.push("/user-auth");
        return;
      }

      // Cart check
      const cart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      if (!cart.length) {
        alert("Cart is empty");
        router.push("/");
        return;
      }

      const user_id = user._id;
      const user_city = user.city;
      const address = user.address;

      const restaurantId = cart[0]?.restaurantId;

      const foodsItemsIds = cart.map(
        (item) => item._id
      );

      console.log(user_id,"user id");

      console.log( user_city, "user city");

      console.log(address,"user address");

      console.log(restaurantId,"restaurant id");

      console.log(foodsItemsIds,"food ids");

    
      const DeliveryBoyResponse =
        await axios.get(
          `http://localhost:3000/api/deliveryPartner/${user_city}`
        );

      console.log( DeliveryBoyResponse.data, "delivery boy response");

      const deliveryBoy_ids =
        DeliveryBoyResponse?.data?.result?.map((item) => item._id) || [];

     
      // RANDOM DELIVERY BOY

      const deliveryBoy_id =
        deliveryBoy_ids.length > 0
          ? deliveryBoy_ids[
              Math.floor(
                Math.random() *
                  deliveryBoy_ids.length
              )
            ]
          : null;

      if (!deliveryBoy_id) {
        alert(
          "Delivery Partner is Not Available"
        );
        return;
      }

      // =========================
      // ORDER COLLECTION
      // =========================

      const collection = {
        user_id: user_id,
        restaurantId: restaurantId,
        foodsItemsIds: foodsItemsIds,
        deliveryBoy_id: deliveryBoy_id,
        status: "confrim",
        amount: grandTotal,
        address: address,
      };

      console.log(
        collection,
        "this is order collection"
      );



      const response = await axios.post(
        "http://localhost:3000/api/order",
        {
          collection,
        }
      );

      console.log(
        response.data,
        "order response"
      );

      // =========================
      // SUCCESS
      // =========================

      if (response.data.success) {
        alert(
          "Order Confirmed Successfully"
        );

        localStorage.removeItem("cart");

        setFoodItems([]);

        setRemoveCart(true);

        router.push("/userProfile");
      } else {
        alert(
          response.data.message ||
            "Order failed"
        );
      }
    } catch (error) {
      console.log(
        "ORDER ERROR:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong while placing order"
      );
    }
  };

  // =========================
  // AUTH LOADING
  // =========================

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F4EB]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#E23744]/20 border-t-[#E23744] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 font-medium">
            Loading your details...
          </p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">

      {/* HEADER */}

      <CustomerHeader
        removeCart={removeCart}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">

        {/* PAGE HEADING */}

        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">

          <div className="w-10 h-10 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744]">
            <ShoppingBag className="w-5 h-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">
              Checkout Order
            </h1>

            <p className="text-gray-500 text-xs">
              Review delivery address and confirm
              your order
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        

          <div className="lg:col-span-2 space-y-6">

            {/* CART ITEMS */}

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">

                <Utensils className="w-5 h-5 text-[#E23744]" />

                <h2 className="text-base font-bold text-black">
                  Order Items
                </h2>

                <span className="ml-auto px-2.5 py-0.5 rounded-full bg-[#E23744]/10 text-[#E23744] text-xs font-bold">
                  {foodItems.length} item
                  {foodItems.length !== 1
                    ? "s"
                    : ""}
                </span>

              </div>

              <div className="space-y-4">

                {foodItems.map((item) => (

                  <div
                    key={item._id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100"
                  >

                    {/* IMAGE */}

                    <div className="w-14 h-14 bg-white rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">

                      {item?.path ||
                      item?.image ? (
                        <img
                          src={
                            item.path ||
                            item.image
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Utensils className="w-6 h-6" />
                        </div>
                      )}

                    </div>

                    {/* ITEM DETAILS */}

                    <div className="flex-1 min-w-0">

                      <p className="text-sm font-bold text-black truncate">
                        {item?.name}
                      </p>

                      <p className="text-xs text-gray-400 line-clamp-1">
                        {item?.description}
                      </p>

                    </div>

                    {/* PRICE */}

                    <span className="text-sm font-bold text-[#E23744] bg-[#E23744]/5 border border-[#E23744]/10 px-2.5 py-1 rounded-xl flex-shrink-0">
                      ₹{item?.price}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* ================================= */}
            {/* DELIVERY DETAILS */}
            {/* ================================= */}

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">

                <div className="w-8 h-8 rounded-lg bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center">

                  <User className="w-4 h-4 text-[#E23744]" />

                </div>

                <h2 className="text-base font-bold text-black">
                  Delivery Details
                </h2>

              </div>

              <div className="space-y-3 text-sm">

                {/* NAME */}

                <div className="flex items-center justify-between py-2 border-b border-gray-100">

                  <span className="text-gray-500 flex items-center gap-2">

                    <User className="w-4 h-4 text-gray-400" />

                    Name

                  </span>

                  <span className="font-semibold text-black">
                    {user?.name || "—"}
                  </span>

                </div>

                {/* EMAIL */}

                <div className="flex items-center justify-between py-2 border-b border-gray-100">

                  <span className="text-gray-500 flex items-center gap-2">

                    <Mail className="w-4 h-4 text-gray-400" />

                    Email

                  </span>

                  <span className="font-semibold text-black truncate max-w-[200px]">
                    {user?.email || "—"}
                  </span>

                </div>

                {/* PHONE */}

                <div className="flex items-center justify-between py-2 border-b border-gray-100">

                  <span className="text-gray-500 flex items-center gap-2">

                    <Phone className="w-4 h-4 text-gray-400" />

                    Phone

                  </span>

                  <span className="font-semibold text-black">
                    {user?.phone ||
                      "Phone not available"}
                  </span>

                </div>

                {/* CITY */}

                <div className="flex items-center justify-between py-2 border-b border-gray-100">

                  <span className="text-gray-500 flex items-center gap-2">

                    <MapPin className="w-4 h-4 text-gray-400" />

                    City

                  </span>

                  <span className="font-semibold text-black">
                    {user?.city || "—"}
                  </span>

                </div>

                {/* ADDRESS */}

                <div className="flex items-start justify-between py-2">

                  <span className="text-gray-500 flex items-center gap-2">

                    <MapPin className="w-4 h-4 text-[#E23744]" />

                    Address

                  </span>

                  <span className="font-semibold text-black text-right max-w-[200px]">
                    {user?.address || "—"}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ================================= */}
          {/* RIGHT COLUMN */}
          {/* ================================= */}

          <div className="space-y-5">

            {/* ORDER SUMMARY */}

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">

                <Receipt className="w-5 h-5 text-[#E23744]" />

                <h2 className="text-base font-bold text-black">
                  Order Summary
                </h2>

              </div>

              <div className="space-y-3 text-sm text-gray-600">

                {/* FOOD */}

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">
                    Food Charges
                  </span>

                  <span className="font-semibold text-gray-800">
                    ₹{total}
                  </span>

                </div>

                {/* TAX */}

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">
                    Tax ({TAX}%)
                  </span>

                  <span className="font-semibold text-gray-800">
                    ₹{taxAmount}
                  </span>

                </div>

                {/* DELIVERY */}

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">
                    Delivery Charges
                  </span>

                  <span className="font-semibold text-gray-800">
                    ₹{Delivery_Charges}
                  </span>

                </div>

                {/* TOTAL */}

                <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-base font-bold text-black">

                  <span>
                    Total Amount
                  </span>

                  <span className="text-xl text-[#E23744]">
                    ₹{grandTotal}
                  </span>

                </div>

              </div>

            </div>

        

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">

                <CreditCard className="w-5 h-5 text-[#E23744]" />

                <h2 className="text-base font-bold text-black">
                  Payment Method
                </h2>

              </div>

              <div className="flex items-center justify-between bg-[#F6F4EB] p-4 rounded-xl border border-gray-200">

                <div className="flex items-center gap-2">

                  <div className="w-2 h-2 rounded-full bg-green-500" />

                  <span className="text-sm font-semibold text-black">
                    Cash on Delivery
                  </span>

                </div>

                <span className="text-sm font-bold text-[#E23744]">
                  ₹{grandTotal}
                </span>

              </div>

            </div>

          

            <button
              onClick={orderNow}
              disabled={!user || isLoading}
              className="w-full py-4 px-6 bg-[#E23744] hover:bg-[#c42d38] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-base rounded-2xl shadow-md shadow-[#E23744]/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >

              <CheckCircle2 className="w-5 h-5" />

              <span>
                Place Your Order Now
              </span>

              <ArrowRight className="w-5 h-5" />

            </button>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Page;