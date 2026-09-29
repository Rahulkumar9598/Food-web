"use client";
import React, { useState, Suspense } from 'react';
import CustomerHeader from '../_components/CustomerHeader';
import Footer from '../_components/Footer';
import UserSignup from '../_components/UserSignup';
import UserSignIn from '../_components/UserSignIn';
import { useSearchParams } from 'next/navigation';
import { User, UserPlus } from 'lucide-react';

const UserAuthContent = () => {
    const searchParams = useSearchParams();
    const order = searchParams.get("order");
    console.log(order, " this is order params");
    const [login, setLogin] = useState(false);

    return (
        <div className="w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
            <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E23744]/10 border border-[#E23744]/20 flex items-center justify-center mx-auto mb-3 text-[#E23744]">
                    {login ? <UserPlus className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <h1 className="text-2xl font-bold text-black tracking-tight">
                    {login ? "Create User Account" : "Welcome Back - User Login"}
                </h1>
                <p className="text-gray-500 text-xs mt-1">
                    {login ? "Sign up to track orders and save your details" : "Sign in to place orders and check status"}
                </p>
            </div>

            {login ? <UserSignup redirect={order} /> : <UserSignIn redirect={order} />}

            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <button
                    className="text-[#E23744] hover:text-[#c42d38] text-xs font-semibold hover:underline transition-all cursor-pointer"
                    onClick={() => setLogin(!login)}
                >
                    {login ? "Already have an account? Sign in" : "Don't have an account? Sign up here"}
                </button>
            </div>
        </div>
    );
};

const UserAuth = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#F6F4EB] text-black">
            <CustomerHeader />

            <main className="flex-1 max-w-xl mx-auto w-full px-4 py-12 flex flex-col items-center justify-center">
                <Suspense fallback={<div className="text-gray-500 text-sm">Loading user auth...</div>}>
                    <UserAuthContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
};

export default UserAuth;