import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

const RestaurantLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError(true);
                return false;
            } else {
                setError(false);
            }

            console.log(email, password, " this is email and password");
            const response = await axios.post("http://localhost:3000/api/restaurant", { email, password, login: true });
            console.log(response, " this is response of login");

            if (response.data.success) {
                const result = response.data;
                delete result.password;
                localStorage.setItem("restaurantUser", JSON.stringify(result));

                router.push("/restaurant/dashboard");
                alert("Login Successfully");
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.log(error, " this is error from the handlelogin ");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3 text-amber-400">
                    <LogIn className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Restaurant Login</h1>
                <p className="text-slate-400 text-sm mt-1">Manage your restaurant menu & orders</p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
                        <input
                            className="w-full pl-11 pr-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
                            type="text"
                            placeholder="Enter Email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {error && !email && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1.5 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" /> please enter valid email
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-500" />
                        <input
                            className="w-full pl-11 pr-4 py-3 bg-slate-800/70 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-sm"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && !password && (
                        <p className="flex items-center gap-1 text-rose-400 text-xs mt-1.5 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" /> please enter valid password
                        </p>
                    )}
                </div>

                <button
                    onClick={() => handleLogin()}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all duration-200 mt-2 cursor-pointer flex items-center justify-center gap-2"
                >
                    <LogIn className="w-4 h-4" />
                    <span>Sign in</span>
                </button>
            </div>
        </div>
    );
};

export default RestaurantLogin;