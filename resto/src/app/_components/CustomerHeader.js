"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Utensils } from 'lucide-react';
import { useSelector } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

const CustomerHeader = (props) => {
    const [cartNumber, setCartNumber] = useState(0);
    // const [user, setUser] = useState("");
    const user = useSelector((state) => state.user.user)
    const isLoading = useSelector((state) => state.user.isLoading
    );

    console.log("User:", user);
    console.log("Loading:", isLoading);

    console.log(user, " this is user from the header and redux")

    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem("user");
            console.log("storedUser from the header", storedUser)

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                console.log("parsedUser from the header", parsedUser)

                const user = parsedUser
                // console.log("user from the header" , user)
                setUser(user);
            }
        };

        loadUser();

        window.addEventListener("userUpdated", loadUser);

        return () => {
            window.removeEventListener("userUpdated", loadUser);
        };
    }, []);



    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartNumber(cart.length);
    }, [props.cartData]);



    useEffect(() => {
        const loadCart = () => {
            const cart = JSON.parse(
                localStorage.getItem("cart") || "[]"
            );

            setCartNumber(
                cart.reduce(
                    (total, item) =>
                        total + (Number(item.length) || 1),
                    0
                )
            );
        };

        loadCart();

        window.addEventListener("cartUpdated", loadCart);

        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        };
    }, []);


    useEffect(() => {
        if (props.removeCart) {
            setCartNumber(0);
            localStorage.removeItem("cart");
        }
    }, [props.removeCart]);

    return (
        <header className="sticky top-0 z-50 bg-[#F6F4EB] border-b border-[#E5E0D8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div>
                        <span className="text-2xl font-bold text-black tracking-tight">
                            Resto
                        </span>
                    </div>
                </Link>

                {/* Navigation Items */}
                <nav className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-[15px] font-medium text-black hover:text-gray-600 transition-colors"
                    >
                        Home
                    </Link>

                    {isLoading ? (
                        <span>Loading...</span>

                    ) : user ? (
                        <Link
                            href="/userProfile"
                            className="text-[15px] font-medium text-black hover:text-gray-600 transition-colors"
                        >
                            {user?.name?.charAt(0)?.toUpperCase() + user?.name?.slice(1)}
                        </Link>

                    ) : (
                        <Link
                            href="/user-auth"
                            className="text-[15px] font-medium text-black hover:text-gray-600 transition-colors"
                        >
                            Login
                        </Link>
                    )}

                    <Link
                        href="/restaurant"
                        className="hidden md:block text-[15px] font-medium text-black hover:text-gray-600 transition-colors"
                    >
                        Add Restaurant
                    </Link>

                    <Link
                        href="/deliveryPartner"
                        className="hidden lg:block text-[15px] font-medium text-black hover:text-gray-600 transition-colors"
                    >
                        Delivery Partner
                    </Link>

                    <Link
                        href={cartNumber ? "/cart" : "#"}
                        className="px-5 py-2 rounded-lg border-2 border-black text-[15px] font-medium text-black hover:bg-black hover:text-white transition-all flex items-center gap-2"
                    >
                        Cart {cartNumber > 0 && <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">{cartNumber}</span>}
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default CustomerHeader;