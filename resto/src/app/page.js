"use client";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Search, MapPin, Store, Phone, Mail, ChevronRight, Sparkles } from "lucide-react";
import Category from "./_components/Category";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [showlocations, setShowLocations] = useState(false);
  const [selectedlocations, setSelectedLocations] = useState();
  const [restaurants, setRestaurant] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customer/locations");
      console.log(response, " this is response of locations");
      if (response.data.success) {
        setLocations(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadRestaurants = async (params) => {
    try {
      let url = "http://localhost:3000/api/customer";

      if (params?.location) {
        url = url + "?location=" + params.location;
      } else if (params?.restaurant) {
        url = url + "?restaurant=" + params.restaurant;
      }

      const response = await axios.get(url);
      console.log(response, " this is response of restaurant .......");

      if (response.data.success) {
        setRestaurant(response.data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlelist = async (item) => {
    setSelectedLocations(item);
    setShowLocations(false);
    loadRestaurants({ location: item });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
      <CustomerHeader />

      {/* Hero Banner Section */}
      <section className="relative flex items-center justify-center min-h-[700px] bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop)",
        }}>
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center justify-center pt-10">
          <h1 className="text-6xl sm:text-[80px] font-bold text-white mb-2 tracking-tight leading-tight">Delicious Food</h1>
          <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-[0.15em] mb-4">MODERN RESTAURANT</h2>
          <p className="text-white/95 text-sm sm:text-[15px] max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            Lorem ipsum dolor sit amet, consecter us adipixna,
            adpuet tecguils de adlas et deperac utiiquer
          </p>

          {/* Search Control Box */}
          <div className="relative max-w-2xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row items-center bg-white rounded-2xl p-2 shadow-2xl gap-2">

              {/* Location Select Input */}
              <div className="relative w-full sm:w-1/2">
                <div className="flex items-center px-3 py-2">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    readOnly
                    value={selectedlocations || ""}
                    onClick={() => setShowLocations(!showlocations)}
                    className="w-full bg-transparent text-black placeholder-gray-500 text-sm font-medium focus:outline-none cursor-pointer"
                    placeholder="Select Place / Location"
                  />
                </div>
              </div>

              <div className="hidden sm:block w-[1px] h-8 bg-gray-200" />

              {/* Restaurant / Food Search Input */}
              <div className="relative w-full sm:w-1/2">
                <div className="flex items-center px-3 py-2">
                  <Search className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    className="w-full bg-transparent text-black placeholder-gray-500 text-sm font-medium focus:outline-none"
                    onChange={(e) => loadRestaurants({ restaurant: e.target.value })}
                    placeholder="Enter food or restaurant..."
                  />
                </div>
              </div>
            </div>

            {/* Location Dropdown Popup */}
            {showlocations && (
              <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-30 max-h-60 overflow-y-auto text-left">
                {locations.length > 0 ? (
                  locations.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => handlelist(item)}
                      className="px-4 py-3 hover:bg-gray-50 text-black text-sm font-medium flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {item}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-gray-500 text-sm text-center">No locations available</li>
                )}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Main Restaurant List Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">Popular Restaurants</h2>
            <p className="text-gray-500 text-sm mt-1">Explore top dining places nearby</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-600 shadow-sm">
            {restaurants.length} Restaurants Found
          </span>
        </div>

        {restaurants.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">No Restaurants Found</h3>
            <p className="text-gray-500 text-sm mt-1">Try searching for a different location or restaurant name.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((item) => (
              <div
                key={item._id}
                onClick={() => router.push("restaurantDetails/" + item.name + "?id=" + item._id)}
                className="group relative bg-white border border-gray-100 hover:border-[#E23744]/30 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
              >
                {/* Food Image Banner */}
                <div
                  className="relative w-full h-44 bg-cover bg-center"
                  style={{
                    backgroundImage: item.foodImage
                      ? `url(${item.foodImage})`
                      : "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                  <div className="absolute bottom-3 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                      {item.name}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center text-[#E23744] flex-shrink-0">
                      <Store className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-black truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {item.contact}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-500">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#E23744] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{item.email}</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#E23744] group-hover:translate-x-1 transition-transform">
                    <span>View Menu & Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Category />
      <Footer />
    </div>
  );
}
