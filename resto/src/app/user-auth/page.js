"use client"
import React, { useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import Footer from '../_components/Footer'
import UserSignup from '../_components/UserSignup'
import UserSignIn from '../_components/UserSignIn'
import { useSearchParams } from 'next/navigation'

const UserAuth = (props) => {
    const searchParams = useSearchParams();
    const order = searchParams.get("order");
    console.log(order , " this is order params")
    const [login, setLogin] = useState(false)

    return (
        <div>
            <CustomerHeader />
            <div className='container'>
                <h1>{login ? "User Signup " : "User login"}</h1>
                {
                    login ? <UserSignup redirect={order}/> : <UserSignIn  redirect={order}/>
                }
                <button className='button-link' onClick={(e) => setLogin(!login)}>{login ? "Already have an acccount" : "Don't have an account"}
                </button>
            </div>

            <Footer />
        </div>
    )
}

export default UserAuth