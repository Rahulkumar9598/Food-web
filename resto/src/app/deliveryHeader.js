"use client";
import Link from 'next/link';
import { Bike, Home } from 'lucide-react';

const DeliveryHeader = (props) => {
    return (
        <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                        <Bike className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                            Resto Rider
                        </span>
                        <span className="block text-[10px] text-slate-400 uppercase tracking-widest -mt-1 font-medium">
                            Delivery Portal
                        </span>
                    </div>
                </Link>

                <nav className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <Home className="w-4 h-4 text-emerald-400" />
                        <span>Home</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default DeliveryHeader;