"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Store, MapPin, Phone, Building, UserPlus, AlertCircle } from "lucide-react";

const RestaurantSignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [c_password, setC_password] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !name || !city || !address || !contact || !c_password) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        if (password != c_password) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }

        console.log(email, password, c_password, name, address, contact);

        const response = await axios.post("http://localhost:3000/api/restaurant", { email, password, name, city, address, contact });
        console.log(response, " this is response form the backend");

        if (response.data.success) {
            alert("Restaurant Registared Successfully");
            delete response.data.result.password;
            const result = response.data;

            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard");
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3 text-amber-400">
                    <UserPlus className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Partner Restaurant Sign Up</h3>
                <p className="text-slate-400 text-sm mt-1">Register your restaurant & grow your food business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all text-sm"
                            type="text"
                            placeholder="Enter Email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {error && !email && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3 h-3" /> Please enter valid email
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Restaurant Name
                    </label>
                    <div className="relative">
                        <Store className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all text-sm"
                            type="text"
                            placeholder="Enter Restaurant name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {error && !name && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3 h-3" /> Please enter valid name
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all text-sm"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && !password && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3 h-3" /> Please enter valid password
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all text-sm"
                            type="password"
                            placeholder="Confirm password"
                            value={c_password}
                            onChange={(e) => setC_password(e.target.value)}
                        />
                    </div>
                    {error && !c_password && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3 h-3" /> Please enter valid confirm password
                        </p>
                    )}
                    {passwordError && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3 h-3" /> Confirm password does not match
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        City
                    </label>
                    <div className="relative">
                        <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all text-sm"
                            type="text"
                            placeholder="Enter City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    {error && !city && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3 h-3" /> Please enter valid city
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Contact Number
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all text-sm"
                            type="text"
                            placeholder="Enter Contact No."
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    {error && !contact && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3 h-3" /> Please enter valid contact
                        </p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Full Address
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all text-sm"
                            type="text"
                            placeholder="Enter Full Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    {error && !address && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1">
                            <AlertCircle className="w-3 h-3" /> Please enter valid address
                        </p>
                    )}
                </div>
            </div>

            <button
                onClick={() => handleSignup()}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all duration-200 mt-6 cursor-pointer flex items-center justify-center gap-2"
            >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up Restaurant</span>
            </button>
        </div>
    );
};

export default RestaurantSignUp;