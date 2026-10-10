import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { User, Mail, Lock, Building, MapPin, UserPlus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

const UserSignup = (props) => {
    console.log(props, " this is props");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(name, email, password, confirmPassword, city, address);

        const response = await axios.post("http://localhost:3000/api/user", { name, email, password, confirmPassword, city, address });

        if (response.data.success) {
            alert("User registered successfully");
            // localStorage.setItem('user', JSON.stringify(response.data.result));
                  useDispatch(setUser(response.data.result));

            if (props.redirect) {
                router.push('/order');
            } else {
                router.push('/');
            }
        } else {
            alert("Failed");
        }

        console.log(response, " this is response of api");
    };

    return (
        <form onSubmit={handleSignup} className="space-y-3.5">
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Full Name
                </label>
                <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all text-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
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
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
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
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all text-sm"
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
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all text-sm"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter your city"
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
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all text-sm"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                onClick={(e) => handleSignup(e)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
            </button>
        </form>
    );
};

export default UserSignup;