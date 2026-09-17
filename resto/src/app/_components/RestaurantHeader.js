"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const RestaurantHeader = () => {

    const [details, setDetails] = useState()
    const router = useRouter()
    const pathName = usePathname()

    useEffect(() => {
        let data = localStorage.getItem("restaurantUser")
        console.log(data, " this is data from localstorage")

        if (!data  && pathName == "/restaurant/dashboard") {
            router.push("/restaurant")

        } else if (data && pathName == "/restaurant") {

            router.push("/restaurant/dashboard");
        } else {
            setDetails(JSON.parse(data))
        }


    }, [pathName, router])


    const handleLogout = ()=>{
        localStorage.removeItem("restaurantUser")
            router.push("/restaurant")



    }

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
                        details && details.result.name ?
                            <>
                                <li >
                                    <Link href="/">Profile</Link>
                                </li>
                                <li onClick={handleLogout}> Logout</li>
                            </> : <li >
                                <Link href="/">Login/Sign</Link>
                            </li>
                    }


                </ul>
            </div>
        </>
    )
}

export default RestaurantHeader