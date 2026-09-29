"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DeliveryHeader from '../deliveryHeader';
import Footer from '../_components/Footer';
import { Bike, LogIn, UserPlus, Phone, Lock, User, Mail, Building, MapPin } from 'lucide-react';

const Page = () => {
    const [loginPassword, setLoginPassword] = useState("");
    const [loginPhone, setLoginPhone] = useState("");

    const [name, setName] = useState("");
    const [phone, setphone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            console.log(name, phone, email, password, city, address, "hit handleSignup function");

            if (password !== confirmPassword) {
                alert("Please enter same password");
                return false;
            }
            const response = await axios.post("http://localhost:3000/api/deliveryPartner/signup", { name, phone, email, password, city, address });
            console.log(response, " this is response of api");

            if (response?.data?.success) {
                delete response?.data?.result?.password;
                localStorage.setItem("DeliveryPartner", JSON.stringify(response.data.result));
                alert("Delivery Partner Registered Successfully");
                router.push("/deliveryDashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            console.log(loginPhone, loginPassword, " phone and password");
            const response = await axios.post("http://localhost:3000/api/deliveryPartner/login", { phone: loginPhone, password: loginPassword });
            console.log(response, " this is response of sign in ");
            if (response.data.success) {
                delete response?.data?.result?.password;
                localStorage.setItem("DeliveryPartner", JSON.stringify(response.data.result));
                alert("Delivery Partner login Successfully");
                router.push("/deliveryDashboard");
            }
        } catch (error) {
            console.log(error, " this is error from login");
        }
    };

    useEffect(() => {
        let delivery = JSON.parse(localStorage.getItem("DeliveryPartner"));
        if (delivery) {
            router.push("/deliveryDashboard");
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
            <DeliveryHeader />

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center mb-10">
                    <div className="w-14 h-14 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-lg shadow-emerald-500/10">
                        <Bike className="w-7 h-7" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Delivery Partner Portal</h1>
                    <p className="text-slate-400 text-sm mt-1">Earn money by delivering food to customers near you</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Login Card */}
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl h-fit">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                            <LogIn className="w-5 h-5 text-emerald-400" />
                            <h2 className="text-xl font-bold text-white">Rider Login</h2>
                        </div>

                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                        value={loginPhone}
                                        onChange={(e) => setLoginPhone(e.target.value)}
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                                    <input
                                        type="password"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={(e) => handleSignIn(e)}
                                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>Sign In as Partner</span>
                            </button>
                        </form>
                    </div>

                    {/* SignUp Card */}
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                            <UserPlus className="w-5 h-5 text-teal-400" />
                            <h2 className="text-xl font-bold text-white">Partner Sign Up</h2>
                        </div>

                        <form onSubmit={handleSignup} className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        Phone No.
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                            value={phone}
                                            onChange={(e) => setphone(e.target.value)}
                                            placeholder="Enter phone"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                                        <input
                                            type="password"
                                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                                        <input
                                            type="password"
                                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm password"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        City
                                    </label>
                                    <div className="relative">
                                        <Building className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="City"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                        Address
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all text-sm"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Address"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={(e) => handleSignup(e)}
                                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>Sign Up as Delivery Partner</span>
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Page;