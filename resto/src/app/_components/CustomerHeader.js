"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const CustomerHeader = (props) => {
    const [cartNumber, setCartNumber] = useState(0);
    const [user, setUser] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);

                setUser(parsedUser?.data?.result?.name || "");
            } catch (error) {
                console.log("Invalid user data:", error);
                setUser("");
            }
        }
    }, []);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartNumber(cart.length);
    }, [props.cartData]);

    useEffect(() => {
        if (props.removeCart) {
            setCartNumber(0)
            localStorage.removeItem("cart")
        }
    }, [props.removeCart])

    return (

        <>
            <div className="header-wrapper">
                <div>
                    <img style={{
                        width: "100px",
                        height: "100px",
                    }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-ysGap5km_i8-40sHFQPxqWF7cZubQrS2oueoqPoow&s=10" />
                </div>

                <ul >
                    <li >
                        <Link href="/"> Home</Link>
                    </li>

                    {
                        !user ? <li >
                            <Link href="/user-auth">Login</Link>
                        </li> : <li > <Link href="/userProfile"> {user?.charAt(0)?.toUpperCase() + user?.slice(1)}</Link></li>
                    }

                    {/* <li >
                        <Link href="/user-auth">SignUp</Link>
                    </li> */}
                    <li >
                        <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber ? cartNumber : 0})</Link>
                    </li>

                    <li >
                        <Link href="/restaurant">Add Restaurant</Link>
                    </li>
                     <li >
                        <Link href="/deliveryPartner">Delivery Partner</Link>
                    </li>


                </ul>
            </div>
        </>
    )
}

export default CustomerHeader