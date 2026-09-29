"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Utensils, Home, User, LogOut, Store } from "lucide-react";

const RestaurantHeader = () => {
    const [details, setDetails] = useState();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        let data = localStorage.getItem("restaurantUser");

        if (!data && pathName == "/restaurant/dashboard") {
            router.push("/restaurant");
        } else if (data && pathName == "/restaurant") {
            router.push("/restaurant/dashboard");
        } else if (data) {
            setDetails(JSON.parse(data));
        }
    }, [pathName, router]);

    const handleLogout = () => {
        localStorage.removeItem("restaurantUser");
        router.push("/restaurant");
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                        <Store className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                            Resto Partner
                        </span>
                        <span className="block text-[10px] text-slate-400 uppercase tracking-widest -mt-1 font-medium">
                            Restaurant Portal
                        </span>
                    </div>
                </Link>

                {/* Nav Links */}
                <nav className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <Home className="w-4 h-4 text-orange-400" />
                        <span>Home</span>
                    </Link>

                    {details && details.result?.name ? (
                        <>
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium bg-slate-800 text-amber-400 border border-slate-700"
                            >
                                <User className="w-4 h-4" />
                                <span>{details.result.name}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all"
                        >
                            <User className="w-4 h-4" />
                            <span>Login / Sign Up</span>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default RestaurantHeader;