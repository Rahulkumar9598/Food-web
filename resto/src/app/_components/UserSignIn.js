import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/store/slices/userSlice";

const UserSignIn = (props) => {
    console.log(props, " this is props");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);


    // let user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;
    // user = user?.data?.result?.email;

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            console.log(password, email, " this is name and email form the login page");

            const response = await axios.post("http://localhost:3000/api/user/login", { email, password });

            console.log(response, " this is response of login");

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);

                delete response?.data?.result?.password;
                delete response?.data?.result?.confirmPassword;

                dispatch(setUser(response.data.result));
                alert("User SignIn successfully");
                if (props?.redirect) {
                    router.push("/order");
                } else {
                    router.push('/');
                }
            } else {
                alert("Failed to login");
            }
        } catch (error) {
            console.log(error, " this is error from the login page");
        }
    };

    return (
        <form onSubmit={handleSignIn} className="space-y-4">
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
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
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
            </div>

            <button
                type="submit"
                onClick={(e) => handleSignIn(e)}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
            </button>
        </form>
    );
};

export default UserSignIn;