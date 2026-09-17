import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const CustomerHeader = ({ cartData  }) => {
    const [cartNumber, setCartNumber] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartNumber(cart.length);
    }, [cartData]);

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


                    <li >
                        <Link href="/">Login</Link>
                    </li>
                    <li >
                        <Link href="/">SignUp</Link>
                    </li>
                    <li >
                        <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber ? cartNumber : 0})</Link>
                    </li>
                    <li >
                        <Link href="/">Add Restaurant</Link>
                    </li>


                </ul>
            </div>
        </>
    )
}

export default CustomerHeader